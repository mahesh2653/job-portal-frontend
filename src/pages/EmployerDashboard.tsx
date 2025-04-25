import { useAuthStore } from "../store-zustand/useAuthStore";
import { useEffect, useState } from "react";
import { toastError } from "../utils/toast";
import axiosApi from "../utils/interceptor";
import StatCard from "../components/StatCard";
import IStats from "../types/dashboard";
import CustomLoader from "../components/customloader";
import CustomTable from "../components/customTable";
import { IApplicationStatus } from "../types/jobs.type";
import JobApplicationModal from "../components/ApplicationModel";
import { useNavigate } from "react-router-dom";

const EmployerDashboard = () => {
  const { isDarkMode, user } = useAuthStore();
  const [stats, setStats] = useState<null | IStats>(null);
  const [applications, setApplication] = useState([]);
  const [singleApplication, setSingelApplication] = useState<null | any>(null);

  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const columns = [
    { header: "Name", accessorKey: "applicant.name" },
    { header: "Position", accessorKey: "job.title" },
    { header: "Message", accessorKey: "message" },

    { header: "Company", accessorKey: "job.company" },
    {
      accessorKey: "createdAt",
      header: "Created At",
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
            onClick={() => {
              setSingelApplication(row.original);
              setIsOpen(true);
            }}
            className="text-orange-500 underline cursor-pointer"
          >
            Edit
          </button>
        </div>
      ),
    },
  ];

  const getDataByEmpId = async () => {
    try {
      const response = await axiosApi.get(`/jobs/employer/${user?.id}`);
      console.log(response.data.data);

      setStats({
        total: response.data.data.total,
        ...response.data.data.stats,
      });
      setApplication(response.data.data.applications);
    } catch (error) {
      toastError("Something went wrong");
    }
  };

  useEffect(() => {
    getDataByEmpId();
  }, []);

  if (!stats) {
    return <CustomLoader />;
  }
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

        <section className="grid md:grid-cols-4 gap-6">
          <StatCard
            title="Total Applications"
            value={stats.PENDING + stats.ACCEPTED + stats.REJECTED}
            color="text-green-600"
            isDarkMode={isDarkMode}
            onClick={() => console.log("Total Applications clicked")}
          />
          <StatCard
            title="Accepted Application"
            value={stats.ACCEPTED}
            color="text-purple-600"
            isDarkMode={isDarkMode}
            onClick={() => console.log("Hired clicked")}
          />
          <StatCard
            title="Pending Application"
            value={stats.PENDING}
            color="text-yellow-600"
            isDarkMode={isDarkMode}
            onClick={() => console.log("Pending clicked")}
          />
          <StatCard
            title="Rejected Application"
            value={stats.REJECTED}
            color="text-red-600"
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
            Application History
          </h2>
          <div className="overflow-x-auto">
            <CustomTable columns={columns} data={applications} />
          </div>
        </section>
        {singleApplication && (
          <JobApplicationModal
            isOpen={isOpen}
            job={singleApplication.job}
            applicationId={singleApplication._id}
            onClose={() => {
              setIsOpen(false);
              getDataByEmpId();
            }}
            userData={singleApplication.applicant}
            initialMessage={singleApplication.message}
            initialStatus={singleApplication.status}
          />
        )}
      </div>
    </div>
  );
};

export default EmployerDashboard;
