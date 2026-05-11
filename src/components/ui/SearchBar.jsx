import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useDebouncedSearch } from '../../hooks/useCandidates.js';
import useCandidateStore from '../../store/candidateStore.js';

function SearchBar({ placeholder = 'Search candidates…' }) {
  const storeQuery = useCandidateStore((s) => s.searchQuery);
  const [local, setLocal] = useState(storeQuery);

  useDebouncedSearch(local);

  useEffect(() => {
    if (storeQuery === '') setLocal('');
  }, [storeQuery]);

  return (
    <div className="relative flex-1 min-w-0 max-w-sm">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
      <input
        id="search-candidates"
        type="text"
        value={local}
        onChange={(e) => setLocal(e.target.value)}
        placeholder={placeholder}
        className="input pl-9 pr-9"
        aria-label="Search candidates"
      />
      {local && (
        <button
          onClick={() => setLocal('')}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          aria-label="Clear search"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

export default SearchBar;
