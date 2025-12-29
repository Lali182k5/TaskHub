import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { api, apiErrorMessage } from "../lib/api";
import { toast } from "react-hot-toast";

const fmtDate = (value) => {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
};

const badge = (className) => `badge flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border ${className}`;

const statusBadge = (status) => {
  if (status === "done") return badge("border-emerald-200 bg-emerald-50 text-emerald-700 shadow-sm shadow-emerald-100");
  if (status === "in_progress") return badge("border-blue-200 bg-blue-50 text-blue-700 shadow-sm shadow-blue-100");
  return badge("border-slate-200 bg-slate-50 text-slate-600 shadow-sm");
};

const priorityBadge = (priority) => {
  if (priority === "high") return badge("border-rose-200 bg-rose-50 text-rose-700 shadow-sm shadow-rose-100");
  if (priority === "low") return badge("border-emerald-200 bg-emerald-50 text-emerald-700 shadow-sm shadow-emerald-100");
  return badge("border-amber-200 bg-amber-50 text-amber-700 shadow-sm shadow-amber-100");
};

const StatusIcon = ({ status }) => {
  if (status === "done") return <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>;
  if (status === "in_progress") return <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
  return <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>;
};

const PriorityIcon = ({ priority }) => {
  if (priority === "high") return <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>;
  if (priority === "low") return <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" /></svg>;
  return <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" /></svg>;
};

export const TaskCard = ({ task, index }) => {
  const handleDelete = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    
    try {
      await api.delete(`/tasks/${task._id}`);
      toast.success("Task deleted");
      window.location.reload(); // Simple reload to refresh state
    } catch (err) {
      toast.error(apiErrorMessage(err));
    }
  };

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="card group relative overflow-hidden bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-500/10 ring-1 ring-slate-900/5 h-full flex flex-col"
    >
      {/* Gradient Overlay on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-indigo-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />
      
      <Link to={`/tasks/${task._id}`} className="absolute inset-0 z-0" />
      
      {/* Action Buttons - Visible on Hover */}
      <div className="absolute top-4 right-4 z-10 flex gap-2 opacity-0 transform translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
        <Link 
          to={`/tasks/${task._id}/edit`}
          className="p-2 bg-white text-slate-500 hover:text-violet-600 rounded-lg shadow-sm border border-slate-100 hover:border-violet-100 transition-colors hover:shadow-md"
          title="Edit Task"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
        </Link>
        <button 
          onClick={handleDelete}
          className="p-2 bg-white text-slate-500 hover:text-rose-600 rounded-lg shadow-sm border border-slate-100 hover:border-rose-100 transition-colors hover:shadow-md"
          title="Delete Task"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
        </button>
      </div>

      <div className="mb-4 flex items-start justify-between gap-4 pr-12 flex-grow relative z-0">
        <div className="space-y-1.5 w-full">
          <h3 className="font-bold text-lg text-slate-800 group-hover:text-violet-600 transition-colors leading-tight">{task.title}</h3>
          <p className="text-sm text-slate-500 line-clamp-3 leading-relaxed font-normal">{task.description || "No description provided."}</p>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-slate-50 pt-4 mt-auto relative z-0">
        <div className="flex gap-2">
          <span className={statusBadge(task.status)}>
            <StatusIcon status={task.status} />
            {task.status.replace("_", " ")}
          </span>
          <span className={priorityBadge(task.priority)}>
            <PriorityIcon priority={task.priority} />
            {task.priority}
          </span>
        </div>
        <div className="text-xs font-medium text-slate-400 flex items-center gap-1">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {fmtDate(task.dueDate)}
        </div>
      </div>
    </motion.div>
  );
};
