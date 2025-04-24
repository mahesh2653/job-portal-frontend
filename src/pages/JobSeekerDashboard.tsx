import { useEffect, useState } from "react";

import { useAuthStore } from "../store-zustand/useAuthStore";
import CustomTable from "../components/customTable";
import { toastError } from "../utils/toast";
import axiosApi from "../utils/interceptor";
import CustomLoader from "../components/customloader";
import StatCard from "../components/StatCard";

interface IStats {
  total: number;
  PENDING: number;
  ACCEPTED: number;
  REJECTED: number;
}

interface IApplication {
  _id: string;
  createdAt: Date;
  jobId: { title: string; company: string };
  userId: { name: string; email: string };
  status: string;
}

function JobSeekerDashboard() {
  const [applications, setApplications] = useState<IApplication[]>([]);
  const [filteredApps, setFilteredApps] = useState<IApplication[]>([]);
  const [stats, setStats] = useState<IStats | null>(null);

  const { isDarkMode, user } = useAuthStore();

  const getUserData = async () => {
    try {
      const response = await axiosApi.get(`/users/${user?.id}`);
      const { stats, applications } = response.data.data;
      setStats(stats);
      setApplications(applications);
      setFilteredApps(applications); // default all
    } catch (error) {
      toastError("Something went wrong");
    }
  };

  const handleFilter = (status: string) => {
    if (status === "ALL") {
      setFilteredApps(applications);
    } else {
      setFilteredApps(applications.filter((app) => app.status === status));
    }
  };

  const columns = [
    { header: "Job Title", accessorKey: "jobId.title" },
    { header: "Company", accessorKey: "jobId.company" },
    { header: "Applied Date", accessorKey: "createdAt" },
    { header: "Status", accessorKey: "status" },
  ];

  useEffect(() => {
    getUserData();
  }, []);

  if (!stats) return <CustomLoader />;

  return (
    <div
      className={`${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      } min-h-screen pt-20 px-4`}
    >
      <div className="max-w-7xl mx-auto space-y-12">
        <header>
          <h1 className="text-3xl font-bold mb-1">Job Seeker Dashboard</h1>
          <p className="text-gray-400 text-lg">Welcome back, {user?.name}</p>
        </header>

        <section className="grid md:grid-cols-4 gap-6">
          <StatCard
            title="Total Applications"
            value={stats.total}
            color="text-blue-600"
            isDarkMode={isDarkMode}
            onClick={() => handleFilter("ALL")}
          />
          <StatCard
            title="Accepted Applications"
            value={stats.ACCEPTED}
            color="text-green-600"
            isDarkMode={isDarkMode}
            onClick={() => handleFilter("ACCEPTED")}
          />
          <StatCard
            title="Pending Applications"
            value={stats.PENDING}
            color="text-yellow-600"
            isDarkMode={isDarkMode}
            onClick={() => handleFilter("PENDING")}
          />
          <StatCard
            title="Rejected Applications"
            value={stats.REJECTED}
            color="text-red-600"
            isDarkMode={isDarkMode}
            onClick={() => handleFilter("REJECTED")}
          />
        </section>

        <section
          className={`rounded-lg shadow-md ${
            isDarkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h2 className="text-xl font-semibold p-6 border-b">
            Application History
          </h2>
          <div className="overflow-x-auto">
            <CustomTable columns={columns} data={filteredApps} />
          </div>
        </section>
      </div>
    </div>
  );
}

export default JobSeekerDashboard;
