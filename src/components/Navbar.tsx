import { Link } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import { useAuthStore } from "../store-zustand/useAuthStore";

const Navbar = () => {
  const { isDarkMode, toggleDarkMode, isAuthenticated, logout } =
    useAuthStore();

  const navLinks = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Jobs", path: "/jobs" },
  ];

  const themeClass = isDarkMode
    ? "bg-gray-800 text-white"
    : "bg-white text-gray-900";

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 shadow-md ${themeClass}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold">
            Job Portal
          </Link>

          {/* Navigation Links & Actions */}
          <div className="flex items-center space-x-6">
            {/* Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              className="hover:scale-110 transition"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Authenticated User Links */}
            {isAuthenticated &&
              navLinks.map(({ path, name }) => (
                <Link key={path} to={path} className="hover:text-blue-600">
                  {name}
                </Link>
              ))}

            {/* Auth Buttons */}
            {isAuthenticated ? (
              <button onClick={logout} className="hover:text-blue-600">
                Log out
              </button>
            ) : (
              <Link to="/login" className="hover:text-blue-600">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
