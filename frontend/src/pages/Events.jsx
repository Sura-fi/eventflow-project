// import { useEffect, useState } from "react";
// import api from "../api/axios";
// import EventCard from "../components/EventCard";
// import Navbar from "../components/Navbar";

// export default function Events() {
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState("");

//   useEffect(() => {
//     api.get("/api/events/")
//       .then(res => {
//         setEvents(res.data);
//         setLoading(false);
//       })
//       .catch(() => setLoading(false));
//   }, []);

//   const filteredEvents = events.filter(event =>
//     event.title.toLowerCase().includes(search.toLowerCase())
//   );

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen text-xl">
//         Loading events...
//       </div>
//     );
//   }

//   return (
//     <>
//       <Navbar />

//       <div className="min-h-screen bg-gradient-to-br from-slate-100 to-indigo-100">
//       <div className="max-w-7xl mx-auto px-6 py-10">
      
      
//       <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//   <h2 className="text-4xl font-extrabold text-gray-900">
//     Upcoming Events
//   </h2>

//   <input
//     type="text"
//     placeholder="Search events..."
//     value={search}
//     onChange={e => setSearch(e.target.value)}
//     className="w-full md:w-80 px-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
//   />
// </div>


//         {filteredEvents.length === 0 ? (
//           <p className="text-gray-500">No events found.</p>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//             {filteredEvents.map(event => (
//               <EventCard key={event.id} event={event} />
//             ))}
//           </div>
//         )}
//       </div>
//       </div>
      
//     </>
//   );
// }







import { useEffect, useState } from "react";
import api from "../api/axios";
import EventCard from "../components/EventCard";
import Navbar from "../components/Navbar";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    api.get("/api/events/")
      .then(res => {
        setEvents(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-medium text-indigo-600">
        <div className="animate-pulse">Loading amazing events...</div>
      </div>
    );
  }

  // return (
  //   <>
  //     <Navbar />
  //     {/* --- HERO SECTION START --- */}
  //     <div className="relative bg-white border-b border-gray-100 overflow-hidden">
  //       {/* Decorative background blob */}
  //       <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 bg-indigo-50 rounded-full blur-3xl opacity-50"></div>
        
  //       <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 relative z-10">
  //         <div className="max-w-3xl">
  //           <h1 className="text-5xl md:text-6xl font-black text-gray-900 leading-tight mb-6">
  //             Discover <span className="text-indigo-600">Experiences</span> That Matter.
  //           </h1>
  //           <p className="text-lg md:text-xl text-gray-600 mb-10 leading-relaxed">
  //             Join thousands of people discovering local workshops, tech conferences, and social meetups. Your next big opportunity is just one click away.
  //           </p>

  //           {/* Search Input Integrated into Hero */}
  //           <div className="relative max-w-xl group">
  //             <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
  //               <svg className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  //               </svg>
  //             </span>
  //             <input
  //               type="text"
  //               placeholder="Search by event title, category, or location..."
  //               value={search}
  //               onChange={e => setSearch(e.target.value)}
  //               className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 bg-white shadow-xl shadow-indigo-100/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
  //             />
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //     {/* --- HERO SECTION END --- */}

  //     <div className="min-h-screen bg-slate-50/50">
  //       <div className="max-w-7xl mx-auto px-6 py-12">
          
  //         <div className="mb-8 flex items-center justify-between">
  //           <div>
  //             <h2 className="text-2xl font-bold text-gray-900">
  //               Upcoming Events
  //             </h2>
  //             <p className="text-gray-500 text-sm mt-1">Showing {filteredEvents.length} events found</p>
  //           </div>
  //         </div>

  //         {filteredEvents.length === 0 ? (
  //           <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
  //             <p className="text-gray-400 text-lg italic">No events match your search. Try another keyword!</p>
  //           </div>
  //         ) : (
  //           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
  //             {filteredEvents.map(event => (
  //               <EventCard key={event.id} event={event} />
  //             ))}
  //           </div>
  //         )}
  //       </div>
  //     </div>
  //   </>
  // );







  return (
    <>
      <Navbar />
      {/* --- HERO SECTION START --- */}
      {/* Added dark:bg-slate-900 and dark:border-slate-800 */}
      <div className="relative bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800 transition-colors duration-300 overflow-hidden">

        {/* Decorative background blob - changed opacity and color for dark mode */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 bg-indigo-50 dark:bg-indigo-900/20 rounded-full blur-3xl opacity-50"></div>
        
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 relative z-10">
          <div className="max-w-3xl">
            {/* Added dark:text-white */}
            <h1 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white leading-tight mb-6 transition-colors">
              Discover <span className="text-indigo-600 dark:text-indigo-400">Experiences</span> That Matter.
            </h1>
            {/* Added dark:text-gray-400 */}
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-10 leading-relaxed transition-colors">
              Join thousands of people discovering local workshops, tech conferences, and social meetups. Your next big opportunity is just one click away.
            </p>

            {/* Search Input Integrated into Hero */}
            <div className="relative max-w-xl group">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              {/* Added dark:bg-slate-800 dark:border-slate-700 dark:text-white dark:shadow-none */}
              <input
                type="text"
                placeholder="Search by event title, category, or location..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white shadow-xl shadow-indigo-100/50 dark:shadow-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
            </div>
          </div>
        </div>
      </div>
      {/* --- HERO SECTION END --- */}

      {/* Main Body Background: Added dark:bg-slate-950 */}
      <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 py-12">
          
          <div className="mb-8 flex items-center justify-between">
            <div>
              {/* Added dark:text-white */}
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Upcoming Events
              </h2>
              {/* Added dark:text-gray-500 */}
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Showing {filteredEvents.length} events found</p>
            </div>
          </div>

          {filteredEvents.length === 0 ? (
            /* Added dark:bg-slate-900 dark:border-slate-800 */
            <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border-2 border-dashed border-gray-200 dark:border-slate-800 transition-colors">
              <p className="text-gray-400 dark:text-gray-500 text-lg italic">No events match your search. Try another keyword!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
);
}