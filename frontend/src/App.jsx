import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import MyRegistrations from "./pages/MyRegistrations";


export default function App() {
  return (
   
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetail />} />
        <Route path="/my-registrations" element={<MyRegistrations />} />
      </Routes>
    </BrowserRouter> 
   
  );
}



// function App() {
//   return (
//     <div>
//       <h1 className="text-4xl font-bold text-indigo-600">
//         Tailwind is WORKING 🎉
//       </h1>
//     </div>
//   );
// }

// export default App;
