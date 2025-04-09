// File: components/PaginationStyled.tsx
import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  themeColors: {
    border: string;
    active: string;
    hover: string;
    text: string;
  };
}

const PaginationStyled: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  pageSize,
  onPageChange,
  onPageSizeChange,
  themeColors,
}) => {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);

      if (currentPage > 3) pages.push('...');

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);

      if (currentPage < totalPages - 2) pages.push('...');

      pages.push(totalPages);
    }

    return pages;
  };

  const handleMouseEnter = (e: React.MouseEvent, page: number | string) => {
    if (page !== currentPage && typeof page === 'number') {
      (e.target as HTMLButtonElement).style.backgroundColor = themeColors.hover;
    }
  };

  const handleMouseLeave = (e: React.MouseEvent, page: number | string) => {
    if (page !== currentPage && typeof page === 'number') {
      (e.target as HTMLButtonElement).style.backgroundColor = 'transparent';
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        gap: '8px',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      {getPageNumbers().map((page, index) =>
        typeof page === 'number' ? (
          <button
            key={index}
            onClick={() => onPageChange(page)}
            style={{
              border: `2px solid ${themeColors.border}`,
              backgroundColor:
                page === currentPage ? themeColors.active : 'transparent',
              color: page === currentPage ? 'white' : themeColors.text,
              padding: '6px 12px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold',
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={(e) => handleMouseEnter(e, page)}
            onMouseLeave={(e) => handleMouseLeave(e, page)}
          >
            {page}
          </button>
        ) : (
          <span
            key={index}
            style={{
              padding: '6px 10px',
              fontWeight: 'bold',
              color: themeColors.text,
              opacity: 0.6,
            }}
          >
            {page}
          </span>
        )
      )}

      <select
        value={pageSize}
        onChange={(e) => onPageSizeChange(Number(e.target.value))}
        style={{
          marginLeft: '16px',
          padding: '6px',
          border: `2px solid ${themeColors.border}`,
          borderRadius: '6px',
          color: themeColors.text,
        }}
      >
        {[5, 10, 20].map((size) => (
          <option key={size} value={size}>
            {size} / page
          </option>
        ))}
      </select>
    </div>
  );
};

export default PaginationStyled;
