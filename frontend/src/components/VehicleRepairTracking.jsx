import { getVehicles, createVehicle } from "/src/services/api";
import { useState, useEffect } from "react";
import { toast } from 'react-toastify';

function VehicleRepairTracking() {
  const [vehicles, setVehicles] = useState([]);
  const [newVehicle, setNewVehicle] = useState({
    identification: "",
  });

  const handleInputChange = (e) => {
    setNewVehicle({ ...newVehicle, [e.target.name]: e.target.value });
  };

  const handleAddVehicle = async () => {
    try {
      const response = await createVehicle(newVehicle);
      setVehicles([...vehicles, response.data]);
      setNewVehicle({
        identification: "",
      });
      toast.success("Vehicle added successfully!");
    } catch (error) {
      console.error("Error adding vehicle:", error);
      toast.error("Failed to add vehicle.");
    }
  };

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await getVehicles();
        setVehicles(response.data);
      } catch (error) {
        console.error("Failed to fetch vehicles", error);
        toast.error("Failed to load vehicles.");
      }
    };
    fetchVehicles();
  }, []);

  return (
    <div className="mt-8 bg-gray-800 p-6 rounded-lg max-w-3xl mx-auto w-full sm:p-8">
      <h2 className="text-2xl font-bold mb-4 text-white text-center sm:text-left">Vehicle Repair Tracking</h2>
      <input
        type="text"
        name="identification"
        placeholder="Vehicle Identification"
        value={newVehicle.identification}
        onChange={handleInputChange}
        className="w-full bg-gray-700 rounded-md p-2 mb-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleAddVehicle}
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition sm:w-auto"
      >
        Add Vehicle
      </button>

      <div className="mt-4">
        {vehicles.length > 0 && <h3 className="text-xl font-semibold mb-2 text-white">Tracked Vehicles</h3>}
        <ul className="space-y-2">
          {vehicles.map((vehicle, index) => (
            <li key={index} className="bg-gray-700 p-2 rounded text-white">
              <p>
                <strong>ID:</strong> {vehicle.identification}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default VehicleRepairTracking;
