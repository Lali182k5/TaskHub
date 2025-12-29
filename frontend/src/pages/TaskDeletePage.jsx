import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { api, apiErrorMessage } from "../lib/api";
import { Spinner } from "../components/Spinner";

export const TaskDeletePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/tasks/${id}`);
        setTask(data.task);
      } catch (err) {
        toast.error(apiErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  const onDelete = async () => {
    setSubmitting(true);

    try {
      await api.delete(`/tasks/${id}`);
      toast.success("Task deleted successfully");
      navigate("/dashboard", { replace: true });
    } catch (err) {
      toast.error(apiErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Spinner />
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
    <div className="mx-auto max-w-xl pt-12">
      <div className="card overflow-hidden border-rose-100 shadow-xl shadow-rose-500/5 animate-fade-in">
        <div className="bg-rose-50/50 p-6 text-center border-b border-rose-100">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-rose-100 text-rose-600">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Delete Task?</h1>
          <p className="mt-2 text-slate-600">
            Are you sure you want to delete <span className="font-semibold text-slate-900">"{task.title}"</span>?
            <br />
            This action cannot be undone.
          </p>
        </div>

        <div className="p-6 bg-white">
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              to="/dashboard"
              className="btn btn-secondary w-full sm:w-auto justify-center"
            >
              Cancel
            </Link>
            <button
              type="button"
              onClick={onDelete}
              disabled={submitting}
              className="btn btn-danger w-full sm:w-auto justify-center shadow-rose-500/20 hover:shadow-rose-500/30"
            >
              {submitting ? "Deleting..." : "Yes, Delete Task"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
