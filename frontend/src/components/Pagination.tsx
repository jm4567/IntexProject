interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  onPageChange: (newPage: number) => void;
  onPageSizeChange: (newSize: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: PaginationProps) => {
  const generatePageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    pages.push(1); // Always show the first page

    // Show leading ellipsis if necessary
    if (currentPage > 3) {
      pages.push('...');
    }

    // Show current, previous, and next pages (if within bounds)
    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // Show trailing ellipsis if necessary
    if (currentPage < totalPages - 2) {
      pages.push('...');
    }

    pages.push(totalPages); // Always show the last page

    return pages;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between mt-6 space-y-3 sm:space-y-0 sm:space-x-4">
      {/* Page buttons */}
      <div className="flex items-center space-x-1">
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="px-3 py-1 text-sm border rounded-md hover:bg-gray-100 disabled:opacity-50"
        >
          Previous
        </button>

        {generatePageNumbers().map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === 'number' && onPageChange(page)}
            disabled={page === '...'}
            className={`px-3 py-1 text-sm border rounded-md transition
              ${
                page === currentPage
                  ? 'bg-black text-white font-semibold'
                  : 'hover:bg-gray-100'
              }
              ${page === '...' ? 'cursor-default opacity-50 pointer-events-none' : ''}
            `}
          >
            {page}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="px-3 py-1 text-sm border rounded-md hover:bg-gray-100 disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Page size selector */}
      <div className="flex items-center space-x-2">
        <label htmlFor="pageSize" className="text-sm text-gray-600">
          Results per page:
        </label>
        <select
          id="pageSize"
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="px-2 py-1 text-sm border rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-black"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </div>
    </div>
  );
};

export default Pagination;
