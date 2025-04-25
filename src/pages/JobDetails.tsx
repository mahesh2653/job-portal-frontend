import { useParams, useNavigate } from "react-router-dom";
import { MapPin, Building2, Clock, Send, ArrowLeft } from "lucide-react";
import { useAuthStore } from "../store-zustand/useAuthStore";
import IRoles from "../types/role.type";
import { useEffect, useState } from "react";
import { toastError } from "../utils/toast";
import axiosApi from "../utils/interceptor";
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
      setJob(response.data.data);
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

  const containerClass = isDarkMode
    ? "bg-gray-900 text-white"
    : "bg-gray-100 text-gray-900";
  const cardClass = isDarkMode ? "bg-gray-800" : "bg-white";
  const badgeClass = isDarkMode ? "bg-gray-700" : "bg-gray-200";
  const textMutedClass = isDarkMode ? "text-gray-400" : "text-gray-500";

  return (
    <div className={`min-h-screen px-6 py-10 pt-[80px] ${containerClass}`}>
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-800 transition"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Jobs
      </button>

      {/* Job Header Card */}
      <div className={`rounded-lg shadow-md p-8 mb-10 ${cardClass}`}>
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
            <div
              className={`flex items-center gap-4 flex-wrap ${textMutedClass} text-sm mb-4`}
            >
              <div className="flex items-center gap-1">
                <Building2 className="w-4 h-4" />
                {job.company}
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {job.location}
              </div>
            </div>
            <div className="flex gap-3">
              <span className={`px-3 py-1 text-sm rounded-full ${badgeClass}`}>
                {job.jobType}
              </span>
              <span className={`px-3 py-1 text-sm rounded-full ${badgeClass}`}>
                {job.category}
              </span>
            </div>
          </div>

          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600 mb-2">
              {job.salary.from} - {job.salary.to}
            </div>
            <div
              className={`flex items-center justify-end text-sm ${textMutedClass}`}
            >
              <Clock className="w-4 h-4 mr-1" />
              Posted {job.createdAt || "recently"}
            </div>
          </div>
        </div>

        {user?.role === IRoles.JOB_SEEKER && (
          <div className="mt-6">
            {!job.applied ? (
              <button
                className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 w-full md:w-auto"
                onClick={() => setIsOpen(true)}
              >
                <Send className="w-5 h-5" />
                Apply Now
              </button>
            ) : (
              <button
                disabled
                className="bg-gray-400 text-white px-6 py-3 rounded-lg w-full md:w-auto cursor-not-allowed"
              >
                Already Applied
              </button>
            )}
          </div>
        )}
      </div>

      {/* Main Job Content */}
      <div className="grid md:grid-cols-3 gap-8">
        {/* Description Section */}
        <div className="md:col-span-2">
          <div className={`rounded-lg shadow-md p-8 mb-8 ${cardClass}`}>
            <h2 className="text-2xl font-bold mb-4">Job Description</h2>
            <p className="whitespace-pre-line leading-relaxed">
              {job.description}
            </p>
          </div>
        </div>

        {/* Company Info Section */}
        <div>
          <div className={`rounded-lg shadow-md p-8 ${cardClass}`}>
            <h2 className="text-xl font-bold mb-4">Company Overview</h2>
            <div className="flex items-center mb-4">
              <Building2 className="w-12 h-12 text-blue-600 mr-4" />
              <div>
                <h3 className="font-semibold">{job.company}</h3>
                <p className={textMutedClass}>{job.location}</p>
              </div>
            </div>
            <p className={textMutedClass}>{job.companyInfo}</p>
          </div>
        </div>
      </div>

      {/* Application Modal */}
      <JobApplicationModal
        job={job}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        userData={{
          name: user?.name as string,
          _id: user?.id as string,
          email: user?.email as string,
        }}
      />
    </div>
  );
}

export default JobDetails;
