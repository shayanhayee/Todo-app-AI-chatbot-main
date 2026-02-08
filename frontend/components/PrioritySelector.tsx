/**
 * PrioritySelector Component
 *
 * Provides a button-based selector for task priority levels.
 * Features:
 * - Visual priority selection with icons
 * - Color-coded buttons (high=red, medium=yellow, low=green)
 * - Always has a selection (defaults to medium)
 * - Dark mode support
 * - Accessible with ARIA labels
 */

'use client';

import { PRIORITIES, PRIORITY_COLORS } from '@/lib/constants';

interface PrioritySelectorProps {
  value: string | null;
  onChange: (value: string) => void;
}

export default function PrioritySelector({ value, onChange }: PrioritySelectorProps) {
  return (
    <div className="flex gap-2 flex-wrap">
      {PRIORITIES.map(pri => {
        const isSelected = value === pri.value;
        return (
          <button
            key={pri.value}
            type="button"
            onClick={() => onChange(pri.value)}
            className={`
              px-4 py-2 rounded-lg font-medium transition-all text-sm
              flex items-center gap-2 border
              ${isSelected
                ? `${PRIORITY_COLORS[pri.color]} border-primary shadow-sm`
                : 'bg-muted/50 dark:bg-slate-800/50 text-muted-foreground border-transparent hover:bg-muted dark:hover:bg-slate-800'
              }
            `}
            aria-pressed={isSelected}
            aria-label={`Set priority to ${pri.label}`}
          >
            <span>{pri.icon}</span>
            <span>{pri.label}</span>
          </button>
        );
      })}
    </div>
  );
}
