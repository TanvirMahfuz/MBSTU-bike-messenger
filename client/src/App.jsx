import { useState,useEffect } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from './components/navbar/Navbar';
import Profile from './pages/Profile';
import { useUserStore } from './store/useUserStore';
function App() {
  const { authUser, check } = useUserStore();
  useEffect(()=>{
    console.log("App mounted. calling validator");
    async function validateUser() {
      const user = await check();
    }
    validateUser();
  },[check])
  return (
    <>
      <BrowserRouter>
        <Navbar />
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
