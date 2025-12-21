// import { useEffect, useState } from "react";
// import api from "../api/axios";

// export default function MyRegistrations() {
//   const [registrations, setRegistrations] = useState([]);

//   useEffect(() => {
//     api.get("/api/my-registrations/")
//       .then(res => setRegistrations(res.data))
//       .catch(err => console.error(err));

//   }, []);

//   return (
//     <div>
//       <h2>My Registered Events</h2>
//       {registrations.length === 0 && <p>No registrations yet.</p>}
//       {registrations.map(r => (
//         <p key={r.id}>{r.event_title}</p>
//       ))}
//     </div>
//   );

// }





import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import { CalendarDays, MapPin, Ticket, ArrowRight, CalendarX } from "lucide-react";
import { Link } from "react-router-dom";

export default function MyRegistrations() {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/api/my-registrations/")
      .then(res => {
        setRegistrations(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

//   return (
//     <div className="min-h-screen bg-slate-50">
//       <Navbar />

//       <div className="max-w-5xl mx-auto px-6 py-12">
//         {/* Header Section */}
//         <div className="flex items-center justify-between mb-10">
//           <div>
//             <h1 className="text-4xl font-black text-gray-900 tracking-tight">
//               My <span className="text-indigo-600">Schedule</span>
//             </h1>
//             <p className="text-gray-500 mt-2 font-medium">
//               You have {registrations.length} upcoming experiences.
//             </p>
//           </div>
//           <div className="hidden md:block">
//              <Ticket className="w-12 h-12 text-indigo-100 rotate-12" />
//           </div>
//         </div>

//         {loading ? (
//           <div className="flex justify-center py-20">
//             <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-indigo-600"></div>
//           </div>
//         ) : registrations.length === 0 ? (
//           /* Empty State */
//           <div className="bg-white rounded-3xl border-2 border-dashed border-gray-200 p-16 text-center">
//             <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
//               <CalendarX className="w-10 h-10 text-gray-300" />
//             </div>
//             <h3 className="text-xl font-bold text-gray-900 mb-2">No plans yet?</h3>
//             <p className="text-gray-500 mb-8 max-w-xs mx-auto">
//               Explore upcoming events and start filling your calendar with amazing experiences.
//             </p>
//             <Link 
//               to="/events" 
//               className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
//             >
//               Browse Events
//             </Link>
//           </div>
//         ) : (
//           /* Registrations List */
//           <div className="space-y-4">
//             {registrations.map((r) => (
//               <div 
//                 key={r.id} 
//                 className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all duration-300"
//               >
//                 <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  
//                   {/* Event Info */}
//                   <div className="flex items-start gap-5">
//                     <div className="bg-indigo-50 text-indigo-600 p-4 rounded-2xl hidden sm:block">
//                        <CalendarDays className="w-6 h-6" />
//                     </div>
//                     <div>
//                       <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
//                         {r.event_title}
//                       </h3>
//                       <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-500 font-medium">
//                         <span className="flex items-center gap-1.5">
//                           <CalendarDays className="w-4 h-4" /> 
//                           {new Date(r.registered_at).toLocaleDateString()}
//                         </span>
//                         <span className="flex items-center gap-1.5">
//                           <MapPin className="w-4 h-4" />
//                           {r.event_location || "Check details"}
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Actions */}
//                   <div className="flex items-center gap-3">
//                     <Link
//                       to={`/events/${r.event}`}
//                       className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-indigo-600 transition-all"
//                     >
//                       View Details <ArrowRight className="w-4 h-4" />
//                     </Link>
//                   </div>

//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }





return (
  /* Added dark:bg-slate-950 transition-colors */
  <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
    <Navbar />

    <div className="max-w-5xl mx-auto px-6 py-12">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-10">
        <div>
          {/* Added dark:text-white */}
          <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">
            My <span className="text-indigo-600 dark:text-indigo-400">Schedule</span>
          </h1>
          {/* Added dark:text-gray-400 */}
          <p className="text-gray-500 dark:text-gray-400 mt-2 font-medium">
            You have {registrations.length} upcoming experiences.
          </p>
        </div>
        <div className="hidden md:block">
           {/* Adjusted icon opacity for dark mode */}
           <Ticket className="w-12 h-12 text-indigo-100 dark:text-indigo-900/40 rotate-12" />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-indigo-600"></div>
        </div>
      ) : registrations.length === 0 ? (
        /* Empty State: Added dark:bg-slate-900 and dark:border-slate-800 */
        <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-dashed border-gray-200 dark:border-slate-800 p-16 text-center transition-colors">
          <div className="bg-slate-50 dark:bg-slate-800 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CalendarX className="w-10 h-10 text-gray-300 dark:text-gray-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No plans yet?</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-xs mx-auto">
            Explore upcoming events and start filling your calendar with amazing experiences.
          </p>
          <Link 
            to="/events" 
            className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 dark:shadow-none"
          >
            Browse Events
          </Link>
        </div>
      ) : (
        /* Registrations List */
        <div className="space-y-4">
          {registrations.map((r) => (
            /* Card: Added dark:bg-slate-900 and dark:border-slate-800 */
            <div 
              key={r.id} 
              className="group bg-white dark:bg-slate-900 rounded-2xl p-6 border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-indigo-100 dark:hover:border-indigo-500/30 transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                
                {/* Event Info */}
                <div className="flex items-start gap-5">
                  {/* Icon Wrapper: Added dark:bg-indigo-900/30 and dark:text-indigo-400 */}
                  <div className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 p-4 rounded-2xl hidden sm:block transition-colors">
                     <CalendarDays className="w-6 h-6" />
                  </div>
                  <div>
                    {/* Added dark:text-white */}
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {r.event_title}
                    </h3>
                    {/* Meta info: Added dark:text-gray-400 */}
                    <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-500 dark:text-gray-400 font-medium">
                      <span className="flex items-center gap-1.5">
                        <CalendarDays className="w-4 h-4" /> 
                        {new Date(r.registered_at).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4" />
                        {r.event_location || "Check details"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                  {/* Button: Added dark:bg-white dark:text-slate-900 dark:hover:bg-indigo-400 */}
                  <Link
                    to={`/events/${r.event}`}
                    className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-900 dark:bg-slate-800 text-white text-sm font-bold rounded-xl hover:bg-indigo-600 dark:hover:bg-indigo-600 transition-all"
                  >
                    View Details <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);}