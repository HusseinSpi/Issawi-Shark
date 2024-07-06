import React from "react";
import Header from "../../components/HomePage/Header";
import Stats from "../../components/HomePage/Stats";
import OurValueProposition from "../../components/HomePage/OurValueProposition";
import OurBestPrograms from "../../components/HomePage/OurBestPrograms";
import GetStarted from "../../components/HomePage/GetStarted";
import TestimonialsAboutUs from "../../components/HomePage/TestimonialsAboutUs";
import OurTeam from "../../components/HomePage/OurTeam";

const HomePage = () => {
  return (
    <>
      <Header />
      <Stats />
      <OurValueProposition />
      <OurBestPrograms />
      <GetStarted />
      <OurTeam />
      <TestimonialsAboutUs />
    </>
  );
};

export default HomePage;
