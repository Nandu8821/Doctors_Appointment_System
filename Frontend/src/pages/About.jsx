import React from "react";
import { assets } from "../assets/assets_frontend/assets";
const About = () => {
  return (
    <div>
      <div className="">
        <p className="text-center text-3xl text-gray-500 mt-10">
          About <span className="text-gray-800">Us</span>
        </p>
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-12">
        <img
          className="w-full md:max-w-[360px]"
          src={assets.about_image}
          alt=""
        />

        <div className="flex flex-col gap-6 justify-center md:w-2/3 text-sm text-gray-600 ">
          <p>
            Welcome to Prescripto, your trusted partner in managing your
            healthcare needs conveniently and efficiently. At Prescripto, we
            understand the challenges individuals face when it comes to
            scheduling doctor appointments and managing their health records.
          </p>
          <p>
            Prescripto is committed to excellence in healthcare technology. We
            continuously strive to enhance our platform, integrating the latest
            advancements to improve user experience and deliver superior
            service. Whether you're booking your first appointment or managing
            ongoing care, Prescripto is here to support you every step of the
            way.
          </p>
          <b className="text-gray-800">Our Vision</b>
          <p>
            Our vision at Prescripto is to create a seamless healthcare
            experience for every user. We aim to bridge the gap between patients
            and healthcare providers, making it easier for you to access the
            care you need, when you need it
          </p>
        </div>
      </div>

      <div className="mt-20 md:flex-row">
        <p className="mt-10">
          WHY <span className="">CHOOSE US</span>
        </p>
        <div className="flex flex-col md:flex-row mb-20  mt-10">
          <div className="py-10 px-10 border md:px-8 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white  transition-all duration-300 text-gray-600 cursor-pointer">
            <h4>Efficiency:</h4>
            <p className="mt-4 text-gray-500 text-sm">
              Streamlined appointment scheduling that fits into your busy
              lifestyle.
            </p>
          </div>

          <div className="py-10 px-10 border py-10 px-10 border md:px-8 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white  transition-all duration-300 text-gray-600 cursor-pointer ">
            <h4>Convenience:</h4>
            <p className="mt-4 text-gray-500 text-sm">
              Access to a network of trusted healthcare professionals in your
              area
            </p>
          </div>

          <div className="py-10 px-10 border py-10 px-10 border md:px-8 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white  transition-all duration-300 text-gray-600 cursor-pointer ">
            <h4>Personalization:</h4>
            <p className="mt-4 text-gray-500 text-sm">
              Tailored recommendations and reminders to help you stay on top of
              your health.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
