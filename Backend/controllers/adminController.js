import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";
const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
    } = req.body;
    const imageFile = req.file.path; // This should contain the uploaded image

    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !fees ||
      !address
    ) {
      return res.json({ success: false, message: "Missing Details !!!!" });
    }

    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "please enter valid email !!!",
      });
    }

    // if(!password.length<8 ){
    //   return res.json({success:true , message:"please enter strong password !!!"})
    // }

    //  hash doctor  password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // upload image to cloudinary

    const imageUpload = await cloudinary.uploader.upload(imageFile, {
      resource_type: "image",
    });
    const imgaeUrl = imageUpload.secure_url;

    const doctorData = {
      name,
      email,
      image: imgaeUrl,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: JSON.parse(address),
      date: Date.now(),
    };

    const newDoctor = new doctorModel(doctorData);

    await newDoctor.save();
    res.json({ success: false, message: "Doctor Added" });

    //   if (!imageFile) {
    //     return res.status(400).json({ message: 'No image uploaded' });
    //   }

    console.log("🔹 Uploaded File:", req.file.path);

    //   res.status(201).json({
    //     message: 'Doctor added successfully',
    //     image: imageFile.filename
    //   });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ///// Login Admin Api

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid Credential" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const allDoctors = async (req,res) => {
 try {
    
  const doctors = await doctorModel.find({}).select('-password')
  res.json({success:true,doctors})

 } catch (error) {
  console.error("Error:", error);
  res.status(500).json({ message: "Server error" });
 }
};

//  API to all Appointments

const allAppointments =async (req,res)=>{
  try {
    const appointments= await appointmentModel.find({})
    console.log(appointments)
    res.json({success:true,appointments})
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error" });
  }
}

// API for appointment cancellation

const appointmentCancel = async (req, res) => {
  try {
    const {  appointmentId } = req.body;

    // Check if appointmentId exists
    if (!appointmentId) {
      return res
        .status(400)
        .json({ success: false, message: "Appointment ID is required" });
    }

    const appointmentData = await appointmentModel.findById(appointmentId);

  
    // Update appointment status
    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });

    // Releasing doctor slot
    const { docId, slotDate, slotTime } = appointmentData;
    const doctorData = await doctorModel.findById(docId);

    if (!doctorData) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }

    let slots_booked = doctorData.slots_booked || {};

    // Check if the date exists in slots_booked
    if (slots_booked[slotDate]) {
      slots_booked[slotDate] = slots_booked[slotDate].filter(
        (e) => e !== slotTime
      );
      await doctorModel.findByIdAndUpdate(docId, { slots_booked });
    }

    res.json({ success: true, message: "Appointment Cancelled!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//  API to get dashboaed data for admin panel

const adminDashboard = async (req, res) => {
try {
  const dotors = await doctorModel.find({})
  const user = await userModel.find({})
  const appointments = await appointmentModel.find({})

  const dashData = {
    doctors:dotors.length,
    appointments:appointments.length,
    patients:user.length,
    latestAppointments:appointments.reverse().slice(0,5),
  }
  res.json({success:true, dashData})

} catch (error) {
  console.error(error);
  res.status(500).json({ success: false, message: error.message });
} 
}


export { addDoctor, loginAdmin,allDoctors ,allAppointments,appointmentCancel,adminDashboard};
