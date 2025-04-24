import { useParams, useNavigate } from "react-router-dom";
import { MapPin, Building2, Clock, Send, ArrowLeft } from "lucide-react";
import { useAuthStore } from "../store-zustand/useAuthStore";
import IRoles from "../types/role.type";
import { useEffect, useState } from "react";
import { toastError } from "../utils/toast";
import axiosApi from "../utils/interceptor";
import { IApplicationStatus } from "../types/jobs.type";
import CustomLoader from "../components/customloader";
import JobApplicationModal from "../components/ApplicationModel";

function JobDetails() {
  const [job, setJob] = useState<any>();
  const [isOpen, setIsOpen] = useState(false);
  const { isDarkMode, user } = useAuthStore();
  const { id } = useParams();
  const navigate = useNavigate();
  const getDataByJobId = async () => {
    try {
      const response = await axiosApi.get(`/jobs/${id}`);
      console.log(response.data.data);
      setJob(response.data.data);
    } catch (error) {
      toastError("Something went wrong");
    }
  };

  const handelApply = async (data: any) => {
    try {
      const response = await axiosApi.post("/application", data);
      console.log(response.data);
    } catch (error) {
      toastError("Something went wrong");
    }
  };

  useEffect(() => {
    getDataByJobId();
  }, []);

  if (!job) {
    return <CustomLoader />;
  }
  return (
    <div
      className={`min-h-screen px-6 py-10 pt-[80px] ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-800 transition"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Jobs
      </button>

      <div
        className={`rounded-lg shadow-md p-8 mb-10 ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div className="flex justify-between flex-col md:flex-row gap-6">
          <div>
            <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
            <div className="flex items-center text-gray-500 mb-4 text-sm flex-wrap gap-4">
              <div className="flex items-center gap-1">
                <Building2 className="w-4 h-4" />
                {job.company}
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {job.location}
              </div>
            </div>
            <div className="flex flex-wrap gap-3 mt-2">
              <span
                className={`px-3 py-1 text-sm rounded-full ${
                  isDarkMode ? "bg-gray-700" : "bg-gray-200"
                }`}
              >
                {job.jobType}
              </span>
              <span
                className={`px-3 py-1 text-sm rounded-full ${
                  isDarkMode ? "bg-gray-700" : "bg-gray-200"
                }`}
              >
                {job.category}
              </span>
            </div>
          </div>

          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600 mb-2">
              {job.salary.from} - {job.salary.to}
            </div>
            <div className="flex items-center text-gray-500 justify-end text-sm">
              <Clock className="w-4 h-4 mr-1" />
              Posted {job.createdAt}
            </div>
          </div>
        </div>

        {user?.role === IRoles.JOB_SEEKER && (
          <button
            className="mt-6 bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 w-full md:w-auto"
            onClick={() => {
              console.log("applyed successfully");
              setIsOpen(true);
              // handelApply({
              //   jobId: id,
              //   userId: user.id,
              //   status: IApplicationStatus.PENDING,
              // });
            }}
          >
            <Send className="w-5 h-5" />
            Apply Now
          </button>
        )}
      </div>

      {/* Job Details Section */}
      <div className="grid md:grid-cols-3 gap-8">
        {/* Description */}
        <div className="md:col-span-2">
          <div
            className={`rounded-lg shadow-md p-8 mb-8 ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <h2 className="text-2xl font-bold mb-4">Job Description</h2>
            <p className="whitespace-pre-line mb-6">{job.description}</p>
          </div>
        </div>

        {/* Company Info */}
        <div>
          <div
            className={`rounded-lg shadow-md p-8 ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <h2 className="text-xl font-bold mb-4">Company Overview</h2>
            <div className="flex items-center mb-4">
              <Building2 className="w-12 h-12 text-blue-600 mr-4" />
              <div>
                <h3 className="font-semibold">{job.company}</h3>
                <p className="text-gray-500">{job.location}</p>
              </div>
            </div>
            <p className="text-gray-500">{job.companyInfo}</p>
          </div>
          <JobApplicationModal
            job={job}
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
          />
        </div>
      </div>
    </div>
  );
}

export default JobDetails;
