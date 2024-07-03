import { useState, ChangeEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProjects } from "../../redux/thunk/projectThunks";
import { RootState } from "../../redux/store/store";
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

interface Project {
  _id: string;
  title: string;
  description: string;
  categories: string[];
  github: string;
  rating: number;
  technologies: string[];
  status: string;
  owner: {
    _id: string;
    userName: string;
    email: string;
    photo: string;
    role: string;
  };
  teamMembers: string[];
  date: string;
  __v: number;
  id: string;
}

const ChartJs: React.FC = () => {
  const dispatch = useDispatch();
  const {
    data: projects = [],
    status,
    error,
  } = useSelector((state: RootState) => state.project || {});

  useEffect(() => {
    dispatch(getAllProjects());
  }, [dispatch]);

  const categories = [
    "Hitech",
    "Banking",
    "Healthcare",
    "Educational",
    "Retail",
  ];

  const getTopRatedProjects = (
    category: string,
    projects: Project[]
  ): DataItem[] => {
    return projects
      .filter((project) => project.categories.includes(category))
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 10)
      .map((project) => ({ name: project.title, value: project.rating }));
  };

  const allData = categories.reduce((acc, category) => {
    acc[category] = getTopRatedProjects(category, projects);
    return acc;
  }, {} as { [key: string]: DataItem[] });

  const [selectedCategory, setSelectedCategory] =
    useState<keyof typeof allData>("Hitech");
  const [chartData, setChartData] = useState<DataItem[]>(
    allData[selectedCategory] || []
  );

  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const category = event.target.value as keyof typeof allData;
    setSelectedCategory(category);
    setChartData(allData[category] || []);
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
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="w-10/12 mx-auto pb-16">
        <Bar data={data} options={options} />
      </div>
    </section>
  );
};

export default ChartJs;
