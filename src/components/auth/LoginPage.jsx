import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Lock, Eye, EyeOff, Loader2, Briefcase } from 'lucide-react';
import { loginSchema } from '../../utils/validators.js';
import useAuth from '../../hooks/useAuth.js';

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    setAuthError('');
    await new Promise((r) => setTimeout(r, 600));
    const result = login(data.email, data.password);
    setIsLoading(false);
    if (result.success) {
      navigate('/dashboard', { replace: true });
    } else {
      setAuthError(result.error);
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-900">
      {/* Left panel — indigo gradient */}
      <div className="hidden lg:flex lg:flex-1 bg-gradient-to-br from-brand-600 to-brand-800 items-center justify-center p-12 relative overflow-hidden">
        {/* Subtle dot grid overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 max-w-sm text-white"
        >
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold">UpHire</span>
          </div>
          <h2 className="text-4xl font-bold leading-tight mb-4">
            Manage your candidates smarter.
          </h2>
          <p className="text-brand-100 text-lg leading-relaxed">
            A streamlined ATS for modern HR teams. Track applicants, collaborate seamlessly, and make faster hiring decisions.
          </p>
          <div className="mt-12 flex items-center gap-4">
            {[{ n: '20+', l: 'Applicants' }, { n: '4', l: 'Statuses' }, { n: '100%', l: 'Free' }].map(({ n, l }) => (
              <div key={l} className="text-center">
                <p className="text-2xl font-bold">{n}</p>
                <p className="text-xs text-brand-200">{l}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Right panel — login form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="w-full max-w-sm"
        >
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-7 h-7 rounded-lg bg-brand-600 flex items-center justify-center">
              <Briefcase className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-slate-900 dark:text-white">UpHire</span>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Welcome back</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
            {/* Email */}
            <div>
              <label className="label" htmlFor="login-email">Email address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  id="login-email"
                  type="email"
                  autoComplete="email"
                  {...register('email')}
                  className={`input pl-10 ${errors.email ? 'input-error' : ''}`}
                  placeholder="admin@upteky.com"
                />
              </div>
              {errors.email && <p className="error-text">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="label" htmlFor="login-password">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  {...register('password')}
                  className={`input pl-10 pr-10 ${errors.password ? 'input-error' : ''}`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="error-text">{errors.password.message}</p>}
            </div>

            {authError && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg px-3 py-2"
              >
                {authError}
              </motion.p>
            )}

            <motion.button
              type="submit"
              id="login-submit-btn"
              disabled={isLoading}
              whileHover={!isLoading ? { scale: 1.01 } : undefined}
              whileTap={!isLoading ? { scale: 0.98 } : undefined}
              className="btn-primary w-full py-2.5 mt-2 justify-center"
            >
              {isLoading ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Signing in…</>
              ) : 'Sign In'}
            </motion.button>
          </form>

          {/* Demo credentials */}
          <div className="mt-6 p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">Demo credentials</p>
            <div className="space-y-1">
              <p className="text-xs font-mono text-slate-700 dark:text-slate-300">admin@upteky.com</p>
              <p className="text-xs font-mono text-slate-700 dark:text-slate-300">upteky2025</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default LoginPage;
