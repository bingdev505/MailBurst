'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    Calendar,
    Clock,
    User,
    ChevronRight,
    Zap,
    Shield,
    EyeOff,
    Mail
} from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { blogPosts } from '@/data/blogPosts';

export default function BlogPage() {
    return (
        <main className="min-h-screen pt-32 pb-24 px-6 md:px-12 relative overflow-hidden">
            <div className="mesh-gradient-bg" />
            <Navbar />

            <div className="max-w-7xl mx-auto space-y-16 relative z-10">
                {/* Header Section */}
                <div className="space-y-6 text-center max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-slate-50 border border-slate-100 text-slate-500 text-[10px] font-black tracking-[0.2em] uppercase"
                    >
                        <Mail size={12} className="text-secondary" />
                        Insights & Updates
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 leading-none"
                    >
                        The MailBurst <br />
                        <span className="text-secondary">Chronicles</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-500 text-lg font-medium leading-relaxed"
                    >
                        Deep dives into privacy, security, and the evolving landscape of digital communication. Stay informed, stay burst.
                    </motion.p>
                </div>

                {/* Blog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map((post, idx) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + idx * 0.1 }}
                            className="premium-card group bg-white flex flex-col h-full hover:shadow-2xl hover:shadow-slate-200/50 transition-all border border-slate-100 overflow-hidden"
                        >
                            <Link href={`/blog/${post.slug}`} className="p-8 md:p-10 flex-1 flex flex-col">
                                <div className={`w-14 h-14 rounded-2xl ${post.bgColor} flex items-center justify-center ${post.color} mb-8 border border-white/50 shadow-sm transition-transform group-hover:scale-110`}>
                                    <post.icon size={28} />
                                </div>

                                <div className="flex items-center gap-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-4">
                                    <span className="px-3 py-1 bg-slate-50 rounded-lg border border-slate-100">{post.category}</span>
                                    <span className="flex items-center gap-1.5"><Clock size={12} /> {post.readTime}</span>
                                </div>

                                <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-tight mb-4 group-hover:text-secondary transition-colors">
                                    {post.title}
                                </h3>

                                <p className="text-slate-500 font-medium leading-relaxed mb-8 line-clamp-3">
                                    {post.excerpt}
                                </p>

                                <div className="mt-auto pt-8 border-t border-slate-50 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center">
                                            <User size={16} className="text-slate-400" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-black text-slate-900 uppercase tracking-wider">{post.author}</span>
                                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{post.date}</span>
                                        </div>
                                    </div>

                                    <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center group-hover:bg-secondary transition-all shadow-lg shadow-slate-900/10">
                                        <ChevronRight size={20} />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>



                {/* CTA Section */}
                <div className="pt-8 text-center">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-3 px-10 py-5 bg-slate-900 text-white font-black rounded-full hover:bg-slate-800 transition-all hover:scale-105 shadow-2xl shadow-slate-900/20 uppercase tracking-[0.2em] text-sm"
                    >
                        <ArrowLeft size={20} />
                        Back to App
                    </Link>
                </div>
            </div>
        </main>
    );
}
