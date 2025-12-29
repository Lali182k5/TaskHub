import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { api, apiErrorMessage } from "../lib/api";
import { Spinner } from "../components/Spinner";
import { TaskFilters } from "../components/TaskFilters";
import { TaskCard } from "../components/TaskCard";
import { DashboardStats } from "../components/DashboardStats";

const buildQuery = (filters) => {
  const params = new URLSearchParams();
  if (filters.status) params.set("status", filters.status);
  if (filters.priority) params.set("priority", filters.priority);
  if (filters.dueAfter) params.set("dueAfter", filters.dueAfter);
  if (filters.dueBefore) params.set("dueBefore", filters.dueBefore);
  if (filters.sort) params.set("sort", filters.sort);
  const q = params.toString();
  return q ? `?${q}` : "";
};

export const DashboardPage = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    status: "",
    priority: "",
    dueAfter: "",
    dueBefore: "",
    sort: "dueDate:asc",
    search: "",
  });

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const query = useMemo(() => buildQuery(filters), [filters]);

  const filteredTasks = useMemo(() => {
    if (!filters.search) return tasks;
    const lower = filters.search.toLowerCase();
    return tasks.filter(
      (t) =>
        t.title.toLowerCase().includes(lower) ||
        (t.description && t.description.toLowerCase().includes(lower))
    );
  }, [tasks, filters.search]);

  const load = async () => {
    setLoading(true);

    try {
      const { data } = await api.get(`/tasks${query}`);
      setTasks(data.tasks || []);
    } catch (err) {
      toast.error(apiErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  // Keyboard shortcut for creating new task
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'n') {
        e.preventDefault();
        navigate('/tasks/new');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between animate-fade-in">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            <span className="block">Dashboard</span>
          </h1>
          <p className="mt-2 text-lg text-slate-600 max-w-2xl">
            Manage your projects and track progress with <span className="font-semibold text-violet-600">clarity</span>.
          </p>
        </div>

        <div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/tasks/new"
              className="btn btn-primary shadow-glow hover:shadow-glow-lg group relative overflow-hidden px-6 py-3"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 relative z-10">
                <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
              </svg>
              <span className="relative z-10 font-bold">Create New Task</span>
              <span className="ml-2 hidden text-xs font-normal opacity-70 sm:inline-block relative z-10 bg-white/20 px-1.5 py-0.5 rounded text-white">(⌘N)</span>
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="animate-slide-up">
        <DashboardStats tasks={filteredTasks} />
      </div>

      <div className="animate-slide-up">
        <TaskFilters value={filters} onChange={setFilters} />
      </div>

      {loading ? (
        <Spinner label="Loading tasks" />
      ) : filteredTasks.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-3xl border border-dashed border-slate-300 bg-slate-50/50 p-12 text-center"
        >
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-slate-900/5">
            {filters.search ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-slate-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-slate-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            )}
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            {filters.search ? "No results found" : "No tasks yet"}
          </h3>
          <p className="mt-2 text-slate-500 max-w-sm mx-auto">
            {filters.search 
              ? `We couldn't find any tasks matching "${filters.search}". Try adjusting your filters or search terms.` 
              : "Get started by creating your first task to track your progress."}
          </p>
          {!filters.search && (
            <div className="mt-8">
              <Link to="/tasks/new" className="btn btn-primary">
                Create your first task
              </Link>
            </div>
          )}
        </motion.div>
      ) : (
        <motion.div 
          layout
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredTasks.map((t, i) => (
              <TaskCard key={t._id} task={t} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
};
