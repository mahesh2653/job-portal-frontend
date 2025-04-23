import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { MapPin, Building2, Clock, Send, ArrowLeft } from "lucide-react";
import { useStore } from "../store-zustand";
import { dummyJobs } from "../data";

function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isDarkMode = useStore((state) => state.isDarkMode);
  const currentUser = useStore((state) => state.currentUser);

  const job = dummyJobs.find((j) => j.id === id);

  if (!job) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-2xl font-bold text-red-500">Job not found</h1>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen px-6 py-10 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-800 transition"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Jobs
      </button>

      {/* Job Header Card */}
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
                {job.type}
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
              {job.salary}
            </div>
            <div className="flex items-center text-gray-500 justify-end text-sm">
              <Clock className="w-4 h-4 mr-1" />
              Posted {job.postedDate}
            </div>
          </div>
        </div>

        {currentUser?.role === "jobseeker" && (
          <button className="mt-6 bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 w-full md:w-auto">
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

            <h3 className="text-xl font-bold mb-3">Requirements</h3>
            <ul className="list-disc pl-6 space-y-2">
              {job.requirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
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
            <p className="text-gray-500">
              Leading technology company specializing in innovative solutions
              for the digital world. Passionate about growth, culture, and
              impact.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobDetails;
