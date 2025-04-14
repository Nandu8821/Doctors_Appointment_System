import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { toast } from 'react-toastify';
import axios from 'axios';
import { AdminContext } from "./AdminContext";

const DoctorProfile = () => {
    const { dToken, profileData,
        getProfileData,
        setProfileData } = useContext(DoctorContext)
    const {backendUrl}=useContext(AdminContext)
    const [isEdit, setIsEdit] = useState(false);

    const updateProfile = async () => {
       try {
        const updateData = {
            fees: profileData.fees,
            address: profileData.address,
            available: profileData.available
        }
        const {data}= await axios.post(`${backendUrl}/api/doctor/update-profile`, updateData, {
            headers: {
              dToken
            }
        })
        if(data.success){
            toast.success(data.message)
            setIsEdit(false)
            getProfileData()
        }else{
            toast.error(data.message)
        }
       } catch (error) {
        toast.error(error.message)
        console.log(error)
       } 
    }

    useEffect(() => {
        if (dToken) {
            getProfileData()
        }
    }, [dToken])
    return profileData && (
        <div>
            <div className='flex flex-col gap-4 m-5'>
                <div>
                    <img className='bg-blue-800 w-full sm:max-w-64 rounded-lg' src={profileData.image} alt="" />
                </div>
                <div className='flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-gray-50'>
                    {/* ----------- Doc Info : name ,degree, experince -------- */}
                    <p className='flex item-center gap-2 text-3xl font-medium text-gray-700'>{profileData.name}</p>
                    <div className='flex item-center gap-2 mt-1 text-gray-900'>
                        <p className=''>{profileData.degree} - {profileData.speciality}</p>
                        <button className='py-0.5 px-2 border text-xs rounded-full'>{profileData.experience}</button>
                    </div>
                    {/* ---------- doc About ----------- */}
                    <div>
                        <p className='flex item-center gap-1 text-sm font-medium text-neutral-800 mt-3'>About</p>
                        <p className='text-sm text-gray-600 max-w-[700px] mt-1'>{profileData.about}</p>
                    </div>
                    <p className='text-gray-600 font-medium mt-4'>
                        Appointment fee:
                        <span className='text-gray-800'>
                            $ {isEdit ? (
                                <input
                                    type="number"
                                    onChange={(e) => setProfileData(prevData => ({
                                        ...prevData,
                                        fees: e.target.value
                                    }))}
                                    value={profileData.fees}
                                    className="w-24 px-2 py-1 border rounded ml-1"
                                />
                            ) : profileData.fees}
                        </span>
                    </p>
                    <div className='flex gap-2 py-2'>
                        <p className="font-medium">Address:</p>
                        {isEdit ? (
                            <div className="flex flex-col gap-2">
                                <input
                                    type="text"
                                    value={profileData.address?.line1 || ''}
                                    onChange={(e) => setProfileData(prevData => ({
                                        ...prevData,
                                        address: {
                                            ...prevData.address,
                                            line1: e.target.value
                                        }
                                    }))}
                                    className="border rounded px-2 py-1 text-sm"
                                    placeholder="Address Line 1"
                                />
                                <input
                                    type="text"
                                    value={profileData.address?.line2 || ''}
                                    onChange={(e) => setProfileData(prevData => ({
                                        ...prevData,
                                        address: {
                                            ...prevData.address,
                                            line2: e.target.value
                                        }
                                    }))}
                                    className="border rounded px-2 py-1 text-sm"
                                    placeholder="Address Line 2"
                                />
                            </div>
                        ) : (
                            <p className='text-sm text-gray-600'>
                                {profileData.address?.line1 || 'No address provided'}
                                {profileData.address?.line2 && <br />}
                                {profileData.address?.line2}
                            </p>
                        )}
                    </div>
                    <div className='flex items-center gap-2 pt-2'>
                        <input
                            type="checkbox"
                            id="availabilityToggle"
                            checked={profileData.available}
                            onChange={(e) => setProfileData(prevData => ({
                                ...prevData,
                                available: e.target.checked
                            }))}
                            className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                        />
                        <label
                            htmlFor="availabilityToggle"
                            className="text-gray-700 select-none cursor-pointer"
                        >
                            Available for Appointments
                        </label>
                    
                    </div>

           {
            isEdit 
            ?   <button onClick={updateProfile} className="border border-primary px-8 py-2 rounded-full mt-4  hover:bg-blue-800  hover:text-white transtion-all">Save</button> 
            :   <button onClick={() => setIsEdit(true)} className="border border-primary px-8 py-2 rounded-full mt-4  hover:bg-blue-800  hover:text-white transtion-all">Edit</button>
           }

                   
                  
                </div>
            </div>


        </div>
    )
}

export default DoctorProfile
