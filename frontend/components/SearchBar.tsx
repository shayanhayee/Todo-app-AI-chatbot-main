/**
 * SearchBar Component
 *
 * Provides a search input with clear functionality for filtering tasks.
 * Features:
 * - Real-time search as user types
 * - Clear button to reset search
 * - Accessible with proper ARIA labels
 * - Dark mode support
 */

'use client';

import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({ value, onChange, placeholder }: SearchBarProps) {
  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || "Search tasks..."}
        className="w-full pl-12 pr-12 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-800 transition-all"
        aria-label="Search tasks"
      />
      <MagnifyingGlassIcon className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 pointer-events-none" />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          aria-label="Clear search"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}
