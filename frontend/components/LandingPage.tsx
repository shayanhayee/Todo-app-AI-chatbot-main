'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    CheckCircleIcon,
    SparklesIcon,
    BoltIcon,
    ShieldCheckIcon,
    ArrowRightIcon,
    SunIcon,
    MoonIcon,
    CpuChipIcon,
    CloudIcon,
    ChevronDownIcon,
    QuestionMarkCircleIcon,
    CodeBracketIcon,
    GlobeAltIcon,
    Bars3Icon,
    XMarkIcon,
} from '@heroicons/react/24/outline';

const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'Stats', href: '#stats' },
    { name: 'About', href: '#about' },
    { name: 'Developer', href: '#developer' },
];

const footerSections = [
    {
        title: 'Solution',
        links: [
            { name: 'Marketing', href: '#' },
            { name: 'Analytics', href: '#' },
            { name: 'Commercial', href: '#' },
            { name: 'Insights', href: '#' },
        ],
    },
    {
        title: 'Support',
        links: [
            { name: 'Documentation', href: '#' },
            { name: 'Guides', href: '#' },
            { name: 'API Status', href: '#' },
        ],
    },
    {
        title: 'Company',
        links: [
            { name: 'About', href: '#' },
            { name: 'Blog', href: '#' },
            { name: 'Jobs', href: '#' },
            { name: 'Press', href: '#' },
        ],
    },
    {
        title: 'Legal',
        links: [
            { name: 'Privacy', href: '#' },
            { name: 'Terms', href: '#' },
            { name: 'Cookie Policy', href: '#' },
        ],
    },
];

export default function LandingPage() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [isMoreOpen, setIsMoreOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Prevent hydration mismatch while keeping background visible
    const isShowingContent = mounted;

    return (
        <div className="min-h-screen bg-background selection:bg-indigo-500/30 selection:text-indigo-900 dark:selection:text-indigo-200 transition-colors duration-500">
            {/* Background Decorative Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
                <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute top-[20%] -right-[5%] w-[35%] h-[35%] bg-purple-500/10 rounded-full blur-[120px] animate-pulse delay-700" />
                <div className="absolute bottom-[5%] left-[10%] w-[30%] h-[30%] bg-pink-500/10 rounded-full blur-[120px] animate-pulse delay-1000" />
            </div>

            <AnimatePresence>
                {!isShowingContent ? (
                    <motion.div
                        key="loader"
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-background z-[100] flex items-center justify-center"
                    >
                        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                    </motion.div>
                ) : (
                    <motion.div
                        key="content"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        {/* Navigation Bar */}
                        <nav className="sticky top-0 z-50 bg-background/60 backdrop-blur-xl border-b border-border/40">
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                <div className="flex justify-between items-center h-20">
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="flex items-center gap-2"
                                    >
                                        <Link href="/" className="flex items-center gap-2">
                                            <div className="p-2.5 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/20">
                                                <CheckCircleIcon className="w-6 h-6" />
                                            </div>
                                            <span className="text-2xl font-black tracking-tight text-foreground">TaskMaster <span className="text-indigo-500">AI</span></span>
                                        </Link>
                                    </motion.div>

                                    <div className="flex items-center gap-2 md:gap-8">
                                        {/* Desktop Links - Visible from MD upwards */}
                                        <div className="hidden md:flex items-center gap-8 text-sm font-bold text-muted-foreground uppercase tracking-widest">
                                            {navLinks.map((link) => (
                                                <a
                                                    key={link.name}
                                                    href={link.href}
                                                    className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors relative group"
                                                >
                                                    {link.name}
                                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-500 transition-all group-hover:w-full" />
                                                </a>
                                            ))}

                                            {/* More Dropdown */}
                                            <div className="relative group/more">
                                                <button
                                                    onMouseEnter={() => setIsMoreOpen(true)}
                                                    className="flex items-center gap-1 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                                                >
                                                    More
                                                    <ChevronDownIcon className={cn("w-4 h-4 transition-transform duration-200", isMoreOpen ? "rotate-180" : "")} />
                                                </button>

                                                <div
                                                    className={cn(
                                                        "absolute top-full right-0 mt-4 w-64 p-3 rounded-[2rem] glass shadow-2xl border border-white/20 dark:border-slate-800 transition-all duration-300 origin-top-right",
                                                        isMoreOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                                                    )}
                                                    onMouseLeave={() => setIsMoreOpen(false)}
                                                >
                                                    <div className="space-y-1.5">
                                                        {[
                                                            { name: 'Support', icon: QuestionMarkCircleIcon, desc: 'Get expert help' },
                                                            { name: 'Documentation', icon: CodeBracketIcon, desc: 'API & setup guides' },
                                                            { name: 'Community', icon: GlobeAltIcon, desc: 'Join the discourse' },
                                                        ].map((item) => (
                                                            <a
                                                                key={item.name}
                                                                href="#"
                                                                className="flex items-start gap-4 p-3 rounded-2xl hover:bg-slate-100/50 dark:hover:bg-slate-800/50 transition-colors group/item"
                                                            >
                                                                <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-500 group-hover/item:bg-indigo-500 group-hover/item:text-white transition-colors">
                                                                    <item.icon className="w-5 h-5" />
                                                                </div>
                                                                <div>
                                                                    <p className="text-sm font-black text-foreground">{item.name}</p>
                                                                    <p className="text-[10px] text-muted-foreground font-medium">{item.desc}</p>
                                                                </div>
                                                            </a>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="h-6 w-px bg-border/50 hidden md:block" />

                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                                className="p-3 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all active:scale-90"
                                            >
                                                {theme === 'dark' ? <SunIcon className="w-6 h-6 text-amber-500" /> : <MoonIcon className="w-6 h-6 text-indigo-600" />}
                                            </button>

                                            <Link href="/auth" className="hidden sm:block">
                                                <button className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-indigo-500/25 transition-all hover:-translate-y-0.5 active:scale-95">
                                                    Sign In
                                                </button>
                                            </Link>

                                            {/* Mobile Menu Toggle */}
                                            <button
                                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                                className="md:hidden p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-foreground transition-all active:scale-90"
                                            >
                                                {isMobileMenuOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Mobile Navigation Menu */}
                            <AnimatePresence>
                                {isMobileMenuOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur-xl overflow-hidden"
                                    >
                                        <div className="px-4 py-8 space-y-6">
                                            {navLinks.map((link) => (
                                                <a
                                                    key={link.name}
                                                    href={link.href}
                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                    className="block text-2xl font-black text-foreground hover:text-indigo-500 transition-colors"
                                                >
                                                    {link.name}
                                                </a>
                                            ))}
                                            <div className="h-px bg-border/40" />
                                            <div className="grid grid-cols-2 gap-4">
                                                <Link href="/auth" onClick={() => setIsMobileMenuOpen(false)}>
                                                    <button className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest text-sm">
                                                        Sign In
                                                    </button>
                                                </Link>
                                                <button className="w-full py-4 glass text-foreground rounded-2xl font-black uppercase tracking-widest text-sm">
                                                    Join Free
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </nav>

                        {/* Hero Section */}
                        <section className="relative pt-24 pb-40 overflow-hidden">
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                                <div className="text-center space-y-10">
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-black tracking-[0.2em] uppercase"
                                    >
                                        <SparklesIcon className="w-4 h-4" />
                                        <span>Revolutionizing Productivity</span>
                                    </motion.div>

                                    <motion.h1
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 }}
                                        className="text-4xl sm:text-6xl lg:text-8xl xl:text-[10rem] font-black tracking-tighter leading-[0.9] text-slate-900 dark:text-white"
                                    >
                                        The Future of <br />
                                        <span className="gradient-text">Task Management!</span>
                                    </motion.h1>

                                    <motion.p
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="text-xl sm:text-3xl text-muted-foreground/80 max-w-3xl mx-auto font-medium leading-relaxed"
                                    >
                                        Escape the chaos. Organize your life with an AI assistant that actually gets you. Predictive, intelligent, and blazing fast.
                                    </motion.p>

                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                        className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-10"
                                    >
                                        <Link href="/auth" className="w-full sm:w-auto">
                                            <button className="w-full sm:w-auto px-8 sm:px-12 py-5 sm:py-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-[2rem] font-black text-lg sm:xl shadow-2xl shadow-indigo-500/40 transition-all hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3">
                                                Get Started For Free
                                                <ArrowRightIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                                            </button>
                                        </Link>
                                        <a href="#features" className="w-full sm:w-auto">
                                            <button className="w-full sm:w-auto px-8 sm:px-12 py-5 sm:py-6 glass dark:hover:bg-slate-800 text-foreground rounded-[2rem] font-black text-lg sm:xl transition-all hover:-translate-y-1 active:scale-95 border border-border/50">
                                                Explore Features
                                            </button>
                                        </a>
                                    </motion.div>
                                </div>
                            </div>
                        </section>

                        {/* Stats Section */}
                        <section id="stats" className="py-24 relative overflow-hidden">
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                <div className="glass p-8 sm:p-12 rounded-[2.5rem] sm:rounded-[3.5rem] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 text-center relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                                    <div className="space-y-4 relative z-10">
                                        <div className="text-5xl sm:text-6xl font-black text-indigo-600 dark:text-indigo-400">10K+</div>
                                        <div className="text-[10px] sm:text-xs font-black text-muted-foreground uppercase tracking-[0.25em]">Active Minds</div>
                                    </div>
                                    <div className="space-y-4 relative z-10 sm:border-l border-border/30">
                                        <div className="text-5xl sm:text-6xl font-black text-purple-600 dark:text-purple-400">50K+</div>
                                        <div className="text-[10px] sm:text-xs font-black text-muted-foreground uppercase tracking-[0.25em]">Tasks Mastered</div>
                                    </div>
                                    <div className="space-y-4 relative z-10 lg:border-l border-border/30">
                                        <div className="text-5xl sm:text-6xl font-black text-pink-600 dark:text-pink-400">99.9%</div>
                                        <div className="text-[10px] sm:text-xs font-black text-muted-foreground uppercase tracking-[0.25em]">System Stability</div>
                                    </div>
                                    <div className="space-y-4 relative z-10 lg:border-l border-border/30">
                                        <div className="text-5xl sm:text-6xl font-black text-blue-600 dark:text-blue-400">4.9/5</div>
                                        <div className="text-[10px] sm:text-xs font-black text-muted-foreground uppercase tracking-[0.25em]">User Delight</div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Features Section */}
                        <section id="features" className="py-40">
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                <div className="text-center space-y-6 mb-16 sm:mb-32">
                                    <h2 className="text-4xl sm:text-7xl font-black tracking-tight text-foreground leading-[1.1]">
                                        Built for the next generation of <br />
                                        <span className="text-indigo-600">Productivity Hunters.</span>
                                    </h2>
                                    <p className="text-lg sm:text-2xl text-muted-foreground max-w-2xl mx-auto font-medium leading-relaxed">
                                        We didn't just build a todo list. We built a command center for your life.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                                    {[
                                        {
                                            icon: SparklesIcon,
                                            title: "AI Orchestration",
                                            desc: "Our AI doesn't just list tasks; it understands context, priority, and intent. Chat with your productivity agent.",
                                            color: "indigo"
                                        },
                                        {
                                            icon: CpuChipIcon,
                                            title: "Cloud Intelligence",
                                            desc: "Sync your workflow across any device instantly. Your tasks are always where you need them, when you need them.",
                                            color: "purple"
                                        },
                                        {
                                            icon: BoltIcon,
                                            title: "Blazing Performance",
                                            desc: "Built on high-performance infrastructure ensuring zero latency in your workflow. Move at the speed of thought.",
                                            color: "pink"
                                        },
                                        {
                                            icon: ShieldCheckIcon,
                                            title: "Hardened Security",
                                            desc: "Privacy is paramount. End-to-end encryption for your data and high-grade JWT authentication protocols.",
                                            color: "blue"
                                        },
                                        {
                                            icon: CloudIcon,
                                            title: "Cross-Platform",
                                            desc: "Whether on desktop or mobile, TaskMaster provides a seamless, unified experience for maximum leverage.",
                                            color: "cyan"
                                        },
                                        {
                                            icon: CheckCircleIcon,
                                            title: "Smart Categories",
                                            desc: "Automatic categorization and priority mapping helps you stay focused on what truly matters.",
                                            color: "emerald"
                                        }
                                    ].map((feat, idx) => (
                                        <motion.div
                                            key={idx}
                                            whileHover={{ y: -20, scale: 1.02 }}
                                            className="p-12 rounded-[3.5rem] glass-card space-y-10 group"
                                        >
                                            <div className={`p-6 rounded-3xl bg-${feat.color}-500/10 text-${feat.color}-500 w-fit shrink-0 group-hover:scale-110 transition-transform duration-500`}>
                                                <feat.icon className="w-10 h-10" />
                                            </div>
                                            <div className="space-y-4">
                                                <h3 className="text-2xl font-black text-foreground">
                                                    {feat.title}
                                                </h3>
                                                <p className="text-muted-foreground/80 text-lg leading-relaxed font-semibold">
                                                    {feat.desc}
                                                </p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        {/* CTA Section */}
                        <section id="cta" className="py-40 relative">
                            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                                <div className="relative p-20 rounded-[4rem] bg-indigo-600 dark:bg-indigo-700 overflow-hidden shadow-2xl shadow-indigo-500/40">
                                    {/* Decorative background for CTA circle */}
                                    <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[40rem] h-[40rem] bg-white/10 rounded-full blur-[100px]" />
                                    <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[30rem] h-[30rem] bg-indigo-400/20 rounded-full blur-[80px]" />

                                    <div className="relative z-10 text-center space-y-10 max-w-4xl mx-auto">
                                        <h2 className="text-5xl sm:text-7xl font-black text-white leading-[1.1] tracking-tighter">
                                            Ready to take control of <br /> your productivity destiny?
                                        </h2>
                                        <p className="text-2xl text-indigo-100 font-bold opacity-90 max-w-2xl mx-auto leading-relaxed">
                                            Experience the only productivity platform designed for high-performers. Join the TaskMaster elite today.
                                        </p>
                                        <div className="pt-6">
                                            <Link href="/auth">
                                                <button className="px-16 py-8 bg-white text-indigo-600 hover:bg-indigo-50 rounded-[2.5rem] font-black text-2xl shadow-2xl transition-all hover:-translate-y-1 active:scale-95 leading-none">
                                                    Join TaskMaster AI Now
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Developer Section (Anchor targets) */}
                        <div id="about" className="h-0 w-0" />
                        <div id="developer" className="h-0 w-0" />

                        {/* Premium Multi-Column Footer */}
                        <footer className="py-32 border-t border-border/40 relative z-10 bg-white dark:bg-slate-950">
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-16 lg:gap-8 pb-32">
                                    {/* Brand Column */}
                                    <div className="col-span-2 space-y-10">
                                        <Link href="/" className="flex items-center gap-4">
                                            <div className="p-3 rounded-2xl bg-indigo-600 text-white shadow-xl shadow-indigo-500/30">
                                                <CheckCircleIcon className="w-8 h-8" />
                                            </div>
                                            <span className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">TaskMaster AI</span>
                                        </Link>
                                        <p className="text-lg text-muted-foreground/80 leading-relaxed font-bold max-w-[320px]">
                                            Empowering high-performers with the world's most intelligent task orchestration engine. Built for the modern mind to conquer the chaos.
                                        </p>
                                        <div className="flex gap-6 relative z-30">
                                            {[
                                                {
                                                    name: 'Github',
                                                    href: 'https://github.com/m-Alishahid/',
                                                    icon: 'M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.635-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12c0-5.523-4.477-10-10-10z',
                                                    hoverClass: 'hover:bg-[#24292e]'
                                                },
                                                {
                                                    name: 'Instagram',
                                                    href: 'https://www.instagram.com/codecraftali?igsh=MW4xbW85ZnlhbWt0ZA==',
                                                    icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
                                                    hoverClass: 'hover:bg-[#ee2a7b]'
                                                },
                                                {
                                                    name: 'LinkedIn',
                                                    href: 'https://www.linkedin.com/in/muhammad-ali-shahid-2a9244366',
                                                    icon: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z',
                                                    hoverClass: 'hover:bg-[#0077b5]'
                                                },
                                            ].map((social) => (
                                                <a
                                                    key={social.name}
                                                    href={social.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={cn(
                                                        "w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-white transition-all shadow-sm pointer-events-auto relative z-40",
                                                        social.hoverClass
                                                    )}
                                                >
                                                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                                                        <path d={social.icon} />
                                                    </svg>
                                                </a>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Link Columns */}
                                    {footerSections.map((section) => (
                                        <div key={section.title} className="space-y-8">
                                            <h4 className="text-sm font-black uppercase tracking-[0.3em] text-foreground opacity-60">
                                                {section.title}
                                            </h4>
                                            <ul className="space-y-5 text-lg font-black text-muted-foreground/80">
                                                {section.links.map((link) => (
                                                    <motion.li key={link.name}>
                                                        <a
                                                            href={link.href}
                                                            className="inline-block hover:text-indigo-600 dark:hover:text-indigo-400 transition-all hover:translate-x-2"
                                                        >
                                                            {link.name}
                                                        </a>
                                                    </motion.li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>

                                <div className="pt-20 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-10">
                                    <div className="flex flex-wrap justify-center md:justify-start gap-10 text-sm font-black text-muted-foreground uppercase tracking-[0.2em]">
                                        <p>Built by <span className="text-foreground border-b-2 border-indigo-500">Ali Shahid</span></p>
                                        <p>© 2026 TaskMaster AI Inc.</p>
                                        <p className="px-3 py-1 bg-indigo-500/10 text-indigo-500 rounded-full text-[10px] lowercase">Build v1.2</p>
                                    </div>
                                    <div className="flex items-center gap-8">
                                        <div className="flex -space-x-3">
                                            {[1, 2, 3, 4].map((i) => (
                                                <div key={i} className="w-12 h-12 rounded-full border-4 border-white dark:border-slate-950 bg-indigo-500 flex items-center justify-center text-xs font-black text-white shadow-2xl overflow-hidden ring-4 ring-indigo-500/10">
                                                    <div className="gradient-text bg-white opacity-20 absolute inset-0" />
                                                    {String.fromCharCode(64 + i)}
                                                </div>
                                            ))}
                                        </div>
                                        <p className="text-xs font-black text-muted-foreground uppercase tracking-widest max-w-[120px] leading-tight opacity-70">Over 10,000 active performers</p>
                                    </div>
                                </div>
                            </div>
                        </footer>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function cn(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}
