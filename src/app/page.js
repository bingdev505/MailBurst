"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Copy,
  RefreshCw,
  Plus,
  Mail,
  Inbox,
  ChevronRight,
  ShieldCheck,
  Zap,
  Clock,
  Sparkles,
  Check,
  Trash2
} from 'lucide-react';
import { useMailbox } from '@/hooks/useMailbox';
import MessageModal from '@/components/MessageModal';

export default function Home() {
  const {
    email,
    messages,
    isLoading,
    isRefreshing,
    generateNewEmail,
    checkInbox,
    getMessageContent,
    deleteMessage
  } = useMailbox();

  const [selectedMessage, setSelectedMessage] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleViewMessage = async (msg) => {
    const fullMsg = await getMessageContent(msg.id);
    setSelectedMessage(fullMsg || msg);
  };

  return (
    <main className="min-h-screen pt-36 pb-32 px-6 selection:bg-secondary/20">
      <div className="mesh-gradient-bg" />

      <div className="max-w-6xl mx-auto space-y-20">
        {/* Hero Section */}
        <section className="text-center space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-slate-50 border border-slate-100 text-slate-500 text-[10px] font-black tracking-[0.2em] uppercase">
              <Sparkles size={12} className="text-secondary" />
              Empowering Digital Privacy
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-slate-900 leading-[0.9]">
              Your inbox, <br />
              <span className="text-secondary">redefined.</span>
            </h1>
            <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
              Professional disposable email addresses for developers, testers, and security-conscious users.
            </p>
          </motion.div>

          {/* Email Generation Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="premium-card p-2 bg-slate-50 shadow-2xl mx-auto max-w-4xl"
          >
            <div className="bg-white rounded-[26px] p-6 md:p-10 flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1 w-full text-left bg-slate-50/50 rounded-[22px] px-8 py-7 border border-slate-100 relative group transition-all hover:bg-slate-50">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Generated Address</span>
                <input
                  type="text"
                  readOnly
                  value={isLoading ? 'Creating account...' : email}
                  className="w-full bg-transparent text-slate-900 text-2xl md:text-3xl font-black focus:outline-none truncate tracking-tight"
                />
                {!isLoading && (
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-secondary ai-pulse-light" />
                    <span className="text-[10px] font-black text-secondary uppercase tracking-widest">Active</span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-4 w-full md:w-auto">
                <button
                  onClick={handleCopy}
                  className="flex-1 md:flex-none flex items-center justify-center gap-3 px-10 py-7 bg-slate-900 text-white font-black rounded-[22px] hover:bg-slate-800 transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-slate-900/10 whitespace-nowrap tracking-widest text-sm"
                >
                  {copied ? <Check size={20} /> : <Copy size={20} />}
                  {copied ? 'COPIED!' : 'COPY'}
                </button>
                <button
                  onClick={generateNewEmail}
                  title="Burn address and get new one"
                  className="flex flex-col items-center justify-center w-[88px] h-[88px] bg-white border border-slate-100 text-slate-900 rounded-[22px] hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-all shadow-sm group/burn"
                >
                  <Plus size={32} className="group-hover/burn:rotate-90 transition-transform" />
                  <span className="text-[10px] font-black uppercase tracking-tighter mt-1">Burn</span>
                </button>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Inbox Section */}
        <section className="space-y-8">
          <div className="flex items-center justify-between px-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-secondary/5 flex items-center justify-center border border-secondary/10">
                <Inbox size={24} className="text-secondary" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Recent Inbound</h2>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Listening...</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => checkInbox(true)}
              disabled={isRefreshing}
              className="flex items-center gap-3 px-6 py-3 bg-white border border-slate-200 text-slate-900 text-xs font-black rounded-full hover:bg-slate-50 transition-all shadow-sm disabled:opacity-50 uppercase tracking-widest"
            >
              <RefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} />
              Sync
            </button>
          </div>

          <div className="premium-card overflow-hidden bg-white">
            {messages.length === 0 ? (
              <div className="py-40 flex flex-col items-center justify-center text-center space-y-6">
                <div className="w-24 h-24 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100 mb-2">
                  <Mail size={40} className="text-slate-200" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-slate-900">Your inbox is empty</h3>
                  <p className="text-slate-500 font-medium max-w-sm mx-auto">
                    Awaiting incoming mail. Share your temporary address to see messages appear here instantly.
                  </p>
                </div>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {messages.map((msg, idx) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => handleViewMessage(msg)}
                    className="group flex flex-col md:flex-row md:items-center gap-6 md:gap-12 px-10 py-8 hover:bg-slate-50/50 cursor-pointer transition-all"
                  >
                    <div className="md:w-1/4">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Sender</span>
                      <div className="font-black text-slate-900 truncate group-hover:text-secondary transition-colors text-lg">
                        {msg.from?.address || msg.from}
                      </div>
                    </div>
                    <div className="flex-1">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Subject</span>
                      <div className="text-slate-600 truncate group-hover:text-slate-900 transition-colors font-semibold text-lg">
                        {msg.subject || msg.intro || '(No Subject)'}
                      </div>
                    </div>
                    <div className="flex items-center justify-between md:justify-end gap-10 md:w-32">
                      <div className="text-right">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Arrived</span>
                        <span className="text-sm font-black text-slate-400">
                          {msg.createdAt ? new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : msg.date}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteMessage(msg.id);
                          }}
                          className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all"
                        >
                          <Trash2 size={18} />
                        </button>
                        <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-secondary group-hover:text-white transition-all">
                          <ChevronRight size={20} />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Feature Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-10">
          {[
            { icon: ShieldCheck, title: 'Ironclad Security', desc: 'Enterprise-level encryption and zero-data retention policies for ultimate anonymity.' },
            { icon: Zap, title: 'Ultra Fast', desc: 'Generated by high-performance clusters, your new address is ready in milliseconds.' },
            { icon: Clock, title: 'Smart Expiry', desc: 'Accounts persist for 30 days of testing, or can be burned instantly at your command.' }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * i }}
              className="premium-card p-10 space-y-6 bg-white hover:shadow-xl transition-all"
            >
              <div className="w-14 h-14 rounded-2xl bg-secondary/5 border border-secondary/10 flex items-center justify-center text-secondary">
                <feature.icon size={28} />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-black text-slate-900 tracking-tight">{feature.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </section>
      </div>

      <MessageModal
        isOpen={!!selectedMessage}
        onClose={() => setSelectedMessage(null)}
        message={selectedMessage}
      />
    </main>
  );
}
