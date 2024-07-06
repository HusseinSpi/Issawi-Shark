import { FC } from "react";
import { useNavigate } from "react-router-dom";

const Header: FC = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between p-8 bg-primaryColor">
      <div className="flex-1">
        <img
          src="./HomePhoto.png"
          alt="Project Showcase"
          className="max-w-full h-auto"
        />
      </div>
      <div className="flex-1 p-8">
        <h1 className="text-4xl font-bold mb-4 text-secondaryColor">
          Issawi-Shark
        </h1>
        <p className="text-lg text-secondaryColor mb-8">
          Explore a wide range of projects from different domains, showcasing
          creativity, innovation, and technical expertise.
        </p>
        <div className="flex mb-8">
          <button
            className="bg-thirdColorO hover:bg-thirdColor text-white px-4 py-2 rounded mr-4"
            onClick={() => navigate("/project")}
          >
            View Projects
          </button>
          <button
            className="bg-secondaryColor hover:bg-secondaryColor text-black px-4 py-2 rounded"
            onClick={() => navigate("/project")}
          >
            Submit Your Project
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h1 className="text-2xl font-bold text-secondaryColor">01</h1>
            <h2 className="text-xl mb-2 text-secondaryColor">Innovate</h2>
            <p className="text-secondaryColor">
              Discover groundbreaking ideas and innovative solutions.
            </p>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-secondaryColor">02</h1>
            <h2 className="text-xl mb-2 text-secondaryColor">Design</h2>
            <p className="text-secondaryColor">
              Explore aesthetically pleasing designs and user interfaces.
            </p>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-secondaryColor">03</h1>
            <h2 className="text-xl mb-2 text-secondaryColor">Develop</h2>
            <p className="text-secondaryColor">
              See how designs are brought to life with efficient coding.
            </p>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-secondaryColor">04</h1>
            <h2 className="text-xl mb-2 text-secondaryColor">Deploy</h2>
            <p className="text-secondaryColor">
              Learn about the deployment process and project launches.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
