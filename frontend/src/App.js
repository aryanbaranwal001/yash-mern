import React from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom"; 
import Login from './Pages/login.jsx'
import Register from './Pages/register.jsx'
import Secret from './Pages/secret.jsx'
import AdminPage from './Pages/adminPage.jsx'
import HomePage from './Pages/homePage.jsx'
import AdminRestaurantPage from "./Pages/adminRestaurantPage.jsx";
export default function app() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path ="/register" element={<Register />} />
        <Route exact path ="/login" element={<Login />} />
        <Route exact path ="/" element={<Secret />} />
        <Route exact path ="/admin" element={<AdminPage />} />
        <Route exact path ="/home" element ={<HomePage />}/>
        <Route exact path ="/admin/restaurant/:id" element ={<AdminRestaurantPage />}/>
      </Routes>
    </BrowserRouter>
  )
}