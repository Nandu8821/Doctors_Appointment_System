import express from 'express';
import { addDoctor,adminDashboard,allAppointments,allDoctors,appointmentCancel,loginAdmin } from '../controllers/adminController.js';
import upload from '../middlewares/multer.js';
import authAdmin from '../middlewares/authAdmin.js';
import { changeAvailablity } from '../controllers/doctorController.js';

const adminRouter = express.Router();

// Use `upload.single('image')` to handle file upload
adminRouter.post('/add-doctor',authAdmin ,upload.single('image'), addDoctor);
adminRouter.post('/login',loginAdmin);
adminRouter.post('/all-doctors',authAdmin,allDoctors);
adminRouter.get('/all-appointments',allAppointments);
adminRouter.post('/all-doctors',authAdmin,allDoctors);
adminRouter.post('/cancel-appointment',authAdmin,appointmentCancel);
adminRouter.get('/dashboard',authAdmin,adminDashboard);

export default adminRouter;
