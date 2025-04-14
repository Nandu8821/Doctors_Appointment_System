import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/Appcontext";
import axios from "axios";
import { toast } from "react-toastify";

const MyAppointment = () => {
  const { token } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);

  const getUserAppointments = async () => {
    if (!token) return;

    try {
      const { data } = await axios.get(
        "http://localhost:8000/api/user/appointments",
        { headers: { token } }
      );
      console.log(data);

      if (data.success) {
        setAppointments(data.appointments.reverse());
        console.log("Appointments:", data.appointments);
      } else {
        toast.error("Failed to fetch appointments !!! ");
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      console.log(appointmentId);
      const { data } = await axios.post(
        "http://localhost:8000/api/user/cancel-appointment",
        { appointmentId },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message); // Changed from data.success to data.message
        getUserAppointments();
      } else {
        toast.error(data.message); // Changed from data.error to data.message
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "Error canceling appointment"
      );
    }
  };

  const initpay = (order, appointmentId) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Appointment Payment",
      description: "Appointment Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const verifyData = await axios.post(
            "http://localhost:8000/api/user/verifyRazorpay",
            response,
            { headers: { token } }
          );

          if (verifyData.data.success) {
            toast.success("Payment Successful!");
            // Refresh appointments or redirect
            getUserAppointments();
          }
        } catch (error) {
          console.error(error);
          toast.error("Payment verification failed");
        }
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const appointmentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/user/payment-razorpay",
        { appointmentId },
        { headers: { token } }
      );

      if (data.success) {
        initpay(data.order, appointmentId);
      } else {
        toast.error(data.message || "Failed to initialize payment");
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Error initializing payment"
      );
    }
  };
  useEffect(() => {
    if (token) {
      // Add user check
      getUserAppointments();
    }
  }, [token]); // Add user to dependency array

  return (
    <div className="">
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">
        My appointments
      </p>
      <div>
        {appointments.slice(0, 2).map((item, index) => {
          return (
            // Added return here
            <div
              className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b"
              key={index}
            >
              <div>
                <img
                  className="w-32 bg-ingigo-50"
                  src={item.docData.image}
                  alt=""
                />
              </div>
              <div className="flex-1 text-sm text-zinc-600">
                <p className="text-neutral-800 font-semibold">
                  {item.docData.name}
                </p>
                <p>{item.docData.speciality}</p>
                <p className="text-zinc-700 font-medium mt-1">Address:</p>
                <p className="text-xs">{item.docData.address.line1}</p>
                <p className="text-xs">{item.docData.address.line2}</p>
                <p className="text-xs-mt-1">
                  <span className="text-sm text-neutra-700 font-medium">
                    Date & Time:{" "}
                  </span>{" "}
                  {item.slotDate} | {item.slotTime}
                </p>
              </div>

              <div className="flex flex-col gap-2 justify-end">
                {!item.cancelled ? (
                  <>
                    {item.payment === true || item.payment === "true" ? (
                      <button className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded bg-indigo-50">
                        Paid
                      </button>
                    ) : (
                      <button
                        onClick={() => appointmentRazorpay(item._id)}
                        className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300"
                      >
                        Pay Online
                      </button>
                    )}

                    <button
                      onClick={() => cancelAppointment(item._id)}
                      className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300"
                    >
                      Cancel appointment
                    </button>
                  </>
                ) : (
                  <button className="sm:min-w-48 py-2 border border-red-500 rounded text-red-500">
                    Appointment cancelled
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyAppointment;
