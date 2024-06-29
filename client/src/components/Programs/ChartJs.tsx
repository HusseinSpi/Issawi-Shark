import { useState, ChangeEvent } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface DataItem {
  name: string;
  value: number;
}

interface DataSet {
  [key: string]: DataItem[];
}

const ChartJs: React.FC = () => {
  const allData: DataSet = {
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

  const [selectedCategory, setSelectedCategory] =
    useState<keyof DataSet>("Hitech");
  const [chartData, setChartData] = useState<DataItem[]>(
    allData[selectedCategory].slice(0, 10)
  );

  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const category = event.target.value as keyof DataSet;
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

  const options: ChartOptions<"bar"> = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value: number | string) {
            return value as number;
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
  );
};

export default ChartJs;
