import React from 'react';
import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';
import StatusBadge from './StatusBadge.jsx';
import SkeletonRow from '../ui/SkeletonRow.jsx';
import { formatDate, getInitials, getAvatarColor } from '../../utils/helpers.js';

const containerVariants = {
  animate: { transition: { staggerChildren: 0.04 } },
};

const rowVariants = {
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.2 } },
};

function CandidateTable({ candidates, onSelect, isLoading }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="th w-12">#</th>
            <th className="th">Name</th>
            <th className="th">College</th>
            <th className="th">Skills</th>
            <th className="th">Status</th>
            <th className="th">Applied</th>
            <th className="th w-16">Actions</th>
          </tr>
        </thead>

        {isLoading ? (
          <tbody>
            {Array.from({ length: 8 }).map((_, i) => <SkeletonRow key={i} />)}
          </tbody>
        ) : (
          <motion.tbody variants={containerVariants} initial="initial" animate="animate">
            {candidates.map((c, idx) => (
              <motion.tr
                key={c.id}
                variants={rowVariants}
                onClick={() => onSelect(c)}
                className="tr cursor-pointer"
              >
                <td className="td text-slate-400 tabular-nums">
                  {String(idx + 1).padStart(2, '0')}
                </td>

                <td className="td">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0 ${getAvatarColor(c.name)}`}
                    >
                      {getInitials(c.name)}
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-slate-900 dark:text-white text-sm truncate">{c.name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{c.email}</p>
                    </div>
                  </div>
                </td>

                <td className="td">
                  <span className="text-sm text-slate-600 dark:text-slate-300 truncate block max-w-[160px]">{c.college}</span>
                </td>

                <td className="td">
                  <div className="flex flex-wrap gap-1">
                    {c.skills.slice(0, 2).map((s) => (
                      <span
                        key={s}
                        className="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded text-xs"
                      >
                        {s}
                      </span>
                    ))}
                    {c.skills.length > 2 && (
                      <span className="text-xs text-slate-400">+{c.skills.length - 2}</span>
                    )}
                  </div>
                </td>

                <td className="td">
                  <StatusBadge status={c.status} />
                </td>

                <td className="td text-slate-500 dark:text-slate-400 whitespace-nowrap">
                  {formatDate(c.appliedDate)}
                </td>

                <td className="td">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => { e.stopPropagation(); onSelect(c); }}
                    className="btn-ghost p-1.5"
                    aria-label="View candidate"
                  >
                    <Eye className="w-4 h-4" />
                  </motion.button>
                </td>
              </motion.tr>
            ))}
          </motion.tbody>
        )}
      </table>
    </div>
  );
}

export default CandidateTable;
