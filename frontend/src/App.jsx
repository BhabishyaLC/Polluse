import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/Dashboard.jsx";
import Polls from "./pages/Polls.jsx";
import SharedPoll from "./pages/SharedPoll.jsx";
function App() {
  return (
    <>
    <Toaster/>
    <Routes>
         
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/polls" element={<Polls />} />
        <Route path="/p/:shareToken" element={<SharedPoll/>} /> 
      </Routes>
      
      </>
      
   
  );
}

export default App;
