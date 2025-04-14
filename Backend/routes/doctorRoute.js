import express from 'express';
import {
  appointmentsDoctors,
  doctorList,
  DoctorLogin,appointmentComplete,
  appointmentCancel,
  doctorDashboard,
  updateDoctorProfile,
  getDoctorProfile,
 
} from '../controllers/doctorController.js';

import authDoctor from "../middlewares/authDoctor.js"


const doctorRouter = express.Router();

doctorRouter.get("/list", doctorList);
doctorRouter.post("/doctor_login", DoctorLogin);
doctorRouter.get("/appointments", authDoctor, appointmentsDoctors);
doctorRouter.post("/complete-appointment", authDoctor, appointmentComplete);
doctorRouter.post("/cancel-appointment", authDoctor, appointmentCancel);
doctorRouter.get("/dashboard", authDoctor, doctorDashboard);
doctorRouter.get("/profile", authDoctor, getDoctorProfile);
doctorRouter.post("/update-profile", authDoctor, updateDoctorProfile);

export default doctorRouter;
