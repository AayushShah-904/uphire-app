import React from 'react';

const badgeStyles = {
  'Pending': 'border-yellow-400/40 text-yellow-300 shadow-[0_0_8px_rgba(251,191,36,0.3)]',
  'Selected': 'border-green-400/40  text-green-300  shadow-[0_0_8px_rgba(0,255,136,0.3)]',
  'Rejected': 'border-red-400/40    text-red-300    shadow-[0_0_8px_rgba(255,51,102,0.3)]',
  'In Review': 'border-cyan-400/40   text-cyan-300   shadow-[0_0_8px_rgba(0,200,255,0.3)]',
};

const dotColors = {
  'Pending': 'bg-yellow-400',
  'Selected': 'bg-green-400',
  'Rejected': 'bg-red-400',
  'In Review': 'bg-cyan-400',
};

function StatusBadge({ status, size = 'md' }) {
  const style = badgeStyles[status] || 'border-gray-500/40 text-gray-400';
  const dot = dotColors[status] || 'bg-gray-400';
  const sizeClass = size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-3 py-1 text-xs';

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-mono uppercase tracking-widest rounded-full border bg-transparent ${sizeClass} ${style}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dot} animate-pulse`} />
      {status}
    </span>
  );
}

export default StatusBadge;
