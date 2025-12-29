export const Alert = ({ title = "Error", message }) => {
  if (!message) return null;

  return (
    <div className="rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm text-rose-900 motion-safe:animate-fade-in">
      <div className="font-semibold">{title}</div>
      <div className="mt-1 text-rose-800">{message}</div>
    </div>
  );
};
