import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  getMonthlyRevenue,
  getYearlyRevenue,
  getDailyRevenue,
} from "/src/services/api";

function RevenueGraph() {
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [yearlyRevenue, setYearlyRevenue] = useState([]);
  const [dailyRevenue, setDailyRevenue] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeGraph, setActiveGraph] = useState("monthly");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const monthlyData = await getMonthlyRevenue();
        setMonthlyRevenue(formatRevenueData(monthlyData.data, "monthly"));

        const yearlyData = await getYearlyRevenue();
        setYearlyRevenue(formatRevenueData(yearlyData.data, "yearly"));

        const dailyData = await getDailyRevenue();
        setDailyRevenue(formatRevenueData(dailyData.data, "daily"));

        setLoading(false);
      } catch (error) {
        console.error("Error fetching revenue data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString, timeUnit) => {
    if (!dateString) return "";

    const year = dateString.slice(0, 4);
    const month = timeUnit === "yearly" ? "01" : dateString.slice(5, 7);
    const day =
      timeUnit === "yearly" || timeUnit === "monthly"
        ? "01"
        : dateString.slice(8, 10);

    const date = new Date(`${year}-${month}-${day}`);

    switch (timeUnit) {
      case "monthly":
        return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
      case "yearly":
        return date.getFullYear().toString();
      case "daily":
        return date.toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" });
      default:
        return date.toLocaleDateString();
    }
  };

  const formatRevenueData = (data, timeUnit) => {
    return Object.entries(data).map(([date, total]) => ({
      date: formatDate(date, timeUnit),
      total,
    }));
  };

  const dataToDisplay = () => {
    switch (activeGraph) {
      case "monthly":
        return monthlyRevenue;
      case "yearly":
        return yearlyRevenue;
      case "daily":
        return dailyRevenue;
      default:
        return monthlyRevenue;
    }
  };

  if (loading) {
    return <div className="text-white">Loading revenue data...</div>;
  }

  return (
    <div className="mt-8 bg-gray-800 p-6 rounded-lg w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-white text-center">Revenue Analytics</h2>

      <div className="mb-4 flex flex-wrap justify-center gap-2">
        {["monthly", "yearly", "daily"].map((type) => (
          <button
            key={type}
            onClick={() => setActiveGraph(type)}
            className={`bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded ${
              activeGraph === type ? "bg-blue-500" : ""
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      <div className="w-full overflow-x-auto">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={dataToDisplay()}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              stroke="white"
              angle={window.innerWidth < 640 ? -45 : -30}
              textAnchor="end"
              height={window.innerWidth < 640 ? 100 : 80}
              interval={window.innerWidth < 640 ? 2 : 0}
            />
            <YAxis stroke="white" />
            <Tooltip contentStyle={{ backgroundColor: "#333", color: "white" }} />
            <Legend wrapperStyle={{ color: "white" }} />
            <Line type="monotone" dataKey="total" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default RevenueGraph;
