export const Spinner = ({ label = "Loading" }) => {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="flex items-center gap-3 text-sm text-slate-600 motion-safe:animate-fade-in">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-200 border-t-slate-900" />
        <span className="font-medium">{label}</span>
      </div>
    </div>
  );
};
