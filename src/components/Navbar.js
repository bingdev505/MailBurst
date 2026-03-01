"use client";

import { Mail, Sparkles, ChevronRight, Menu, X, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-5 border-b border-slate-100 bg-white/70 backdrop-blur-2xl">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center ai-pulse-light shadow-lg shadow-secondary/10">
                        <Mail className="text-white" size={20} />
                    </div>
                    <span className="text-xl font-black tracking-tight text-slate-900 uppercase">
                        Mail<span className="text-secondary">Burst</span>
                    </span>
                </Link>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-8"
                >
                    <div className="hidden md:flex items-center gap-8">
                        <Link href="/#pricing" className="text-sm font-bold text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-widest">Pricing</Link>
                        <Link href="/#docs" className="text-sm font-bold text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-widest">Docs</Link>
                        <Link href="/blog" className="text-sm font-bold text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-widest">Blog</Link>
                    </div>
                    <button className="md:hidden p-2 text-slate-900">
                        <Menu size={24} />
                    </button>
                </motion.div>
            </div>
        </nav>
    );
}
