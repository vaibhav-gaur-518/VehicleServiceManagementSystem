import { createComponent } from '/src/services/api';
import { useState } from 'react';
import { toast } from "react-toastify";
import { motion } from "framer-motion";

function ComponentRegistration({ components, setComponents }) {
    const [newComponentName, setNewComponentName] = useState('');
    const [newComponentPurchasePrice, setNewComponentPurchasePrice] = useState('');
    const [newComponentRepairPrice, setNewComponentRepairPrice] = useState('');
    const [showAddComponentForm, setShowAddComponentForm] = useState(false);


    const handleAddComponent = async () => {
      try {
        const newComponentData = {
          name: newComponentName,
          purchase_price: newComponentPurchasePrice,
          repair_price: newComponentRepairPrice || null,
        };

        const response = await createComponent(newComponentData);
        setComponents([...components, response.data]);
        setNewComponentName("");
        setNewComponentPurchasePrice("");
        setNewComponentRepairPrice("");
        setShowAddComponentForm(false);
        toast.success("Component added successfully!");
      } catch (error) {
        console.error("Error adding component:", error);
        toast.error("Failed to add component.");
      }
    };

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-0">Components Registry</h2> {/* Added text-white */}
        <button
          onClick={() => setShowAddComponentForm(!showAddComponentForm)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {showAddComponentForm ? "Hide Form" : "Add Component"}
        </button>
      </div>

      {showAddComponentForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-gray-800 p-4 md:p-6 rounded-lg mb-6"
        >
          <h3 className="text-xl md:text-2xl font-bold mb-4 text-white">Add New Component</h3> {/* Added text-white */}
          <input
            type="text"
            placeholder="Component Name"
            value={newComponentName}
            onChange={(e) => setNewComponentName(e.target.value)}
            className="w-full bg-gray-700 rounded-md p-2 mb-4 text-white"
            required 
          />
          <input
            type="number"
            placeholder="Purchase Price"
            value={newComponentPurchasePrice}
            onChange={(e) => setNewComponentPurchasePrice(e.target.value)}
            className="w-full bg-gray-700 rounded-md p-2 mb-4 text-white"
            required 
          />
          <input
            type="number"
            placeholder="Repair Price (Optional)"
            value={newComponentRepairPrice}
            onChange={(e) => setNewComponentRepairPrice(e.target.value)}
            className="w-full bg-gray-700 rounded-md p-2 mb-4 text-white"
          />
          <button
            onClick={handleAddComponent}
            className="w-full md:w-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Component
          </button>
        </motion.div>
      )}
    </div>
  );
}

export default ComponentRegistration;