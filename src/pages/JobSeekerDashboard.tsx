import { useEffect, useState } from "react";
import { useAuthStore } from "../store-zustand/useAuthStore";
import CustomTable from "../components/customTable";
import { toastError, toastInfo } from "../utils/toast";
import axiosApi from "../utils/interceptor";
import CustomLoader from "../components/customloader";
import StatCard from "../components/StatCard";
import IStats from "../types/dashboard";
import { IApplicationStatus } from "../types/jobs.type";
import JobApplicationModal from "../components/ApplicationModel";

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
  const [isOpen, setIsOpen] = useState(false);
  const [singleApplication, setSingelApplication] = useState<null | any>(null);

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
      setFilteredApps(filteredApps.filter((app) => app.status === status));
    }
  };

  const columns = [
    { header: "Job Title", accessorKey: "jobId.title" },
    { header: "Company", accessorKey: "jobId.company" },
    { header: "Message", accessorKey: "message" },
    {
      accessorKey: "createdAt",
      header: "Applied At",
      cell: ({ row }: any) => {
        const date = new Date(row.original.createdAt);
        return date.toDateString();
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }: any) => {
        const status = row.original.status;
        return (
          <div>
            <span
              className={`px-3 py-1 rounded-full text-sm ${
                status === IApplicationStatus.PENDING
                  ? "bg-yellow-100 text-yellow-800"
                  : status === IApplicationStatus.ACCEPTED
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {status}
            </span>
          </div>
        );
      },
    },
    {
      id: "select",
      header: () => <div>Actions</div>,
      cell: ({ row }: any) => (
        <div className="flex  gap-2">
          <button
            className="text-orange-500 underline cursor-pointer"
            onClick={() => {
              setSingelApplication(row.original);
              setIsOpen(true);
            }}
          >
            Edit
          </button>
          <button
            onClick={async () => {
              if (
                confirm("Are you sure you want to delete this Application?")
              ) {
                const response = await axiosApi.delete(
                  `/applications/${row.original._id}`
                );
                toastInfo(response.data.message);
                getUserData();
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

        {singleApplication && (
          <JobApplicationModal
            isOpen={isOpen}
            job={singleApplication.jobId}
            applicationId={singleApplication._id}
            onClose={() => {
              setIsOpen(false);
              getUserData();
            }}
            userData={singleApplication.userId}
            initialMessage={singleApplication.message}
            initialStatus={singleApplication.status}
          />
        )}
      </div>
    </div>
  );
}

export default JobSeekerDashboard;
