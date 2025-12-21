// import { Link } from "react-router-dom";

// export default function EventCard({ event }) {
//   return (
//     <div className="event-card">
//       <h3>{event.title}</h3>
//       <p>{event.description.slice(0, 80)}...</p>

//       <div className="event-footer">
//         <span>Capacity: {event.capacity}</span>
//         <Link to={`/events/${event.id}`} className="btn">
//           View
//         </Link>
//         <p>
//         Attendees: {event.attendee_count} / {event.capacity}
//         </p>

//       </div>
//     </div>
//   );
// }


// import { Link } from "react-router-dom";

// export default function EventCard({ event }) {
//   return (
//     <div className="rounded-2xl bg-white p-6 shadow hover:shadow-lg transition">
      
//       <h3 className="text-xl font-semibold text-gray-800">
//         {event.title}
//       </h3>

//       <p className="mt-2 text-gray-600">
//         {event.description}
//       </p>

//       <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
//         <span>👥 {event.attendee_count} / {event.capacity} attending</span>
//       </div>

//       <Link
//         to={`/events/${event.id}`}
//         className="mt-4 inline-block text-indigo-600 font-medium hover:underline"
//       >
//         View Event →
//       </Link>
//     </div>
//   );
// }





// import { Link } from "react-router-dom";

// export default function EventCard({ event }) {
//   return (
// <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 p-6 flex flex-col justify-between border border-gray-100">
      
//       <div>
//         <h3 className="text-xl font-semibold text-gray-800 mb-2">
//           {event.title}
//         </h3>

//         <p className="text-gray-600 mb-4 line-clamp-3">
//           {event.description}
//         </p>

//         <p className="text-sm text-gray-500 mb-2">
//           📍 {event.location}
//         </p>

//         <p className="text-sm text-gray-500 mb-2">
//           🗓 {new Date(event.date).toLocaleDateString()}
//         </p>

//         <p className="text-sm font-medium text-gray-700">
//           👥 Attendees: {event.attendee_count} / {event.capacity}
//         </p>
//       </div>

//       <Link
//   to={`/events/${event.id}`}
//   className="mt-6 inline-flex items-center justify-center gap-2 bg-indigo-600 text-white py-2.5 rounded-xl hover:bg-indigo-700 transition font-medium shadow-md"
// >
//   View Event →
// </Link>

//     </div>
//   );
// }





import { Link } from "react-router-dom";
import {eventpic} from '../assets/images';
import { MapPin, ArrowRight } from "lucide-react"; // Import for a cleaner look

export default function EventCard({ event }) {

// export default function EventCard({ event }) {
  
    // <div className="bg-white/80 backdrop-blur rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 hover:-translate-y-1">
      
    //   <div>
    //     <h3 className="text-2xl font-bold text-gray-900 mb-2">
    //       {event.title}
    //     </h3>

    //     <p className="text-gray-600 mb-4 line-clamp-3">
    //       {event.description}
    //     </p>

    //     <div className="space-y-1 text-sm text-gray-700">
    //       <p>📍 {event.location}</p>
    //       <p>🗓 {new Date(event.date).toLocaleDateString()}</p>
    //       <p className="font-medium">
    //         👥 {event.attendee_count} / {event.capacity} attending
    //       </p>
    //     </div>
    //   </div>

//     return (
// <div className="overflow-hidden bg-white rounded-3xl shadow-lg border border-gray-100 transition-all hover:shadow-2xl">
//   {/* Event Image Placeholder */}
//   <div className="h-48 w-full bg-indigo-100 relative overflow-hidden">
//     <img src={eventpic} alt={event.title} className="w-full h-full object-cover" />
//     <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-lg shadow-sm">
//       <p className="text-xs font-bold text-gray-900">
//         {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: '2-digit' })}
//       </p>
//     </div>
//   </div>

//   <div className="p-6">
//     <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>

//     <div className="flex items-center text-sm font-medium text-indigo-600 mb-2">
//   <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//      </svg>
//      {event.location}
//     </div>

//     <p className="text-gray-500 text-sm mb-4 line-clamp-2">{event.description}</p>
    
//     <div className="flex items-center justify-between border-t border-gray-50 pt-4">
//       <div className="text-xs text-gray-400">
//         <span className="font-semibold text-indigo-600">{event.attendee_count} / {event.capacity} attending</span> 
//       </div>
//       <Link to={`/events/${event.id}`} className="text-sm font-bold text-indigo-600 hover:text-indigo-800">
//         View Details →
//       </Link>
//     </div>
//   </div>
// </div>)



      
     




  return (
    /* Card: Added dark:bg-slate-900 and dark:border-slate-800 */
    <div className="overflow-hidden bg-white dark:bg-slate-900 rounded-3xl shadow-lg border border-gray-100 dark:border-slate-800 transition-all hover:shadow-2xl hover:-translate-y-1 duration-300">
      
      {/* Event Image Placeholder */}
      <div className="h-48 w-full bg-indigo-100 dark:bg-slate-800 relative overflow-hidden">
        <img src={eventpic} alt={event.title} className="w-full h-full object-cover" />
        
        {/* Date Badge: Added dark:bg-slate-900/90 and dark:text-white */}
        <div className="absolute top-4 left-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur px-3 py-1 rounded-lg shadow-sm transition-colors">
          <p className="text-xs font-bold text-gray-900 dark:text-white">
            {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: '2-digit' })}
          </p>
        </div>
      </div>

      <div className="p-6">
        {/* Title: Added dark:text-white */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 transition-colors">
          {event.title}
        </h3>

        {/* Location: Added dark:text-indigo-400 */}
        <div className="flex items-center text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-2 transition-colors">
          <MapPin className="w-4 h-4 mr-1" />
          {event.location}
        </div>

        {/* Description: Added dark:text-gray-400 */}
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 line-clamp-2 transition-colors">
          {event.description}
        </p>
        
        {/* Footer: Added dark:border-slate-800 */}
        <div className="flex items-center justify-between border-t border-gray-50 dark:border-slate-800 pt-4 transition-colors">
          <div className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-tight">
            {/* Count: Added dark:text-indigo-400 */}
            <span className="font-semibold text-indigo-600 dark:text-indigo-400">
              {event.attendee_count} / {event.capacity} attending
            </span> 
          </div>
          
          {/* Link: Added dark:text-indigo-400 and dark:hover:text-indigo-300 */}
          <Link 
            to={`/events/${event.id}`} 
            className="group flex items-center text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
          >
            Details <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

