'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { Task } from '@/lib/types';
import { toggleComplete } from '@/lib/api';
import CategoryBadge from './CategoryBadge';
import PriorityBadge from './PriorityBadge';
import DueDateBadge from './DueDateBadge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  CheckIcon,
  PencilSquareIcon,
  TrashIcon,
  ClockIcon,
  CalendarIcon,
  ArrowPathIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

interface TaskItemProps {
  task: Task;
  onToggle: (updatedTask: Task) => void;
  onDelete: (taskId: number) => void;
  onEdit: (task: Task) => void;
}

export default function TaskItem({ task, onToggle, onDelete, onEdit }: TaskItemProps) {
  const [isToggling, setIsToggling] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleToggle = async () => {
    if (isToggling) return;
    setIsToggling(true);

    try {
      const updatedTask = await toggleComplete(task.id);
      onToggle(updatedTask);
      toast.success(updatedTask.completed ? 'Task completed!' : 'Task reopened');
    } catch (err) {
      toast.error('Failed to toggle task');
    } finally {
      setIsToggling(false);
    }
  };

  const handleDelete = async () => {
    if (isDeleting) return;
    setIsDeleting(true);
    try {
      onDelete(task.id);
    } catch (err) {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        whileHover={{ y: -4, scale: 1.01 }}
        className="group relative"
      >
        {/* Glow Effect on Hover */}
        <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500/0 via-indigo-500/10 to-indigo-500/0 rounded-[2rem] opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />

        <div className={cn(
          "relative overflow-hidden p-5 rounded-[1.5rem] transition-all duration-300 border backdrop-blur-md",
          task.completed
            ? "glass-card opacity-60 border-emerald-500/20"
            : "bg-white/40 dark:bg-slate-900/40 border-white/20 dark:border-slate-800/20 shadow-xl shadow-slate-200/40 dark:shadow-none hover:bg-white/60 dark:hover:bg-slate-900/60"
        )}>
          {/* Subtle completion indicator for active tasks */}
          {!task.completed && (
            <div className={cn(
              "absolute left-0 top-0 bottom-0 w-1",
              task.priority === 'high' ? "bg-rose-500" :
                task.priority === 'medium' ? "bg-amber-500" : "bg-emerald-500"
            )} />
          )}

          <div className="flex items-start gap-5">
            {/* Custom Checkbox */}
            <button
              onClick={handleToggle}
              disabled={isToggling}
              className={cn(
                "mt-0.5 w-7 h-7 rounded-xl border-2 flex items-center justify-center transition-all duration-300 shrink-0",
                task.completed
                  ? "bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-500/30 rotate-12"
                  : "border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 hover:border-indigo-500 hover:scale-110"
              )}
            >
              {isToggling ? (
                <ArrowPathIcon className="w-4 h-4 animate-spin" />
              ) : (
                <CheckIcon className={cn("w-4 h-4 transition-transform", task.completed ? "scale-100" : "scale-0")} />
              )}
            </button>

            {/* Task Content */}
            <div className="flex-1 min-w-0 space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <h3 className={cn(
                    "text-lg font-bold tracking-tight transition-all",
                    task.completed
                      ? "text-slate-400 line-through decoration-slate-400/50 decoration-2"
                      : "text-slate-800 dark:text-white"
                  )}>
                    {task.title}
                  </h3>
                  {task.description && (
                    <p className={cn(
                      "text-sm line-clamp-2 font-medium leading-relaxed",
                      task.completed ? "text-slate-400" : "text-slate-500 dark:text-slate-400"
                    )}>
                      {task.description}
                    </p>
                  )}
                </div>

                {/* Glassy Actions */}
                <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all -translate-y-2 group-hover:translate-y-0">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 rounded-xl bg-white/50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-700 shadow-sm border border-white/20"
                    onClick={() => onEdit(task)}
                  >
                    <PencilSquareIcon className="w-4.5 h-4.5 text-indigo-500" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 rounded-xl bg-white/50 dark:bg-slate-800/50 hover:bg-rose-50 dark:hover:bg-rose-900/30 shadow-sm border border-white/20"
                    onClick={() => setShowDeleteConfirm(true)}
                  >
                    <TrashIcon className="w-4.5 h-4.5 text-rose-500" />
                  </Button>
                </div>
              </div>

              {/* Status Bar */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <div className="flex flex-wrap items-center gap-2">
                  {task.priority && (
                    <div className="scale-90 origin-left">
                      <PriorityBadge priority={task.priority} />
                    </div>
                  )}
                  {task.category && (
                    <div className="scale-90 origin-left">
                      <CategoryBadge category={task.category} />
                    </div>
                  )}
                  {task.due_date && (
                    <div className="scale-90 origin-left">
                      <DueDateBadge dueDate={task.due_date} completed={task.completed} />
                    </div>
                  )}
                </div>

                <div className="h-4 w-px bg-slate-200 dark:bg-slate-800 mx-1 flex-shrink-0" />

                <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  <ClockIcon className="w-3.5 h-3.5" />
                  <span>{formatDistanceToNow(new Date(task.created_at), { addSuffix: true })}</span>
                </div>

                {task.completed && (
                  <div className="ml-auto flex items-center gap-1 bg-emerald-500/10 text-emerald-600 px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-widest">
                    <SparklesIcon className="w-3 h-3" />
                    Completed
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Modern Deletion UI */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-sm"
            >
              <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 space-y-8 shadow-2xl border border-white/20 dark:border-slate-800 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-rose-500 to-orange-500" />
                <div className="flex flex-col items-center text-center gap-6">
                  <div className="w-20 h-20 rounded-[2rem] bg-rose-50 dark:bg-rose-900/20 flex items-center justify-center text-rose-500 rotate-12 group-hover:rotate-0 transition-transform duration-500">
                    <TrashIcon className="w-10 h-10" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black tracking-tight text-slate-800 dark:text-white">Delete this task?</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                      You are about to permanently remove <span className="text-slate-800 dark:text-white font-bold italic">"{task.title}"</span>. This action is irreversible.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    className="flex-1 px-6 py-4 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-200 transition-all active:scale-95"
                    onClick={() => setShowDeleteConfirm(false)}
                    disabled={isDeleting}
                  >
                    Keep it
                  </button>
                  <button
                    className="flex-1 px-6 py-4 rounded-2xl bg-rose-600 text-white font-bold shadow-xl shadow-rose-500/30 hover:bg-rose-700 transition-all active:scale-95 flex items-center justify-center"
                    onClick={handleDelete}
                    disabled={isDeleting}
                  >
                    {isDeleting ? <ArrowPathIcon className="w-5 h-5 animate-spin" /> : "Delete"}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
