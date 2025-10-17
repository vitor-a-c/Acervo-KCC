'use client';

import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Papa from 'papaparse';
import BookTable from '@/components/admin/BookTable';
import NewLoanForm from '@/components/admin/NewLoanForm';
import LoanManagementTable from '@/components/admin/LoanManagementTable';
import UserManagementTable from '@/components/admin/UserManagementTable';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/lib/translations';

interface UploadStatus {
  total: number;
  processed: number;
  // For book uploads:
  added?: number;
  updated?: number;
  // For user imports:
  imported?: number;
  skipped?: number;
  // Common:
  errors: string[];
}

interface CSVRow {
  [key: string]: string | number | undefined;
}

export default function AdminPage() {
  const { language } = useLanguage();
  const t = getTranslation(language);
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [uploadStatus, setUploadStatus] = useState<UploadStatus | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [csvPreview, setCsvPreview] = useState<CSVRow[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [activeTab, setActiveTab] = useState<'loans-new' | 'loans-manage' | 'books' | 'users-manage' | 'users-import'>('loans-new');
  const [refreshKey, setRefreshKey] = useState(0);

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
        alert(t.admin.login.invalidPassword);
      }
    } catch {
      alert(t.admin.authError);
    }
  };

  // Handle CSV file drop (for books)
  const onDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setSelectedFile(file);
    
    try {
      const text = await file.text();
      const parseResult = Papa.parse<CSVRow>(text, {
        header: true,
        preview: 5,
        skipEmptyLines: true,
        dynamicTyping: true
      });
      
      if (parseResult.errors && parseResult.errors.length > 0) {
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
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx']
    },
    multiple: false
  });

  // Handle book CSV upload
  const handleBookUpload = async () => {
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
        setRefreshKey(prev => prev + 1);
      } else {
        const error = await response.json();
        alert(`${t.admin.upload.uploadFailed}: ${error.message}`);
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert(`${t.admin.upload.uploadFailed}. Please check the console for details.`);
    } finally {
      setIsUploading(false);
    }
  };

  // Handle user CSV upload
  const [userFile, setUserFile] = useState<File | null>(null);
  const [userUploadStatus, setUserUploadStatus] = useState<UploadStatus | null>(null);
  const [isUploadingUsers, setIsUploadingUsers] = useState(false);

  const handleUserUpload = async () => {
    if (!userFile) {
      alert(t.admin.userImport.selectFile);
      return;
    }

    setIsUploadingUsers(true);
    setUserUploadStatus(null);

    const formData = new FormData();
    formData.append('file', userFile);
    
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/admin/users', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (response.ok) {
        const result = await response.json();
        setUserUploadStatus(result);
      } else {
        const error = await response.json();
        alert(`${t.admin.upload.uploadFailed}: ${error.message}`);
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert(t.admin.authError);
    } finally {
      setIsUploadingUsers(false);
    }
  };

  // Login form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">{t.admin.login.title}</h1>
            <p className="text-gray-600 mt-2">{t.admin.login.subtitle}</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                {t.admin.login.password}
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
              {t.admin.login.loginButton}
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
            <div className="flex overflow-x-auto">
              <button
                onClick={() => setActiveTab('loans-new')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === 'loans-new'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {t.admin.tabs.loansNew}
              </button>
              <button
                onClick={() => setActiveTab('loans-manage')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === 'loans-manage'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {t.admin.tabs.loansManage}
              </button>
              <button
                onClick={() => setActiveTab('books')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === 'books'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {t.admin.tabs.books}
              </button>
              <button
                onClick={() => setActiveTab('users-manage')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === 'users-manage'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {t.admin.tabs.usersManage}
              </button>
              <button
                onClick={() => setActiveTab('users-import')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === 'users-import'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {t.admin.tabs.usersImport}
              </button>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === 'loans-new' && (
            <NewLoanForm
              token={localStorage.getItem('adminToken')}
              onSuccess={() => setRefreshKey(prev => prev + 1)}
            />
          )}

          {activeTab === 'loans-manage' && (
            <LoanManagementTable
              key={refreshKey}
              token={localStorage.getItem('adminToken')}
              onUpdate={() => setRefreshKey(prev => prev + 1)}
            />
          )}

          {activeTab === 'books' && (
            <div className="space-y-6">
              {/* CSV Upload Section */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {t.admin.upload?.title || 'Import Books from CSV'}
                </h2>

                {/* Dropzone */}
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                    isDragActive
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <input {...getInputProps()} />
                  <div className="space-y-2">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <p className="text-gray-600">
                      {isDragActive
                        ? (t.admin.upload?.dropHere || 'Drop the file here')
                        : (t.admin.upload?.dragDrop || 'Drag and drop a CSV file here, or click to select')}
                    </p>
                  </div>
                </div>

                {/* Preview */}
                {csvPreview.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      {t.admin.upload?.preview || 'Preview (first 5 rows)'}
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <thead className="bg-gray-50">
                          <tr>
                            {Object.keys(csvPreview[0] || {}).slice(0, 5).map((key) => (
                              <th
                                key={key}
                                className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase"
                              >
                                {key}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {csvPreview.map((row, idx) => (
                            <tr key={idx}>
                              {Object.values(row).slice(0, 5).map((value, colIdx) => (
                                <td key={colIdx} className="px-3 py-2 text-gray-700">
                                  {String(value || '')}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Upload Button */}
                <button
                  onClick={handleBookUpload}
                  disabled={!selectedFile || isUploading}
                  className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isUploading 
                    ? (t.admin.upload?.uploading || 'Uploading...') 
                    : (t.admin.upload?.uploadButton || 'Upload CSV')}
                </button>

                {/* Upload Status */}
                {uploadStatus && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      {t.admin.upload?.results?.title || 'Upload Results'}
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>{t.admin.upload?.results?.total || 'Total'}</span>
                        <span className="font-medium">{uploadStatus.total}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{t.admin.upload?.results?.processed || 'Processed'}</span>
                        <span className="font-medium">{uploadStatus.processed}</span>
                      </div>
                      {uploadStatus.added !== undefined && (
                        <div className="flex justify-between">
                          <span>{t.admin.upload?.results?.added || 'Added'}</span>
                          <span className="font-medium text-green-600">{uploadStatus.added}</span>
                        </div>
                      )}
                      {uploadStatus.updated !== undefined && (
                        <div className="flex justify-between">
                          <span>{t.admin.upload?.results?.updated || 'Updated'}</span>
                          <span className="font-medium text-blue-600">{uploadStatus.updated}</span>
                        </div>
                      )}
                    </div>

                    {uploadStatus.errors.length > 0 && (
                      <div className="mt-4">
                        <h4 className="text-sm font-semibold text-red-600 mb-2">
                          {t.admin.upload?.results?.errors || 'Errors'} ({uploadStatus.errors.length})
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

              {/* Book Table */}
              <BookTable token={localStorage.getItem('adminToken')} />
            </div>
          )}

          {activeTab === 'users-manage' && (
            <UserManagementTable
              token={localStorage.getItem('adminToken')} />
          )}

          {activeTab === 'users-import' && (
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {t.admin.userImport.title}
              </h2>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.admin.userImport.selectFile}
                </label>
                <input
                  type="file"
                  accept=".csv"
                  onChange={(e) => setUserFile(e.target.files?.[0] || null)}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                <p className="text-xs text-gray-500 mt-2">
                  {t.admin.userImport.hint}
                </p>
              </div>

              <button
                onClick={handleUserUpload}
                disabled={!userFile || isUploadingUsers}
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUploadingUsers ? t.admin.userImport.importing : t.admin.userImport.importButton}
              </button>

              {userUploadStatus && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {t.admin.userImport.results.title}
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>{t.admin.userImport.results.total}</span>
                      <span className="font-medium">{userUploadStatus.total}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t.admin.userImport.results.processed}</span>
                      <span className="font-medium">{userUploadStatus.processed}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t.admin.userImport.results.imported}</span>
                      <span className="font-medium text-green-600">{userUploadStatus.imported || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t.admin.userImport.results.skipped}</span>
                      <span className="font-medium text-yellow-600">{userUploadStatus.skipped || 0}</span>
                    </div>
                  </div>
                  
                  {userUploadStatus.errors.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-semibold text-red-600 mb-2">
                        {t.admin.userImport.results.errors} ({userUploadStatus.errors.length})
                      </h4>
                      <div className="max-h-32 overflow-y-auto bg-red-50 p-2 rounded text-xs text-red-700">
                        {userUploadStatus.errors.map((error, idx) => (
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
    </div>
  );
}