import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import ContactForm from "./pages/ContactForm";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import LeadDetails from "./pages/LeadDetails";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#1e293b", 
            color: "#fff",
          },
        }}
      />

      <Navbar/>
      <Routes>
        <Route path="/" element={<ContactForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/leads/:id" element={<LeadDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
