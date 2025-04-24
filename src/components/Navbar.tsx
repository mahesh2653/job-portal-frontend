import { Link } from "react-router-dom";
import { Sun, Moon, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useAuthStore } from "../store-zustand/useAuthStore";
import IRoles from "../types/role.type";

const { JOB_SEEKER } = IRoles;

const Navbar = () => {
  const { isDarkMode, toggleDarkMode, user, isAuthenticated, logout } =
    useAuthStore();
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  const navLinks = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Jobs", path: "/jobs" },
  ];

  const jobSeekerLinks = [
    { name: "Saved Jobs", path: "/jobseeker/saved" },
    { name: "Applied Jobs", path: "/jobseeker/applied" },
  ];

  const themeClass = isDarkMode
    ? "bg-gray-800 text-white"
    : "bg-white text-gray-900";
  const dropdownThemeClass = isDarkMode
    ? "bg-gray-700 text-white"
    : "bg-white text-gray-800";

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

            {/* Job Seeker Dropdown */}
            {user?.role === JOB_SEEKER && (
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center hover:text-blue-600"
                >
                  My Jobs <ChevronDown className="ml-1 w-4 h-4" />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div
                    className={`absolute right-0 mt-2 w-40 rounded-lg shadow-lg ${dropdownThemeClass}`}
                  >
                    {jobSeekerLinks.map(({ path, name }) => (
                      <Link
                        key={path}
                        to={path}
                        className="block px-4 py-2 hover:bg-blue-100 dark:hover:bg-gray-600"
                        onClick={() => setDropdownOpen(false)}
                      >
                        {name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}

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
