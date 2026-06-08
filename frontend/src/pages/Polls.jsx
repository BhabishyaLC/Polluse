import React, { useEffect } from "react";
import { motion } from "framer-motion";
import {
  PlusCircle,
  BarChart3,
  Layers,
  Users,
  Copy,
  Trash2,
  ExternalLink,
  CheckCircle,
  LogOut,
  User,
  Sparkles,
} from "lucide-react";
import { pollStore } from "./store/pollStore.js";
import {formatDistanceToNow} from 'date-fns'
const Polls = () => {

    const {poll,getPoll}=pollStore()


    useEffect(()=>{
        getPoll()
    },[])

    console.log(poll)

      const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };
  return (
    <div>
      <motion.section variants={itemVariants} class="space-y-3">
        <div class="flex items-center justify-between mb-1 px-1">
          <div class="flex items-center gap-2">
            <BarChart3 size={15} class="text-slate-500" />
            <h2 class="text-xs font-bold text-slate-400 uppercase tracking-widest">
              My polls
            </h2>
          </div>
        </div>

    {poll.map((item)=>(
        <div class="bg-white/90 border border-slate-200 p-4 rounded-xl shadow-sm hover:border-slate-300 transition-all backdrop-blur-sm">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2.5 border-b border-slate-100">
            <div>
              <div class="flex items-center gap-2 mb-0.5">
                <span class="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-100 text-[9px] font-bold tracking-wider px-1.5 py-0.5 rounded">
                  Sync Active
                </span>
                <span class="text-[11px] text-slate-400">
                {formatDistanceToNow(new Date(item?.createdAt),{
                    addSuffix:true
                })}
                </span>
              </div>
              <h4 class="text-sm font-semibold text-slate-800">
                {item?.question}
              </h4>
            </div>
            <div class="flex items-center space-x-1 self-start sm:self-auto">
              <button
                class="p-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-500 rounded-lg transition-colors cursor-pointer"
                title="Copy URL"
              >
                <Copy size={13} />
              </button>
              <button
                class="p-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-500 rounded-lg transition-colors cursor-pointer"
                title="Open View"
              >
                <ExternalLink size={13} />
              </button>
              <button
                class="p-2 bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 text-slate-400 hover:text-rose-500 rounded-lg transition-colors cursor-pointer"
                title="Terminate"
              >
                <Trash2 size={13} />
              </button>
            </div>
          </div>

          <div class="pt-2.5 flex items-center justify-between text-xs text-slate-500">
            <span>
              Total Payload:{" "}
              <strong class="text-slate-700 font-medium">432 records</strong>
            </span>
            <span class="text-slate-700 font-semibold bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-md text-[11px]">
              Zustand Leading (54%)
            </span>
          </div>
        </div>

    ))}
        
        <div class="bg-white/60 border border-slate-200/80 p-4 rounded-xl shadow-sm opacity-70 backdrop-blur-sm">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2.5 border-b border-slate-100">
            <div>
              <div class="flex items-center gap-2 mb-0.5">
                <span class="inline-flex items-center gap-1 bg-slate-100 text-slate-500 border border-slate-200 text-[9px] font-bold tracking-wider px-1.5 py-0.5 rounded">
                  Archived
                </span>
                <span class="text-[11px] text-slate-400">3d ago</span>
              </div>
              <h4 class="text-sm font-semibold text-slate-600">
                Is serverless deployment the future of backends?
              </h4>
            </div>
            <div class="flex items-center space-x-1 self-start sm:self-auto">
              <button
                class="p-2 bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 text-slate-400 hover:text-rose-500 rounded-lg transition-colors cursor-pointer"
                title="Purge"
              >
                <Trash2 size={13} />
              </button>
            </div>
          </div>

          <div class="pt-2.5 flex items-center justify-between text-xs text-slate-400">
            <span>Final Payload: 988 records</span>
            <span class="text-slate-500 font-medium flex items-center gap-1 text-[11px]">
              <CheckCircle size={12} class="text-slate-400" /> Yes absolute
              (78%)
            </span>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Polls;
