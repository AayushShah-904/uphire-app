import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

/**
 * Stat card with animated count-up and optional trend.
 */
function StatCard({ label, value, icon: Icon, iconBg = 'bg-brand-50 dark:bg-brand-900/30', iconColor = 'text-brand-600 dark:text-brand-400', trend, trendLabel, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.25, ease: 'easeOut' }}
      className="card p-6"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">
            {label}
          </p>
          <AnimatedNumber value={value} />
        </div>
        <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center flex-shrink-0`}>
          <Icon className={`w-5 h-5 ${iconColor}`} />
        </div>
      </div>
      {trendLabel && (
        <div className="mt-3 flex items-center gap-1.5">
          {trend === 'up' && <TrendingUp className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />}
          {trend === 'down' && <TrendingDown className="w-3.5 h-3.5 text-red-500" />}
          {trend === 'flat' && <Minus className="w-3.5 h-3.5 text-slate-400" />}
          <span className={`text-xs font-medium ${trend === 'up' ? 'text-green-600 dark:text-green-400' : trend === 'down' ? 'text-red-500' : 'text-slate-400'}`}>
            {trendLabel}
          </span>
        </div>
      )}
    </motion.div>
  );
}

function AnimatedNumber({ value }) {
  const [displayed, setDisplayed] = React.useState(0);

  React.useEffect(() => {
    if (!value) return;
    let start = 0;
    const duration = 900;
    const step = Math.ceil(value / (duration / 16));
    const timer = setInterval(() => {
      start = Math.min(start + step, value);
      setDisplayed(start);
      if (start >= value) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [value]);

  return (
    <span className="text-3xl font-bold text-slate-900 dark:text-white tabular-nums">
      {displayed}
    </span>
  );
}

export default StatCard;
