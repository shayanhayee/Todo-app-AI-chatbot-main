/**
 * CategorySelector Component
 *
 * Provides a button-based selector for task categories.
 * Features:
 * - Visual category selection with icons
 * - Toggle selection (click again to deselect)
 * - Color-coded buttons
 * - Dark mode support
 * - Accessible with ARIA labels
 */

'use client';

import { CATEGORIES, CATEGORY_COLORS } from '@/lib/constants';

interface CategorySelectorProps {
  value: string | null;
  onChange: (value: string | null) => void;
}

export default function CategorySelector({ value, onChange }: CategorySelectorProps) {
  return (
    <div className="flex gap-2 flex-wrap">
      {CATEGORIES.map(cat => {
        const isSelected = value === cat.value;
        return (
          <button
            key={cat.value}
            type="button"
            onClick={() => onChange(isSelected ? null : cat.value)}
            className={`
              px-4 py-2 rounded-lg font-medium transition-all text-sm
              flex items-center gap-2 border
              ${isSelected
                ? `${CATEGORY_COLORS[cat.color]} border-primary shadow-sm`
                : 'bg-muted/50 dark:bg-slate-800/50 text-muted-foreground border-transparent hover:bg-muted dark:hover:bg-slate-800'
              }
            `}
            aria-pressed={isSelected}
            aria-label={`Select ${cat.label} category`}
          >
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
          </button>
        );
      })}
    </div>
  );
}
