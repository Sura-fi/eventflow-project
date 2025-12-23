// import { useParams, useNavigate, Link } from "react-router-dom"; // 1. Added useNavigate
// import { useEffect, useState } from "react";
// import api from "../api/axios";

// import { eventpicc } from "../assets/images";
// import Navbar from "../components/Navbar";
// import { ArrowLeft, MapPin, Calendar, Users, CheckCircle, Trash2, ChevronUp } from "lucide-react"; // Added Trash icon

// export default function EventDetail() {
//   const { id } = useParams();
//   const navigate = useNavigate(); // 2. Initialize navigate
//   const [registered, setRegistered] = useState(false);
//   const [event, setEvent] = useState(null);
//   const [message, setMessage] = useState("");

//   const [attendees, setAttendees] = useState([]);
//   const [showAttendees, setShowAttendees] = useState(false);
//   const [isOrganizer, setIsOrganizer] = useState(false);

//   useEffect(() => {
//     api.get(`/api/events/${id}/`)
//       .then(res => setEvent(res.data));
//   }, [id]);

//   const handleRegister = () => {
//     api.post("/api/events/register/", { event: event.id })
//       .then(() => {
//         setMessage("You have successfully registered for this event.");
//         setRegistered(true);
//       })
//       .catch(err => {
//         setMessage(err.response?.data?.detail || "Registration failed.");
//       });
//   };

//   const fetchAttendees = async () => {
//     // 1. If it's already showing, just hide it and stop
//     if (showAttendees) {
//       setShowAttendees(false);
//       return;
//     }
  
//     // 2. If it's not showing, fetch the data and then show it
//     try {
//       const res = await api.get(`/api/events/${id}/attendees/`);
//       setAttendees(res.data);
//       setShowAttendees(true);
//       setIsOrganizer(true);
//     } catch (err) {
//       console.error(err);
//       setIsOrganizer(false);
//     }
//   };

//   // 3. THE DELETE FUNCTION
//   const handleDelete = async () => {
//     if (window.confirm("Are you sure you want to delete this event? This cannot be undone.")) {
//       try {
//         await api.delete(`/api/events/${id}/`);
//         alert("Event deleted successfully!");
//         navigate("/events"); // Redirect back to list
//       } catch (err) {
//         alert("Error deleting event. Only the creator can perform this action.");
//       }
//     }
//   };

//   if (!event) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mb-4"></div>
//         <p className="text-gray-600 font-medium">Loading event details...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20 transition-colors duration-300">
//       <Navbar />

//       <div className="relative h-[40vh] md:h-[50vh] w-full overflow-hidden">
//         <img src={eventpicc} alt={event.title} className="w-full h-full object-cover" />
//         <div className="absolute inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-[2px] flex items-end">
//           <div className="max-w-7xl mx-auto px-6 mb-12 w-full">
//             <Link to="/events" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors text-sm font-medium">
//               <span className="mr-2"><ArrowLeft className="w-5 h-5"/></span> Back to Events
//             </Link>
//             <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
//               {event.title}
//             </h1>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-6 -mt-8 relative z-10">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
//           <div className="lg:col-span-2 space-y-8">
//             <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800 p-8 md:p-12 transition-colors">
//               <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">About this event</h2>
//               <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed whitespace-pre-line">
//                 {event.description}
//               </p>

//               {message && (
//                 <div className="mt-8 p-4 bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-900/30 rounded-2xl flex items-center gap-3 text-green-700 dark:text-green-400 font-semibold">
//                   <span className="text-xl"><CheckCircle className="w-5 h-5"/></span> {message}
//                 </div>
//               )}
//             </div>

//             {showAttendees && (
//               <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800 p-8 animate-in fade-in slide-in-from-bottom-4 transition-colors">
//                 <div className="flex items-center justify-between mb-8">
//                   <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Community</h3>
//                   <span className="bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 px-3 py-1 rounded-full text-sm font-bold">
//                     {attendees.length} Joined
//                   </span>
//                 </div>

//                 {attendees.length === 0 ? (
//                   <div className="text-center py-10 text-gray-400 dark:text-gray-500 italic">
//                     Be the first one to join this event!
//                   </div>
//                 ) : (
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                     {attendees.map(a => (
//                       <div key={a.id} className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 group hover:border-indigo-200 dark:hover:border-indigo-500/50 transition-colors">
//                         <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
//                           {a.username.charAt(0).toUpperCase()}
//                         </div>
//                         <span className="font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-tight text-sm">{a.username}</span>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>

//           <div className="lg:col-span-1">
//             <div className="sticky top-24 bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-indigo-100/50 dark:shadow-none border border-indigo-50 dark:border-slate-800 overflow-hidden transition-colors">
//               <div className="p-8 space-y-6">
//                 <div className="space-y-4">
//                   <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
//                     <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
//                       <Calendar className="w-5 h-5"/>
//                     </div>
//                     <div>
//                       <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Date & Time</p>
//                       <p className="font-bold text-gray-900 dark:text-gray-200">{new Date(event.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
//                     <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
//                       <MapPin className="w-5 h-5"/>
//                     </div>
//                     <div>
//                       <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Location</p>
//                       <p className="font-bold text-gray-900 dark:text-gray-200">{event.location}</p>
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
//                     <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
//                       <Users className="w-5 h-5"/>
//                     </div>
//                     <div>
//                       <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Capacity</p>
//                       <p className="font-bold text-gray-900 dark:text-gray-200">{event.attendee_count} / {event.capacity} Spots Filled</p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="pt-6 space-y-3">
//                   <button
//                     onClick={handleRegister}
//                     disabled={registered}
//                     className={`w-full py-4 rounded-2xl text-lg font-bold transition-all shadow-lg flex items-center justify-center gap-2 ${
//                       registered
//                         ? "bg-emerald-500 text-white cursor-not-allowed"
//                         : "bg-indigo-600 text-white hover:bg-indigo-700 hover:-translate-y-1 active:scale-95 shadow-indigo-200 dark:shadow-none"
//                     }`}
//                   >
//                     {registered ? (
//                       <><span><CheckCircle className="w-5 h-5"/></span> Registered</>
//                     ) : (
//                       "Join Event"
//                     )}
//                   </button>

//                   <button
//             onClick={fetchAttendees}
//             className="w-full py-4 rounded-2xl font-bold text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors border border-gray-100 dark:border-slate-700 flex items-center justify-center gap-2"
//               >
//             {showAttendees ? (
//             <> <ChevronUp className="w-5 h-5" /> Hide Guest List </>
//             ) : (
//               <>
//             <Users className="w-5 h-5" /> See Who's Going
//             </>   
//         )}
//       </button>

//                   {/* 4. THE CONDITIONAL DELETE BUTTON */}
//                   {isOrganizer && (
//                     <button
//                       onClick={handleDelete}
//                       className="w-full py-4 rounded-2xl font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors border border-red-100 dark:border-red-900/30 flex items-center justify-center gap-2"
//                     >
//                       <Trash2 className="w-5 h-5" /> Delete Event
//                     </button>
//                   )}
//                 </div>
//               </div>
              
//               <div className="bg-gray-50 dark:bg-slate-800/50 p-6 border-t border-gray-100 dark:border-slate-800 text-center">
//                 <p className="text-xs text-gray-400 dark:text-gray-500 font-medium">Securely managed by EventFlow</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }






import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";

import { eventpicc } from "../assets/images";
import Navbar from "../components/Navbar";
import { ArrowLeft, MapPin, Calendar, Users, CheckCircle, Trash2, ChevronUp } from "lucide-react";

export default function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [registered, setRegistered] = useState(false);
  const [event, setEvent] = useState(null);
  const [message, setMessage] = useState("");

  const [attendees, setAttendees] = useState([]);
  const [showAttendees, setShowAttendees] = useState(false);
  
  // Renamed for clarity: Managers and Organizers can both see the list
  const [canManage, setCanManage] = useState(false);
  // Separate state just for the Delete button (Organizer only)
  const [isOrganizer, setIsOrganizer] = useState(false);

  // useEffect(() => {
  //   // 1. Fetch Event Data
  //   api.get(`/api/events/${id}/`)
  //     .then(res => setEvent(res.data));

  //   // 2. Determine Permissions based on Role
  //   const userRole = localStorage.getItem("role")?.toLowerCase();
  //   if (userRole === 'organizer' || userRole === 'manager') {
  //     setCanManage(true);
  //   }
  //   if (userRole === 'organizer') {
  //     setIsOrganizer(true);
  //   }
  // }, [id]);



  useEffect(() => {
    api.get(`/api/events/${id}/`)
      .then(res => setEvent(res.data));
  
    // Get role and normalize it to lowercase for safety
    const userRole = localStorage.getItem("role")?.toLowerCase();
  
    // If role is organizer OR manager, they can see the 'See Who's Going' button
    if (userRole === 'organizer' || userRole === 'manager') {
      setCanManage(true);
    }
  
    // ONLY organizers can see the Delete button
    if (userRole === 'organizer') {
      setIsOrganizer(true);
    }
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
    if (showAttendees) {
      setShowAttendees(false);
      return;
    }
  
    try {
      // Ensure this matches the backend: /api/events/ID/attendees/
      const res = await api.get(`/api/events/${id}/attendees/`); 
      console.log("Success! Attendees found:", res.data);
      setAttendees(res.data);
      setShowAttendees(true);
    } catch (err) {
      console.error("Error fetching list:", err);
      alert("Could not load guest list.");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this event? This cannot be undone.")) {
      try {
        await api.delete(`/api/events/${id}/`);
        alert("Event deleted successfully!");
        navigate("/events");
      } catch (err) {
        alert("Error deleting event. Only the creator can perform this action.");
      }
    }
  };

  if (!event) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mb-4"></div>
        <p className="text-gray-600 font-medium">Loading event details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20 transition-colors duration-300">
      <Navbar />

      <div className="relative h-[40vh] md:h-[50vh] w-full overflow-hidden">
        <img src={eventpicc} alt={event.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-[2px] flex items-end">
          <div className="max-w-7xl mx-auto px-6 mb-12 w-full">
            <Link to="/events" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors text-sm font-medium">
              <span className="mr-2"><ArrowLeft className="w-5 h-5"/></span> Back to Events
            </Link>
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
              {event.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800 p-8 md:p-12 transition-colors">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">About this event</h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed whitespace-pre-line">
                {event.description}
              </p>

              {message && (
                <div className="mt-8 p-4 bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-900/30 rounded-2xl flex items-center gap-3 text-green-700 dark:text-green-400 font-semibold">
                  <span className="text-xl"><CheckCircle className="w-5 h-5"/></span> {message}
                </div>
              )}
            </div>

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

          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-indigo-100/50 dark:shadow-none border border-indigo-50 dark:border-slate-800 overflow-hidden transition-colors">
              <div className="p-8 space-y-6">
                <div className="space-y-4">
                  {/* Event Meta Info (Calendar, MapPin, Users) */}
                  <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                      <Calendar className="w-5 h-5"/>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Date & Time</p>
                      <p className="font-bold text-gray-900 dark:text-gray-200">{new Date(event.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                      <MapPin className="w-5 h-5"/>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Location</p>
                      <p className="font-bold text-gray-900 dark:text-gray-200">{event.location}</p>
                    </div>
                  </div>

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

                  {/* Accessible to both Manager and Organizer */}
                  {canManage && (
                    <button
                      onClick={fetchAttendees}
                      className="w-full py-4 rounded-2xl font-bold text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors border border-gray-100 dark:border-slate-700 flex items-center justify-center gap-2"
                    >
                      {showAttendees ? (
                        <> <ChevronUp className="w-5 h-5" /> Hide Guest List </>
                      ) : (
                        <> <Users className="w-5 h-5" /> See Who's Going </>   
                      )}
                    </button>
                  )}

                  {/* Delete button only for the Organizer */}
                  {isOrganizer && (
                    <button
                      onClick={handleDelete}
                      className="w-full py-4 rounded-2xl font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors border border-red-100 dark:border-red-900/30 flex items-center justify-center gap-2"
                    >
                      <Trash2 className="w-5 h-5" /> Delete Event
                    </button>
                  )}
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-slate-800/50 p-6 border-t border-gray-100 dark:border-slate-800 text-center">
                <p className="text-xs text-gray-400 dark:text-gray-500 font-medium">Securely managed by EventFlow</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}