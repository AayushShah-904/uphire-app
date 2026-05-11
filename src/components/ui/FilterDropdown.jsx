import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useCandidateStore from '../../store/candidateStore.js';
import { STATUSES, ALL_SKILLS } from '../../utils/helpers.js';

const dropdownVariants = {
  hidden: { opacity: 0, y: -4, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

function FilterDropdown() {
  const statusFilter = useCandidateStore((s) => s.statusFilter);
  const skillsFilter = useCandidateStore((s) => s.skillsFilter);
  const setStatusFilter = useCandidateStore((s) => s.setStatusFilter);
  const setSkillsFilter = useCandidateStore((s) => s.setSkillsFilter);

  const [statusOpen, setStatusOpen] = useState(false);
  const [skillsOpen, setSkillsOpen] = useState(false);
  const statusRef = useRef(null);
  const skillsRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (statusRef.current && !statusRef.current.contains(e.target)) setStatusOpen(false);
      if (skillsRef.current && !skillsRef.current.contains(e.target)) setSkillsOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const toggleSkill = (skill) => {
    setSkillsFilter(
      skillsFilter.includes(skill)
        ? skillsFilter.filter((s) => s !== skill)
        : [...skillsFilter, skill]
    );
  };

  return (
    <div className="flex items-center gap-2">
      {/* Current application status */}
      <div ref={statusRef} className="relative">
        <button
          id="status-filter-btn"
          onClick={() => { setStatusOpen((v) => !v); setSkillsOpen(false); }}
          className={`btn-secondary text-sm gap-1.5 ${statusFilter !== 'All' ? 'ring-2 ring-brand-500 ring-offset-1' : ''}`}
        >
          Status
          {statusFilter !== 'All' && (
            <span className="bg-brand-600 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center leading-none">1</span>
          )}
          <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-150 ${statusOpen ? 'rotate-180' : ''}`} />
        </button>
        <AnimatePresence>
          {statusOpen && (
            <motion.div
              variants={dropdownVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ duration: 0.12 }}
              className="absolute top-full mt-1.5 left-0 z-50 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg p-1.5 min-w-[160px]"
            >
              {['All', ...STATUSES].map((s) => (
                <button
                  key={s}
                  onClick={() => { setStatusFilter(s); setStatusOpen(false); }}
                  className={`w-full text-left flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors duration-100 ${
                    statusFilter === s
                      ? 'bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-400 font-medium'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                  }`}
                >
                  {statusFilter === s ? <Check className="w-3.5 h-3.5" /> : <span className="w-3.5" />}
                  {s}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* List of technical skills */}
      <div ref={skillsRef} className="relative">
        <button
          id="skills-filter-btn"
          onClick={() => { setSkillsOpen((v) => !v); setStatusOpen(false); }}
          className={`btn-secondary text-sm gap-1.5 ${skillsFilter.length > 0 ? 'ring-2 ring-brand-500 ring-offset-1' : ''}`}
        >
          Skills
          {skillsFilter.length > 0 && (
            <span className="bg-brand-600 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center leading-none">{skillsFilter.length}</span>
          )}
          <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-150 ${skillsOpen ? 'rotate-180' : ''}`} />
        </button>
        <AnimatePresence>
          {skillsOpen && (
            <motion.div
              variants={dropdownVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ duration: 0.12 }}
              className="absolute top-full mt-1.5 left-0 z-50 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg p-2 w-64 grid grid-cols-2 gap-1 max-h-64 overflow-y-auto"
            >
              {ALL_SKILLS.map((skill) => (
                <button
                  key={skill}
                  onClick={() => toggleSkill(skill)}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm transition-colors duration-100 ${
                    skillsFilter.includes(skill)
                      ? 'bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-400 font-medium'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
                  }`}
                >
                  {skillsFilter.includes(skill) && <Check className="w-3 h-3 flex-shrink-0" />}
                  <span className="truncate">{skill}</span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default FilterDropdown;
