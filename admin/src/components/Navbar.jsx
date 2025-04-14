import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { assets } from '../assets/assets'
import { useNavigate } from "react-router-dom"
import { DoctorContext } from '../context/DoctorContext'

const Navbar = () => {
  const { atoken, setAtoken } = useContext(AdminContext)
  const {dToken, setDToken } = useContext(DoctorContext)

  const navigate = useNavigate()

  const LogOut = () => {
    if (atoken) {
      setAtoken("");
      localStorage.removeItem("atoken");
    }
  
    if (dToken) {
      setDToken("");
      localStorage.removeItem("dtoken");
    }
  
    navigate("/login");
  };
  
  return (
    <>
      <nav className=" text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <img src={assets.admin_logo} alt="Logo" className="w-36 sm:w-40 " />
            <span className="border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600 ml-3">{atoken ? "Admin" : "Doctor"}</span>
          </div>

          {/* Admin Text */}


          {/* Logout Button */}
          <button
            onClick={LogOut}
            className="bg-blue-800 text-white px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition">
            Logout
          </button>
        </div>
      </nav>
    </>

  )
}

export default Navbar