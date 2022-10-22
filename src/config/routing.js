import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Navbar from '../Components/Navbar/Navbar';
import SignIn from '../Components/SignIn';
import SignUp from '../Components/SignUp';
import Dashboard from '../Screens/Dashboard';

export default function AppRouter() {

  const [links, setLinks] = useState([
    {
      to: '/',
      label: 'Sign Up',
    },
    {
      to: 'login',
      label: 'Sign In'
    }
  ])

  return (
    <>
        <BrowserRouter>

            <Navbar links={links} />

            <Routes>
                <Route path='/' element={<SignUp/>}></Route>
                <Route path='login' element={<SignIn/>}></Route>
                <Route path='dashboard' element={<Dashboard/>}></Route>
            </Routes>
        </BrowserRouter>
    </>

  )
}
