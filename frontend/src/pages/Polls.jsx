import React, { useEffect, useState } from "react";
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
import { formatDistanceToNow } from "date-fns";
import FingerprintJS from '@fingerprintjs/fingerprintjs'
import {io} from 'socket.io-client'

const socket=io('http://localhost:3001')
const Polls = () => {
  const totalVotes = 1010;
  const isVoted = false;
  const votedIndex = 0;
  const viewerCount = 247;

  const barColors = [
    "bg-blue-500",
    "bg-violet-500",
    "bg-emerald-500",
    "bg-amber-500",
  ];
  const barGlows = [
    "shadow-blue-500/30",
    "shadow-violet-500/30",
    "shadow-emerald-500/30",
    "shadow-amber-500/30",
  ];
  const textColors = [
    "text-blue-400",
    "text-violet-400",
    "text-emerald-400",
    "text-amber-400",
  ];
  const ringColors = [
    "ring-blue-500/40",
    "ring-violet-500/40",
    "ring-emerald-500/40",
    "ring-amber-500/40",
  ];

  const { poll, getPoll } = pollStore();
  const [voted,setVotes]=useState(false)
  const [fingerprint,setFingerPrint]=useState(null)


  useEffect(() => {
    getPoll();

    


  }, []);

  console.log(poll);

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

        <main className="md:py-8">
          <div className=" grid grid-cols-2 items-center gap-4">
            {poll.map((item) => (
              <div>
                <div className="bg-white border border-white rounded-2xl overflow-hidden mb-5 mt-5">
                  <div className="px-6 mt-2 border-b border-gray-400 ">
                    <p className="text-xs text-black uppercase tracking-widest font-mono mb-3">
                      Question
                    </p>
                    <h1 className="font-bold text-xl md:text-2xl leading-snug text-black animate-pulse cursor-pointer">
                      {item.question}
                    </h1>
                  </div>

                  <div className="px-6 py-6 space-y-3">
                    {!isVoted &&
                      item.options.map((opt, i) => (
                        <button
                          key={i}
                          className={`
                    group w-full flex items-center gap-4  rounded-xl cursor-pointer
                    bg-gray-100 border border-white
                    hover:bg-white hover:border-white
                   
                    active:scale-[0.99]
                    transition-all duration-150 text-left
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#f4f4f7]
                    ${ringColors[i % ringColors.length]}
                  `}
                        >
                          <div
                            className={`
                    w-9 h-9 rounded-lg flex items-center justify-center
                    text-xs font-semibold shrink-0
                    bg-white/40 text-black
                    group-hover:text-xl
                    group-hover:${barColors[i % barColors.length].replace("bg-", "bg-").replace("500", "500/15")}
                    group-hover:${textColors[i % textColors.length]}
                   duration-150
                  `}
                          >
                            {String.fromCharCode(65 + i)}
                          </div>

                          <span className="text-sm text-black group-hover:text-xl duration-150 flex-1 ">
                            {opt}
                          </span>

                          <svg
                            className="w-4 h-4 text-black group-hover:text-black group-hover:translate-x-0.5 transition-all duration-150 shrink-0"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M8.25 4.5l7.5 7.5-7.5 7.5"
                            />
                          </svg>
                        </button>
                      ))}

                    {isVoted &&
                      item.options.map((opt, i) => {
                        const pct =
                          totalVotes > 0
                            ? Math.round((opt.votes / totalVotes) * 100)
                            : 0;
                        const isWinner =
                          opt.votes ===
                          Math.max(...item.options.map((o) => o.votes));
                        const isChosen = i === votedIndex;

                        return (
                          <div
                            key={i}
                            className={`
                      relative w-full p-4 rounded-xl border overflow-hidden
                      transition-all duration-200
                      ${
                        isChosen
                          ? `border-black/15 bg-black/5`
                          : "border-black/5 bg-black/2"
                      }
                    `}
                          >
                            <div
                              className={`absolute inset-y-0 left-0 ${barColors[i % barColors.length]} opacity-10 transition-all duration-700 ease-out rounded-xl`}
                              style={{ width: `${pct}%` }}
                            />

                            <div className="relative flex items-center gap-3">
                              <div
                                className={`
                        w-9 h-9 rounded-lg flex items-center justify-center
                        text-xs font-semibold shrink-0
                        ${
                          isChosen
                            ? `${barColors[i % barColors.length].replace("500", "500/20")} ${textColors[i % textColors.length]}`
                            : "bg-white/5 text-white/30"
                        }
                      `}
                              >
                                {isChosen ? (
                                  <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2.5}
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M4.5 12.75l6 6 9-13.5"
                                    />
                                  </svg>
                                ) : (
                                  String.fromCharCode(65 + i)
                                )}
                              </div>

                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1.5">
                                  <span
                                    className={`text-sm ${isChosen ? "text-black font-medium" : "text-black/50"}`}
                                  >
                                    {opt.text}
                                  </span>
                                  <div className="flex items-center gap-2 shrink-0 ml-2">
                                    {isWinner && (
                                      <span
                                        className={`text-xs ${textColors[i % textColors.length]} font-medium`}
                                      >
                                        Leading
                                      </span>
                                    )}
                                    <span
                                      className={`text-sm font-['Syne'] font-semibold ${isChosen ? textColors[i % textColors.length] : "text-white/30"}`}
                                    >
                                      {pct}%
                                    </span>
                                  </div>
                                </div>

                                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                  <div
                                    className={`h-full rounded-full ${barColors[i % barColors.length]} shadow-sm ${barGlows[i % barGlows.length]} transition-all duration-700 ease-out`}
                                    style={{ width: `${pct}%` }}
                                  />
                                </div>
                              </div>

                              <span className="text-xs text-white/25 shrink-0 w-14 text-right">
                                {opt.votes.toLocaleString()} votes
                              </span>
                            </div>
                          </div>
                        );
                      })}
                  </div>

                  <div className="py-1 border-t border-white/5 flex items-center justify-between mr-9">
                    <div className="flex items-center gap-1.5 text-xs text-white/30">
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.8}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                        />
                      </svg>
                      {totalVotes.toLocaleString()} total votes
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-black">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Live results
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex-1 bg-white  border border-white/8 rounded-xl px-4 py-3 flex items-center gap-2 overflow-hidden">
                    <svg
                      className="w-3.5 h-3.5 text-black shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.8}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
                      />
                    </svg>
                    <span className="text-xs text-black font-mono truncate">
                      pollpulse.app/p/{poll.shareToken}
                    </span>
                  </div>

                  <button className="shrink-0 bg-white/3 text-black cursor-pointer text-xs font-medium px-4 py-3 rounded-xl hover:bg-white transition-colors">
                    Copy link
                  </button>
                </div>
              </div>
            ))}

            {isVoted && (
              <div className="mt-4 flex items-center gap-2 justify-center text-xs text-black">
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.8}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Your vote has been recorded
              </div>
            )}
          </div>
        </main>
      </motion.section>
    </div>
  );
};

export default Polls;
