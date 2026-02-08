/**
 * DatePicker Component
 *
 * Provides a date picker for selecting task due dates.
 * Features:
 * - Calendar-based date selection
 * - Prevents selecting past dates
 * - Clearable selection
 * - Dark mode support
 * - Accessible with proper labels
 */

'use client';

import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CalendarIcon } from '@heroicons/react/24/outline';

interface DatePickerProps {
  value: Date | null;
  onChange: (date: Date | null) => void;
  minDate?: Date;
}

export default function DatePicker({ value, onChange, minDate }: DatePickerProps) {
  return (
    <div className="relative">
      <ReactDatePicker
        selected={value}
        onChange={onChange}
        minDate={minDate || new Date()}
        dateFormat="MMM dd, yyyy"
        placeholderText="Select due date"
        isClearable
        className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
        wrapperClassName="w-full"
      />
      <CalendarIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
    </div>
  );
}
