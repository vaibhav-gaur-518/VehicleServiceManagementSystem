import { motion } from "framer-motion";

function ComponentList({ components }) {
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {components?.map((component) => (
          <motion.div
            key={component.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ scale: 1.07 }}
            className="bg-gray-800 p-6 rounded-2xl text-white shadow-lg transition-transform duration-300"
          >
            <h3 className="text-lg font-semibold mb-2">{component.name}</h3>
            <p className="text-sm md:text-base">Price: ₹{component.purchase_price}</p>
            <p className="text-sm md:text-base">
              Repair Price: ₹{component.repair_price ? component.repair_price : "N/A"}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default ComponentList;
