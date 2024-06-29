import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { FaRegBell, FaSearch } from "react-icons/fa";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "tailwindcss/tailwind.css";

// Register the components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const allData = {
  Hitech: [
    { name: "Company A", value: 5 },
    { name: "Company B", value: 1 },
    { name: "Company C", value: 4.6 },
    { name: "Company D", value: 8.1 },
    { name: "Company E", value: 7.3 },
    { name: "Company F", value: 4 },
    { name: "Company G", value: 9 },
    { name: "Company H", value: 2.4 },
    { name: "Company I", value: 7.9 },
    { name: "Company J", value: 9.2 },
  ],
  Banking: [
    { name: "Bank A", value: 1 },
    { name: "Bank B", value: 2 },
    { name: "Bank C", value: 3 },
    { name: "Bank D", value: 4 },
    { name: "Bank E", value: 5 },
    { name: "Bank F", value: 6 },
    { name: "Bank G", value: 7 },
    { name: "Bank H", value: 8 },
    { name: "Bank I", value: 9 },
    { name: "Bank J", value: 10 },
  ],
  Healthcare: [
    { name: "Healthcare A", value: 3 },
    { name: "Healthcare B", value: 5 },
    { name: "Healthcare C", value: 2 },
    { name: "Healthcare D", value: 7 },
    { name: "Healthcare E", value: 8.5 },
    { name: "Healthcare F", value: 6 },
    { name: "Healthcare G", value: 4.2 },
    { name: "Healthcare H", value: 9.1 },
    { name: "Healthcare I", value: 5.5 },
    { name: "Healthcare J", value: 6.7 },
  ],
  Educational: [
    { name: "Education A", value: 2 },
    { name: "Education B", value: 4.5 },
    { name: "Education C", value: 7 },
    { name: "Education D", value: 8 },
    { name: "Education E", value: 3 },
    { name: "Education F", value: 6 },
    { name: "Education G", value: 9 },
    { name: "Education H", value: 1 },
    { name: "Education I", value: 4 },
    { name: "Education J", value: 5 },
  ],
  Retail: [
    { name: "Retail A", value: 4 },
    { name: "Retail B", value: 3.3 },
    { name: "Retail C", value: 6.7 },
    { name: "Retail D", value: 2 },
    { name: "Retail E", value: 5 },
    { name: "Retail F", value: 7.8 },
    { name: "Retail G", value: 8.4 },
    { name: "Retail H", value: 6.1 },
    { name: "Retail I", value: 3.7 },
    { name: "Retail J", value: 9 },
  ],
};

const Programs = () => {
  const [selectedCategory, setSelectedCategory] = useState("Hitech");
  const [chartData, setChartData] = useState(
    allData[selectedCategory].slice(0, 10)
  );

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    setChartData(allData[category].slice(0, 10));
  };

  const data = {
    labels: chartData.map((company) => company.name),
    datasets: [
      {
        label: `${selectedCategory} Projects`,
        data: chartData.map((company) => company.value),
        backgroundColor:
          selectedCategory === "Hitech"
            ? "#ADD8E6"
            : selectedCategory === "Banking"
            ? "#FFD700"
            : selectedCategory === "Healthcare"
            ? "#FF6347"
            : selectedCategory === "Educational"
            ? "#8A2BE2"
            : "#3CB371",
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return value;
          },
        },
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  return (
    <>
      <div className="flex justify-between items-center p-4 bg-gray-100 shadow-md">
        <div className="flex items-center">
          <div className="flex items-center border rounded-xl px-2 py-1 w-96 h-11 bg-white shadow-sm">
            <FaSearch className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search"
              className="w-full h-full outline-none text-gray-700"
            />
          </div>
        </div>
        <div className="flex items-center gap-5">
          <span className="text-gray-700">email@example.com</span>
          <img
            src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover"
          />
          <FaRegBell className="text-xl text-gray-700" />
        </div>
      </div>
      <section className="mt-5">
        <div className="flex justify-start mb-4">
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="border rounded p-2 bg-white shadow-sm"
          >
            <option value="Hitech">Hitech</option>
            <option value="Banking">Banking</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Educational">Educational</option>
            <option value="Retail">Retail</option>
          </select>
        </div>
        <div className="w-10/12 mx-auto pb-16">
          <Bar data={data} options={options} />
        </div>
      </section>
      <section className="pt-16 border-t-2 border-gray-200">
        <div className="bg-gray-800 w-3/4 mx-auto p-12 text-gray-100 rounded-lg shadow-lg mb-10">
          <div className="flex justify-between mb-8">
            <h1 className="text-xl">Name Project</h1>
            <h2>Name of the project owner</h2>
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa,
            libero nisi velit mollitia sint ipsum reprehenderit blanditiis vel
            ex omnis officiis distinctio eum dolor deserunt tenetur ad eligendi
            recusandae ducimus?
          </p>
          <div className="flex justify-between mt-10">
            <div className="flex gap-5">
              <p>Hitech</p>
              <p>Banking</p>
            </div>
            <p>rating: 7.5</p>
          </div>
        </div>
        <div className="bg-gray-800 w-3/4 mx-auto p-12 text-gray-100 rounded-lg shadow-lg mb-10">
          <div className="flex justify-between mb-8">
            <h1 className="text-xl">Name Project</h1>
            <h2>Name of the project owner</h2>
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa,
            libero nisi velit mollitia sint ipsum reprehenderit blanditiis vel
            ex omnis officiis distinctio eum dolor deserunt tenetur ad eligendi
            recusandae ducimus?
          </p>
          <div className="flex justify-between mt-10">
            <div className="flex gap-5">
              <p>Hitech</p>
              <p>Banking</p>
            </div>
            <p>rating: 7.5</p>
          </div>
        </div>
        <div className="bg-gray-800 w-3/4 mx-auto p-12 text-gray-100 rounded-lg shadow-lg mb-10">
          <div className="flex justify-between mb-8">
            <h1 className="text-xl">Name Project</h1>
            <h2>Name of the project owner</h2>
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa,
            libero nisi velit mollitia sint ipsum reprehenderit blanditiis vel
            ex omnis officiis distinctio eum dolor deserunt tenetur ad eligendi
            recusandae ducimus?
          </p>
          <div className="flex justify-between mt-10">
            <div className="flex gap-5">
              <p>Hitech</p>
              <p>Banking</p>
            </div>
            <p>rating: 7.5</p>
          </div>
        </div>
        <div className="bg-gray-800 w-3/4 mx-auto p-12 text-gray-100 rounded-lg shadow-lg mb-10">
          <div className="flex justify-between mb-8">
            <h1 className="text-xl">Name Project</h1>
            <h2>Name of the project owner</h2>
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa,
            libero nisi velit mollitia sint ipsum reprehenderit blanditiis vel
            ex omnis officiis distinctio eum dolor deserunt tenetur ad eligendi
            recusandae ducimus?
          </p>
          <div className="flex justify-between mt-10">
            <div className="flex gap-5">
              <p>Hitech</p>
              <p>Banking</p>
            </div>
            <p>rating: 7.5</p>
          </div>
        </div>
        <div className="bg-gray-800 w-3/4 mx-auto p-12 text-gray-100 rounded-lg shadow-lg mb-10">
          <div className="flex justify-between mb-8">
            <h1 className="text-xl">Name Project</h1>
            <h2>Name of the project owner</h2>
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa,
            libero nisi velit mollitia sint ipsum reprehenderit blanditiis vel
            ex omnis officiis distinctio eum dolor deserunt tenetur ad eligendi
            recusandae ducimus?
          </p>
          <div className="flex justify-between mt-10">
            <div className="flex gap-5">
              <p>Hitech</p>
              <p>Banking</p>
            </div>
            <p>rating: 7.5</p>
          </div>
        </div>
        <div className="bg-gray-800 w-3/4 mx-auto p-12 text-gray-100 rounded-lg shadow-lg mb-10">
          <div className="flex justify-between mb-8">
            <h1 className="text-xl">Name Project</h1>
            <h2>Name of the project owner</h2>
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa,
            libero nisi velit mollitia sint ipsum reprehenderit blanditiis vel
            ex omnis officiis distinctio eum dolor deserunt tenetur ad eligendi
            recusandae ducimus?
          </p>
          <div className="flex justify-between mt-10">
            <div className="flex gap-5">
              <p>Hitech</p>
              <p>Banking</p>
            </div>
            <p>rating: 7.5</p>
          </div>
        </div>
        <div className="bg-gray-800 w-3/4 mx-auto p-12 text-gray-100 rounded-lg shadow-lg mb-10">
          <div className="flex justify-between mb-8">
            <h1 className="text-xl">Name Project</h1>
            <h2>Name of the project owner</h2>
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa,
            libero nisi velit mollitia sint ipsum reprehenderit blanditiis vel
            ex omnis officiis distinctio eum dolor deserunt tenetur ad eligendi
            recusandae ducimus?
          </p>
          <div className="flex justify-between mt-10">
            <div className="flex gap-5">
              <p>Hitech</p>
              <p>Banking</p>
            </div>
            <p>rating: 7.5</p>
          </div>
        </div>
        <div className="bg-gray-800 w-3/4 mx-auto p-12 text-gray-100 rounded-lg shadow-lg mb-10">
          <div className="flex justify-between mb-8">
            <h1 className="text-xl">Name Project</h1>
            <h2>Name of the project owner</h2>
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa,
            libero nisi velit mollitia sint ipsum reprehenderit blanditiis vel
            ex omnis officiis distinctio eum dolor deserunt tenetur ad eligendi
            recusandae ducimus?
          </p>
          <div className="flex justify-between mt-10">
            <div className="flex gap-5">
              <p>Hitech</p>
              <p>Banking</p>
            </div>
            <p>rating: 7.5</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Programs;
