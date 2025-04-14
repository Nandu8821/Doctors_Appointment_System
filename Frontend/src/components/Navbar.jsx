import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets_frontend/assets";
import { NavLink, useNavigate } from "react-router-dom";
import {AppContext} from "../context/Appcontext"

const Navbar = () => {
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);
  const {token ,setToken ,userData }=useContext(AppContext)


  useEffect(()=>{
    
  },[Navbar])

  const LogOut = ()=>{
    navigate("/login")
    
   localStorage.removeItem("token")

    setToken(false)

  }
  

  

  return (
    <div className="flex items-center justify-between py-4 mb-5 text-sm border-b border-b-green-400">
      <img className="w-44 cursor-pointer" src={assets.logo} alt="Logo" />

      <ul className="hidden md:flex items-start gap-5 font-medium">
        <NavLink to="/">
          <li className="py-1">HOME</li>
          <hr className="border-none outline-none h-0.5 bg-primary m-auto hidden" />
        </NavLink>

        <NavLink to="/doctors">
          <li className="py-1">ALL DOCTORS</li>
          <hr className="border-none outline-none h-0.5 bg-primary m-auto hidden" />
        </NavLink>

        <NavLink to="/about">
          <li className="py-1">ABOUT</li>
          <hr className="border-none outline-none h-0.5 bg-primary m-auto hidden" />
        </NavLink>

        <NavLink to="/contact">
          <li className="py-1">CONTACT</li>
          <hr className="border-none outline-none h-0.5 bg-primary m-auto hidden" />
        </NavLink>
      </ul>
      <div className="flex items-center gap-4">
        {token ? (
          <div className="group flex items-center gap-2 cursor-pointer relative ">
            <img className="w-8 rounded-full" src={userData.image} alt="" />
            <img className="w-2.5" src={assets.dropdown_icon} alt="" />

            <div className="absolute top-0 right-0  pt-14 text-base font-medium text-grey-600 z-20 hidden  group-hover:block">
              <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-5">
                <p
                  onClick={() => navigate("/myprofile")}
                  className="hover:text-white"
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate("/myappointments")}
                  className="hover:text-white"
                >
                  My Appointments
                </p>
                <p onClick={LogOut} className="hover:text-white">
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block "
          >
            Create account
          </button>
        )}
        <img onClick={()=>setShowMenu(true)} className="w-6 md:hidden" src={assets.menu_icon} alt="" />
        {/* /------------- mobile Menu ------------- */}

        <div
        className={`${
          showMenu ? "fixed w-full top-0 bottom-0 right-0 z-20 bg-white transition-all" : "hidden"
        } md:hidden overflow-auto`}>
        <div className="flex justify-between items-center p-4">
          <img src={assets.logo} alt="Logo" />
          <img onClick={() => setShowMenu(false)} className="w-6 cursor-pointer" src={assets.cross_icon} alt="Close" />
        </div>
        <ul className="flex flex-col gap-4 items-center p-4">
          <NavLink to="/" onClick={() => setShowMenu(false)}>
            <li className="py-1">Home</li>
          </NavLink>
          <NavLink to="/doctors" onClick={() => setShowMenu(false)}>
            <li className="py-1">ALL DOCTORS</li>
          </NavLink>
          <NavLink to="/about" onClick={() => setShowMenu(false)}>
            <li className="py-1">ABOUT</li>
          </NavLink>
          <NavLink to="/contact" onClick={() => setShowMenu(false)}>
            <li className="py-1">CONTACT</li>
          </NavLink>
        </ul>
      </div>
    </div>
    </div>
  );
};

export default Navbar;
