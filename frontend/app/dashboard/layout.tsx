'use client';

import Sidebar from '@/components/Sidebar';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bars3Icon, XMarkIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col lg:flex-row">
            {/* Mobile Header */}
            <header className="lg:hidden sticky top-0 z-[60] bg-background/80 backdrop-blur-xl border-b border-border/40 h-16 flex items-center justify-between px-4">
                <Link href="/" className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg">
                        <CheckCircleIcon className="w-5 h-5" />
                    </div>
                    <span className="text-lg font-bold tracking-tight text-foreground">TaskMaster <span className="text-indigo-500">AI</span></span>
                </Link>
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-2 rounded-xl bg-muted/50 text-foreground transition-all active:scale-95"
                >
                    {isMobileMenuOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
                </button>
            </header>

            {/* Desktop Sidebar */}
            <div className="hidden lg:block w-64 shrink-0">
                <Sidebar />
            </div>

            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 bg-background/60 backdrop-blur-sm z-[70] lg:hidden"
                        />
                        <motion.aside
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed inset-y-0 left-0 w-[280px] z-[80] bg-background border-r border-border/40 shadow-2xl lg:hidden flex flex-col"
                        >
                            <Sidebar onNavItemClick={() => setIsMobileMenuOpen(false)} isMobile />
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            <main className="flex-1 transition-all duration-300 w-full">
                <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-7xl">
                    {children}
                </div>
            </main>
        </div>
    );
}
