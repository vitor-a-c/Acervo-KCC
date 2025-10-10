'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { UserDocument } from '@/types/database';

interface UserManagementTableProps {
  token: string | null;
}

interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export default function UserManagementTable({ token }: UserManagementTableProps) {
  const { t } = useLanguage();
  
  const [users, setUsers] = useState<UserDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [pagination, setPagination] = useState<PaginationInfo>({
    page: 1,
    limit: 50,
    total: 0,
    totalPages: 0
  });
  
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<UserDocument>>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<UserDocument | null>(null);
  
  // Bulk selection
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
  const [showBulkDeleteConfirm, setShowBulkDeleteConfirm] = useState(false);

  const fetchUsers = async (page = 1, search = '') => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/admin/users?page=${page}&search=${search}&limit=50`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.ok) {
        const data = await response.json();
        setUsers(data.users || []);
        setPagination(data.pagination || { page: 1, limit: 50, total: 0, totalPages: 0 });
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUsers(pagination.page, searchTerm);
    }
  }, [token]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchUsers(1, searchTerm);
  };

  const toggleSelection = (userId: string) => {
    const newSelection = new Set(selectedUsers);
    if (newSelection.has(userId)) {
      newSelection.delete(userId);
    } else {
      newSelection.add(userId);
    }
    setSelectedUsers(newSelection);
  };

  const toggleSelectAll = () => {
    if (selectedUsers.size === users.length) {
      setSelectedUsers(new Set());
    } else {
      setSelectedUsers(new Set(users.map(u => u._id!.toString())));
    }
  };

  const handleStartEdit = (user: UserDocument) => {
    setEditingUserId(user._id?.toString() || '');
    setEditForm({
      name: user.name,
      email: user.email,
      phone: user.phone,
      government_id: user.government_id,
      government_id_secondary: user.government_id_secondary,
      address: user.address
    });
  };

  const handleCancelEdit = () => {
    setEditingUserId(null);
    setEditForm({});
  };

  const handleSaveEdit = async (userId: string) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(editForm)
      });

      if (response.ok) {
        setSuccessMessage(t.admin.userManagement.messages.userUpdated);
        setEditingUserId(null);
        setEditForm({});
        fetchUsers(pagination.page, searchTerm);
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDelete = async (user: UserDocument) => {
    if (user.active_loans > 0) {
      alert(t.admin.userManagement.messages.cannotDeleteWithLoans);
      return;
    }

    try {
      const response = await fetch(`/api/admin/users/${user._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setSuccessMessage(t.admin.userManagement.messages.userDeleted);
        setDeleteConfirm(null);
        fetchUsers(pagination.page, searchTerm);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleBulkDelete = async () => {
    try {
      const usersToDelete = users.filter(u => 
        selectedUsers.has(u._id!.toString()) && u.active_loans === 0
      );

      if (usersToDelete.length === 0) {
        alert(t.admin.userManagement.messages.cannotDeleteWithLoans);
        return;
      }

      await Promise.all(
        usersToDelete.map(user =>
          fetch(`/api/admin/users/${user._id}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
        )
      );

      setSuccessMessage(
        t.admin.userManagement.messages.usersDeleted.replace('{count}', usersToDelete.length.toString())
      );
      setShowBulkDeleteConfirm(false);
      setSelectedUsers(new Set());
      fetchUsers(pagination.page, searchTerm);
    } catch (error) {
      console.error('Error deleting users:', error);
    }
  };

  if (loading && users.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin h-8 w-8 border-2 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
        <p className="mt-2 text-gray-600">{t.admin.userManagement.loading}</p>
      </div>
    );
  }

  const start = (pagination.page - 1) * pagination.limit + 1;
  const end = Math.min(pagination.page * pagination.limit, pagination.total);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {successMessage && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg flex items-center">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          {successMessage}
        </div>
      )}

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.admin.userManagement.title}</h2>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t.admin.userManagement.searchPlaceholder}
            className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {t.admin.userManagement.searchButton}
          </button>
          <button
            type="button"
            onClick={() => {
              setSearchTerm('');
              fetchUsers(1, '');
            }}
            className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-50"
          >
            {t.admin.userManagement.clearButton}
          </button>
        </form>
      </div>

      {/* Bulk Actions */}
      {selectedUsers.size > 0 && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded flex items-center justify-between">
          <span className="text-sm font-medium text-blue-900">
            {t.admin.userManagement.bulkActions.selected.replace('{count}', selectedUsers.size.toString())}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setShowBulkDeleteConfirm(true)}
              className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
            >
              {t.admin.userManagement.bulkActions.deleteSelected}
            </button>
            <button
              onClick={() => setSelectedUsers(new Set())}
              className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
            >
              {t.admin.userManagement.bulkActions.clearSelection}
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left">
                <input
                  type="checkbox"
                  checked={users.length > 0 && selectedUsers.size === users.length}
                  onChange={toggleSelectAll}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                {t.admin.userManagement.columns.name}
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                {t.admin.userManagement.columns.loans}
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                {t.admin.userManagement.columns.actions}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => {
              const isEditing = editingUserId === user._id?.toString();

              return (
                <tr key={user._id?.toString()} className={`hover:bg-gray-50 ${selectedUsers.has(user._id!.toString()) ? 'bg-blue-50' : ''}`}>
                  {/* Checkbox */}
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedUsers.has(user._id!.toString())}
                      onChange={() => toggleSelection(user._id!.toString())}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </td>

                  {/* Name / Edit Form */}
                  <td className="px-4 py-3 text-sm">
                    {isEditing ? (
                      <div className="space-y-2">
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            {t.admin.userManagement.fields.name} *
                          </label>
                          <input
                            type="text"
                            value={editForm.name || ''}
                            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                            className="w-full px-2 py-1 border rounded text-sm"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            {t.admin.userManagement.fields.email}
                          </label>
                          <input
                            type="email"
                            value={editForm.email || ''}
                            onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                            className="w-full px-2 py-1 border rounded text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            {t.admin.userManagement.fields.phone}
                          </label>
                          <input
                            type="tel"
                            value={editForm.phone || ''}
                            onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                            className="w-full px-2 py-1 border rounded text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            {t.admin.userManagement.fields.governmentId}
                          </label>
                          <input
                            type="text"
                            value={editForm.government_id || ''}
                            onChange={(e) => setEditForm({ ...editForm, government_id: e.target.value })}
                            className="w-full px-2 py-1 border rounded text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            {t.admin.userManagement.fields.address}
                          </label>
                          <input
                            type="text"
                            value={editForm.address || ''}
                            onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                            className="w-full px-2 py-1 border rounded text-xs"
                          />
                        </div>
                      </div>
                    ) : (
                      <p className="font-medium text-gray-900">{user.name}</p>
                    )}
                  </td>

                  {/* Loans */}
                  <td className="px-4 py-3 text-sm">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        user.has_overdue
                          ? 'bg-red-100 text-red-700'
                          : user.active_loans > 0
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-green-100 text-green-700'
                      }`}>
                        {user.active_loans} {t.admin.userManagement.loanStats.active}
                      </span>
                      {user.has_overdue && (
                        <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {t.admin.userManagement.loanStats.total} {user.total_loans || 0} {t.admin.userManagement.loanStats.loans}
                    </p>
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3 text-sm">
                    {isEditing ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleSaveEdit(user._id!.toString())}
                          className="text-green-600 hover:text-green-800 text-xs"
                        >
                          {t.admin.userManagement.actions.save}
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="text-gray-600 hover:text-gray-800 text-xs"
                        >
                          {t.admin.userManagement.actions.cancel}
                        </button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleStartEdit(user)}
                          className="text-blue-600 hover:text-blue-800 text-xs"
                        >
                          {t.admin.userManagement.actions.edit}
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(user)}
                          className="text-red-600 hover:text-red-800 text-xs"
                          disabled={user.active_loans > 0}
                        >
                          {t.admin.userManagement.actions.delete}
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {users.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            {t.admin.userManagement.noUsers}
          </div>
        )}
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="mt-4 flex justify-between items-center">
          <div className="text-sm text-gray-600">
            {t.admin.userManagement.showingUsers
              .replace('{start}', start.toString())
              .replace('{end}', end.toString())
              .replace('{total}', pagination.total.toString())}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => fetchUsers(pagination.page - 1, searchTerm)}
              disabled={pagination.page === 1}
              className="px-4 py-2 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              {t.pagination.previous}
            </button>
            <span className="px-4 py-2">
              {t.pagination.page} {pagination.page} {t.pagination.of} {pagination.totalPages}
            </span>
            <button
              onClick={() => fetchUsers(pagination.page + 1, searchTerm)}
              disabled={pagination.page === pagination.totalPages}
              className="px-4 py-2 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              {t.pagination.next}
            </button>
          </div>
        </div>
      )}

      {/* Single Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {t.admin.userManagement.deleteConfirm.title}
            </h3>
            <p className="text-gray-600 mb-6">
              {t.admin.userManagement.deleteConfirm.message.replace('{name}', deleteConfirm.name)}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
              >
                {t.admin.userManagement.actions.cancel}
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                {t.admin.userManagement.deleteConfirm.deleteButton}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Delete Confirmation Modal */}
      {showBulkDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {t.admin.userManagement.deleteConfirm.bulkTitle}
            </h3>
            <p className="text-gray-600 mb-2">
              {t.admin.userManagement.deleteConfirm.bulkMessage.replace('{count}', selectedUsers.size.toString())}
            </p>
            <p className="text-sm text-yellow-700 mb-6">
              {t.admin.userManagement.deleteConfirm.bulkNote}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowBulkDeleteConfirm(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
              >
                {t.admin.userManagement.actions.cancel}
              </button>
              <button
                onClick={handleBulkDelete}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                {t.admin.userManagement.deleteConfirm.bulkDeleteButton.replace('{count}', selectedUsers.size.toString())}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}