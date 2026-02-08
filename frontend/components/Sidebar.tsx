'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
    HomeIcon,
    CheckCircleIcon,
    CalendarIcon,
    TagIcon,
    ArrowLeftOnRectangleIcon,
    SunIcon,
    MoonIcon,
    Cog6ToothIcon
} from '@heroicons/react/24/outline';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const menuItems = [
    { name: 'All Tasks', icon: HomeIcon, href: '/dashboard' },
    { name: 'Completed', icon: CheckCircleIcon, href: '/dashboard?filter=completed' },
    { name: 'Today', icon: CalendarIcon, href: '/dashboard?filter=today' },
    { name: 'Priority', icon: TagIcon, href: '/dashboard?filter=priority' },
];

interface SidebarProps {
    onNavItemClick?: () => void;
    isMobile?: boolean;
}

export default function Sidebar({ onNavItemClick, isMobile = false }: SidebarProps) {
    const pathname = usePathname();
    const router = useRouter();
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [user, setUser] = useState<{ name: string, email: string } | null>(null);

    useEffect(() => {
        setMounted(true);
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, [mounted]);

    const handleLogout = () => {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');
        router.push('/auth');
        if (onNavItemClick) onNavItemClick();
    };

    const isActive = (path: string) => pathname === path;

    if (!mounted) return null;

    return (
        <aside className={`flex flex-col h-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl transition-all duration-300 ${!isMobile ? "fixed inset-y-0 w-64 border-r border-white/20 dark:border-slate-800/20 shadow-xl" : "w-full"}`}>
            {/* Brand */}
            <div className="h-20 flex items-center px-6 border-b border-border/40">
                <Link href="/" className="flex items-center gap-3 group" onClick={onNavItemClick}>
                    <div className="p-2 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform">
                        <CheckCircleIcon className="w-6 h-6" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-foreground">TaskMaster <span className="text-indigo-500">AI</span></span>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 px-3 space-y-1.5 overflow-y-auto">
                <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-4 px-3 mt-4 opacity-60">
                    Control Center
                </div>
                {menuItems.map((item) => {
                    const active = isActive(item.href);
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            onClick={onNavItemClick}
                            className={`group flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all relative overflow-hidden ${active
                                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                                : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-foreground'
                                }`}
                        >
                            <item.icon className={`w-5 h-5 transition-transform ${active ? 'scale-110' : 'group-hover:scale-110'}`} />
                            <span className="relative z-10">{item.name}</span>
                            {active && (
                                <motion.div
                                    layoutId="sidebarActiveBackground"
                                    className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-indigo-700 -z-0"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                />
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* User Profile & Settings */}
            <div className="p-4 border-t border-border/40 space-y-6 bg-slate-50/50 dark:bg-slate-950/20">
                <div className="flex items-center justify-between px-3">
                    <div className="flex items-center gap-2">
                        {theme === 'dark' ? (
                            <MoonIcon className="w-5 h-5 text-indigo-400" />
                        ) : (
                            <SunIcon className="w-5 h-5 text-amber-500" />
                        )}
                        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Appearance</span>
                    </div>
                    <button
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        className="p-1.5 w-12 h-6 rounded-full bg-slate-200 dark:bg-slate-700 relative transition-colors"
                    >
                        <motion.div
                            animate={{ x: theme === 'dark' ? 24 : 0 }}
                            className="w-4.5 h-4.5 bg-white dark:bg-indigo-400 rounded-full shadow-sm"
                        />
                    </button>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-2xl bg-white dark:bg-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none border border-white/50 dark:border-slate-700/50">
                    <div className="h-10 w-10 shrink-0 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-black text-sm shadow-inner group relative">
                        {user?.name?.[0]?.toUpperCase() || 'U'}
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-slate-800 rounded-full" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold truncate text-foreground">{user?.name || 'User'}</p>
                        <p className="text-[10px] text-muted-foreground truncate font-medium uppercase tracking-tight">{user?.email || 'user@example.com'}</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="p-2 rounded-xl text-slate-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-900/20 dark:hover:text-rose-400 transition-all active:scale-90"
                        title="Logout"
                    >
                        <ArrowLeftOnRectangleIcon className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </aside>
    );
}
