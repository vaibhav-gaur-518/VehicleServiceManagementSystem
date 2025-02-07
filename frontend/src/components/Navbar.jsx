import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const services = [
  { name: "Components", path: "/dashboard/components" },
  { name: "Vehicles", path: "/dashboard/vehicles" },
  { name: "Issues", path: "/dashboard/issues" },
  { name: "Payment", path: "/dashboard/payment" },
  { name: "Revenue", path: "/dashboard/revenue" },
];

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleServiceClick = (path) => {
    navigate(path);
    setMenuOpen(false); 
  };

  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Vehicle Service System</Link>
        
        <button 
          className="md:hidden focus:outline-none" 
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
        
        <div className="hidden md:flex space-x-4">
          {services.map((service) => (
            <Link
              key={service.name}
              to={service.path}
              className={`hover:text-gray-300 ${
                location.pathname === service.path ? 'text-blue-500 font-bold' : ''
              }`}
            >
              {service.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col bg-gray-900 p-4 space-y-2">
          {services.map((service) => (
            <Link
              key={service.name}
              to={service.path}
              className={`block py-2 text-center hover:text-gray-300 ${
                location.pathname === service.path ? 'text-blue-500 font-bold' : ''
              }`}
              onClick={() => handleServiceClick(service.path)}
            >
              {service.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

export default Navbar;