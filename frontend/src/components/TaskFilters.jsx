import { motion, AnimatePresence } from "framer-motion";

export const TaskFilters = ({ value, onChange }) => {
  const update = (patch) => onChange({ ...value, ...patch });

  const statusColors = {
    "": "bg-white border-slate-200 text-slate-700",
    todo: "bg-slate-50 border-slate-200 text-slate-700 focus:border-slate-500 focus:ring-slate-500/20",
    in_progress: "bg-blue-50 border-blue-200 text-blue-700 focus:border-blue-500 focus:ring-blue-500/20",
    done: "bg-emerald-50 border-emerald-200 text-emerald-700 focus:border-emerald-500 focus:ring-emerald-500/20"
  };

  const priorityColors = {
    "": "bg-white border-slate-200 text-slate-700",
    low: "bg-sky-50 border-sky-200 text-sky-700 focus:border-sky-500 focus:ring-sky-500/20",
    medium: "bg-amber-50 border-amber-200 text-amber-700 focus:border-amber-500 focus:ring-amber-500/20",
    high: "bg-rose-50 border-rose-200 text-rose-700 focus:border-rose-500 focus:ring-rose-500/20"
  };

  const hasFilters = value.status || value.priority || value.search || value.dueBefore || value.sort !== "dueDate:asc";

  const clearFilters = () => {
    onChange({
      status: "",
      priority: "",
      dueAfter: "",
      dueBefore: "",
      sort: "dueDate:asc",
      search: "",
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl bg-white p-1 shadow-sm ring-1 ring-slate-900/5"
    >
      <div className="flex flex-col">
        {/* Search Bar - Prominent and Full Width */}
        <div className="relative group z-10">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-5">
            <svg className="h-6 w-6 text-slate-400 group-focus-within:text-violet-500 transition-colors" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
            </svg>
          </div>
          <input
            type="text"
            value={value.search || ""}
            onChange={(e) => update({ search: e.target.value })}
            placeholder="Search your tasks..."
            className="w-full rounded-t-xl border-0 bg-transparent py-4 pl-14 pr-12 text-lg text-slate-900 placeholder:text-slate-400 focus:ring-0 focus:bg-slate-50/50 transition-colors"
          />
          <AnimatePresence>
            {hasFilters && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={clearFilters}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-colors"
                title="Clear all filters"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                  <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                </svg>
              </motion.button>
            )}
          </AnimatePresence>
          
          {/* Divider */}
          <div className="absolute bottom-0 left-4 right-4 h-px bg-slate-100" />
        </div>

        {/* Filters Row */}
        <div className="flex flex-wrap items-center gap-3 p-4 bg-slate-50/50 rounded-b-xl">
          <div className="flex-1 min-w-[140px]">
            <select
              value={value.status}
              onChange={(e) => update({ status: e.target.value })}
              className={`w-full rounded-xl border-0 py-2 px-3 text-sm font-medium shadow-sm ring-1 ring-inset ring-slate-200 transition-all focus:ring-2 ${statusColors[value.status || ""]}`}
            >
              <option value="">All Status</option>
              <option value="todo">To Do</option>
              <option value="in_progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>

          <div className="flex-1 min-w-[140px]">
            <select
              value={value.priority}
              onChange={(e) => update({ priority: e.target.value })}
              className={`w-full rounded-xl border-0 py-2 px-3 text-sm font-medium shadow-sm ring-1 ring-inset ring-slate-200 transition-all focus:ring-2 ${priorityColors[value.priority || ""]}`}
            >
              <option value="">All Priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="flex-1 min-w-[140px]">
            <select
              value={value.sort}
              onChange={(e) => update({ sort: e.target.value })}
              className="w-full rounded-xl border-0 bg-white py-2 px-3 text-sm font-medium text-slate-700 shadow-sm ring-1 ring-inset ring-slate-200 transition-all focus:ring-2 focus:ring-violet-500"
            >
              <option value="">Sort By</option>
              <option value="dueDate:asc">Due Soon</option>
              <option value="dueDate:desc">Due Later</option>
              <option value="createdAt:desc">Newest</option>
            </select>
          </div>

          <div className="flex-1 min-w-[140px]">
            <input
              type="date"
              value={value.dueBefore}
              onChange={(e) => update({ dueBefore: e.target.value })}
              className="w-full rounded-xl border-0 bg-white py-2 px-3 text-sm text-slate-700 shadow-sm ring-1 ring-inset ring-slate-200 transition-all focus:ring-2 focus:ring-violet-500"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
