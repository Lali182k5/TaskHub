import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { api, apiErrorMessage } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import { Spinner } from "../components/Spinner";

const CountUp = ({ value, duration = 2 }) => {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {value}
    </motion.span>
  );
};

const CircularProgress = ({ value, color, size = 160, strokeWidth = 12, children }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90 w-full h-full">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="text-white/10"
        />
        <motion.circle
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeLinecap="round"
          className={color}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export const InsightsPage = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data } = await api.get("/tasks");
        setTasks(data.tasks || []);
      } catch (err) {
        toast.error(apiErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const stats = useMemo(() => {
    const now = new Date();
    const threeDaysFromNow = new Date();
    threeDaysFromNow.setDate(now.getDate() + 3);

    const total = tasks.length;
    const completed = tasks.filter(t => t.status === "done").length;
    const inProgress = tasks.filter(t => t.status === "in_progress").length;
    
    // Logic for "Urgent" (Due within 3 days or Overdue)
    const isUrgent = (t) => {
      if (!t.dueDate) return false;
      const due = new Date(t.dueDate);
      return due <= threeDaysFromNow && t.status !== "done";
    };

    // Logic for "Overdue"
    const isOverdue = (t) => {
      if (!t.dueDate) return false;
      const due = new Date(t.dueDate);
      return due < now && t.status !== "done";
    };

    const overdueCount = tasks.filter(isOverdue).length;
    
    // Eisenhower Matrix Counts
    const q1 = tasks.filter(t => t.status !== "done" && t.priority === "high" && isUrgent(t)).length; // Do First
    const q2 = tasks.filter(t => t.status !== "done" && t.priority === "high" && !isUrgent(t)).length; // Schedule
    const q3 = tasks.filter(t => t.status !== "done" && t.priority !== "high" && isUrgent(t)).length; // Delegate
    const q4 = tasks.filter(t => t.status !== "done" && t.priority !== "high" && !isUrgent(t)).length; // Don't Do

    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;
    const productivityScore = Math.min(100, Math.round((completed * 10 + inProgress * 5) / (Math.max(total, 1) * 10) * 100) || 0);

    return {
      total,
      completed,
      inProgress,
      overdueCount,
      q1, q2, q3, q4,
      completionRate,
      productivityScore
    };
  }, [tasks]);

  const getPersona = () => {
    if (stats.overdueCount > 2) return { title: "The Firefighter", desc: "You thrive under pressure, but watch out for burnout!", icon: "🔥", color: "from-orange-500 to-red-600", shadow: "shadow-orange-500/30" };
    if (stats.completionRate > 80 && stats.total > 5) return { title: "The Zen Master", desc: "Balance and focus are your superpowers.", icon: "🧘", color: "from-emerald-500 to-teal-600", shadow: "shadow-emerald-500/30" };
    if (stats.inProgress > stats.completed * 2) return { title: "The Starter", desc: "Great at starting. Let's focus on finishing!", icon: "🚀", color: "from-blue-500 to-indigo-600", shadow: "shadow-blue-500/30" };
    if (stats.total < 3) return { title: "The Minimalist", desc: "Keeping it simple and clean.", icon: "🍃", color: "from-slate-500 to-gray-600", shadow: "shadow-slate-500/30" };
    return { title: "The Strategist", desc: "You have a balanced approach to work.", icon: "🎯", color: "from-violet-500 to-purple-600", shadow: "shadow-violet-500/30" };
  };

  const persona = getPersona();

  if (loading) return <Spinner label="Analyzing workflow..." />;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8 pb-12"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Insights</h1>
          <p className="text-slate-500 mt-2 text-lg">
            Deeper analysis of your <span className="font-semibold text-violet-600">work habits</span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Productivity Score */}
        <motion.div variants={item} className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500 opacity-20 rounded-full blur-3xl -mr-16 -mt-16"></div>
          <div className="relative z-10 flex flex-col items-center text-center h-full justify-center">
            <h3 className="text-slate-300 font-medium mb-6 uppercase tracking-wider text-sm">Productivity Score</h3>
            <CircularProgress value={stats.productivityScore} color="text-violet-400" size={180} strokeWidth={16}>
              <div className="text-center">
                <span className="text-5xl font-bold tracking-tighter text-white">{stats.productivityScore}</span>
              </div>
            </CircularProgress>
            <p className="mt-6 text-slate-400 text-sm max-w-xs">
              Calculated based on task completion velocity and priority management.
            </p>
          </div>
        </motion.div>

        {/* Work Persona */}
        <motion.div variants={item} className={`lg:col-span-2 bg-gradient-to-br ${persona.color} rounded-3xl p-8 text-white relative overflow-hidden shadow-xl ${persona.shadow}`}>
          <div className="absolute bottom-0 left-0 w-full h-full bg-white opacity-5 mix-blend-overlay"></div>
          <div className="relative z-10 h-full flex flex-col justify-center items-start">
            <div className="bg-white/20 backdrop-blur-md p-4 rounded-2xl mb-6 text-4xl shadow-inner">
              {persona.icon}
            </div>
            <h2 className="text-3xl font-bold mb-2">You are {persona.title}</h2>
            <p className="text-white/80 text-xl font-medium leading-relaxed max-w-xl">
              "{persona.desc}"
            </p>
            <div className="mt-8 flex gap-4">
               <div className="bg-black/20 px-4 py-2 rounded-lg backdrop-blur-sm">
                  <span className="block text-xs opacity-70 uppercase tracking-wider">Completion Rate</span>
                  <span className="text-xl font-bold">{stats.completionRate}%</span>
               </div>
               <div className="bg-black/20 px-4 py-2 rounded-lg backdrop-blur-sm">
                  <span className="block text-xs opacity-70 uppercase tracking-wider">Active Tasks</span>
                  <span className="text-xl font-bold">{stats.total - stats.completed}</span>
               </div>
            </div>
          </div>
        </motion.div>

        {/* The Eisenhower Matrix */}
        <motion.div variants={item} className="lg:col-span-3 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
             <div>
                <h3 className="text-xl font-bold text-slate-900">Priority Matrix</h3>
                <p className="text-slate-500 text-sm">Where should you focus your energy?</p>
             </div>
             <div className="text-xs font-medium bg-slate-100 text-slate-600 px-3 py-1 rounded-full">
                Based on Eisenhower Method
             </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Q1 */}
            <div className="bg-rose-50 p-6 rounded-2xl border border-rose-100 relative group hover:shadow-md transition-all">
              <div className="absolute top-4 right-4 w-8 h-8 bg-rose-100 rounded-full flex items-center justify-center text-rose-600 font-bold text-sm">
                {stats.q1}
              </div>
              <h4 className="text-rose-700 font-bold mb-1">Do First</h4>
              <p className="text-rose-600/70 text-xs mb-4 uppercase tracking-wide font-semibold">Urgent & Important</p>
              <p className="text-rose-800 text-sm leading-relaxed">
                Crises, deadlines, and pressing problems. <span className="font-bold">Focus here immediately.</span>
              </p>
            </div>

            {/* Q2 */}
            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 relative group hover:shadow-md transition-all">
              <div className="absolute top-4 right-4 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm">
                {stats.q2}
              </div>
              <h4 className="text-blue-700 font-bold mb-1">Schedule</h4>
              <p className="text-blue-600/70 text-xs mb-4 uppercase tracking-wide font-semibold">Not Urgent & Important</p>
              <p className="text-blue-800 text-sm leading-relaxed">
                Strategic planning and long-term goals. <span className="font-bold">Block time for these.</span>
              </p>
            </div>

            {/* Q3 */}
            <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100 relative group hover:shadow-md transition-all">
              <div className="absolute top-4 right-4 w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 font-bold text-sm">
                {stats.q3}
              </div>
              <h4 className="text-amber-700 font-bold mb-1">Delegate</h4>
              <p className="text-amber-600/70 text-xs mb-4 uppercase tracking-wide font-semibold">Urgent & Not Important</p>
              <p className="text-amber-800 text-sm leading-relaxed">
                Interruptions and meetings. <span className="font-bold">Try to minimize these.</span>
              </p>
            </div>

            {/* Q4 */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 relative group hover:shadow-md transition-all">
              <div className="absolute top-4 right-4 w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center text-slate-600 font-bold text-sm">
                {stats.q4}
              </div>
              <h4 className="text-slate-700 font-bold mb-1">Eliminate</h4>
              <p className="text-slate-500 text-xs mb-4 uppercase tracking-wide font-semibold">Not Urgent & Not Important</p>
              <p className="text-slate-600 text-sm leading-relaxed">
                Time wasters and busy work. <span className="font-bold">Avoid if possible.</span>
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
};