/**
 * Formats a date string to readable form.
 * @param {string} dateStr
 * @returns {string}
 */
export function formatDate(dateStr) {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

/**
 * Returns a relative time string from a date.
 * @param {string} dateStr
 * @returns {string}
 */
export function timeAgo(dateStr) {
  const now = new Date();
  const then = new Date(dateStr);
  const days = Math.floor((now - then) / (1000 * 60 * 60 * 24));
  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  return `${Math.floor(days / 30)}mo ago`;
}

/**
 * Returns Tailwind classes for a given status.
 */
export function getStatusBadgeClass(status) {
  const map = {
    Pending:   'bg-amber-50  text-amber-700  ring-1 ring-amber-200  dark:bg-amber-900/30 dark:text-amber-400 dark:ring-amber-700/50',
    Selected:  'bg-green-50  text-green-700  ring-1 ring-green-200  dark:bg-green-900/30 dark:text-green-400 dark:ring-green-700/50',
    Rejected:  'bg-red-50    text-red-700    ring-1 ring-red-200    dark:bg-red-900/30   dark:text-red-400   dark:ring-red-700/50',
    'In Review':'bg-blue-50  text-blue-700   ring-1 ring-blue-200   dark:bg-blue-900/30  dark:text-blue-400  dark:ring-blue-700/50',
  };
  return map[status] ?? 'bg-slate-100 text-slate-600 ring-1 ring-slate-200';
}

/**
 * Gets initials from a full name.
 * @param {string} name
 * @returns {string}
 */
export function getInitials(name) {
  if (!name) return '?';
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

/**
 * Generates a deterministic bg color class from a string seed.
 * @param {string} seed
 * @returns {string}
 */
export function getAvatarColor(seed) {
  const colors = [
    'bg-indigo-600',
    'bg-violet-600',
    'bg-blue-600',
    'bg-cyan-600',
    'bg-teal-600',
    'bg-emerald-600',
    'bg-rose-600',
  ];
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
}

export const ALL_SKILLS = [
  'React', 'Node.js', 'Python', 'Java', 'MongoDB', 'SQL', 'Docker',
  'AWS', 'Flutter', 'Vue.js', 'Django', 'Next.js', 'Express.js', 'GraphQL', 'Figma',
];

export const STATUSES = ['Pending', 'Selected', 'Rejected', 'In Review'];

export const COLLEGES = [
  'IIT Bombay', 'NIT Surat', 'DAIICT', 'VIT Vellore', 'BITS Pilani',
  'Nirma University', 'GTU', 'CHARUSAT', 'Parul University', 'Silver Oak University',
];
