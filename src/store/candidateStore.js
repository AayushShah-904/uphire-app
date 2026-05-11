import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { fetchUsers, transformUser } from '../api/dummyApi.js';

const useCandidateStore = create(
  persist(
    (set, get) => ({
      candidates: [],
      isLoading: false,
      error: null,
      searchQuery: '',
      statusFilter: 'All',
      skillsFilter: [],
      currentPage: 1,
      itemsPerPage: 8,

      fetchCandidates: async () => {
        if (get().candidates.length > 0) return;
        set({ isLoading: true, error: null });
        try {
          const users = await fetchUsers();
          set({ candidates: users.map(transformUser), isLoading: false });
        } catch (e) {
          set({ error: e.message || 'Failed to fetch candidates', isLoading: false });
        }
      },

      retryFetch: async () => {
        set({ candidates: [], error: null });
        await get().fetchCandidates();
      },

      addCandidate: (data) =>
        set((state) => ({
          candidates: [
            {
              ...data,
              id: Date.now(),
              appliedDate: new Date().toISOString().split('T')[0],
            },
            ...state.candidates,
          ],
        })),

      updateStatus: (id, status) =>
        set((state) => ({
          candidates: state.candidates.map((c) =>
            c.id === id ? { ...c, status } : c
          ),
        })),

      setSearchQuery: (q) => set({ searchQuery: q, currentPage: 1 }),
      setStatusFilter: (s) => set({ statusFilter: s, currentPage: 1 }),
      setSkillsFilter: (s) => set({ skillsFilter: s, currentPage: 1 }),
      setCurrentPage: (p) => set({ currentPage: p }),
      clearFilters: () =>
        set({ searchQuery: '', statusFilter: 'All', skillsFilter: [], currentPage: 1 }),

      getFiltered: () => {
        const { candidates, searchQuery, statusFilter, skillsFilter } = get();
        return candidates
          .filter(
            (c) =>
              !searchQuery ||
              c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              c.email.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .filter((c) => statusFilter === 'All' || c.status === statusFilter)
          .filter(
            (c) =>
              skillsFilter.length === 0 ||
              skillsFilter.every((s) => c.skills.includes(s))
          );
      },

      getStats: () => {
        const { candidates } = get();
        return {
          total: candidates.length,
          selected: candidates.filter((c) => c.status === 'Selected').length,
          pending: candidates.filter((c) => c.status === 'Pending').length,
          rejected: candidates.filter((c) => c.status === 'Rejected').length,
          inReview: candidates.filter((c) => c.status === 'In Review').length,
        };
      },

      getRecent: () =>
        [...get().candidates]
          .sort((a, b) => new Date(b.appliedDate) - new Date(a.appliedDate))
          .slice(0, 5),
    }),
    {
      name: 'upteky-candidates',
      partialize: (s) => ({ candidates: s.candidates }),
    }
  )
);

export default useCandidateStore;
