import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import MyRegistrations from "./pages/MyRegistrations";
import CreateEvent from "./pages/CreateEvent";


export default function App() {
  return (
   
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetail />} />
        <Route path="/my-registrations" element={<MyRegistrations />} />
        <Route path="/create-event" element={<CreateEvent />} />
      </Routes>
    </BrowserRouter> 
   
  );
}
