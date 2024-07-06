import React from "react";

const AboutUs = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 bg-gray-100">
      <div className="max-w-4xl p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-center text-gray-800">
          About Us
        </h1>
        <p className="mt-6 text-lg text-gray-600">
          Welcome to our platform! We are dedicated to showcasing innovative
          projects and connecting investors with exciting opportunities.
        </p>
        <div className="mt-8 space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">Our Mission</h2>
          <p className="text-gray-600">
            Our mission is to bridge the gap between visionary creators and
            enthusiastic investors. We believe in the power of collaboration and
            the potential of small electronic projects to create significant
            impacts.
          </p>
        </div>
        <div className="mt-8 space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">Our Team</h2>
          <p className="text-gray-600">
            Our team is composed of experienced professionals in technology,
            finance, and marketing. We are passionate about fostering innovation
            and providing a platform that supports both project creators and
            investors.
          </p>
        </div>
        <div className="mt-8 space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">Contact Us</h2>
          <p className="text-gray-600">
            Have questions or want to learn more? Feel free to reach out to us
            at{" "}
            <a href="mailto:contact@ourplatform.com" className="text-blue-500">
              contact@ourplatform.com
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
