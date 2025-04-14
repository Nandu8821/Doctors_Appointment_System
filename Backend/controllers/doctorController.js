import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";
const changeAvailablity = async (req, res) => {
  try {
    const { docId } = req.body;
    const docData = await doctorModel.findById(docId);
    await doctorModel.findByIdAndUpdate(docId, { available: !docData.available })
    res.json({ success: true, message: "Availablity Changed !!! " })
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const doctorList = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select("-password")
    res.json({ success: true, doctors })

  } catch (error) {
    console.error("Error:", error);
    res.json({ success: false, message: error.message })
  }
}


// API for Login Doctors

const DoctorLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const doctor = await doctorModel.findOne({ email })
    if (!doctor) {
      return res.json({ success: false, message: "Invalid Credentials" })
    }

    const isMatch = await bcrypt.compare(password, doctor.password)
    if (isMatch) {
      const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET)
      res.json({ success: true, message: "Login Successfull", token, doctor })

    } else {
      res.json({ success: false, message: "Invalid Credentials" })
    }

  } catch (error) {
    console.error("Error:", error);
    res.json({ success: false, message: error.message })
  }
}

//  API to get doctor appointments For doctor panel 

const appointmentsDoctors = async (req, res) => {
  try {
    const { docId } = req.body
    const appointment = await appointmentModel.find({ docId })
    console.log(appointment)
    res.json({ success: true, message: "Appointments fetched Successfully", appointment })

  } catch (error) {
    console.error("Error:", error);
    res.json({ success: false, message: error.message })
  }
}

//  API to mark appointment compelate for doctor panel

const appointmentComplete = async (req, res) => {
  try {
    const { docId, appointmentId } = req.body
    const appointmentData = await appointmentModel.findById(appointmentId)

    if (appointmentData && appointmentData.docId === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true })
      res.json({ success: true, message: "Appointment Completed Successfully" })
    } else {
      res.json({
        success: false, message: "Appointment not found"
      })
    }
  } catch (error) {
    console.error("Error:", error);
    res.json({ success: false, message: error.message })
  }
}


//  API to cancel appointment  for doctor panel

const appointmentCancel = async (req, res) => {
  try {
    const { docId, appointmentId } = req.body
    const appointmentData = await appointmentModel.findById(appointmentId)

    if (appointmentData && appointmentData.docId === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })
      res.json({ success: true, message: "Appointment Cancelled" })
    } else {
      res.json({
        success: false, message: "Cancelled Failed "
      })
    }
  } catch (error) {
    console.error("Error:", error);
    res.json({ success: false, message: error.message })
  }
}


//  API to get Dashboard Data for doctor panel

const doctorDashboard = async (req, res) => {
  try {
    const { docId } = req.body
    const appointments = await appointmentModel.find({ docId })
    let earnings = 0;
    appointments.map((item) => {
      if (item.isCompleted || item.payment) {
        earnings += item.amount
      }
    })
    let patients = []

    appointments.map((item) => {
      if (!patients.includes(item.userId)) {
        patients.push(item.userId)
      }
    })

    const dashData = {
      appointments: appointments.length,
      patients: patients.length,
      earnings,
      latestAppointments: appointments.reverse().slice(0, 5),
       
    }

    res.json({ success: true, message: "Dashboard Data Fetched", dashData })

  } catch (error) {
    console.error("Error:", error);
    res.json({ success: false, message: error.message })
  }
}



//  API to Get Doctor Profile Data

const getDoctorProfile = async (req, res) => {
  try {
    const { docId } = req.body;
    const doctorProfile = await doctorModel.findById(docId).select("-password");
    // console.log(doctorProfile);
    res.json({ success: true, doctorProfile });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//  API to Update Doctor Profile Data

const updateDoctorProfile = async (req, res) => {
 try {
  const { docId , fees,address,available } = req.body;
  const doctorProfile = await doctorModel.findByIdAndUpdate(docId, { fees,address,available });
  res.json({ success: true,message:"Profile Update" ,doctorProfile });
 } catch (error) {
  console.log(error);
  res.status(500).json({ success: false, message: error.message });
}}

export { changeAvailablity, doctorList, DoctorLogin, appointmentsDoctors, appointmentComplete, appointmentCancel ,doctorDashboard,updateDoctorProfile,getDoctorProfile};
