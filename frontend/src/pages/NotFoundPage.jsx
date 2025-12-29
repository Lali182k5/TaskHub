import { Link } from "react-router-dom";

export const NotFoundPage = () => {
  return (
    <div className="card p-6 motion-safe:animate-fade-in">
      <div className="text-lg font-semibold text-slate-900">Page not found</div>
      <div className="mt-1 text-sm text-slate-600">The page you requested doesn’t exist.</div>
      <div className="mt-4">
        <Link to="/" className="btn btn-primary">
          Go to dashboard
        </Link>
      </div>
    </div>
  );
};
