import { Link } from "react-router-dom";
import {eventpic} from '../assets/images';
import { MapPin, ArrowRight } from "lucide-react"; // Import for a cleaner look

export default function EventCard({ event }) {

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

