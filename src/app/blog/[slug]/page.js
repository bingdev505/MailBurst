'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    Calendar,
    Clock,
    User,
    Mail,
    ChevronLeft
} from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { blogPosts } from '@/data/blogPosts';
import { useParams } from 'next/navigation';

export default function BlogPostPage() {
    const params = useParams();
    const post = blogPosts.find(p => p.slug === params.slug);

    if (!post) {
        return (
            <main className="min-h-screen pt-32 pb-24 px-6 md:px-12 relative flex items-center justify-center">
                <div className="mesh-gradient-bg" />
                <Navbar />
                <div className="text-center space-y-6">
                    <h1 className="text-4xl font-black text-slate-900">Post Not Found</h1>
                    <Link href="/blog" className="inline-flex items-center gap-2 text-secondary font-bold uppercase tracking-widest text-sm">
                        <ArrowLeft size={16} /> Back to Blog
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen pt-32 pb-24 px-6 md:px-12 relative overflow-hidden">
            <div className="mesh-gradient-bg" />
            <Navbar />

            <div className="max-w-4xl mx-auto space-y-12 relative z-10">
                {/* Back Link */}
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <Link href="/blog" className="inline-flex items-center gap-2 text-slate-400 hover:text-secondary transition-colors font-bold uppercase tracking-widest text-[10px]">
                        <ChevronLeft size={14} /> Back to Chronicles
                    </Link>
                </motion.div>

                {/* Post Header */}
                <div className="space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full ${post.bgColor} border border-white/50 text-[10px] font-black tracking-[0.2em] uppercase ${post.color}`}
                    >
                        <post.icon size={12} />
                        {post.category}
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 leading-tight"
                    >
                        {post.title}
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-wrap items-center gap-6 pt-4 border-t border-slate-100"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center">
                                <User size={16} className="text-slate-400" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black text-slate-900 uppercase tracking-wider">{post.author}</span>
                                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Author</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            <span className="flex items-center gap-2"><Calendar size={14} /> {post.date}</span>
                            <span className="flex items-center gap-2"><Clock size={14} /> {post.readTime}</span>
                        </div>
                    </motion.div>
                </div>

                {/* Post Image Placeholder / Hero */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className={`aspect-[21/9] rounded-[32px] ${post.bgColor} border border-slate-100 flex items-center justify-center relative overflow-hidden group`}
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/40" />
                    <post.icon size={120} className={`${post.color} opacity-20 transform transition-transform group-hover:scale-110 duration-700`} />
                </motion.div>

                {/* Post Content */}
                <motion.article
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="blog-content"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Featured Card (Newsletter) - Reused from main blog page */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="premium-card p-2 bg-slate-900 shadow-2xl overflow-hidden relative mt-20"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/20 blur-[100px] rounded-full -mr-32 -mt-32" />
                    <div className="bg-white/5 backdrop-blur-3xl rounded-[26px] p-10 md:p-16 flex flex-col md:flex-row items-center gap-12 relative z-10 border border-white/10">
                        <div className="flex-1 space-y-6 text-center md:text-left">
                            <h2 className="text-4xl font-black text-white tracking-tighter leading-none">
                                Keep your inbox bursting.
                            </h2>
                            <p className="text-white/60 text-lg font-medium max-w-md">
                                Join our newsletter for more privacy insights and MailBurst updates.
                            </p>
                        </div>
                        <div className="w-full md:w-auto flex flex-col sm:flex-row gap-4">
                            <input
                                type="email"
                                placeholder="your@email.com"
                                className="px-8 py-5 bg-white/5 border border-white/10 rounded-2xl text-white font-bold focus:outline-none focus:border-secondary transition-all w-full md:w-80"
                            />
                            <button className="px-10 py-5 bg-white text-slate-900 font-black rounded-2xl hover:bg-slate-100 transition-all shadow-xl uppercase tracking-widest text-sm">
                                Join
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* End of Content Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="py-12 flex flex-col items-center justify-center text-center space-y-4"
                >
                    <div className="w-12 h-px bg-slate-200" />
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">End of Chronicles</p>
                    <div className="w-12 h-px bg-slate-200" />
                </motion.div>

                {/* CTA Section */}
                <div className="pt-8 text-center">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-3 px-10 py-5 bg-slate-900 text-white font-black rounded-full hover:bg-slate-800 transition-all hover:scale-105 shadow-2xl shadow-slate-900/20 uppercase tracking-[0.2em] text-sm"
                    >
                        <ArrowLeft size={20} />
                        Back to Chronicles
                    </Link>
                </div>
            </div>
        </main>
    );
}
