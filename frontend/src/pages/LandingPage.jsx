import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

export const LandingPage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="animate-fade-in">
      {/* Hero Section with Enhanced Design */}
      <section className="relative overflow-hidden pt-20 pb-32">
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-violet-300/30 rounded-full mix-blend-multiply filter blur-3xl animate-float opacity-70" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300/30 rounded-full mix-blend-multiply filter blur-3xl animate-float animation-delay-2000 opacity-70" />
        <div className="absolute -bottom-8 left-40 w-72 h-72 bg-indigo-300/30 rounded-full mix-blend-multiply filter blur-3xl animate-float animation-delay-4000 opacity-70" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="lg:grid lg:grid-cols-12 lg:gap-12">
            <div className="sm:text-center md:mx-auto md:max-w-2xl lg:col-span-6 lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-100 to-purple-100 px-4 py-2 text-sm font-bold text-violet-700 ring-1 ring-violet-500/20 shadow-lg shadow-violet-500/20">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  Task Management Evolved
                </span>
              </motion.div>

              <h1 className="mt-8">
                <motion.span 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="block text-5xl font-extrabold tracking-tight sm:text-6xl xl:text-7xl"
                >
                  <span className="block gradient-text drop-shadow-sm">
                    Organize your work
                  </span>
                  <motion.span 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="block text-slate-900 mt-2"
                  >
                    with clarity
                  </motion.span>
                </motion.span>
              </h1>

              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="mt-6 text-lg text-slate-600 sm:text-xl lg:text-lg xl:text-xl leading-relaxed max-w-2xl"
              >
                TaskHub helps you manage your projects, track tasks, and collaborate with your team effortlessly. Experience a new way of staying productive with our beautiful and intuitive interface.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.6 }}
                className="mt-10 sm:mx-auto sm:max-w-lg sm:text-center lg:mx-0 lg:text-left"
              >
                {isAuthenticated ? (
                  <Link
                    to="/dashboard"
                    className="btn btn-primary px-10 py-4 text-lg shadow-2xl shadow-violet-500/40 hover:shadow-violet-500/60 font-bold"
                  >
                    Go to Dashboard
                    <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                ) : (
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
                      <motion.div 
                        whileHover={{ scale: 1.05, y: -2 }} 
                        whileTap={{ scale: 0.98 }}
                      >
                        <Link
                          to="/register"
                          className="btn btn-primary px-10 py-4 text-lg shadow-2xl shadow-violet-500/40 hover:shadow-violet-500/60 font-bold group"
                        >
                          Get Started for Free
                          <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </Link>
                      </motion.div>
                      <motion.div 
                        whileHover={{ scale: 1.05, y: -2 }} 
                        whileTap={{ scale: 0.98 }}
                      >
                        <Link
                          to="/login"
                          className="btn btn-secondary px-10 py-4 text-lg font-bold"
                        >
                          Sign In
                        </Link>
                      </motion.div>
                    </div>
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.2 }}
                      className="text-sm text-slate-500 font-medium flex items-center justify-center lg:justify-start gap-2"
                    >
                      <svg className="w-5 h-5 text-violet-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Trusted by productivity-focused teams worldwide
                    </motion.p>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Hero Image with Enhanced Effects */}
            <div className="relative mt-16 sm:mx-auto sm:max-w-lg lg:col-span-6 lg:mx-0 lg:mt-0 lg:flex lg:max-w-none lg:items-center">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative mx-auto w-full rounded-2xl lg:max-w-md"
              >
                <div className="absolute -inset-2 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-2xl blur-2xl opacity-30 animate-pulse-slow" />
                <div className="relative block w-full overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/10 transform hover:scale-105 transition-transform duration-500">
                  <img 
                    src="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2072&q=80" 
                    alt="Task Management Dashboard" 
                    className="w-full h-full object-cover"
                  />
                  {/* Overlay with Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-violet-900/20 to-transparent" />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section with Modern Cards */}
      <section id="features" className="relative bg-white/60 py-24 sm:py-32 backdrop-blur-sm border-y border-violet-100/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mx-auto max-w-2xl lg:text-center"
          >
            <h2 className="text-base font-bold leading-7 text-violet-600 uppercase tracking-widest">Deploy faster</h2>
            <p className="mt-4 text-4xl font-extrabold tracking-tight gradient-text sm:text-5xl">
              Everything you need to manage tasks
            </p>
            <p className="mt-6 text-lg leading-8 text-slate-600 max-w-xl mx-auto">
              Simple, intuitive, and powerful. TaskHub gives you the tools to stay on top of your workload without the clutter.
            </p>
          </motion.div>

          <div className="mx-auto mt-20 max-w-2xl sm:mt-24 lg:mt-28 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-2">
              {[
                {
                  name: "Cloud Sync",
                  description: "Access your tasks from anywhere. Your data is securely stored and synchronized across all your devices in real-time.",
                  icon: (
                    <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                    </svg>
                  ),
                  gradient: "from-violet-500 to-purple-600",
                },
                {
                  name: "Secure & Private",
                  description: "Your data is yours. We use industry-standard encryption to keep your tasks and personal information safe and secure.",
                  icon: (
                    <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                  ),
                  gradient: "from-blue-500 to-cyan-600",
                },
                {
                  name: "Fast Performance",
                  description: "Built with modern technologies for lightning-fast interactions. No more waiting for pages to load or laggy interfaces.",
                  icon: (
                    <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                    </svg>
                  ),
                  gradient: "from-amber-500 to-orange-600",
                },
                {
                  name: "Simple Workflow",
                  description: "Intuitive interface designed to help you focus on what matters most: getting things done efficiently and effectively.",
                  icon: (
                    <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                  gradient: "from-emerald-500 to-teal-600",
                },
              ].map((feature, index) => (
                <motion.div
                  key={feature.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="relative pl-20 group"
                >
                  <dt className="text-lg font-bold leading-7 text-slate-900">
                    <motion.div 
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      className={`absolute left-0 top-0 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.gradient} shadow-xl shadow-violet-500/30 ring-2 ring-white`}
                    >
                      {feature.icon}
                    </motion.div>
                    {feature.name}
                  </dt>
                  <dd className="mt-3 text-base leading-7 text-slate-600">
                    {feature.description}
                  </dd>
                </motion.div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </div>
  );
};
