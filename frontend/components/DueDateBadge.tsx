/**
 * DueDateBadge Component
 *
 * Displays a due date badge with contextual status indicators.
 * Features:
 * - Color-coded by urgency (overdue=red, today=orange, soon=yellow, later=blue)
 * - Pulsing animation for overdue tasks
 * - Relative time display (e.g., "Due in 3 days")
 * - Dark mode support
 * - Accessible with title attribute
 */

import { format, isPast, isToday, isTomorrow, differenceInDays } from 'date-fns';
import { ClockIcon } from '@heroicons/react/24/outline';

interface DueDateBadgeProps {
  dueDate: string | null;
  completed: boolean;
}

export default function DueDateBadge({ dueDate, completed }: DueDateBadgeProps) {
  if (!dueDate) return null;

  const date = new Date(dueDate);
  const now = new Date();
  const daysUntil = differenceInDays(date, now);

  // Determine status and styling
  let statusText = '';
  let statusColor = '';

  if (completed) {
    statusText = format(date, 'MMM dd, yyyy');
    statusColor = 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400 border-gray-200 dark:border-gray-600';
  } else if (isPast(date) && !isToday(date)) {
    statusText = `Overdue by ${Math.abs(daysUntil)} day${Math.abs(daysUntil) !== 1 ? 's' : ''}`;
    statusColor = 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border-red-200 dark:border-red-800 animate-pulse';
  } else if (isToday(date)) {
    statusText = 'Due today';
    statusColor = 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300 border-orange-200 dark:border-orange-800';
  } else if (isTomorrow(date)) {
    statusText = 'Due tomorrow';
    statusColor = 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800';
  } else if (daysUntil <= 7) {
    statusText = `Due in ${daysUntil} day${daysUntil !== 1 ? 's' : ''}`;
    statusColor = 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800';
  } else {
    statusText = format(date, 'MMM dd, yyyy');
    statusColor = 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600';
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${statusColor}`}
      title={`Due: ${format(date, 'MMMM dd, yyyy')}`}
    >
      <ClockIcon className="h-3.5 w-3.5" />
      <span>{statusText}</span>
    </span>
  );
}
