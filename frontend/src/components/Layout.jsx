import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useState, useRef, useEffect } from "react";

const NavLink = ({ to, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link to={to} className="relative px-3 py-2 text-sm font-medium text-slate-600 hover:text-violet-600 transition-colors">
      {children}
      {isActive && (
        <motion.div
          layoutId="nav-underline"
          className="absolute left-0 right-0 bottom-0 h-0.5 bg-violet-600 rounded-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}
    </Link>
  );
};

const UserMenu = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-full bg-white/50 pl-1 pr-3 py-1 hover:bg-white/80 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500/20 border border-white/20 shadow-sm"
      >
        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-inner">
          {user?.name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase()}
        </div>
        <span className="text-sm font-medium text-slate-700 max-w-[100px] truncate hidden sm:block">
          {user?.name || user?.email?.split('@')[0]}
        </span>
        <motion.svg 
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="w-4 h-4 text-slate-500" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.1 }}
            className="absolute right-0 mt-2 w-56 origin-top-right rounded-2xl bg-white/90 backdrop-blur-xl py-2 shadow-xl ring-1 ring-black/5 focus:outline-none z-50 border border-white/50"
          >
            <div className="px-4 py-3 border-b border-slate-100/50">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Signed in as</p>
              <p className="text-sm font-medium text-slate-900 truncate mt-0.5">{user?.email}</p>
            </div>
            <div className="py-1">
              <button
                onClick={() => {
                  setIsOpen(false);
                  onLogout();
                }}
                className="flex w-full items-center px-4 py-2.5 text-sm text-rose-600 hover:bg-rose-50 transition-colors gap-2"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Sign out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const Layout = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col overflow-x-hidden">
      <Toaster position="top-center" reverseOrder={false} />
      
      {/* Global Background Gradients */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-violet-200/40 via-slate-50 to-slate-50" />
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-fuchsia-100/40 via-transparent to-transparent" />
      
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="fixed top-4 left-0 right-0 z-40 mx-auto max-w-7xl px-4"
      >
        <nav className="flex items-center justify-between rounded-2xl border border-white/60 bg-white/80 px-6 py-3 shadow-lg shadow-violet-500/5 backdrop-blur-xl transition-all hover:bg-white/90 hover:shadow-violet-500/10 hover:border-white/80">
          <Link
            to={isAuthenticated ? "/dashboard" : "/"}
            className="flex items-center gap-3 text-xl font-bold tracking-tight text-slate-900 group"
          >
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-purple-500 text-white shadow-lg shadow-violet-500/30 ring-1 ring-white/20 transition-transform group-hover:scale-105 group-hover:rotate-3">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.498 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.491 4.491 0 013.497-1.307zm4.45 6.75l3.25 3.25a.75.75 0 001.1-1.1l-3.8-3.8a.75.75 0 00-1.1 0l-2 2a.75.75 0 001.1 1.1l1.45-1.45z" clipRule="evenodd" />
              </svg>
              <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent font-extrabold tracking-tight">
              TaskHub
            </span>
          </Link>

          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <div className="hidden sm:flex items-center gap-1 bg-slate-100/50 p-1 rounded-xl border border-slate-200/50">
                  <NavLink to="/dashboard">Dashboard</NavLink>
                  <NavLink to="/insights">Insights</NavLink>
                </div>
                <div className="h-6 w-px bg-slate-200 hidden sm:block mx-2"></div>
                <UserMenu user={user} onLogout={onLogout} />
              </>
            ) : (
              <>
                <a
                  href="/#features"
                  className="hidden text-sm font-medium text-slate-600 hover:text-violet-600 sm:block relative group px-3 py-2"
                >
                  Features
                  <span className="absolute bottom-1 left-3 right-3 h-0.5 bg-violet-600 scale-x-0 transition-transform group-hover:scale-x-100"></span>
                </a>
                <Link
                  to="/login"
                  className="text-sm font-semibold text-slate-600 hover:text-violet-600 px-3 py-2"
                >
                  Login
                </Link>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/register"
                    className="btn btn-primary shadow-glow hover:shadow-glow-lg"
                  >
                    Get Started
                  </Link>
                </motion.div>
              </>
            )}
          </div>
        </nav>
      </motion.header>

      <main className="mx-auto w-full max-w-7xl px-4 pt-32 pb-12 flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="border-t border-gray-200 bg-white/50 backdrop-blur-sm mt-auto">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} TaskHub. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-gray-500 hover:text-violet-600 transition-colors">Privacy Policy</a>
              <a href="#" className="text-sm text-gray-500 hover:text-violet-600 transition-colors">Terms of Service</a>
              <a href="#" className="text-sm text-gray-500 hover:text-violet-600 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
