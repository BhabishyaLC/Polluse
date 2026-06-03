import React from "react";
import { motion } from "framer-motion";
import { User, Mail, Lock, UserPlus, ArrowLeft } from "lucide-react";

export default function Signup() {
  return (
    <div class="bg-slate-950 text-slate-100 font-sans min-h-screen flex flex-col justify-center items-center px-4 relative overflow-hidden">
      <div class="absolute w-87.5 h-87.5 bg-blue-500/5 rounded-full blur-[130px] top-1/4 left-1/4 pointer-events-none" />
      <div class="absolute w-87.5 h-87.5 bg-cyan-500/5 rounded-full blur-[130px] bottom-1/4 right-1/4 pointer-events-none" />

      <motion.a
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        href="/"
        class="absolute top-6 left-6 text-xs font-semibold text-slate-500 hover:text-slate-300 flex items-center gap-1.5 transition-colors group"
      >
        <ArrowLeft
          size={14}
          class="group-hover:-translate-x-0.5 transition-transform"
        />
        Back to Home
      </motion.a>

      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        class="w-full max-w-md bg-slate-900/40 border border-slate-800/80 p-8 rounded-3xl shadow-2xl backdrop-blur-md z-10"
      >
        <div class="text-center mb-8">
        <div className=" flex items-center space-x-2 justify-center">
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
          </div>
          <h2 class="text-xl font-bold mt-3 text-white tracking-tight">
            Create Account
          </h2>
          <p class="text-xs text-slate-400 mt-1">
            Start deploying dynamic feedback modules instantly.
          </p>
        </div>

        <form class="space-y-5" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Username
            </label>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-600">
                <User size={16} />
              </span>
              <input
                type="text"
                placeholder="johndoe"
                class="w-full bg-slate-950 border border-slate-800/80 focus:border-cyan-500/80 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-500/30 transition-all"
              />
            </div>
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Email Address
            </label>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-600">
                <Mail size={16} />
              </span>
              <input
                type="email"
                placeholder="you@example.com"
                class="w-full bg-slate-950 border border-slate-800/80 focus:border-cyan-500/80 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-500/30 transition-all"
              />
            </div>
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Password
            </label>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-600">
                <Lock size={16} />
              </span>
              <input
                type="password"
                placeholder="Minimum 8 characters"
                class="w-full bg-slate-950 border border-slate-800/80 focus:border-cyan-500/80 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-500/30 transition-all"
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            class="w-full bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold py-3.5 rounded-xl shadow-lg shadow-cyan-500/5 transition-all flex items-center justify-center gap-2 mt-2 cursor-pointer"
          >
            <UserPlus size={16} />
            Get Started
          </motion.button>
        </form>

        <p class="text-center text-xs text-slate-400 mt-6">
          Already have an account?{" "}
          <a
            href="/login"
            class="text-cyan-400 font-semibold hover:underline transition-all"
          >
            Log in instead
          </a>
        </p>
      </motion.div>
    </div>
  );
}
