import React from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom"; 
import Login from './Pages/login.jsx'
import Register from './Pages/register.jsx'
import Secret from './Pages/secret.jsx'
import AdminPage2 from './Pages/adminPage2.jsx'
import HomePage from './Pages/homePage.jsx'
import AdminRestaurantPage from "./Pages/adminRestaurantPage.jsx";
import MenuPage2 from './Pages/menuPage2.jsx'; 
import AdminMenuPage from './Pages/adminMenuPage.jsx'
import AdminMenuPage2 from './Pages/adminMenuPage2.jsx'
import HomePage2 from './Pages/homePage2.jsx'
import LoginPage2 from './Pages/loginPage2.jsx'
import RegisterPage2 from './Pages/registerPage2.jsx'
import AdminRestaurantPage2 from "./Pages/adminRestaurantPage2.jsx";

export default function app() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path ="/register" element={<RegisterPage2 />} />
        <Route exact path ="/login" element={<LoginPage2 />} />
        <Route exact path ="/" element={<Secret />} />
        <Route exact path ="/admin" element={<AdminPage2 />} />
        <Route exact path ="/home" element ={<HomePage2 />}/>
        <Route exact path ="/admin/restaurant/:id" element ={<AdminRestaurantPage2 />}/>
        <Route exact path ="/restaurant/:id/menu" element = {<MenuPage2/>}/>
        <Route exact path ="/admin/restaurant/:id/menu" element = {<AdminMenuPage2 />}/>
      </Routes>
    </BrowserRouter>
  )
}