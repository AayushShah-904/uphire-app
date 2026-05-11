import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import AddCandidateForm from '../components/forms/AddCandidateForm.jsx';

function AddCandidate() {
  return (
    <div className="max-w-2xl space-y-5">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <Link
          to="/candidates"
          className="inline-flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors mb-2"
        >
          <ChevronLeft className="w-4 h-4" /> Back to Candidates
        </Link>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
        <AddCandidateForm />
      </motion.div>
    </div>
  );
}

export default AddCandidate;
