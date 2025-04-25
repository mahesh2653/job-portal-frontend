import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, MapPin, Building2, Clock } from "lucide-react";
import { ICategory } from "../types/jobs.type";
import { useAuthStore } from "../store-zustand/useAuthStore";
import IRoles from "../types/role.type";
import { toastError, toastInfo } from "../utils/toast";
import axiosApi from "../utils/interceptor";
import useDebounce from "../hooks/useDebounce";
import CustomLoader from "../components/customloader";
import CustomTable from "../components/customTable";

function Jobs() {
  const { isDarkMode, user } = useAuthStore();
  const [searchTerm, setSearchTerm] = useState("");
  const search = useDebounce(searchTerm, 500);
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [jobs, setJobs] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const getAllJobs = async () => {
    try {
      const baseUrl = `/jobs?page=${page}&limit=9&search=${search}&category=${category}`;
      const url =
        user?.role === IRoles.EMPLOYER
          ? `${baseUrl}&postedBy=${user.id}`
          : baseUrl;
      const response = await axiosApi.get(url);

      setJobs(response.data.data.jobs);
      setTotalPages(response.data.data.pages);
    } catch (error) {
      toastError("Something went wrong");
    }
  };
  const columns = [
    { header: "Company", accessorKey: "company" },
    { header: "Job Title", accessorKey: "title" },
    { header: "Job Type", accessorKey: "jobType" },
    { header: "Location", accessorKey: "location" },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }: any) => {
        const date = new Date(row.original.createdAt);
        return date.toDateString();
      },
    },
    {
      id: "select",
      header: () => <div>Actions</div>,
      cell: ({ row }: any) => (
        <div className="flex  gap-2">
          <button
            onClick={() => {
              navigate(`/edit-job/${row.original._id}`);
            }}
            className="text-orange-500 underline"
            disabled={Boolean(row.original.status)}
          >
            Edit
          </button>

          <button
            onClick={async () => {
              if (confirm("Are you sure you want to delete this task?")) {
                const response = await axiosApi.delete(
                  `/jobs/${row.original._id}`
                );
                toastInfo(response.data.message);
                getAllJobs();
              }
            }}
            className="text-red-700 underline"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];
  useEffect(() => {
    getAllJobs();
  }, [page, search, category]);

  return (
    <div
      className={`h-screen flex flex-col ${
        isDarkMode ? "text-white bg-gray-900" : "text-gray-900 bg-gray-100"
      }`}
    >
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
                  setPage(1); // Reset page on new search
                }}
                className={`w-full bg-transparent focus:outline-none ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              />
            </div>
          </div>

          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setPage(1); // Reset page on filter
            }}
            className={`p-2 rounded-lg shadow-sm ${
              isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
            }`}
          >
            <option value="">All Categories</option>
            {Object.values(ICategory).map((category, idx) => (
              <option key={idx} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {user?.role === IRoles.EMPLOYER ? (
        <CustomTable
          columns={columns}
          data={jobs}
          title="Created Jobs"
          addData={() => navigate("/add-job")}
          buttonName="Add Jobs"
        />
      ) : jobs.length > 0 ? (
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job: any, idx) => (
              <Link
                key={idx}
                to={`/jobs/${job._id}`}
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
                        {job.jobType}
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
                      400000-50000
                    </div>
                    <div className="flex items-center text-gray-500 mt-2 text-sm">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{new Date(job.createdAt).toDateString()}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <CustomLoader />
      )}
      {jobs.length !== 0 && (
        <div className="flex justify-center mt-8">
          <nav className="inline-flex gap-1 rounded-md shadow-sm">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
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
                onClick={() => setPage(index + 1)}
                className={`px-4 py-2 border ${
                  page === index + 1
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
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
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
      )}
    </div>
  );
}

export default Jobs;
