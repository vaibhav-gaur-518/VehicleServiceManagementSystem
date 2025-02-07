import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Cursor from "./utils/cursor";

const services = [
  {
    name: "Components",
    description: "Manage Vehicle Components",
    image: "/src/assets/components.jpeg",
    path: "/dashboard",
  },
  {
    name: "Vehicles",
    description: "Vehicle Registration",
    image: "/src/assets/vehicles.jpeg",
    path: "/dashboard",
  },
  {
    name: "Issues",
    description: "Track Vehicle Issues",
    image: "/src/assets/issues.jpeg",
    path: "/dashboard",
  },
  {
    name: "Services",
    description: "Service Management",
    image: "/src/assets/services.jpeg",
    path: "/dashboard",
  },
  {
    name: "Revenue",
    description: "Revenue Analytics",
    image: "/src/assets/revenue.jpeg",
    path: "/dashboard",
  },
];

function App() {
  const navigate = useNavigate();
  const carouselRef = useRef(null);
  const [carouselInView, setCarouselInView] = useState(false);

  const handleServiceClick = (path) => {
    navigate(path);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setCarouselInView(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    if (carouselRef.current) {
      observer.observe(carouselRef.current);
    }

    return () => {
      if (carouselRef.current) {
        observer.unobserve(carouselRef.current);
      }
    };
  }, []);

  const scrollToCarousel = () => {
    const carouselSection = document.getElementById("services-carousel");
    carouselSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Cursor />
      <div className="min-h-screen overflow-x-hidden bg-gradient-to-r from-black via-gray-900 to-gray-800">
        <div className="min-h-screen flex flex-col items-center justify-center text-white relative px-4 md:px-0">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 1 }}
            whileHover={{
              scale: 1.1, 
              transition: { type: "spring", stiffness: 100, damping: 25 },
            }}
            whileTap={{
              scale: 0.9,
              transition: { type: "spring", stiffness: 100, damping: 25 },
            }}
            className="text-center mix-blend-difference w-full max-w-4xl px-4"
          >
            <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
              Welcome to Vehicle Service Management System
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8">
              Streamline Your Automotive Service Workflow
            </p>
          </motion.div>

          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bottom-10 md:bottom-20 cursor-pointer mix-blend-difference p-2"
            onClick={scrollToCarousel}
          >
            <ChevronDown size={40} className="text-white" />
          </motion.div>
        </div>

        <section
          id="services-carousel"
          className="min-h-screen py-12 md:py-20 px-4 md:px-0"
          ref={carouselRef}
        >
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={carouselInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="mb-8 md:mb-12 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Explore Our Key Services
            </h2>
            <p className="text-lg text-gray-400">
              Streamlining your vehicle management process.
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center space-x-8">
            {services?.map((service, index) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={carouselInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.4,
                  delay: index * 0.15,
                  ease: "easeInOut",
                }}
                whileHover={{
                  scale: 1.05,
                  y: -5,
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
                onClick={() => handleServiceClick(service.path)}
                className="cursor-pointer text-center bg-gray-900 rounded-lg p-6 shadow-lg"
              >
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-64 h-48 object-cover rounded-lg mb-4 transition-transform duration-300 hover:scale-1.1"
                />
                <h2 className="text-white text-xl md:text-2xl font-semibold mb-2">
                  {service.name}
                </h2>
                <p className="text-gray-400">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

export default App;
