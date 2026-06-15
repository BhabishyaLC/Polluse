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
import API from "../../api/axios.js";
import toast from "react-hot-toast";
import { userStore } from "./store/userStore.js";
import Polls from "./Polls.jsx";
import { pollStore } from "./store/pollStore.js";
export default function Dashboard() {
  const [data, setData] = useState({ question: "", options: ["", "", "", ""] });

  const option = ["A", "B", "C", "D"];

  const { user, getUser } = userStore();
  const { getPoll } = pollStore();
  


  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleOptionChange = (e) => {
    const index = parseInt(e.target.dataset.index, 10);
    const newValue = e.target.value;

    const updatedOptions = [...data.options];
    updatedOptions[index] = newValue;

    setData({
      ...data,
      options: updatedOptions,
    });
  };

  useEffect(() => {
    getUser();
  }, []);



  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/poll/create", data);

      toast.success("Poll is active now...");

      getPoll()
      setData({question:"" , options:["","","",""]})
     
    } catch (error) {
      console.log(error);
      const message = error.response?.data?.message || "Something went wrong";
      toast.error(message);
    }
  };

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
    <div class="bg-slate-50 text-slate-800 font-sans min-h-screen flex flex-col overflow-x-hidden relative">
      <div
        class="absolute inset-0 opacity-[0.1] bg-cover bg-center bg-no-repeat mix-blend-darken pointer-events-none z-0"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop")',
        }}
      />

      <nav class="w-full bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center z-10 shadow-sm">
        <div class="flex items-center space-x-2.5">
          <div class="p-2 bg-slate-900 rounded-xl">
            <Sparkles size={15} class="text-white" />
          </div>
          <span class="text-xl font-black text-slate-900 tracking-tight">
            Polluse.
          </span>
        </div>

        <div class="flex items-center space-x-4">
          <div class="flex items-center space-x-1.5 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-xl text-xs text-slate-600 font-medium">
            <User size={13} class="text-slate-500" />
            <span>{user?.name}</span>
          </div>
          <button class="text-slate-400 hover:text-rose-500 transition-colors p-2 rounded-xl hover:bg-rose-50 cursor-pointer">
            <LogOut size={16} />
          </button>
        </div>
      </nav>

      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        class="max-w-4xl w-full mx-auto px-6 py-10 flex-1 z-10 space-y-8"
      >
        <motion.section
          variants={itemVariants}
          class="grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          <div class="bg-white border border-slate-200 p-5 rounded-xl flex items-center justify-between shadow-sm backdrop-blur-sm">
            <div>
              <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">
                Total Active Polls
              </p>
              <h3 class="text-2xl font-bold text-slate-900 tracking-tight">
                12
              </h3>
            </div>
            <div class="w-9 h-9 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500">
              <Layers size={16} />
            </div>
          </div>

          <div class="bg-white border border-slate-200 p-5 rounded-xl flex items-center justify-between shadow-sm backdrop-blur-sm">
            <div>
              <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">
                Captured Votes
              </p>
              <h3 class="text-2xl font-bold text-slate-900 tracking-tight">
                1,420
              </h3>
            </div>
            <div class="w-9 h-9 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500">
              <Users size={16} />
            </div>
          </div>

          <div class="bg-white border border-slate-200 p-5 rounded-xl flex items-center justify-between shadow-sm backdrop-blur-sm">
            <div>
              <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">
                Real-time Stream
              </p>
              <h3 class="text-2xl font-bold text-slate-900 tracking-tight">
                3{" "}
                <span class="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded ml-1 border border-emerald-200 animate-pulse">
                  Live
                </span>
              </h3>
            </div>
            <div class="w-9 h-9 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500">
              <BarChart3 size={16} />
            </div>
          </div>
        </motion.section>

        <motion.section
          variants={itemVariants}
          class="bg-white/90 border border-slate-200 p-6 rounded-2xl shadow-sm backdrop-blur-sm"
        >
          <div class="flex items-center gap-2 mb-5">
            <PlusCircle size={18} class="text-slate-800" />
            <h2 class="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Generate a Live Poll Node
            </h2>
          </div>

          <form class="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label class="block text-[10px] font-bold text-black uppercase tracking-widest mb-1.5">
                Prompt Question
              </label>
              <input
                name="question"
                value={data.question}
                onChange={handleChange}
                type="text"
                required
                placeholder="What statement or question are we analyzing?"
                class="w-full bg-slate-50 border border-slate-200 focus:border-slate-400 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none transition-all"
              />
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
              {option.map((opt, i) => (
                <div key={i}>
                  <label class="block text-[10px] font-bold text-black uppercase tracking-widest mb-1.5">
                    Option {i + 1}
                  </label>
                  <input
                    name="options"
                    type="text"
                    data-index={i}
                    value={data.options[i] || ""}
                    onChange={handleOptionChange}
                    required
                    placeholder={`Choice ${String.fromCharCode(65 + i)}`}
                    class="w-full bg-slate-50 border border-slate-200 focus:border-slate-400 rounded-xl px-3 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none transition-all"
                  />
                </div>
              ))}
            </div>
            <div class="flex justify-end pt-2">
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                class="bg-slate-900 hover:bg-slate-800 text-white font-medium py-2.5 px-6 rounded-xl shadow-sm transition-all text-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                Launch Active Poll
              </motion.button>
            </div>
          </form>
        </motion.section>
            <Polls/>
   
      </motion.main>
    </div>
  );
}
