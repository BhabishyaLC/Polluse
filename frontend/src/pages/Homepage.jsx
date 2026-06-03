import React from "react";
import { motion } from "framer-motion";
import { Zap, Share2, BarChart3, ArrowRight } from "lucide-react";

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div class="bg-slate-950 text-slate-100 font-sans min-h-screen flex flex-col justify-between overflow-x-hidden relative">
      <div class="absolute w-125 h-125 bg-cyan-500/5 rounded-full blur-[140px] -top-40 -left-40 pointer-events-none" />
      <div class="absolute w-100 h-100 bg-blue-500/5 rounded-full blur-[140px] top-1/2 -right-50 pointer-events-none" />

      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        class="max-w-6xl w-full mx-auto px-6 py-5 flex justify-between items-center border-b border-slate-900 z-10"
      >
        <div class="flex items-center space-x-2">
          <div className="w-5 h-5 rounded-md bg-linear-to-br from-blue-500 to-violet-600 flex items-center justify-center">
            <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
              <rect x="2" y="8" width="3" height="6" rx="1" fill="white" opacity="0.7"/>
              <rect x="6.5" y="4" width="3" height="10" rx="1" fill="white" opacity="0.9"/>
              <rect x="11" y="1" width="3" height="13" rx="1" fill="white"/>
            </svg>
          </div>
          <span class="text-2xl font-black bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent tracking-tight">
            Polluse
          </span>
          <span class="bg-cyan-500/10 text-cyan-400 text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full border border-cyan-500/20 flex items-center gap-1">
            <span class="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
            Live
          </span>
        </div>
        <div class="flex items-center space-x-5">
          <a
            href="/login"
            class="text-sm font-medium text-slate-400 hover:text-slate-100 transition-colors"
          >
            Log In
          </a>
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            href="/register"
            class="bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-semibold text-sm px-4 py-2 rounded-xl shadow-lg shadow-cyan-500/10 transition-all"
          >
            Sign Up Free
          </motion.a>
        </div>
      </motion.nav>

      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        class="max-w-4xl w-full mx-auto px-6 py-16 md:py-24 flex flex-col items-center text-center my-auto z-10"
      >
        <motion.div
          variants={itemVariants}
          class="inline-flex items-center space-x-2 bg-slate-900 border border-slate-800 px-3.5 py-1.5 rounded-full mb-8 shadow-inner"
        >
          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span class="text-xs font-medium text-slate-300">
            Zero page refreshes. Just pure real-time data.
          </span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          class="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.15]"
        >
          Create live polls. <br />
          Watch results{" "}
          <span class="bg-linear-to-r from-cyan-400 via-teal-400 to-blue-500 bg-clip-text text-transparent">
            update instantly
          </span>
          .
        </motion.h1>

        <motion.p
          variants={itemVariants}
          class="text-slate-400 text-base md:text-lg max-w-xl mb-12 leading-relaxed"
        >
          The simplest way to gather real-time data. Create a poll, share the
          link, and watch custom feedback charts morph live as your audience
          votes. No login required to vote.
        </motion.p>

        <motion.div
          variants={itemVariants}
          class="grid grid-cols-1 sm:grid-cols-3 gap-5 w-full max-w-3xl mb-14 text-left"
        >
          <div class="bg-slate-900/40 border border-slate-800/80 p-5 rounded-2xl backdrop-blur-sm shadow-xl hover:border-cyan-500/30 transition-colors group">
            <div class="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-110 transition-transform">
              <Zap size={18} />
            </div>
            <h3 class="text-sm font-semibold text-slate-200 mb-1.5">
              1. Create
            </h3>
            <p class="text-xs text-slate-400 leading-relaxed">
              Draft your open custom questions and choices in seconds.
            </p>
          </div>

          <div class="bg-slate-900/40 border border-slate-800/80 p-5 rounded-2xl backdrop-blur-sm shadow-xl hover:border-teal-500/30 transition-colors group">
            <div class="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 mb-4 group-hover:scale-110 transition-transform">
              <Share2 size={18} />
            </div>
            <h3 class="text-sm font-semibold text-slate-200 mb-1.5">
              2. Share Link
            </h3>
            <p class="text-xs text-slate-400 leading-relaxed">
              Distribute your dynamic URL directly to any channel or audience.
            </p>
          </div>

          <div class="bg-slate-900/40 border border-slate-800/80 p-5 rounded-2xl backdrop-blur-sm shadow-xl hover:border-blue-500/30 transition-colors group">
            <div class="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-4 group-hover:scale-110 transition-transform">
              <BarChart3 size={18} />
            </div>
            <h3 class="text-sm font-semibold text-slate-200 mb-1.5">
              3. Watch Live
            </h3>
            <p class="text-xs text-slate-400 leading-relaxed">
              Visual data matrices switch dynamically without full-page reloads.
            </p>
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          class="w-full flex justify-center px-4"
        >
          <motion.a
            whileHover={{
              scale: 1.03,
              boxShadow: "0 20px 30px -10px rgba(6, 182, 212, 0.2)",
            }}
            whileTap={{ scale: 0.98 }}
            href="/register"
            class="bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold px-8 py-4 rounded-xl shadow-xl shadow-cyan-500/10 transition-all text-center flex items-center gap-2 group text-base"
          >
            Create Your First Poll
            <ArrowRight
              size={18}
              class="group-hover:translate-x-1 transition-transform"
            />
          </motion.a>
        </motion.div>
      </motion.main>

      <footer class="border-t border-slate-900/60 py-6 text-center text-xs text-slate-500 z-10">
        &copy; 2026 Polluse Platform. Multi-client persistent architecture.
      </footer>
    </div>
  );
};

export default Home;
