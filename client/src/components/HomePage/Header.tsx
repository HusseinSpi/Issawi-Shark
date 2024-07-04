import { FC } from "react";

const Header: FC = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between p-8 bg-gradient-to-b from-primaryColor to-secondaryColor">
      <div className="flex-1">
        <img
          src="./HomePhoto.png"
          alt="Freelance Designer"
          className="max-w-full h-auto"
        />
      </div>
      <div className="flex-1 p-8">
        <h1 className="text-4xl font-bold mb-4 text-secondaryColor">
          Freelance Designer
        </h1>
        <p className="text-lg text-thirdColor mb-8">
          Freelancing is a starting point for a lot of designers looking to join
          bigger teams. Yet, sometimes it’s a way to find your own path.
        </p>
        <div className="flex mb-8">
          <button className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded mr-4">
            Learn More
          </button>
          <button className="bg-thirdColor hover:bg-thirdColor text-black px-4 py-2 rounded">
            Process
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h1 className="text-2xl font-bold text-thirdColor">01</h1>
            <h2 className="text-xl mb-2 text-thirdColor">Design</h2>
            <p className="text-thirdColor">
              Creating stunning visuals and interfaces for various platforms.
            </p>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-thirdColor">02</h1>
            <h2 className="text-xl mb-2 text-thirdColor">Develop</h2>
            <p className="text-thirdColor">
              Bringing designs to life with clean and efficient code.
            </p>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-thirdColor">03</h1>
            <h2 className="text-xl mb-2 text-thirdColor">Test</h2>
            <p className="text-thirdColor">
              Ensuring everything works as intended with rigorous testing.
            </p>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-thirdColor">04</h1>
            <h2 className="text-xl mb-2 text-thirdColor">Launch</h2>
            <p className="text-thirdColor">
              Deploying the final product for users to enjoy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
