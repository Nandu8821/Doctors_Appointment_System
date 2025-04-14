import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { useEffect } from 'react'
import { AppContext } from '../../context/AppContext'
import { assets } from "../../assets/assets";
const AllApointments = () => {
  const {atoken,getAllAppointments,appointments,cancelAppointment}=useContext(AdminContext)
 const {calculateAge}=useContext(AppContext)
  useEffect(()=>{
    if(atoken){
      getAllAppointments()
    }
  },[atoken])
  return (
<div className='w-full max-w-6xl m-5'>
  <p className='mb-3 text-lg font-medium'>All Appointments</p>

  <div className='bg-white border rounded-lg text-sm max-h-[80vh] min-h-[60vh] overflow-y-auto'>
    <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] px-6 py-3 bg-gray-50 border-b font-medium'>
      <p>#</p>
      <p>Patient</p>
      <p>Age</p>
      <p>Date & Time</p>
      <p>Doctor</p>
      <p>Fees</p>
      <p>Actions</p>
    </div>
    {appointments.map((item, index) => (
      <div className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-600 py-3 px-6 border-b hover:bg-gray-50 transition-colors' key={index}>
        <p className='max-sm:hidden'>{index + 1}</p>
        
        <div className='flex items-center gap-3'>
          <img className='w-8 h-8 rounded-full object-cover' src={item.userData.image} alt='' />
          <p className='font-medium'>{item.userData.name}</p>
        </div>

        <p>{calculateAge(item.userData.dob) || 'N/A'}</p>

        <div className='text-sm'>
          <p>{item.slotDate}</p>
          <p className='text-gray-500'>{item.slotTime}</p>
        </div>

        <div className='flex items-center gap-2'>
          <img className='w-8 h-8 rounded-full object-cover' src={item.docData.image} alt='' />
          <p>{item.docData.name}</p>
        </div>

        <p className='font-medium'>₹{item.docData.fees}</p>

        <div className='flex gap-2'>
          { item.cancelled 
          ?  <span className='text-red-400 text-xs font-medium'>
          Cancelled
        </span> :
        
           item.isCompleted ? <p className='text-green-500 text-xs font-medium'> Completed</p> : <img onClick={()=>cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon } alt="" />
          
          }
        </div>
      </div>
    ))}
  </div>
</div>
  )
}

export default AllApointments