import React from 'react';
import { useTranslation } from 'react-i18next';

interface PaginationComponentProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange?: (itemsPerPage: number) => void;
  itemsPerPageOptions?: number[];
  className?: string;
}

const PaginationComponent: React.FC<PaginationComponentProps> = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  itemsPerPageOptions = [5, 10, 20, 50],
  className = ''
}) => {
  const { t } = useTranslation();

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    onPageChange(page);
  };

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newItemsPerPage = parseInt(e.target.value);
    if (onItemsPerPageChange) {
      onItemsPerPageChange(newItemsPerPage);
    }
  };

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  
  return (
    <div className={`p-4 border-t border-slate-100 flex items-center justify-between bg-white ${className}`}>
      {/* Items info */}
      <div className="text-xs text-slate-500 font-medium">
        {totalItems > 0 ? (
          t('pagination.showingItems', {
            start: startItem,
            end: endItem,
            total: totalItems
          })
        ) : (
          t('pagination.noItems')
        )}
      </div>

      {/* Pagination controls */}
      <div className="flex items-center gap-4">
        {/* Items per page selector */}
        {onItemsPerPageChange && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">
              {t('pagination.itemsPerPage')}:
            </span>
            <select
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="text-xs border border-slate-200 rounded px-2 py-1 bg-white"
            >
              {itemsPerPageOptions.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Page navigation */}
        <div className="flex items-center gap-1">
          {/* Previous button */}
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1 || totalPages === 0}
            className="w-8 h-8 flex items-center justify-center text-xs border border-slate-200 rounded hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label={t('pagination.previous')}
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>

          {/* Page numbers */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => handlePageClick(page)}
              className={`w-8 h-8 flex items-center justify-center text-xs rounded transition-colors ${
                page === currentPage
                  ? 'text-primary font-bold'
                  : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              {page}
            </button>
          ))}

          {/* Next button */}
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages || totalPages === 0}
            className="w-8 h-8 flex items-center justify-center text-xs border border-slate-200 rounded hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label={t('pagination.next')}
          >
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaginationComponent;
