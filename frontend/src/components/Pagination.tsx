// Props interface for the Pagination component
interface PaginationProps {
  currentPage: number; // current active page
  totalPages: number; // total number of pages
  pageSize: number; // number of results per page
  onPageChange: (newPage: number) => void; // callback when user changes page
  onPageSizeChange: (newSize: number) => void; // callback when user changes page size
}

const Pagination = ({
  currentPage,
  totalPages,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: PaginationProps) => {
  // Generate page numbers to display in the pagination bar
  const generatePageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];

    // If total pages are 7 or less, show all pages directly
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    // Always show first page
    pages.push(1);

    // Show leading ellipsis if current page is far from start
    if (currentPage > 3) {
      pages.push('...');
    }

    // Show current, previous, and next pages within bounds
    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // Show trailing ellipsis if current page is far from end
    if (currentPage < totalPages - 2) {
      pages.push('...');
    }

    // Always show last page
    pages.push(totalPages);

    return pages;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between mt-6 space-y-3 sm:space-y-0 sm:space-x-4">
      {/* Page navigation buttons */}
      <div className="flex items-center space-x-1">
        {/* Previous button */}
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="px-3 py-1 text-sm border rounded-md hover:bg-gray-100 disabled:opacity-50"
        >
          Previous
        </button>

        {/* Dynamic list of page numbers */}
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

        {/* Next button */}
        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="px-3 py-1 text-sm border rounded-md hover:bg-gray-100 disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Dropdown to choose number of results per page */}
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
