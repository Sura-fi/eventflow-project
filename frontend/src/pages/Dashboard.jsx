// import { Link, useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import { LayoutGrid, Ticket, Calendar, ArrowRight, PlusCircle, Settings } from "lucide-react";

// export default function Dashboard() {

//    const navigate = useNavigate();
//   // 1. Get the role and force it to lowercase to avoid "Capitals" confusion
//   const rawRole = localStorage.getItem("role") || "";
//   const userRole = rawRole.toLowerCase().trim();

// // 2. Add a console log here to double check what React sees
// console.log("React sees this role:", userRole);

//   // We can mock some stats for now to make it look "alive"
//   export default function Dashboard() {
//     const [events, setEvents] = useState([]); // Initialize as empty array
//     const [registrations, setRegistrations] = useState([]); // Initialize as empty array
//     const [statsData, setStatsData] = useState({ todayCount: 0 });
  
//     // ... useEffect to fetch data ...
  
//     // Define stats INSIDE the component so it has access to the state
//     const stats = [
//       { 
//         label: "Total Events", 
//         value: events?.length || 0, // Added optional chaining and fallback
//         icon: Calendar, 
//         bg: "bg-blue-50 dark:bg-blue-900/20", 
//         color: "text-blue-600 dark:text-blue-400" 
//       },
//       { 
//         label: "Your Registrations", 
//         value: registrations?.length || 0, 
//         icon: CheckCircle, 
//         bg: "bg-emerald-50 dark:bg-emerald-900/20", 
//         color: "text-emerald-600 dark:text-emerald-400" 
//       },
//       { 
//         label: "Upcoming Today", 
//         value: statsData.todayCount || 0, 
//         icon: Clock, 
//         bg: "bg-amber-50 dark:bg-amber-900/20", 
//         color: "text-amber-600 dark:text-amber-400" 
//       },
//       { 
//         label: "Community Status", 
//         value: "Active", 
//         icon: Users, 
//         bg: "bg-purple-50 dark:bg-purple-900/20", 
//         color: "text-purple-600 dark:text-purple-400" 
//       },
//     ];

//   const handleLogout = () => {
//     localStorage.removeItem("access");
//     localStorage.removeItem("refresh");
//     localStorage.removeItem("role"); // Also clear the role on logout
//     window.location.href = "/login"; // Force refresh to clear state
//   };






import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../api/axios";
import { 
  LayoutGrid, Ticket, Calendar, ArrowRight, 
  PlusCircle, Settings, CheckCircle, Clock, Users 
} from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();
  
  // 1. State Management
  const [events, setEvents] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [statsData, setStatsData] = useState({ todayCount: 0 });

  // 2. Role Logic
  const rawRole = localStorage.getItem("role") || "";
  const userRole = rawRole.toLowerCase().trim();

  // 3. Fetch Data (Add your API calls here)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventsRes, regRes] = await Promise.all([
          api.get("/api/events/"),
          api.get("/api/my-registrations/")
        ]);
        setEvents(eventsRes.data);
        setRegistrations(regRes.data);
        
        // Calculate "Today's" count
        const today = new Date().toISOString().split('T')[0];
        const todayEvents = eventsRes.data.filter(e => e.date.startsWith(today));
        setStatsData({ todayCount: todayEvents.length });
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      }
    };
    fetchData();
  }, []);

  // 4. Stats Configuration
  const stats = [
    { 
      label: "Total Events", 
      value: events?.length || 0, 
      icon: Calendar, 
      bg: "bg-blue-50 dark:bg-blue-900/20", 
      color: "text-blue-600 dark:text-blue-400" 
    },
    { 
      label: "Your Registrations", 
      value: registrations?.length || 0, 
      icon: CheckCircle, 
      bg: "bg-emerald-50 dark:bg-emerald-900/20", 
      color: "text-emerald-600 dark:text-emerald-400" 
    },
    { 
      label: "Upcoming Today", 
      value: statsData.todayCount || 0, 
      icon: Clock, 
      bg: "bg-amber-50 dark:bg-amber-900/20", 
      color: "text-amber-600 dark:text-amber-400" 
    },
    { 
      label: "Community Status", 
      value: "Active", 
      icon: Users, 
      bg: "bg-purple-50 dark:bg-purple-900/20", 
      color: "text-purple-600 dark:text-purple-400" 
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("role");
    window.location.href = "/login";
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
    <div 
      key={index} 
      className="group bg-white dark:bg-slate-900 p-6 rounded-[2rem] shadow-sm border border-gray-100 dark:border-slate-800 flex items-center gap-5 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1"
    >
      <div className={`${stat.bg} ${stat.color} p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300`}>
        <stat.icon className="w-6 h-6" />
      </div>
      <div>
        <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.15em]">
          {stat.label}
        </p>
        <div className="flex items-baseline gap-1">
          <p className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
            {stat.value}
          </p>
          {/* Subtle decoration for "Your Registrations" */}
          {stat.label === "Your Registrations" && (
            <span className="text-[10px] text-emerald-500 font-bold bg-emerald-50 dark:bg-emerald-500/10 px-1.5 py-0.5 rounded">LIVE</span>
          )}
        </div>
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
        {userRole === 'manager' && (
  <button 
    onClick={() => navigate("/events")}
    className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-900 border border-indigo-200 dark:border-indigo-900 rounded-xl text-sm font-bold text-indigo-700 dark:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-slate-800 transition-colors"
  >
    <Users className="w-4 h-4" /> Department Overview
  </button>
)}

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