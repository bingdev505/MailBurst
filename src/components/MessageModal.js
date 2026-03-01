"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, User, ArrowLeft, ArrowRight, Share2, Printer } from 'lucide-react';

export default function MessageModal({ isOpen, onClose, message }) {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-slate-900/40 backdrop-blur-xl">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.98, y: 30 }}
                        className="premium-card w-full max-w-6xl h-full max-h-[90vh] flex flex-col overflow-hidden bg-white shadow-[0_32px_128px_-12px_rgba(30,41,59,0.1)]"
                    >
                        {/* Header Area */}
                        <div className="p-8 md:p-12 border-b border-slate-100 flex flex-col md:flex-row justify-between items-start gap-8 bg-slate-50/50">
                            <div className="space-y-6 flex-1">
                                <button
                                    onClick={onClose}
                                    className="group flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-all text-[10px] font-black tracking-widest uppercase"
                                >
                                    <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                                    Return to Inbox
                                </button>

                                <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-[1.1] tracking-tight">
                                    {message?.subject || '(No Subject)'}
                                </h2>

                                <div className="flex flex-wrap gap-10">
                                    <div className="space-y-1.5">
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block">Origin</span>
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
                                                <User size={14} className="text-secondary" />
                                            </div>
                                            <span className="font-black text-slate-800 text-sm">{message?.from?.address || message?.from}</span>
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block">Timestamp</span>
                                        <div className="flex items-center gap-3 text-slate-500">
                                            <Calendar size={16} />
                                            <span className="font-bold text-sm">
                                                {message?.createdAt ? new Date(message.createdAt).toLocaleString() : message?.date}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 self-end md:self-start">
                                <button className="p-4 bg-white border border-slate-200 rounded-2xl text-slate-500 hover:text-slate-900 hover:border-slate-300 transition-all shadow-sm">
                                    <Printer size={20} />
                                </button>
                                <button className="p-4 bg-white border border-slate-200 rounded-2xl text-slate-500 hover:text-slate-900 hover:border-slate-300 transition-all shadow-sm">
                                    <Share2 size={20} />
                                </button>
                                <button
                                    onClick={onClose}
                                    className="p-4 bg-slate-900 text-white rounded-2xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Message Content Container */}
                        <div className="flex-1 overflow-y-auto bg-white p-8 md:p-16">
                            <div className="max-w-4xl">
                                {message?.html && message.html.length > 0 ? (
                                    <div className="w-full h-full min-h-[500px] border border-slate-100 rounded-3xl overflow-hidden bg-white shadow-inner">
                                        <iframe
                                            srcDoc={message.html[0]}
                                            className="w-full h-full min-h-[500px] border-none"
                                            title="Email Content"
                                            sandbox="allow-popups allow-popups-to-escape-sandbox"
                                            onLoad={(e) => {
                                                try {
                                                    const iframe = e.target;
                                                    if (iframe.contentWindow?.document.body) {
                                                        iframe.style.height = iframe.contentWindow.document.body.scrollHeight + 'px';
                                                    }
                                                } catch (err) {
                                                    console.warn('Iframe resize failed:', err);
                                                }
                                            }}
                                        />
                                    </div>
                                ) : (
                                    <pre className="whitespace-pre-wrap font-sans text-slate-700 leading-loose text-lg font-medium bg-slate-50 p-8 rounded-3xl border border-slate-100">
                                        {message?.text || message?.textBody || 'No data found in message body.'}
                                    </pre>
                                )}
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="p-8 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
                            <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                <ShieldCheck size={14} className="text-secondary" />
                                Secured by MailBurst AI
                            </div>
                            <button
                                onClick={onClose}
                                className="px-12 py-4 bg-slate-900 text-white font-black text-xs rounded-2xl hover:bg-slate-800 transition-all hover:scale-[1.02] tracking-[0.2em] shadow-2xl shadow-slate-900/10"
                            >
                                CLOSE SESSION
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

function ShieldCheck({ size, className }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" />
        </svg>
    )
}
