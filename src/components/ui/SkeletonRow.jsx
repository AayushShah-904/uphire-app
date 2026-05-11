import React from 'react';

/** A single skeleton table row with animate-pulse placeholder bars. */
function SkeletonRow() {
  return (
    <tr className="border-b border-slate-100 dark:border-slate-700">
      {/* Serial number column */}
      <td className="px-6 py-4"><div className="skeleton h-3 w-4" /></td>
      {/* Name and email columns */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="skeleton w-8 h-8 rounded-full flex-shrink-0" />
          <div className="space-y-1.5 flex-1">
            <div className="skeleton h-3 w-32" />
            <div className="skeleton h-2.5 w-40" />
          </div>
        </div>
      </td>
      {/* Display university name */}
      <td className="px-6 py-4"><div className="skeleton h-3 w-28" /></td>
      {/* List of technical skills */}
      <td className="px-6 py-4">
        <div className="flex gap-1.5">
          <div className="skeleton h-5 w-14 rounded-full" />
          <div className="skeleton h-5 w-16 rounded-full" />
        </div>
      </td>
      {/* Current application status */}
      <td className="px-6 py-4"><div className="skeleton h-5 w-20 rounded-full" /></td>
      {/* Date column */}
      <td className="px-6 py-4"><div className="skeleton h-3 w-20" /></td>
      {/* Submit and cancel buttons */}
      <td className="px-6 py-4"><div className="skeleton h-7 w-7 rounded-md" /></td>
    </tr>
  );
}

export function SkeletonCard() {
  return (
    <div className="card p-5 space-y-3">
      <div className="flex items-center gap-3">
        <div className="skeleton w-10 h-10 rounded-full flex-shrink-0" />
        <div className="flex-1 space-y-1.5">
          <div className="skeleton h-3.5 w-3/4" />
          <div className="skeleton h-3 w-1/2" />
        </div>
      </div>
      <div className="skeleton h-3 w-4/5" />
      <div className="flex gap-1.5">
        <div className="skeleton h-5 w-16 rounded-full" />
        <div className="skeleton h-5 w-14 rounded-full" />
      </div>
      <div className="flex items-center justify-between pt-1">
        <div className="skeleton h-3 w-20" />
        <div className="skeleton h-5 w-20 rounded-full" />
      </div>
    </div>
  );
}

export default SkeletonRow;
