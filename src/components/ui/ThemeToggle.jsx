import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { toggleTheme, getIsDark } from '../../hooks/useTheme.js';

function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(getIsDark());
  }, []);

  const handleToggle = () => {
    const next = toggleTheme();
    setDark(next);
  };

  return (
    <motion.button
      id="theme-toggle"
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.02 }}
      onClick={handleToggle}
      className="btn-ghost"
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <motion.div
        key={dark ? 'moon' : 'sun'}
        initial={{ opacity: 0, rotate: -20 }}
        animate={{ opacity: 1, rotate: 0 }}
        transition={{ duration: 0.2 }}
      >
        {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
      </motion.div>
    </motion.button>
  );
}

export default ThemeToggle;
