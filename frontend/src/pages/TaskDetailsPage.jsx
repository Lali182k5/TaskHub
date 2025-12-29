import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api, apiErrorMessage } from "../lib/api";
import { Spinner } from "../components/Spinner";

const fmtDate = (value) => {
  if (!value) return "No due date";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "Invalid date";
  return d.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
};

const badge = (className) => `inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium ${className}`;

const statusBadge = (status) => {
  if (status === "done") return badge("border-emerald-200 bg-emerald-50 text-emerald-700");
  if (status === "in_progress") return badge("border-blue-200 bg-blue-50 text-blue-700");
  return badge("border-slate-200 bg-slate-50 text-slate-600");
};

const priorityBadge = (priority) => {
  if (priority === "high") return badge("border-rose-200 bg-rose-50 text-rose-700");
  if (priority === "low") return badge("border-emerald-200 bg-emerald-50 text-emerald-700");
  return badge("border-amber-200 bg-amber-50 text-amber-700");
};

export const TaskDetailsPage = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const { data } = await api.get(`/tasks/${id}`);
        setTask(data.task);
      } catch (err) {
        setError(apiErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-xl font-semibold text-rose-600">Error</h2>
        <p className="mt-2 text-slate-600">{error}</p>
        <Link to="/dashboard" className="btn btn-primary mt-4">
          Go to Dashboard
        </Link>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-xl font-semibold text-slate-900">Task not found</h2>
        <p className="mt-2 text-slate-600">The task you are looking for does not exist.</p>
        <Link to="/dashboard" className="btn btn-primary mt-4">
          Go to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8 flex items-center justify-between">
        <div className="animate-fade-in">
          <Link to="/dashboard" className="text-sm font-medium text-slate-500 hover:text-violet-600 flex items-center gap-1 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
              <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
            </svg>
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Task Details</h1>
        </div>

        <div className="flex gap-3 animate-fade-in">
          <Link
            to={`/tasks/${task._id}/edit`}
            className="btn btn-secondary"
          >
            Edit
          </Link>
          <Link
            to={`/tasks/${task._id}/delete`}
            className="btn btn-danger"
          >
            Delete
          </Link>
        </div>
      </div>

      <div className="card overflow-hidden animate-slide-up">
        <div className="border-b border-slate-100 bg-slate-50/50 px-8 py-6">
          <div className="flex flex-wrap items-center gap-4">
            <span className={statusBadge(task.status)}>
              {task.status.replace("_", " ")}
            </span>
            <span className={priorityBadge(task.priority)}>
              {task.priority} Priority
            </span>
          </div>
          <h2 className="mt-4 text-2xl font-bold text-slate-900">{task.title}</h2>
        </div>
        
        <div className="px-8 py-8 space-y-8">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-2">Description</h3>
            <div className="prose prose-slate max-w-none">
              <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                {task.description || "No description provided."}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-slate-100">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-2">Due Date</h3>
              <p className="text-slate-900 font-medium flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 text-slate-400">
                  <path fillRule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z" clipRule="evenodd" />
                </svg>
                {fmtDate(task.dueDate)}
              </p>
            </div>
            
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-2">Created At</h3>
              <p className="text-slate-900 font-medium flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 text-slate-400">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75l4 4a.75.75 0 101.06-1.06l-3.31-3.31V5z" clipRule="evenodd" />
                </svg>
                {new Date(task.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
