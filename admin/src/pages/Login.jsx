import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { AdminContext } from "../context/AdminContext";
import axios from 'axios'
import { toast } from "react-toastify";
import { DoctorContext } from "../context/DoctorContext";
const Login = () => {
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {setAtoken,} = useContext(AdminContext)
  const {setDToken,} = useContext(DoctorContext)

  const onSubmitHandler = async (e)=>{
e.preventDefault() 

try {
    if(state === "Admin"){
       const {data} = await axios.post('http://localhost:8000/api/admin/login',{email,password})
       if (data.success) {
        localStorage.setItem("atoken",data.token)
        setAtoken(data.token)
       }else{
        toast.error(data.message)
       }
    }else{

const {data} = await axios.post('http://localhost:8000/api/doctor/doctor_login',{email,password})
       if (data.success) {
        localStorage.setItem("dtoken",data.token)
        setDToken(data.token)
        console.log("Doctor Token:", data.token);
       }else{
        toast.error(data.message)
       }
    }
} catch (error) {
    
}   
  }
  return (
    <>
      
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
              {state} Login
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={onSubmitHandler}  className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                  onChange={(e)=>setEmail(e.target.value)}
                  value={email}
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Password
                  </label>
                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                  onChange={(e)=>setPassword(e.target.value)}
                  value={password}
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Login
                </button>
              </div>
            </form>
            {state === "Admin" ? (
              <p className="mt-10 text-center text-sm/6 text-gray-500">
                Doctor Login ?
                <a
                  onClick={() => setState("Doctor")}
                  className="font-semibold text-indigo-600 hover:text-indigo-500 cursor-pointer"
                >
                  Click Here
                </a>
              </p>
            ) : (
              <p className="mt-10 text-center text-sm/6 text-gray-500">
                Admin Login ?
                <a
                  onClick={() => setState("Admin")}
                  className="font-semibold text-indigo-600 hover:text-indigo-500 cursor-pointer"
                >
                  Click Here
                </a>
              </p>
            )}
          </div>
        </div>
     
    </>
  );
};

export default Login;
