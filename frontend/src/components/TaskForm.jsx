import { useMemo, useState } from "react";
import { Alert } from "./Alert";

const todayIso = () => {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

export const TaskForm = ({
  initialValues,
  submitLabel = "Save",
  submitting,
  error,
  onSubmit,
}) => {
  const [title, setTitle] = useState(initialValues.title || "");
  const [description, setDescription] = useState(initialValues.description || "");
  const [status, setStatus] = useState(initialValues.status || "todo");
  const [priority, setPriority] = useState(initialValues.priority || "medium");
  const [dueDate, setDueDate] = useState(initialValues.dueDate || "");

  const statusColors = {
    todo: "bg-slate-50 border-slate-200 text-slate-700 focus:border-slate-500 focus:ring-slate-500/20",
    in_progress: "bg-blue-50 border-blue-200 text-blue-700 focus:border-blue-500 focus:ring-blue-500/20",
    done: "bg-emerald-50 border-emerald-200 text-emerald-700 focus:border-emerald-500 focus:ring-emerald-500/20"
  };

  const priorityColors = {
    low: "bg-sky-50 border-sky-200 text-sky-700 focus:border-sky-500 focus:ring-sky-500/20",
    medium: "bg-amber-50 border-amber-200 text-amber-700 focus:border-amber-500 focus:ring-amber-500/20",
    high: "bg-rose-50 border-rose-200 text-rose-700 focus:border-rose-500 focus:ring-rose-500/20"
  };

  const payload = useMemo(
    () => ({
      title,
      description,
      status,
      priority,
      dueDate: dueDate || null,
    }),
    [title, description, status, priority, dueDate]
  );

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(payload);
      }}
      className="card space-y-6 p-8"
    >
      <Alert message={error} />

      <div className="space-y-2">
        <label className="label">Task Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., Redesign Homepage"
          className="field text-lg font-medium placeholder:font-normal"
          autoFocus
          required
        />
      </div>

      <div className="space-y-2">
        <label className="label">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add details about this task..."
          className="field min-h-[120px] resize-y leading-relaxed"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div className="space-y-2">
          <label className="label">Status</label>
          <div className="relative">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className={`field appearance-none font-medium ${statusColors[status]}`}
            >
              <option value="todo">To Do</option>
              <option value="in_progress">In Progress</option>
              <option value="done">Done</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="label">Priority</label>
          <div className="relative">
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className={`field appearance-none font-medium ${priorityColors[priority]}`}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="label">Due Date</label>
          <input
            type="date"
            min={todayIso()}
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="field"
          />
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
        <button
          type="submit"
          disabled={submitting}
          className="btn btn-primary w-full sm:w-auto px-8 py-2.5 text-base shadow-violet-500/25 hover:shadow-violet-500/40"
        >
          {submitting ? (
            <>
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Saving...
            </>
          ) : (
            submitLabel
          )}
        </button>
      </div>
    </form>
  );
};
