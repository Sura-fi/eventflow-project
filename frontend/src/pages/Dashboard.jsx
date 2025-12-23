import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { LayoutGrid, Ticket, Calendar, ArrowRight, PlusCircle, Settings } from "lucide-react";

export default function Dashboard() {

   const navigate = useNavigate();
  // 1. Get the role and force it to lowercase to avoid "Capitals" confusion
  const rawRole = localStorage.getItem("role") || "";
  const userRole = rawRole.toLowerCase().trim();

// 2. Add a console log here to double check what React sees
console.log("React sees this role:", userRole);

  // We can mock some stats for now to make it look "alive"
  const stats = [
    { label: "Active Events", value: "12", icon: Calendar, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "My Tickets", value: "3", icon: Ticket, color: "text-indigo-600", bg: "bg-indigo-50" },
  ];
  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("role"); // Also clear the role on logout
    window.location.href = "/login"; // Force refresh to clear state
  };

return (
  /* 1. Use dark:bg-slate-950 for the deep background */
  <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
    <Navbar />

    <main className="max-w-7xl mx-auto px-6 py-12">
      {/* Welcome Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">
          Welcome back, <span className="text-indigo-600 dark:text-indigo-400 transition-colors">Explorer!</span>
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2 font-medium">Here's what's happening with your events today.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, index) => (
          /* 2. Stat Card: bg-white dark:bg-slate-900 */
          <div key={index} className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800 flex items-center gap-5 transition-all">
            <div className={`${stat.bg} ${stat.color} p-4 rounded-2xl`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">{stat.label}</p>
              <p className="text-2xl font-black text-gray-900 dark:text-white">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Action Card 1: Explore (Stays Indigo but removes bright shadow in dark mode) */}
        <Link to="/events" className="group relative overflow-hidden bg-indigo-600 rounded-[2.5rem] p-8 text-white shadow-xl shadow-indigo-100 dark:shadow-none hover:-translate-y-2 transition-all duration-300">
          <div className="relative z-10">
            <div className="bg-white/20 w-12 h-12 rounded-2xl flex items-center justify-center mb-6">
              <LayoutGrid className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Explore Events</h3>
            <p className="text-indigo-100 mb-6 max-w-[240px]">Find workshops, concerts, and tech meetups near you.</p>
            <div className="flex items-center gap-2 font-bold text-sm">
              Go to Events <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </div>
          </div>
          <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        </Link>

        {/* Action Card 2: My Registrations (Switches from White to Slate-900) */}
        <Link to="/my-registrations" className="group relative overflow-hidden bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 text-gray-900 dark:text-white border border-gray-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none hover:-translate-y-2 transition-all duration-300">
          <div className="relative z-10">
            <div className="bg-indigo-50 dark:bg-indigo-900/40 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-colors">
              <Ticket className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 className="text-2xl font-bold mb-2">My Registrations</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-[240px]">View your tickets and manage your schedule.</p>
            <div className="flex items-center gap-2 font-bold text-sm text-indigo-600 dark:text-indigo-400">
              View Schedule <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </div>
          </div>
        </Link>

      </div>

      {/* Lower Section: Secondary Actions
      <div className="mt-12 pt-12 border-t border-gray-200 dark:border-slate-800">
        <h4 className="text-sm font-bold text-gray-400 uppercase tracking-[0.2em] mb-6">Quick Tools</h4>
        <div className="flex flex-wrap gap-4">
           {userRole === 'organizer' && (
           <><button className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl text-sm font-bold text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">
              <PlusCircle className="w-4 h-4 text-indigo-600 dark:text-indigo-400" /> Create New Event
            </button><button className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl text-sm font-bold text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">
                <Settings className="w-4 h-4 text-gray-400 dark:text-gray-500" /> Account Settings
              </button></>
        )}
        </div>
      </div> */}
      {/* Lower Section: Secondary Actions */}
<div className="mt-12 pt-12 border-t border-gray-200 dark:border-slate-800">
  <h4 className="text-sm font-bold text-gray-400 uppercase tracking-[0.2em] mb-6">Quick Tools</h4>
  <div className="flex flex-wrap gap-4">
    {userRole === 'organizer' && (
      <>
        {/* ADDED onClick here */}
        <button 
          onClick={() => navigate("/create-event")} 
          className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl text-sm font-bold text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
        >
          <PlusCircle className="w-4 h-4 text-indigo-600 dark:text-indigo-400" /> 
          Create New Event
        </button>

        <button className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl text-sm font-bold text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">
          <Settings className="w-4 h-4 text-gray-400 dark:text-gray-500" /> 
          Account Settings
        </button>
      </>
    )}
  </div>
</div>
    </main>
  </div>
);
}