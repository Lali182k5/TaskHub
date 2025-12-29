import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { api, apiErrorMessage } from "../lib/api";
import { Spinner } from "../components/Spinner";
import { TaskForm } from "../components/TaskForm";

const toDateInput = (value) => {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

export const EditTaskPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [task, setTask] = useState(null);

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

  const onSubmit = async (payload) => {
    setSubmitting(true);

    try {
      await api.put(`/tasks/${id}`, payload);
      toast.success("Task updated successfully");
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
        <p className="mt-2 text-slate-600">The task you are looking for does not exist or has been deleted.</p>
        <Link to="/" className="btn btn-primary mt-4">
          Go to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8 flex items-center justify-between">
        <div className="animate-fade-in">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Edit Task</h1>
          <p className="mt-2 text-slate-600">Update task details and status.</p>
        </div>

        <div className="animate-fade-in">
          <Link to="/dashboard" className="btn btn-secondary bg-white/50 backdrop-blur-sm hover:bg-white/80">
            Cancel
          </Link>
        </div>
      </div>

      <div className="animate-slide-up">
        <TaskForm
          initialValues={{
            title: task.title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            dueDate: toDateInput(task.dueDate),
          }}
          submitLabel="Save Changes"
          submitting={submitting}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
};
