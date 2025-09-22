'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Papa from 'papaparse';
import BookTable from '@/components/admin/BookTable';

interface UploadStatus {
  total: number;
  processed: number;
  added: number;
  updated: number;
  errors: string[];
}

interface CSVRow {
  [key: string]: string | number | undefined;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [uploadStatus, setUploadStatus] = useState<UploadStatus | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [csvPreview, setCsvPreview] = useState<CSVRow[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [activeTab, setActiveTab] = useState<'manage' | 'upload'>('manage');

  // Handle authentication
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('adminToken', data.token);
        setIsAuthenticated(true);
      } else {
        alert('Invalid password');
      }
    } catch {
      alert('Authentication error');
    }
  };

  // Handle CSV file drop
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setSelectedFile(file);
    
    try {
      // Read file content as text
      const text = await file.text();
      
      // Parse CSV for preview
      const parseResult = Papa.parse<CSVRow>(text, {
        header: true,
        preview: 5,
        skipEmptyLines: true,
        dynamicTyping: true
      });
      
      if (parseResult.errors && parseResult.errors.length > 0) {
        console.error('CSV parsing errors:', parseResult.errors);
        // Only show alert for critical errors
        const criticalErrors = parseResult.errors.filter(e => e.type === 'Quotes' || e.type === 'FieldMismatch');
        if (criticalErrors.length > 0) {
          alert('Error reading CSV file: ' + criticalErrors[0].message);
          return;
        }
      }
      
      setCsvPreview(parseResult.data);
    } catch (error) {
      console.error('Error reading file:', error);
      alert('Error reading CSV file');
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx']
    },
    multiple: false
  });

  // Handle CSV upload
  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file first');
      return;
    }

    setIsUploading(true);
    setUploadStatus(null);

    const formData = new FormData();
    formData.append('file', selectedFile);
    
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/admin/upload-csv', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (response.ok) {
        const result = await response.json();
        setUploadStatus(result);
      } else {
        const error = await response.json();
        alert(`Upload failed: ${error.message}`);
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed. Please check the console for details.');
    } finally {
      setIsUploading(false);
    }
  };

  // Login form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Admin Access</h1>
            <p className="text-gray-600 mt-2">Enter password to continue</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full py-2 px-4 text-white rounded-md hover:opacity-90 transition-opacity"
              style={{backgroundColor: '#053863'}}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Admin dashboard with tabs
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header with Tabs */}
        <div className="bg-white rounded-t-lg shadow-lg">
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setActiveTab('manage')}
                className={`px-8 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'manage'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                📚 Manage Books
              </button>
              <button
                onClick={() => setActiveTab('upload')}
                className={`px-8 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'upload'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                📤 CSV Upload
              </button>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'manage' ? (
          <BookTable token={localStorage.getItem('adminToken')} />
        ) : (
          <div className="bg-white rounded-b-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">
              Library CSV Upload
            </h1>

            {/* File Upload Area */}
            <div className="mb-8">
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                  isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <input {...getInputProps()} />
                <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                {selectedFile ? (
                  <div>
                    <p className="text-lg font-medium text-gray-900">{selectedFile.name}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      {(selectedFile.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="text-lg font-medium text-gray-900">
                      Drop CSV file here or click to select
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      Supports CSV files with UTF-8 encoding
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* CSV Preview */}
            {csvPreview.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Preview (First 5 rows)
                </h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        {Object.keys(csvPreview[0]).slice(0, 6).map((key) => (
                          <th key={key} className="px-4 py-2 text-left font-medium text-gray-900">
                            {key}
                          </th>
                        ))}
                        <th className="px-4 py-2 text-gray-500">...</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {csvPreview.map((row, idx) => (
                        <tr key={idx}>
                          {Object.values(row).slice(0, 6).map((val: string | number | undefined, i) => (
                            <td key={i} className="px-4 py-2 text-gray-700">
                              {val?.toString() || '-'}
                            </td>
                          ))}
                          <td className="px-4 py-2 text-gray-400">...</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Upload Button */}
            <div className="flex justify-between items-center">
              <button
                onClick={handleUpload}
                disabled={!selectedFile || isUploading}
                className="px-6 py-2 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                style={{backgroundColor: '#053863'}}
              >
                {isUploading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  'Upload CSV'
                )}
              </button>

              <button
                onClick={() => {
                  setSelectedFile(null);
                  setCsvPreview([]);
                  setUploadStatus(null);
                }}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Clear
              </button>
            </div>

            {/* Upload Status */}
            {uploadStatus && (
              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Upload Results
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Total Records:</span>
                    <span className="font-medium">{uploadStatus.total}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Processed:</span>
                    <span className="font-medium">{uploadStatus.processed}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>New Books Added:</span>
                    <span className="font-medium text-green-600">{uploadStatus.added}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Books Updated:</span>
                    <span className="font-medium text-blue-600">{uploadStatus.updated}</span>
                  </div>
                </div>
                
                {uploadStatus.errors.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-semibold text-red-600 mb-2">
                      Errors ({uploadStatus.errors.length})
                    </h4>
                    <div className="max-h-32 overflow-y-auto bg-red-50 p-2 rounded text-xs text-red-700">
                      {uploadStatus.errors.map((error, idx) => (
                        <div key={idx}>{error}</div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}