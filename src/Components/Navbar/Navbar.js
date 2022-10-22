import React from 'react'
import { useEffect, useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { NavLink } from 'react-router-dom';
import './NavbarStyling.css'


export default function Navbar({links}) {

    let [menu, setMenu] = useState('true');
    let [activeMenu, setActiveMenu] = useState('navLinks');

    useEffect(()=>{
        menu? setActiveMenu('navLinks') : setActiveMenu("navLinks activeMenu");
    },[menu])

  return (
    <div className="navBar">
                    
                    <div style={{display:'flex', alignItems:'center', gap:'15px'}}>
                        <img src="http://cdn.onlinewebfonts.com/svg/img_568523.png" alt="logo" width={40} />
                        <span className="logo">To Do App</span>
                    </div>

                   <div>

                   <ul className={activeMenu}>
                        {
                            links.map((item,index)=><NavLink to={item.to} key={index} className="link" onClick={()=> setMenu(!menu)} >{item.label}</NavLink>)
                        }                        
                    </ul>

                    <div className="icon">
                    {menu? <MenuIcon onClick={()=>setMenu(!menu)} /> : <CloseIcon onClick={()=>setMenu(!menu)}/>}
                    </div>

                   </div>
                   
                    
                </div>
  )
}
