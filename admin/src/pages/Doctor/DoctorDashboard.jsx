import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { assets } from "../../assets/assets";
const DoctorDashboard = () => {
  const { dToken, doctorDashboardData, cancelAppointment, dashData, setDashData } = useContext(DoctorContext)

  useEffect(() => {
    if (dToken) {
      doctorDashboardData()
    }
  }, [dToken])
  return dashData && (
    <div className='m-5'>
      <div className='flex flex-wrap gap-3'>

        <div className='flex items-center gap-2 bg-gray-50 p-4 min-w-52  rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all '>
          <img className='w-14' src={assets.earning_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashData.earnings}</p>
            <p className='text-gray-800'>Earnings</p>
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
          {(dashData && dashData.latestAppointments) ? (
            dashData.latestAppointments.map((item, index) => (
              <div
                key={item._id || index}
                className="flex items-center px-6 py-3 gap-3 hover:bg-gray-50 transition-colors border-b"
              >
                <img
                  className="w-10 h-10 rounded-full object-cover"
                  src={item.userData?.image}
                  alt="User"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'default-avatar.png'; // Add a default image path
                  }}
                />
                <div className="flex-1 text-sm">
                  <p className="text-gray-800 font-medium">
                    {item.docData?.name || 'Unknown Doctor'}
                  </p>
                  <p className="text-gray-800">{item.slotDate}</p>
                </div>
                {
                item.cancelled ? (

                  <p className="text-red-500 font-semibold">Cancelled</p>
                ) : item.isCompleted ? (
                  <p className="text-green-600 font-semibold">Completed</p>
                ) : (
                  <div className="flex gap-2">
                    <img
                      onClick={() => cancelAppointment(item._id)}
                      className="w-10 cursor-pointer"
                      src={assets.cancel_icon}
                      alt="Cancel"
                    />
                    <img
                      onClick={() => completeAppointment(item._id)}
                      className="w-10 cursor-pointer"
                      src={assets.tick_icon}
                      alt="Complete"
                    />
                  </div>
                )
              }
              </div>
            ))
          ) : (
            <div className="text-center py-6 text-gray-500">
              No appointments available
            </div>
          )}
        </div>

      </div>

    </div>
  )
}

export default DoctorDashboard