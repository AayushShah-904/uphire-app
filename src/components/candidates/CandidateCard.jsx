import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Calendar, Eye } from 'lucide-react';
import StatusBadge from './StatusBadge.jsx';
import { formatDate, getInitials, getAvatarColor } from '../../utils/helpers.js';

const itemVariants = {
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.2 } },
};

function CandidateCard({ candidate, onClick, index = 0 }) {
  return (
    <motion.div
      variants={itemVariants}
      initial="initial"
      animate="animate"
      transition={{ delay: index * 0.04 }}
      onClick={() => onClick(candidate)}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className="card p-5 cursor-pointer hover:shadow-md transition-shadow duration-150"
    >
      {/* Top section basic info */}
      <div className="flex items-start gap-3 mb-3">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0 ${getAvatarColor(candidate.name)}`}
        >
          {getInitials(candidate.name)}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white truncate">{candidate.name}</h3>
          <div className="flex items-center gap-1 mt-0.5">
            <Mail className="w-3 h-3 text-slate-400 flex-shrink-0" />
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{candidate.email}</p>
          </div>
        </div>
      </div>

      {/* Display university name */}
      <p className="text-xs text-slate-500 dark:text-slate-400 truncate mb-3">{candidate.college}</p>

      {/* List of technical skills */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {candidate.skills.slice(0, 3).map((skill) => (
          <span
            key={skill}
            className="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded text-xs"
          >
            {skill}
          </span>
        ))}
        {candidate.skills.length > 3 && (
          <span className="text-xs text-slate-400">+{candidate.skills.length - 3}</span>
        )}
      </div>

      {/* Bottom action area */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-700">
        <div className="flex items-center gap-1 text-xs text-slate-400">
          <Calendar className="w-3 h-3" />
          <span>{formatDate(candidate.appliedDate)}</span>
        </div>
        <StatusBadge status={candidate.status} />
      </div>

      <button className="mt-3 w-full btn-secondary py-1.5 text-xs justify-center gap-1.5">
        <Eye className="w-3.5 h-3.5" /> View Details
      </button>
    </motion.div>
  );
}

export default CandidateCard;
