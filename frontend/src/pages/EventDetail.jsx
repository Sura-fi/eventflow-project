import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";

import { eventpicc } from "../assets/images"; // Using your asset here!
import Navbar from "../components/Navbar";
import { ArrowLeft, MapPin, Calendar,Users, CheckCircle } from "lucide-react"; // Optional: lucide-react icons or use the SVGs below
import { Link } from "react-router-dom";

export default function EventDetail() {
  const { id } = useParams();
  const [registered, setRegistered] = useState(false);
  const [event, setEvent] = useState(null);
  const [message, setMessage] = useState("");

  const [attendees, setAttendees] = useState([]);
  const [showAttendees, setShowAttendees] = useState(false);
  const [isOrganizer, setIsOrganizer] = useState(false);


  useEffect(() => {
    api.get(`/api/events/${id}/`)
      .then(res => setEvent(res.data));
  }, [id]);

  const handleRegister = () => {
    api.post("/api/events/register/", { event: event.id })
      .then(() => {
        setMessage("You have successfully registered for this event.");
        setRegistered(true);
      })
      .catch(err => {
        setMessage(err.response?.data?.detail || "Registration failed.");
      });
  };
  

  const fetchAttendees = async () => {
    try {
      const res = await api.get(`/api/events/${id}/attendees/`);
      setAttendees(res.data);
      setShowAttendees(true);
      setIsOrganizer(true);
    } catch (err) {
      console.error(err);
      setIsOrganizer(false);
    }
  };
  





// ... (logic remains exactly the same)

if (!event) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mb-4"></div>
      <p className="text-gray-600 font-medium">Loading event details...</p>
    </div>
  );
}

// return (
//   <div className="min-h-screen bg-slate-50 pb-20">
//     <Navbar />

//     {/* HEADER / HERO SECTION */}
//     <div className="relative h-[40vh] md:h-[50vh] w-full overflow-hidden">
//       <img 
//         src={eventpicc} 
//         alt={event.title} 
//         className="w-full h-full object-cover"
//       />
//       <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] flex items-end">
//         <div className="max-w-7xl mx-auto px-6 mb-12 w-full">
//           <Link to="/events" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors text-sm font-medium">
//              <span className="mr-2"><ArrowLeft className="w-5 h-5"/> </span> Back to Events
//           </Link>
//           <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
//             {event.title}
//           </h1>
//         </div>
//       </div>
//     </div>

//     {/* MAIN CONTENT GRID */}
//     <div className="max-w-7xl mx-auto px-6 -mt-8 relative z-10">
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
//         {/* LEFT COLUMN: Description & Attendees */}
//         <div className="lg:col-span-2 space-y-8">
//           <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12">
//             <h2 className="text-2xl font-bold text-gray-900 mb-6">About this event</h2>
//             <p className="text-gray-600 text-lg leading-relaxed whitespace-pre-line">
//               {event.description}
//             </p>

//             {/* Success Message */}
//             {message && (
//               <div className="mt-8 p-4 bg-green-50 border border-green-100 rounded-2xl flex items-center gap-3 text-green-700 font-semibold">
//                 <span className="text-xl"><CheckCircle/></span> {message}
//               </div>
//             )}
//           </div>

//           {/* ATTENDEES SECTION */}
//           {showAttendees && (
//             <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 animate-in fade-in slide-in-from-bottom-4">
//               <div className="flex items-center justify-between mb-8">
//                 <h3 className="text-2xl font-bold text-gray-900">Community</h3>
//                 <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-bold">
//                   {attendees.length} Joined
//                 </span>
//               </div>

//               {attendees.length === 0 ? (
//                 <div className="text-center py-10 text-gray-400 italic">
//                   Be the first one to join this event!
//                 </div>
//               ) : (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   {attendees.map(a => (
//                     <div key={a.id} className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100 group hover:border-indigo-200 transition-colors">
//                       <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
//                         {a.username.charAt(0).toUpperCase()}
//                       </div>
//                       <span className="font-semibold text-gray-700 uppercase tracking-tight text-sm">{a.username}</span>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           )}
//         </div>

//         {/* RIGHT COLUMN: The Sticky Info Card */}
//         <div className="lg:col-span-1">
//           <div className="sticky top-24 bg-white rounded-3xl shadow-xl shadow-indigo-100/50 border border-indigo-50 overflow-hidden">
//             <div className="p-8 space-y-6">
//               <div className="space-y-4">
//                 <div className="flex items-center gap-4 text-gray-600">
//                   <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
//                     <Calendar />
//                   </div>
//                   <div>
//                     <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Date & Time</p>
//                     <p className="font-bold text-gray-900">{new Date(event.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-4 text-gray-600">
//                   <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
//                     {/* 📍 */}
//                     <MapPin className="w-5 h-5"/>
//                   </div>
//                   <div>
//                     <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Location</p>
//                     <p className="font-bold text-gray-900">{event.location}</p>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-4 text-gray-600">
//                   <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
//                     {/* 👥 */}
//                     <Users/>
//                   </div>
//                   <div>
//                     <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Capacity</p>
//                     <p className="font-bold text-gray-900">{event.attendee_count} / {event.capacity} Spots Filled</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="pt-6 space-y-3">
//                 <button
//                   onClick={handleRegister}
//                   disabled={registered}
//                   className={`w-full py-4 rounded-2xl text-lg font-bold transition-all shadow-lg flex items-center justify-center gap-2 ${
//                     registered
//                       ? "bg-emerald-500 text-white cursor-not-allowed"
//                       : "bg-indigo-600 text-white hover:bg-indigo-700 hover:-translate-y-1 active:scale-95 shadow-indigo-200"
//                   }`}
//                 >
//                   {registered ? (
//                     <><span>✓</span> Registered</>
//                   ) : (
//                     "Join Event"
//                   )}
//                 </button>

//                 <button
//                   onClick={fetchAttendees}
//                   className="w-full py-4 rounded-2xl font-bold text-gray-600 hover:bg-gray-50 transition-colors border border-gray-100"
//                 >
//                   {showAttendees ? "Hide Guest List" : "See Who's Going"}
//                 </button>
//               </div>
//             </div>
            
//             <div className="bg-gray-50 p-6 border-t border-gray-100 text-center">
//               <p className="text-xs text-gray-400 font-medium">Securely managed by EventFlow</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// );}





return (
  /* Added dark:bg-slate-950 and dark:text-white */
  <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20 transition-colors duration-300">
    <Navbar />

    {/* HEADER / HERO SECTION */}
    <div className="relative h-[40vh] md:h-[50vh] w-full overflow-hidden">
      <img 
        src={eventpicc} 
        alt={event.title} 
        className="w-full h-full object-cover"
      />
      {/* Reduced blur slightly for dark mode aesthetics */}
      <div className="absolute inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-[2px] flex items-end">
        <div className="max-w-7xl mx-auto px-6 mb-12 w-full">
          <Link to="/events" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors text-sm font-medium">
             <span className="mr-2"><ArrowLeft className="w-5 h-5"/> </span> Back to Events
          </Link>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
            {event.title}
          </h1>
        </div>
      </div>
    </div>

    {/* MAIN CONTENT GRID */}
    <div className="max-w-7xl mx-auto px-6 -mt-8 relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* LEFT COLUMN: Description & Attendees */}
        <div className="lg:col-span-2 space-y-8">
          {/* Added dark:bg-slate-900 and dark:border-slate-800 */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800 p-8 md:p-12 transition-colors">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">About this event</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed whitespace-pre-line">
              {event.description}
            </p>

            {/* Success Message - Darkened slightly for dark mode */}
            {message && (
              <div className="mt-8 p-4 bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-900/30 rounded-2xl flex items-center gap-3 text-green-700 dark:text-green-400 font-semibold">
                <span className="text-xl"><CheckCircle className="w-5 h-5"/></span> {message}
              </div>
            )}
          </div>

          {/* ATTENDEES SECTION */}
          {showAttendees && (
            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800 p-8 animate-in fade-in slide-in-from-bottom-4 transition-colors">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Community</h3>
                <span className="bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 px-3 py-1 rounded-full text-sm font-bold">
                  {attendees.length} Joined
                </span>
              </div>

              {attendees.length === 0 ? (
                <div className="text-center py-10 text-gray-400 dark:text-gray-500 italic">
                  Be the first one to join this event!
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {attendees.map(a => (
                    /* Added dark styles to attendee cards */
                    <div key={a.id} className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 group hover:border-indigo-200 dark:hover:border-indigo-500/50 transition-colors">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
                        {a.username.charAt(0).toUpperCase()}
                      </div>
                      <span className="font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-tight text-sm">{a.username}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: The Sticky Info Card */}
        <div className="lg:col-span-1">
          {/* Card: Added dark:bg-slate-900, dark:border-slate-800, and removed indigo shadow in dark mode */}
          <div className="sticky top-24 bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-indigo-100/50 dark:shadow-none border border-indigo-50 dark:border-slate-800 overflow-hidden transition-colors">
            <div className="p-8 space-y-6">
              <div className="space-y-4">
                {/* Date info section */}
                <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                    <Calendar className="w-5 h-5"/>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Date & Time</p>
                    <p className="font-bold text-gray-900 dark:text-gray-200">{new Date(event.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  </div>
                </div>

                {/* Location info section */}
                <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                    <MapPin className="w-5 h-5"/>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Location</p>
                    <p className="font-bold text-gray-900 dark:text-gray-200">{event.location}</p>
                  </div>
                </div>

                {/* Capacity info section */}
                <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                    <Users className="w-5 h-5"/>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Capacity</p>
                    <p className="font-bold text-gray-900 dark:text-gray-200">{event.attendee_count} / {event.capacity} Spots Filled</p>
                  </div>
                </div>
              </div>

              <div className="pt-6 space-y-3">
                <button
                  onClick={handleRegister}
                  disabled={registered}
                  className={`w-full py-4 rounded-2xl text-lg font-bold transition-all shadow-lg flex items-center justify-center gap-2 ${
                    registered
                      ? "bg-emerald-500 text-white cursor-not-allowed"
                      : "bg-indigo-600 text-white hover:bg-indigo-700 hover:-translate-y-1 active:scale-95 shadow-indigo-200 dark:shadow-none"
                  }`}
                >
                  {registered ? (
                    <><span><CheckCircle className="w-5 h-5"/></span> Registered</>
                  ) : (
                    "Join Event"
                  )}
                </button>

                <button
                  onClick={fetchAttendees}
                  className="w-full py-4 rounded-2xl font-bold text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors border border-gray-100 dark:border-slate-700"
                >
                  {showAttendees ? "Hide Guest List" : "See Who's Going"}
                </button>
              </div>
            </div>
            
            {/* Footer of Card */}
            <div className="bg-gray-50 dark:bg-slate-800/50 p-6 border-t border-gray-100 dark:border-slate-800 text-center">
              <p className="text-xs text-gray-400 dark:text-gray-500 font-medium">Securely managed by EventFlow</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);}