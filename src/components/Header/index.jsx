import { Link } from "react-router-dom";
import { FaReact } from "react-icons/fa";

const Header = () => {
  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <FaReact className="text-3xl animate-spin text-cyan-300" />
          <span className="text-2xl font-bold">My React App</span>
        </Link>
        
        {/* Navigation */}
        <nav>
          <ul className="flex items-center gap-6 font-medium">
            <li>
              <Link to="/" className="hover:text-yellow-300 transition">
                Home
              </Link>
            </li>

            <li>
              <Link to="/about" className="hover:text-yellow-300 transition">
                About
              </Link>
            </li>

            <li>
              <Link to="/dashboard" className="hover:text-yellow-300 transition">
                Dashboard
              </Link>
            </li>

            <li>
              <Link to="/terms" className="hover:text-yellow-300 transition">
                Terms
              </Link>
            </li>

            <li>
              <Link to="/contact" className="hover:text-yellow-300 transition">
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        {/* Login Button */}
        <Link
          to="/login"
          className="bg-white text-blue-600 px-5 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          Login
        </Link>
      </div>
    </header>
  );
};

export default Header;