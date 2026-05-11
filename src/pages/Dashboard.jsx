import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Users, CheckCircle, Clock, XCircle, ArrowRight, Eye } from 'lucide-react';
import useCandidateStore from '../store/candidateStore.js';
import StatCard from '../components/ui/StatCard.jsx';
import StatusBadge from '../components/candidates/StatusBadge.jsx';
import { formatDate, getInitials, getAvatarColor, STATUSES } from '../utils/helpers.js';

function Dashboard() {
  const fetchCandidates = useCandidateStore((s) => s.fetchCandidates);
  const isLoading = useCandidateStore((s) => s.isLoading);
  const getStats = useCandidateStore((s) => s.getStats);
  const getRecent = useCandidateStore((s) => s.getRecent);
  const candidates = useCandidateStore((s) => s.candidates);

  useEffect(() => { fetchCandidates(); }, [fetchCandidates]);

  const stats = getStats();
  const recent = getRecent();

  const statConfigs = [
    {
      label: 'Total Applicants',
      value: stats.total,
      icon: Users,
      trend: 'up',
      trendLabel: '12% from last week',
      delay: 0,
    },
    {
      label: 'Selected',
      value: stats.selected,
      icon: CheckCircle,
      iconBg: 'bg-green-50 dark:bg-green-900/20',
      iconColor: 'text-green-600 dark:text-green-400',
      trend: 'up',
      trendLabel: `${stats.total ? Math.round((stats.selected / stats.total) * 100) : 0}% acceptance rate`,
      delay: 0.04,
    },
    {
      label: 'Pending Review',
      value: stats.pending,
      icon: Clock,
      iconBg: 'bg-amber-50 dark:bg-amber-900/20',
      iconColor: 'text-amber-600 dark:text-amber-400',
      trend: 'flat',
      trendLabel: 'Awaiting decision',
      delay: 0.08,
    },
    {
      label: 'Rejected',
      value: stats.rejected,
      icon: XCircle,
      iconBg: 'bg-red-50 dark:bg-red-900/20',
      iconColor: 'text-red-500 dark:text-red-400',
      trend: 'down',
      trendLabel: 'This cycle',
      delay: 0.12,
    },
  ];

  // Calculate percentages for the status bar
  const statusBreakdown = STATUSES.map((s) => ({
    label: s,
    count: candidates.filter((c) => c.status === s).length,
    pct: stats.total ? Math.round((candidates.filter((c) => c.status === s).length / stats.total) * 100) : 0,
  }));
  const barColors = {
    'Selected': 'bg-green-500',
    'Pending': 'bg-amber-500',
    'Rejected': 'bg-red-500',
    'In Review': 'bg-blue-500',
  };

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Show page title and welcome text */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Dashboard</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Welcome back, Admin. Here's what's happening.</p>
      </motion.div>

      {/* Display key summary metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {statConfigs.map((c) => (
          <StatCard key={c.label} {...c} />
        ))}
      </div>

      {/* Two-column layout for main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* List recently added candidates */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.25 }}
          className="card lg:col-span-2 overflow-hidden"
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-700">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">Recent Applications</h3>
            <Link
              to="/candidates"
              className="text-sm font-medium text-brand-600 dark:text-brand-400 hover:text-brand-700 flex items-center gap-1 transition-colors"
            >
              View all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {isLoading ? (
            <div className="divide-y divide-slate-100 dark:divide-slate-700">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="px-6 py-3.5 flex items-center gap-3">
                  <div className="skeleton w-8 h-8 rounded-full flex-shrink-0" />
                  <div className="flex-1 space-y-1.5">
                    <div className="skeleton h-3 w-32" />
                    <div className="skeleton h-2.5 w-48" />
                  </div>
                  <div className="skeleton h-5 w-20 rounded-full" />
                </div>
              ))}
            </div>
          ) : recent.length === 0 ? (
            <p className="text-sm text-slate-400 text-center py-10">No candidates yet</p>
          ) : (
            <div className="divide-y divide-slate-100 dark:divide-slate-700">
              {recent.map((c) => (
                <div key={c.id} className="flex items-center gap-4 px-6 py-3.5 hover:bg-slate-50 dark:hover:bg-slate-700/40 transition-colors duration-100">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0 ${getAvatarColor(c.name)}`}>
                    {getInitials(c.name)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{c.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{c.college}</p>
                  </div>
                  <div className="hidden sm:block text-xs text-slate-400 whitespace-nowrap">{formatDate(c.appliedDate)}</div>
                  <StatusBadge status={c.status} />
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Show visual breakdown of statuses */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.25 }}
          className="card p-6"
        >
          <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-5">Status Overview</h3>
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-1.5">
                  <div className="skeleton h-3 w-24" />
                  <div className="skeleton h-2 rounded-full" />
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {statusBreakdown.map(({ label, count, pct }) => (
                <div key={label}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm text-slate-600 dark:text-slate-300">{label}</span>
                    <span className="text-sm font-medium text-slate-900 dark:text-white">{count}</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-1.5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
                      className={`h-1.5 rounded-full ${barColors[label] || 'bg-slate-500'}`}
                    />
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">{pct}%</p>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default Dashboard;
