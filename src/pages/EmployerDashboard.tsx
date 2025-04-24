import { dummyJobs, dummyApplications } from "../data";
import { useAuthStore } from "../store-zustand/useAuthStore";
import { useEffect } from "react";
import { toastError } from "../utils/toast";
import axiosApi from "../utils/interceptor";
import StatCard from "../components/StatCard";

const EmployerDashboard = () => {
  const { isDarkMode, user } = useAuthStore();
  const employerJobs = dummyJobs;
  const applications = dummyApplications.filter((app) =>
    employerJobs.some((job) => job.id === app.jobId)
  );

  const getDataByEmpId = async () => {
    try {
      const response = await axiosApi.get(`/jobs/employer/${user?.id}`);
      console.log(response.data.data);
    } catch (error) {
      toastError("Something went wrong");
    }
  };

  useEffect(() => {
    getDataByEmpId();
  }, []);

  return (
    <div
      className={`${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      } min-h-screen pt-20 px-4`}
    >
      <div className="max-w-7xl mx-auto space-y-12">
        <header>
          <h1 className="text-3xl font-bold mb-1">Employer Dashboard</h1>
          <p className="text-gray-400 text-lg">Welcome back, {user?.name}</p>
        </header>

        {/* Stats */}
        <section className="grid md:grid-cols-4 gap-6">
          <StatCard
            title="Active Jobs"
            value={employerJobs.length}
            color="text-blue-600"
            isDarkMode={isDarkMode}
            onClick={() => console.log("Active Jobs clicked")}
          />
          <StatCard
            title="Total Applications"
            value={applications.length}
            color="text-green-600"
            isDarkMode={isDarkMode}
            onClick={() => console.log("Total Applications clicked")}
          />
          <StatCard
            title="Pending Review"
            value={applications.filter((a) => a.status === "pending").length}
            color="text-yellow-600"
            isDarkMode={isDarkMode}
            onClick={() => console.log("Pending clicked")}
          />
          <StatCard
            title="Hired"
            value={applications.filter((a) => a.status === "accepted").length}
            color="text-purple-600"
            isDarkMode={isDarkMode}
            onClick={() => console.log("Hired clicked")}
          />
        </section>

        <section
          className={`rounded-lg shadow-md ${
            isDarkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h2 className="text-xl font-semibold p-6 border-b">
            Recent Applications
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className={isDarkMode ? "bg-gray-700" : "bg-gray-100"}>
                <tr>
                  <th className="px-6 py-3 text-left">Job Title</th>
                  <th className="px-6 py-3 text-left">Applicant</th>
                  <th className="px-6 py-3 text-left">Date</th>
                  <th className="px-6 py-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {applications.slice(0, 5).map((app) => {
                  const job = employerJobs.find((j) => j.id === app.jobId);
                  return (
                    <tr
                      key={app.id}
                      className={`$${
                        isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"
                      }`}
                    >
                      <td className="px-6 py-4">{job?.title}</td>
                      <td className="px-6 py-4">John Doe</td>
                      <td className="px-6 py-4">{app.appliedDate}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${
                            app.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : app.status === "accepted"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {app.status.charAt(0).toUpperCase() +
                            app.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default EmployerDashboard;
