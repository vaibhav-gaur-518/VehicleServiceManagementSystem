import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getComponents } from "/src/services/api";
import { toast } from "react-toastify";
import RevenueGraph from "./RevenueGraph";
import VehicleRepairTracking from "./VehicleRepairTracking";
import IssueReporting from "./IssueReporting";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ComponentRegistration from "./ComponentRegistration";
import ComponentList from "./ComponentList";
import { useParams, useNavigate } from "react-router-dom";
import Payment from "./Payment";

function Dashboard() {
  const [components, setComponents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { service } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComponents = async () => {
      try {
        const response = await getComponents();
        setComponents(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch components", error);
        setLoading(false);
        toast.error("Failed to load components.");
      }
    };
    fetchComponents();

    if (!service) {
      navigate("/dashboard/components", { replace: true });
    }
  }, [service, navigate]);

  if (loading) {
    return <div className="text-center text-white py-4">Loading components...</div>;
  }

  const renderContent = () => {
    if (!service) {
      return <RevenueGraph />;
    }

    switch (service) {
      case "components":
        return (
          <div>
            <ComponentRegistration
              components={components}
              setComponents={setComponents}
            />
            <ComponentList components={components} />
          </div>
        );
      case "vehicles":
        return <VehicleRepairTracking />;
      case "issues":
        return <IssueReporting components={components} />;
      case "payment":
        return <Payment />;
      case "revenue":
        return <RevenueGraph />;

      default:
        return (
          <div>
            <ComponentRegistration
              components={components}
              setComponents={setComponents}
            />
            <ComponentList components={components} />
            <RevenueGraph />
            <VehicleRepairTracking />
            <IssueReporting components={components} />
            <Payment />
          </div>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-gray-900 min-h-screen text-white flex flex-col"
    >
      <Navbar />
      <div className="p-4 md:p-8 flex-grow">{renderContent()}</div>
      <Footer />
    </motion.div>
  );
}

export default Dashboard;