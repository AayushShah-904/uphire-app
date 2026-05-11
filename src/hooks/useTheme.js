import { useEffect } from 'react';

/** Reads localStorage on mount and applies/removes the `dark` class on <html>. */
function useThemeInit() {
  useEffect(() => {
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (stored === 'dark' || (!stored && prefersDark)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);
}

export function toggleTheme() {
  const isDark = document.documentElement.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  return isDark;
}

export function getIsDark() {
  return document.documentElement.classList.contains('dark');
}

export default useThemeInit;
