import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { api, apiErrorMessage } from "../lib/api";
import { TaskForm } from "../components/TaskForm";

export const CreateTaskPage = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (payload) => {
    setSubmitting(true);

    try {
      await api.post("/tasks", payload);
      toast.success("Task created successfully");
      navigate("/dashboard", { replace: true });
    } catch (err) {
      toast.error(apiErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8 flex items-center justify-between">
        <div className="animate-fade-in">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Create Task</h1>
          <p className="mt-2 text-slate-600">Add a new task to your project workspace.</p>
        </div>

        <div className="animate-fade-in">
          <Link to="/dashboard" className="btn btn-secondary bg-white/50 backdrop-blur-sm hover:bg-white/80">
            Cancel
          </Link>
        </div>
      </div>

      <div className="animate-slide-up">
        <TaskForm
          initialValues={{ title: "", description: "", status: "todo", priority: "medium", dueDate: "" }}
          submitLabel="Create Task"
          submitting={submitting}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
};
