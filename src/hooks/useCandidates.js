import { useEffect, useRef } from 'react';
import useCandidateStore from '../store/candidateStore.js';

/** Auto-fetches candidates on mount; returns paginated/filtered data. */
function useCandidates() {
  const fetchCandidates = useCandidateStore((s) => s.fetchCandidates);
  const retryFetch = useCandidateStore((s) => s.retryFetch);
  const isLoading = useCandidateStore((s) => s.isLoading);
  const error = useCandidateStore((s) => s.error);
  const getFiltered = useCandidateStore((s) => s.getFiltered);
  const currentPage = useCandidateStore((s) => s.currentPage);
  const itemsPerPage = useCandidateStore((s) => s.itemsPerPage);
  const setCurrentPage = useCandidateStore((s) => s.setCurrentPage);
  const totalCandidates = useCandidateStore((s) => s.candidates.length);

  useEffect(() => {
    fetchCandidates();
  }, [fetchCandidates]);

  const filtered = getFiltered();
  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return {
    isLoading,
    error,
    retryFetch,
    filtered,
    paginated,
    totalPages,
    currentPage,
    setCurrentPage,
    totalCandidates,
  };
}

/** Debounced search hook */
export function useDebouncedSearch(value, delay = 300) {
  const setSearchQuery = useCandidateStore((s) => s.setSearchQuery);
  const timer = useRef(null);

  useEffect(() => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setSearchQuery(value), delay);
    return () => clearTimeout(timer.current);
  }, [value, delay, setSearchQuery]);
}

export default useCandidates;
