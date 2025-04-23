import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, MapPin, Building2, Clock } from "lucide-react";
import { useStore } from "../store-zustand";
import { dummyJobs } from "../data";

const JOBS_PER_PAGE = 12;

function Jobs() {
  const isDarkMode = useStore((state) => state.isDarkMode);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const filteredJobs = dummyJobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      !selectedCategory || job.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredJobs.length / JOBS_PER_PAGE);
  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * JOBS_PER_PAGE,
    currentPage * JOBS_PER_PAGE
  );

  const categories = [...new Set(dummyJobs.map((job) => job.category))];

  return (
    <div
      className={`h-screen flex flex-col ${
        isDarkMode ? "text-white bg-gray-900" : "text-gray-900 bg-gray-100"
      }`}
    >
      {/* Sticky top bar */}
      <div className="sticky top-0 z-10 bg-inherit p-6 border-b border-gray-300 shadow-md">
        <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
          <h1 className="text-2xl font-bold">Find Your Next Opportunity</h1>
          <button
            onClick={() => navigate("/add-job")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Add Job
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div
              className={`flex items-center ${
                isDarkMode ? "bg-gray-800" : "bg-white"
              } rounded-lg p-2 shadow-sm`}
            >
              <Search className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); // Reset page on new search
                }}
                className={`w-full bg-transparent focus:outline-none ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              />
            </div>
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setCurrentPage(1); // Reset page on filter
            }}
            className={`p-2 rounded-lg shadow-sm ${
              isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
            }`}
          >
            <option value="">All Categories</option>
            {categories.map((category, idx) => (
              <option key={idx} value={category}>
                {category}
              </option>
            ))}
          </select>
          <button
            onClick={() => navigate("/add-job")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Add Job
          </button>
        </div>
      </div>

      {/* Scrollable jobs section */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedJobs.map((job) => (
            <Link
              key={job.id}
              to={`/jobs/${job.id}`}
              className={`${
                isDarkMode
                  ? "bg-gray-800 hover:bg-gray-700"
                  : "bg-white hover:bg-gray-50"
              } p-6 rounded-lg shadow-md transition`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold mb-2">{job.title}</h2>
                  <div className="flex items-center text-gray-500 mb-2 text-sm">
                    <Building2 className="w-4 h-4 mr-1" />
                    <span className="mr-4">{job.company}</span>
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        isDarkMode ? "bg-gray-700" : "bg-gray-100"
                      }`}
                    >
                      {job.type}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        isDarkMode ? "bg-gray-700" : "bg-gray-100"
                      }`}
                    >
                      {job.category}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold text-blue-600">
                    {job.salary}
                  </div>
                  <div className="flex items-center text-gray-500 mt-2 text-sm">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>Posted {job.postedDate}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination UI */}
        <div className="flex justify-center mt-8">
          <nav className="inline-flex gap-1 rounded-md shadow-sm">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              className={`px-4 py-2 border rounded-l-md ${
                isDarkMode
                  ? "bg-gray-700 text-white border-gray-600"
                  : "bg-white text-gray-700 border-gray-300"
              } hover:bg-blue-500 hover:text-white transition`}
            >
              Prev
            </button>
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-4 py-2 border ${
                  currentPage === index + 1
                    ? "bg-blue-600 text-white"
                    : isDarkMode
                    ? "bg-gray-800 text-white border-gray-600"
                    : "bg-white text-gray-800 border-gray-300"
                }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              className={`px-4 py-2 border rounded-r-md ${
                isDarkMode
                  ? "bg-gray-700 text-white border-gray-600"
                  : "bg-white text-gray-700 border-gray-300"
              } hover:bg-blue-500 hover:text-white transition`}
            >
              Next
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Jobs;
