import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, RefreshCw, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import useCandidateStore from '../store/candidateStore.js';
import useCandidates from '../hooks/useCandidates.js';
import CandidateTable from '../components/candidates/CandidateTable.jsx';
import CandidateCard from '../components/candidates/CandidateCard.jsx';
import CandidateDetailModal from '../components/candidates/CandidateDetailModal.jsx';
import SearchBar from '../components/ui/SearchBar.jsx';
import FilterDropdown from '../components/ui/FilterDropdown.jsx';
import Pagination from '../components/ui/Pagination.jsx';
import EmptyState from '../components/ui/EmptyState.jsx';
import { SkeletonCard } from '../components/ui/SkeletonRow.jsx';

function Candidates() {
  const { isLoading, error, retryFetch, filtered, paginated, totalPages, currentPage, setCurrentPage, totalCandidates } = useCandidates();
  const clearFilters = useCandidateStore((s) => s.clearFilters);
  const searchQuery = useCandidateStore((s) => s.searchQuery);
  const statusFilter = useCandidateStore((s) => s.statusFilter);
  const skillsFilter = useCandidateStore((s) => s.skillsFilter);

  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const hasFilters = searchQuery || statusFilter !== 'All' || skillsFilter.length > 0;

  const handlePageChange = (p) => {
    setCurrentPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-5 max-w-7xl">
      {/* Top section basic info */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between gap-4 flex-wrap"
      >
        <div>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Candidates</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            {isLoading ? 'Loading…' : `Showing ${filtered.length} of ${totalCandidates} candidates`}
          </p>
        </div>
        <Link to="/add-candidate">
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            id="add-candidate-btn"
            className="btn-primary"
          >
            <Plus className="w-4 h-4" />
            Add Candidate
          </motion.button>
        </Link>
      </motion.div>

      {/* Search bar and filters */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.05 }}
        className="flex flex-col sm:flex-row gap-3 items-start sm:items-center"
      >
        <SearchBar />
        <div className="flex items-center gap-2">
          <FilterDropdown />
          {hasFilters && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileTap={{ scale: 0.95 }}
              onClick={clearFilters}
              id="clear-filters-btn"
              className="btn-secondary text-sm text-slate-500 gap-1.5"
            >
              <X className="w-3.5 h-3.5" /> Clear
            </motion.button>
          )}
        </div>
      </motion.div>

      {/* Show error message if fetch fails */}
      {error && (
        <div className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
          <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
          <button onClick={retryFetch} className="btn-secondary text-sm gap-1.5" id="retry-fetch-btn">
            <RefreshCw className="w-3.5 h-3.5" /> Retry
          </button>
        </div>
      )}

      {/* Main data view */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {/* Show data grid on large screens */}
        <div className="hidden md:block card overflow-hidden">
          {paginated.length === 0 && !isLoading ? (
            <EmptyState
              action={
                hasFilters && (
                  <button onClick={clearFilters} className="btn-secondary text-sm gap-1.5">
                    <X className="w-3.5 h-3.5" /> Clear filters
                  </button>
                )
              }
            />
          ) : (
            <CandidateTable
              candidates={paginated}
              onSelect={setSelectedCandidate}
              isLoading={isLoading}
            />
          )}
        </div>

        {/* Show card list on small screens */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:hidden">
            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : paginated.length === 0 ? (
          <div className="md:hidden">
            <EmptyState />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:hidden">
            {paginated.map((c, i) => (
              <CandidateCard key={c.id} candidate={c} onClick={setSelectedCandidate} index={i} />
            ))}
          </div>
        )}
      </motion.div>

      {!isLoading && (
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      )}

      {/* Slide-out detail view */}
      {selectedCandidate && (
        <CandidateDetailModal candidate={selectedCandidate} onClose={() => setSelectedCandidate(null)} />
      )}
    </div>
  );
}

export default Candidates;
