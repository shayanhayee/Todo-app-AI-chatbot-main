/**
 * Constants for task management features
 *
 * Defines categories, priorities, and their associated colors/icons
 * for the Phase 2 task management system.
 */

export const CATEGORIES = [
  { value: 'work', label: 'Work', color: 'blue', icon: '💼' },
  { value: 'personal', label: 'Personal', color: 'purple', icon: '👤' },
  { value: 'shopping', label: 'Shopping', color: 'green', icon: '🛒' },
  { value: 'health', label: 'Health', color: 'red', icon: '❤️' },
  { value: 'other', label: 'Other', color: 'gray', icon: '📌' },
] as const;

export const CATEGORY_COLORS = {
  blue: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800',
  purple: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 border-purple-200 dark:border-purple-800',
  green: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-green-200 dark:border-green-800',
  red: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border-red-200 dark:border-red-800',
  gray: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600',
} as const;

export const PRIORITIES = [
  { value: 'high', label: 'High', color: 'red', icon: '🔴', order: 0 },
  { value: 'medium', label: 'Medium', color: 'yellow', icon: '🟡', order: 1 },
  { value: 'low', label: 'Low', color: 'green', icon: '🟢', order: 2 },
] as const;

export const PRIORITY_COLORS = {
  red: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border-red-200 dark:border-red-800',
  yellow: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800',
  green: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-green-200 dark:border-green-800',
} as const;

export type CategoryValue = typeof CATEGORIES[number]['value'];
export type CategoryColor = keyof typeof CATEGORY_COLORS;
export type PriorityValue = typeof PRIORITIES[number]['value'];
export type PriorityColor = keyof typeof PRIORITY_COLORS;
