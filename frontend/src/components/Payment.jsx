import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getServicesByVehicle, getVehicles } from '/src/services/api';

function Payment() {
    const [vehicles, setVehicles] = useState([]);
    const [selectedVehicle, setSelectedVehicle] = useState("");
    const [services, setServices] = useState([]);
    const [loadingServices, setLoadingServices] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [loadingVehicles, setLoadingVehicles] = useState(false);

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const response = await getVehicles();
                setVehicles(response.data);
            } catch (error) {
                console.error('Failed to fetch vehicles', error);
                toast.error("Failed to load vehicles.");
            } finally {
                setLoadingVehicles(false);
            }
        };
        fetchVehicles();
    }, []);

    useEffect(() => {
        const fetchServices = async () => {
            if (selectedVehicle) {
                setLoadingServices(true);
                try {
                    const servicesResponse = await getServicesByVehicle(selectedVehicle);
                    setServices(servicesResponse.data);

                    let price = 0;
                    servicesResponse.data.forEach((service) => {
                        price += parseFloat(service.fixed_labor_charge);

                        service.components.forEach(component => {
                            const componentPrice = parseFloat(
                                service.is_new_components[component.id]
                                    ? component.purchase_price
                                    : component.repair_price || 0
                            );
                            price += componentPrice;
                        });
                    });
                    setTotalPrice(price);
                } catch (error) {
                    console.error("Error fetching services:", error);
                    toast.error("Failed to load services.");
                    setServices([]);
                    setTotalPrice(0);
                } finally {
                    setLoadingServices(false);
                }
            } else {
                setServices([]);
                setTotalPrice(0);
            }
        };

        fetchServices();
    }, [selectedVehicle]);

    return (
        <div className="mt-8 bg-gray-800 p-6 rounded-lg max-w-xl mx-auto shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-white text-center">Payment</h2>

            <select
                value={selectedVehicle || ""}
                onChange={(e) => setSelectedVehicle(e.target.value)}
                className="w-full bg-gray-700 rounded-md p-2 mb-4 text-white"
            >
                <option value="">Select Vehicle</option>
                {loadingVehicles ? (
                    <option disabled>Loading vehicles...</option>
                ) : (
                    vehicles.map((vehicle) => (
                        <option key={vehicle.id} value={vehicle.identification}>
                            {vehicle.identification}
                        </option>
                    ))
                )}
            </select>

            {loadingServices ? (
                <p className="text-white text-center">Loading services...</p>
            ) : services.length === 0 ? (
                <p className="text-white text-center">No services found for this vehicle.</p>
            ) : (
                <div>
                    <ul className="mb-4 space-y-3">
                        {services.map((service) => (
                            <li key={service.id} className="bg-gray-700 p-3 rounded">
                                <p className="text-white font-semibold">
                                    <strong>Description:</strong> {service.description}
                                </p>
                                <ul className="ml-4 mt-2 space-y-1">
                                    {service.components.map((component) => (
                                        <li key={component.id} className="text-white text-sm">
                                            <strong>Component:</strong> {component.name} ({service.is_new_components[component.id] ? "New" : "Repair"}) - ₹{service.is_new_components[component.id] ? component.purchase_price : component.repair_price}
                                        </li>
                                    ))}
                                </ul>
                                <p className="text-white">
                                    <strong>Labor Charges:</strong> ₹{service.fixed_labor_charge}
                                </p>
                            </li>
                        ))}
                    </ul>
                    <p className="text-2xl font-bold text-white text-center">Total Price: ₹{totalPrice.toFixed(2)}</p>
                </div>
            )}
        </div>
    );
}

export default Payment;