import { useState,useEffect } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from './components/navbar/Navbar';
import { useUserStore } from './store/useUserStore';
function App() {
  const { authUser, check } = useUserStore();

  useEffect(()=>{
    const checkUser = async () => {
      const isAuthenticated = await check();
      if (isAuthenticated) {
        console.log("User is authenticated:", authUser);
      } else {
        console.log("User is not authenticated");
      }
    };
    if (!authUser) {
      checkUser();
    }
    else {
      console.log("User is already authenticated:", authUser);
    }
  },[])
  
  return (
    <>
      <BrowserRouter>
        <Navbar />
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
