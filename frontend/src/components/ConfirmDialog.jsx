import { AnimatePresence, motion } from "framer-motion";
import { modal, overlay } from "../lib/motion";

export const ConfirmDialog = ({
  open,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  danger = false,
  onConfirm,
  onCancel,
}) => {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          {...overlay}
        >
          <div className="absolute inset-0 bg-black/50" onClick={onCancel} />

          <motion.div
            className="relative w-full max-w-md rounded-xl border border-slate-200 bg-white p-5 shadow-lift"
            {...modal}
          >
            <div className="text-base font-semibold text-slate-900">{title}</div>
            <div className="mt-2 text-sm leading-relaxed text-slate-600">{message}</div>

            <div className="mt-5 flex justify-end gap-2">
              <motion.button
                type="button"
                onClick={onCancel}
                className="btn btn-secondary"
                whileTap={{ scale: 0.98 }}
              >
                {cancelText}
              </motion.button>
              <motion.button
                type="button"
                onClick={onConfirm}
                className={danger ? "btn btn-danger" : "btn btn-primary"}
                whileTap={{ scale: 0.98 }}
              >
                {confirmText}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};
