import axios from "axios";
import { createContext, useState ,useContext} from "react";
import { toast } from "react-toastify";
import { AdminContext } from "./AdminContext";
export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
  const [dToken, setDToken] = useState(localStorage.getItem("dtoken") || "");
  const [appointments, setAppointments] = useState([]);
const [dashData,setDashData]=useState({ latestAppointments: []})
const [profileData,setProfileData]=useState({}) //doctor inf
const {backendUrl}=useContext(AdminContext)
  const getAppointments = async () => {
    try {
      console.log("Sending token:", dToken);
      const { data } = await axios.get(
        backendUrl+"/api/doctor/appointments",
        {
          headers: {
            dToken 
          },
        }
      );

      if (data.success) {
        setAppointments(data.appointment);
        console.log(data.appointment);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };


  const completeAppointment = async (appointmentId) => {
   try {
    const { data } = await axios.post(
      backendUrl+"/api/doctor/complete-appointment",{appointmentId},
      {
        headers: {
          dToken 
        },
      }
    );

    if (data.success) {
      toast.success(data.message)
      getAppointments()
      
    } else {
      toast.error(data.message);
    }
   } catch (error) {
    console.log(error);
    toast.error(error.message);
   } 
  }



  const cancelAppointment = async (appointmentId) => {
    try {
     const { data } = await axios.post(
       backendUrl+"/api/doctor/cancel-appointment",{appointmentId},
       {
         headers: {
           dToken 
         },
       }
     );
 
     if (data.success) {
       toast.success(data.message)
       getAppointments()
       
     } else {
       toast.error(data.message);
     }
    } catch (error) {
     console.log(error);
     toast.error(error.message);
    } 
   }



   const doctorDashboardData = async () => {
    try {
      const { data } = await axios.get(
        backendUrl+"/api/doctor/dashboard",
        {
          headers: {
            dToken 
          },
        }
      );
  
      if (data.success) {
        
        setDashData(data.dashData)
        
        
      } else {
        toast.error(data.message);
      }
     } catch (error) {
      console.log(error);
      toast.error(error.message);
     } 
   }


  const getProfileData = async ()=>{
    try {
      const {data} = await axios.get(backendUrl+"/api/doctor/profile",{headers:{dToken}})
// console.log(data)
      //if success then set the toke
      if (data.success) {
        // // toast.success(data.message)
        setProfileData(data.doctorProfile)
        console.log(data.doctorProfile)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  const value = {
    dToken,
    setDToken,
    getAppointments,
    appointments,
    setAppointments,
    completeAppointment,
    cancelAppointment ,
    doctorDashboardData,
    setDashData,
    dashData,
    profileData,
    getProfileData,
    setProfileData
  };

  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
