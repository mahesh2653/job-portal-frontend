import { Link } from "react-router-dom";
import { Sun, Moon, ChevronDown } from "lucide-react";
import { useStore } from "../store-zustand";
import { useState } from "react";

function Navbar() {
  const { isDarkMode, toggleDarkMode, currentUser } = useStore();
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 shadow-md ${
        isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold">
            JobPortal
          </Link>

          <div className="flex items-center space-x-6">
            {/* Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              className="hover:scale-110 transition"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <Link to="/jobs" className="hover:text-blue-600">
              Jobs
            </Link>

            {/* Dropdown only for Jobseekers */}
            {currentUser?.role === "jobseeker" && (
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center hover:text-blue-600"
                >
                  My Jobs <ChevronDown className="ml-1 w-4 h-4" />
                </button>

                {isDropdownOpen && (
                  <div
                    className={`absolute right-0 mt-2 w-40 rounded-lg shadow-lg ${
                      isDarkMode
                        ? "bg-gray-700 text-white"
                        : "bg-white text-gray-800"
                    }`}
                  >
                    <Link
                      to="/jobseeker/saved"
                      className="block px-4 py-2 hover:bg-blue-100 dark:hover:bg-gray-600"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Saved Jobs
                    </Link>
                    <Link
                      to="/jobseeker/applied"
                      className="block px-4 py-2 hover:bg-blue-100 dark:hover:bg-gray-600"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Applied Jobs
                    </Link>
                  </div>
                )}
              </div>
            )}

            {currentUser ? (
              <Link
                to={`/${currentUser.role}/dashboard`}
                className="hover:text-blue-600"
              >
                Dashboard
              </Link>
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
}

export default Navbar;
