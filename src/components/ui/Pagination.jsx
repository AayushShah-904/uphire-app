import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const getPages = () => {
    const max = 5;
    let start = Math.max(1, currentPage - Math.floor(max / 2));
    let end = Math.min(totalPages, start + max - 1);
    if (end - start < max - 1) start = Math.max(1, end - max + 1);
    const pages = [];
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  const pages = getPages();

  const baseBtn = 'h-8 min-w-[32px] px-1 rounded-md text-sm transition-colors duration-100 flex items-center justify-center';
  const pageBtn = (active) =>
    active
      ? `${baseBtn} bg-brand-600 text-white font-medium`
      : `${baseBtn} text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700`;
  const navBtn = (disabled) =>
    `${baseBtn} text-slate-500 dark:text-slate-400 ${
      disabled ? 'opacity-40 cursor-not-allowed' : 'hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer'
    }`;

  return (
    <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700 mt-4">
      <span className="text-sm text-slate-500 dark:text-slate-400">
        Page <span className="font-medium text-slate-700 dark:text-slate-200">{currentPage}</span> of{' '}
        <span className="font-medium text-slate-700 dark:text-slate-200">{totalPages}</span>
      </span>

      <div className="flex items-center gap-1">
        <motion.button
          whileTap={currentPage > 1 ? { scale: 0.95 } : undefined}
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          id="pagination-prev"
          aria-label="Previous page"
          className={navBtn(currentPage === 1)}
        >
          <ChevronLeft className="w-4 h-4" />
        </motion.button>

        {pages[0] > 1 && (
          <>
            <button className={pageBtn(false)} onClick={() => onPageChange(1)}>1</button>
            {pages[0] > 2 && <span className="px-1 text-slate-400 text-sm">…</span>}
          </>
        )}

        {pages.map((p) => (
          <motion.button
            key={p}
            whileTap={{ scale: 0.95 }}
            onClick={() => onPageChange(p)}
            id={`page-btn-${p}`}
            className={pageBtn(p === currentPage)}
          >
            {p}
          </motion.button>
        ))}

        {pages[pages.length - 1] < totalPages && (
          <>
            {pages[pages.length - 1] < totalPages - 1 && (
              <span className="px-1 text-slate-400 text-sm">…</span>
            )}
            <button className={pageBtn(false)} onClick={() => onPageChange(totalPages)}>
              {totalPages}
            </button>
          </>
        )}

        <motion.button
          whileTap={currentPage < totalPages ? { scale: 0.95 } : undefined}
          onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          id="pagination-next"
          aria-label="Next page"
          className={navBtn(currentPage === totalPages)}
        >
          <ChevronRight className="w-4 h-4" />
        </motion.button>
      </div>
    </div>
  );
}

export default Pagination;
