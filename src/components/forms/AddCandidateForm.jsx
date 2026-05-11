import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { X, Plus, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { candidateSchema } from '../../utils/validators.js';
import useCandidateStore from '../../store/candidateStore.js';
import { STATUSES, ALL_SKILLS, COLLEGES } from '../../utils/helpers.js';

function AddCandidateForm() {
  const addCandidate = useCandidateStore((s) => s.addCandidate);
  const navigate = useNavigate();
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(candidateSchema),
    defaultValues: { skills: [] },
  });

  const addSkill = (skill) => {
    const t = skill.trim();
    if (!t || skills.includes(t) || skills.length >= 10) return;
    const next = [...skills, t];
    setSkills(next);
    setValue('skills', next, { shouldValidate: true });
    setSkillInput('');
  };

  const removeSkill = (skill) => {
    const next = skills.filter((s) => s !== skill);
    setSkills(next);
    setValue('skills', next, { shouldValidate: true });
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 500));
    try {
      addCandidate({ ...data, skills });
      toast.success('Candidate added successfully!');
      reset();
      setSkills([]);
      navigate('/candidates');
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldClass = (error) => `input${error ? ' input-error' : ''}`;

  return (
    <div className="card p-8">
      {/* Form title and close button */}
      <div className="mb-6 pb-6 border-b border-slate-200 dark:border-slate-700">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Add New Candidate</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Fill in the applicant's details below
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        {/* Basic contact details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="label" htmlFor="cf-name">Full Name</label>
            <input id="cf-name" {...register('name')} className={fieldClass(errors.name)} placeholder="Jane Doe" />
            {errors.name && <p className="error-text">{errors.name.message}</p>}
          </div>
          <div>
            <label className="label" htmlFor="cf-email">Email Address</label>
            <input id="cf-email" type="email" {...register('email')} className={fieldClass(errors.email)} placeholder="jane@example.com" />
            {errors.email && <p className="error-text">{errors.email.message}</p>}
          </div>
        </div>

        {/* Phone number and education */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="label" htmlFor="cf-phone">Phone Number</label>
            <input id="cf-phone" {...register('phone')} className={fieldClass(errors.phone)} placeholder="+91 99999 99999" />
            {errors.phone && <p className="error-text">{errors.phone.message}</p>}
          </div>
          <div>
            <label className="label" htmlFor="cf-college">College / Institution</label>
            <input id="cf-college" list="colleges-list" {...register('college')} className={fieldClass(errors.college)} placeholder="IIT Bombay" />
            <datalist id="colleges-list">
              {COLLEGES.map((c) => <option key={c} value={c} />)}
            </datalist>
            {errors.college && <p className="error-text">{errors.college.message}</p>}
          </div>
        </div>

        {/* Work history and location */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="label" htmlFor="cf-experience">Experience Level</label>
            <select id="cf-experience" {...register('experience')} className={fieldClass(errors.experience)}>
              <option value="">Select level…</option>
              {['Fresher', '1 year', '2 years'].map((e) => <option key={e} value={e}>{e}</option>)}
            </select>
            {errors.experience && <p className="error-text">{errors.experience.message}</p>}
          </div>
          <div>
            <label className="label" htmlFor="cf-location">Location</label>
            <input id="cf-location" {...register('location')} className={fieldClass(errors.location)} placeholder="Mumbai, Maharashtra" />
            {errors.location && <p className="error-text">{errors.location.message}</p>}
          </div>
        </div>

        {/* Current application status */}
        <div className="max-w-xs">
          <label className="label" htmlFor="cf-status">Application Status</label>
          <select id="cf-status" {...register('status')} className={fieldClass(errors.status)}>
            <option value="">Select status…</option>
            {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          {errors.status && <p className="error-text">{errors.status.message}</p>}
        </div>

        {/* List of technical skills */}
        <div>
          <label className="label" htmlFor="cf-skills-input">Skills</label>

          {/* Quick add skill buttons */}
          <div className="flex flex-wrap gap-1.5 mb-2">
            {ALL_SKILLS.filter((s) => !skills.includes(s)).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => addSkill(s)}
                className="text-xs px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-brand-50 dark:hover:bg-brand-900/30 hover:text-brand-700 dark:hover:text-brand-400 transition-colors duration-100"
              >
                + {s}
              </button>
            ))}
          </div>

          <div className="relative">
            <input
              id="cf-skills-input"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addSkill(skillInput); } }}
              placeholder="Type and press Enter to add a skill…"
              className={`input pr-12 ${errors.skills ? 'input-error' : ''}`}
            />
            <button
              type="button"
              onClick={() => addSkill(skillInput)}
              className="absolute right-2 top-1/2 -translate-y-1/2 btn-ghost p-1"
              aria-label="Add skill"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {skills.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {skills.map((skill) => (
                <motion.span
                  key={skill}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="inline-flex items-center gap-1.5 bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-400 px-2.5 py-1 rounded-md text-sm font-medium"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="hover:opacity-70 transition-opacity"
                    aria-label={`Remove ${skill}`}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </motion.span>
              ))}
            </div>
          )}
          {errors.skills && <p className="error-text">{errors.skills.message}</p>}
        </div>

        {/* Submit and cancel buttons */}
        <div className="flex items-center gap-3 pt-2 border-t border-slate-200 dark:border-slate-700 mt-2">
          <Link to="/candidates" className="btn-secondary">
            Cancel
          </Link>
          <motion.button
            type="submit"
            id="add-candidate-submit"
            disabled={isSubmitting}
            whileHover={!isSubmitting ? { scale: 1.01 } : undefined}
            whileTap={!isSubmitting ? { scale: 0.98 } : undefined}
            className="btn-primary flex-1 justify-center"
          >
            {isSubmitting ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Adding…</>
            ) : (
              'Add Candidate →'
            )}
          </motion.button>
        </div>
      </form>
    </div>
  );
}

export default AddCandidateForm;
