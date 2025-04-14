import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { assets } from "../../assets/assets";
const Dashboard = () => {
  const { atoken, getDashData, dashData, cancelAppointment } = useContext(AdminContext)
  useEffect(() => {
    if (atoken) {
      getDashData()
    }

  }, [atoken])
  return dashData && (
    <div className='m-5'>
      <div className='flex flex-wrap gap-3'>

        <div className='flex items-center gap-2 bg-gray-50 p-4 min-w-52  rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all '>
          <img className='w-14' src={assets.doctor_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashData.doctors}</p>
            <p className='text-gray-800'>Doctors</p>
          </div>
        </div>

        <div className='flex items-center gap-2 bg-gray-50 p-4 min-w-52  rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all ' >
          <img className='w-14' src={assets.appointments_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashData.appointments}</p>
            <p className='text-gray-800'>appointments</p>
          </div>
        </div>


        <div className='flex items-center gap-2 bg-gray-50 p-4 min-w-52  rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all '>
          <img className='w-14' src={assets.patients_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashData.patients}</p>
            <p className='text-gray-800'>patients</p>
          </div>
        </div>
      </div>

      <div className='bg-gray-50'>
        <div className='flex item-center gap-3 py-4 px-4 mt-10 rounded-t border' >
          <img src={assets.list_icon} alt="" />
          <p className='font-semibold'>Letest Booking </p>
        </div>

        <div className='pt-4 border border-t-0'>
          {
            dashData.latestAppointments.map((item, index) => (
              <div className='flex item-center px-6 py-3 gap-3 hover:bg-gray-200' key={index}>
                <img className='rounded-full w-10' src={item.docData.image} alt="" />
                <div className='flex-1 text-sm'>
                  <p className='text-gray-800 font-medium'>{item.docData.name}</p>
                  <p className='text-gray-800'>{item.slotDate}</p>
                </div>
                { item.cancelled 
          ?  <span className='text-red-400 text-xs font-medium'>
          Cancelled
        </span> :
        
           item.isCompleted ? <p className='text-green-500 text-xs font-medium'> Completed</p> : <img onClick={()=>cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon } alt="" />
          
          }
              </div>
            ))
          }
        </div>

      </div>

    </div>
  )
}

export default Dashboard