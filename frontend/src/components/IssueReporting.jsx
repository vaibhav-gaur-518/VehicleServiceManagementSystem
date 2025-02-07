import {
  getVehicles,
  getComponents,
  createService,
  getServices,
} from "/src/services/api";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

function IssueReporting() {
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({
    vehicle: null,
    description: "",
    components: [],
    is_new_components: {},
  });

  const [vehicles, setVehicles] = useState([]);
  const [loadingVehicles, setLoadingVehicles] = useState(true);
  const [components, setComponents] = useState([]);
  const [loadingComponents, setLoadingComponents] = useState(true);

  const handleComponentSelect = (componentId) => {
    const updatedComponents = newService.components.includes(componentId)
      ? newService.components.filter((id) => id !== componentId)
      : [...newService.components, componentId];

    setNewService({
      ...newService,
      components: updatedComponents,
      is_new_components: {
        ...newService.is_new_components,
        [componentId]: newService.is_new_components[componentId] || true,
      },
    });
  };

  const handleIsNewComponentChange = (componentId, isNew) => {
    setNewService({
      ...newService,
      is_new_components: {
        ...newService.is_new_components,
        [componentId]: isNew,
      },
    });
  };

  const handleAddService = async (e) => {
    e.preventDefault();

    if (!newService.vehicle) {
      toast.error("Please select a vehicle first.");
      return;
    }

    if (!newService.description.trim()) {
      toast.error("Issue description is required.");
      return false;
    }

    if (newService.components.length === 0) {
      toast.error("At least one component must be selected.");
      return false;
    }

    try {
      const serviceResponse = await createService({
        vehicle_id: newService.vehicle, 
        description: newService.description,
        component_ids: newService.components,
        is_new_components: newService.is_new_components,
      });

      setServices([...services, serviceResponse.data]);
      setNewService({
        vehicle: null,
        description: "",
        components: [],
        is_new_components: {},
      });
      toast.success("Service reported successfully!");
    } catch (error) {
      console.error("Error adding service:", error);
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
      } finally {
        setLoadingVehicles(false);
      }
    };
    fetchVehicles();
  }, []);

  useEffect(() => {
    const fetchComponents = async () => {
      try {
        const response = await getComponents();
        setComponents(response.data);
      } catch (error) {
        console.error("Failed to fetch components", error);
        toast.error("Failed to load components.");
      } finally {
        setLoadingComponents(false);
      }
    };
    fetchComponents();
  }, []);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await getServices();
        setServices(response.data);
      } catch (error) {
        console.error("Failed to fetch services with details", error);
        toast.error("Failed to load services.");
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="mt-8 bg-gray-800 p-6 rounded-lg max-w-4xl mx-auto w-full">
      <h2 className="text-2xl font-bold mb-4 text-white text-center">Report Issue</h2>
      <select
        value={newService.vehicle || ""}
        onChange={(e) =>
          setNewService({
            ...newService,
            vehicle: parseInt(e.target.value, 10),
          })
        }
        className="w-full bg-gray-700 rounded-md p-2 mb-4 text-white"
        required
      >
        <option value="">Select Vehicle</option>
        {loadingVehicles ? (
          <option disabled>Loading vehicles...</option>
        ) : (
          vehicles.map((vehicle) => (
            <option key={vehicle.id} value={vehicle.id}>
              {vehicle.identification}
            </option>
          ))
        )}
      </select>

      <textarea
        name="description"
        placeholder="Issue Description"
        value={newService.description}
        onChange={(e) =>
          setNewService({ ...newService, description: e.target.value })
        }
        className="w-full bg-gray-700 rounded-md p-2 mb-4 text-white"
      />

      <h3 className="text-xl font-semibold mb-2 text-white text-center">
        Select Components
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {loadingComponents ? (
          <p className="text-white">Loading components...</p>
        ) : (
          components.map((component) => (
            <div key={component.id} className="border p-2 rounded bg-gray-700">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  value={component.id}
                  checked={newService.components.includes(component.id)}
                  onChange={() => handleComponentSelect(component.id)}
                  className="mr-2"
                  required
                />
                <span className="text-white">{component.name}</span>
              </label>
              {newService.components.includes(component.id) && (
                <div className="mt-2">
                  <label className="inline-flex items-center mr-4">
                    <input
                      type="radio"
                      checked={
                        newService.is_new_components[component.id] === true
                      }
                      onChange={() =>
                        handleIsNewComponentChange(component.id, true)
                      }
                      className="mr-2"
                      required
                    />
                    <span className="text-white">New</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      checked={
                        newService.is_new_components[component.id] === false
                      }
                      onChange={() =>
                        handleIsNewComponentChange(component.id, false)
                      }
                      className="mr-2"
                      required
                    />
                    <span className="text-white">Repair</span>
                  </label>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      <button
        onClick={handleAddService}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 w-full sm:w-auto"
      >
        Add Service
      </button>
      {services.length > 0 && (
        <h3 className="text-xl font-semibold mt-4 mb-2 text-white">
          Reported Services
        </h3>
      )}
      <ul>
        {services?.map((service) => (
          <li key={service.id} className="mb-2 bg-gray-700 p-2 rounded">
            <p className="text-white">
              <strong>Vehicle:</strong> {service.vehicle.identification}
            </p>
            <p className="text-white">
              <strong>Description:</strong> {service.description}
            </p>
            <ul className="mt-2">
              {service.components.length > 0 &&
                service.components?.map((component) => {
                  return (
                    <li
                      key={component.id}
                      className="mb-1 bg-gray-600 p-1 rounded"
                    >
                      <p className="text-white">
                        <strong>Component:</strong> {component.name}
                      </p>
                      <p className="text-white">
                        <strong>Type:</strong>
                        {service.is_new_components[component.id] ? "New" : "Repair"}
                      </p>
                    </li>
                  );
                })}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default IssueReporting;