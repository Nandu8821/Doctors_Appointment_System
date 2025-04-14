import React from "react";
import { assets } from "../assets/assets_frontend/assets";
const Contact = () => {
  return (
    <div className="justify-center" >
      <div className="">
        <p className="text-center text-3xl text-gray-500 mt-10">
          CONTACT <span className="text-gray-800">Us</span>
        </p>
      </div>

      <div className=" my-10 flex flex-col  md:flex-row gap-10 mb-28 text-sm ">
        <img
          className="w-full md:max-w-[300px]"
          src={assets.contact_image}
          alt=""
        />

        <div className="flex flex-col gap-4 md:w-2/3 text-sm text-gray-600 ">
          <h1 className="text-gray-800 text-xl text-gray-600">Our Vision</h1>
          <p>
            54709 Willms Station
            <br />
            Suite 350, Washington, USA
          </p>
          <p>
            Tel: (415) 555‑0132 <br />
            <span>Email: greatstackdev@gmail.com</span>
          </p>
          <p className="text-gray-900 text-xl">Careers at PRESCRIPTO</p>
          <p>Learn more about our teams and job openings</p>
          <p className="px-2 py-2 border ">Explore Jobs</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
