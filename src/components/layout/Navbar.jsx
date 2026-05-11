import React from 'react';
import { motion } from 'framer-motion';
import { Menu, Bell, LogOut } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import ThemeToggle from '../ui/ThemeToggle.jsx';
import useAuth from '../../hooks/useAuth.js';
import { getInitials, getAvatarColor } from '../../utils/helpers.js';

const pageTitles = {
  '/dashboard': 'Dashboard',
  '/candidates': 'Candidates',
  '/add-candidate': 'Add Candidate',
};

function Navbar({ onMenuClick }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const title = pageTitles[location.pathname] || 'Dashboard';

  return (
    <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 px-6 flex items-center justify-between gap-4 flex-shrink-0">
      {/* Sidebar toggle and title */}
      <div className="flex items-center gap-3 min-w-0">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onMenuClick}
          className="btn-ghost lg:hidden"
          id="mobile-menu-btn"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </motion.button>
        <h1 className="text-lg font-semibold text-slate-900 dark:text-white truncate">{title}</h1>
      </div>

      {/* Theme toggle and user menu */}
      <div className="flex items-center gap-1 flex-shrink-0">
        <ThemeToggle />

        <button className="btn-ghost relative" aria-label="Notifications">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-brand-600" />
        </button>

        <div className="flex items-center gap-2 pl-2 ml-1 border-l border-slate-200 dark:border-slate-700">
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0 ${getAvatarColor(user?.name || 'A')}`}
          >
            {getInitials(user?.name || 'Admin')}
          </div>
          <span className="hidden sm:block text-sm font-medium text-slate-700 dark:text-slate-200">
            {user?.name}
          </span>
          <motion.button
            id="logout-btn"
            whileTap={{ scale: 0.95 }}
            onClick={logout}
            className="btn-ghost text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400"
            aria-label="Logout"
            title="Sign out"
          >
            <LogOut className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
