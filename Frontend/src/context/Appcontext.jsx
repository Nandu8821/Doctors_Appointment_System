import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
export const AppContext = createContext();

const AppContextProvider = (props) => {
  const backendUrl = import.meta.VITE_BACKEND_URL;
  const [doctors, setDoctors] = useState([]);
  const [userData, setUserData] = useState(false);
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : false
  );
  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(backendUrl+"/api/doctor/list");
      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const loadUserProfileData = async () => {
    try {
      const { data } = await axios.get(
        backendUrl+"/api/user/get-profile",
        { headers: { token } }
      );
      if (data.success) {
        setUserData(data.userData);
      }
    } catch (error) {
      console.log(error);
      toast.error(data.message);
    }
  };

  const value = {
    doctors,getDoctorsData,
    token,
    setToken,
    loadUserProfileData,
    setUserData,
    userData,
    backendUrl
  };

  useEffect(() => {
    getDoctorsData();
    loadUserProfileData();
  }, []);
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
