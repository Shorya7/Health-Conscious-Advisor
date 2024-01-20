import React from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Errorpage from '../error/Error404'
import SignUp from '../login/Signup'
import Login from '../login/Login'
import Navbar from "../navbar/Navbar"
import Footer from '../footer/Footer'
import ProtectedRoute from './ProtectedRoutes'
import Home from '../home/Home'

const Routers = () => {


 
  return (
   <Router>
   
    <Routes>
      <Route path='/' element = {<><Navbar/><ProtectedRoute Component={Home} /><Footer /></>} />
      <Route path='/signup' element = {<SignUp />}/>
      <Route path='/login' element = {<Login />}/>
      <Route path='*' element = {<Errorpage />} />
    </Routes>
    
   </Router>
 
  )
}

export default Routers