'use client';

interface BulkActionsBarProps {
  selectedCount: number;
  onEdit: () => void;
  onDelete: () => void;
  onClear: () => void;
  onPasteCodes: () => void;
}

export default function BulkActionsBar({
  selectedCount,
  onEdit,
  onDelete,
  onClear,
  onPasteCodes
}: BulkActionsBarProps) {
  if (selectedCount === 0) return null;

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-blue-900">
            {selectedCount} book{selectedCount !== 1 ? 's' : ''} selected
          </span>
          
          <button
            onClick={onEdit}
            className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50"
          >
            Edit Selected
          </button>
          
          <button
            onClick={onDelete}
            className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
          >
            Delete Selected
          </button>
          
          <button
            onClick={onPasteCodes}
            className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50"
          >
            Select by Codes
          </button>
        </div>
        
        <button
          onClick={onClear}
          className="text-sm text-gray-600 hover:text-gray-800"
        >
          Clear Selection
        </button>
      </div>
    </div>
  );
}