import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Calendar, GraduationCap, Briefcase, Phone, X, ChevronDown } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import StatusBadge from './StatusBadge.jsx';
import { formatDate, getInitials, getAvatarColor, STATUSES } from '../../utils/helpers.js';
import useCandidateStore from '../../store/candidateStore.js';

const modalVariants = {
  initial: { x: '100%' },
  animate: { x: 0, transition: { type: 'spring', damping: 30, stiffness: 300 } },
  exit: { x: '100%', transition: { duration: 0.2, ease: 'easeIn' } },
};

function Field({ icon: Icon, label, value }) {
  if (!value) return null;
  return (
    <div>
      <p className="label">{label}</p>
      <div className="flex items-center gap-2 mt-1">
        <Icon className="w-4 h-4 text-slate-400 flex-shrink-0" />
        <span className="text-sm text-slate-700 dark:text-slate-200">{value}</span>
      </div>
    </div>
  );
}

function CandidateDetailModal({ candidate, onClose }) {
  const updateStatus = useCandidateStore((s) => s.updateStatus);
  const [status, setStatus] = React.useState(candidate.status);

  const handleStatusChange = (e) => {
    const s = e.target.value;
    setStatus(s);
    updateStatus(candidate.id, s);
  };

  return (
    <AnimatePresence>
      {candidate && (
        <>
          {/* Darkened background overlay */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm"
          />

          {/* Slide-in side panel */}
          <motion.div
            key="panel"
            variants={modalVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed top-0 right-0 h-full z-50 w-full max-w-md bg-white dark:bg-slate-800 shadow-xl flex flex-col"
          >
            {/* Top section basic info */}
            <div className="flex items-start justify-between p-6 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold ${getAvatarColor(candidate.name)}`}>
                  {getInitials(candidate.name)}
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{candidate.name}</h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{candidate.college}</p>
                </div>
              </div>
              <button onClick={onClose} className="btn-ghost mt-1" aria-label="Close">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable detail section */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Current application status */}
              <div>
                <p className="label">Application Status</p>
                <div className="flex items-center gap-3 mt-1">
                  <StatusBadge status={status} />
                  <div className="relative">
                    <select
                      id="modal-status-select"
                      value={status}
                      onChange={handleStatusChange}
                      className="input py-1.5 pr-8 text-xs appearance-none cursor-pointer"
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="h-px bg-slate-200 dark:bg-slate-700" />

              {/* Email and phone details */}
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white mb-3">Contact Information</p>
                <div className="space-y-3">
                  <Field icon={Mail} label="Email" value={candidate.email} />
                  <Field icon={Phone} label="Phone" value={candidate.phone} />
                  <Field icon={MapPin} label="Location" value={candidate.location} />
                </div>
              </div>

              <div className="h-px bg-slate-200 dark:bg-slate-700" />

              {/* Dates and experience info */}
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white mb-3">Application Details</p>
                <div className="space-y-3">
                  <Field icon={Calendar} label="Applied Date" value={formatDate(candidate.appliedDate)} />
                  <Field icon={Briefcase} label="Experience" value={candidate.experience} />
                  <Field icon={GraduationCap} label="College" value={candidate.college} />
                </div>
              </div>

              <div className="h-px bg-slate-200 dark:bg-slate-700" />

              {/* List of technical skills */}
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white mb-3">Skills</p>
                <div className="flex flex-wrap gap-2">
                  {candidate.skills.map((skill) => (
                    <span
                      key={skill}
                      className="bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-400 px-2.5 py-1 rounded-md text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom action area */}
            <div className="p-4 border-t border-slate-200 dark:border-slate-700 flex gap-3">
              <button onClick={onClose} className="btn-secondary flex-1 justify-center">
                Close
              </button>
              <button
                onClick={onClose}
                className="btn-primary flex-1 justify-center"
              >
                Save Changes
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default CandidateDetailModal;
