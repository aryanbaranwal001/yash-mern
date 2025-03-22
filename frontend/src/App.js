import React from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom"; 
import Login from './Pages/login.jsx'
import Register from './Pages/register.jsx'
import Secret from './Pages/secret.jsx'
import AdminPage from './Pages/adminPage.jsx'

export default function app() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path ="/register" element={<Register />} />
        <Route exact path ="/login" element={<Login />} />
        <Route exact path ="/" element={<Secret />} />
        <Route exact path ="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  )
}