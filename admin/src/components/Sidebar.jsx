import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'

const Sidebar = () => {
    const {atoken} = useContext(AdminContext)
    const {dToken} = useContext(DoctorContext)
    

  return (
    <div className='min-h-screen  bg-white border-r'>
     {
        atoken && <ul className='text-[#515151] mt-5'>
            <NavLink className={({isActive})=>`flex item-center gap-3 py-3.5 px-3 md:px-9 md:min-2-72 cursor-pointer ${isActive?"bg-[#F2F3FF] ":""}`} to={'/admin-dashboard'}>
                <img src={assets.home_icon} alt="" />
                <p className='hidden md:block'>Dashboard</p>
            </NavLink>

            <NavLink className={({isActive})=>`flex item-center gap-3 py-3.5 px-3 md:px-9 md:min-2-72 cursor-pointer ${isActive?"bg-[#F2F3FF] ":""}`}  to={'/all-appointments'}>
                <img src={assets.appointment_icon} alt="" />
                <p className='hidden md:block'>AllApointments</p>
            </NavLink>

            <NavLink className={({isActive})=>`flex item-center gap-3 py-3.5 px-3 md:px-9 md:min-2-72 cursor-pointer ${isActive?"bg-[#F2F3FF] ":""}`} to={'/add-doctor'}>
                <img src={assets.add_icon} alt="" />
                <p className='hidden md:block'>AddDoctor</p>
            </NavLink>

            <NavLink className={({isActive})=>`flex item-center gap-3 py-3.5 px-3 md:px-9 md:min-2-72 cursor-pointer ${isActive?"bg-[#F2F3FF] ":""}`} to={'/doctor-List'}>
                <img src={assets.people_icon} alt="" />
                <p className='hidden md:block'>DoctorList</p>
            </NavLink>
        </ul>
     }{
        dToken && <ul className='text-[#515151] mt-5'>
        <NavLink className={({isActive})=>`flex item-center gap-3 py-3.5 px-3 md:px-9 md:min-2-72 cursor-pointer ${isActive?"bg-[#F2F3FF] ":""}`} to={'/doctor-dashboard'}>
            <img src={assets.home_icon} alt="" />
            <p className='hidden md:block'>Dashboard</p>
        </NavLink>

        <NavLink className={({isActive})=>`flex item-center gap-3 py-3.5 px-3 md:px-9 md:min-2-72 cursor-pointer ${isActive?"bg-[#F2F3FF] ":""}`}  to={'/doctor-appointments'}>
            <img src={assets.appointment_icon} alt="" />
            <p className='hidden md:block'>AllApointments</p>
        </NavLink>
        <NavLink className={({isActive})=>`flex item-center gap-3 py-3.5 px-3 md:px-9 md:min-2-72 cursor-pointer ${isActive?"bg-[#F2F3FF] ":""}`} to={'/doctor-profile'}>
            <img src={assets.people_icon} alt="" />
            <p className='hidden md:block'>DoctorProfile</p>
        </NavLink>
    </ul>
     }
    </div>
    
  )
}

export default Sidebar