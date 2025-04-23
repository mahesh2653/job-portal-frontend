import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

// Define initial values and validation schema for Formik
const jobSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  category: Yup.string().required("Category is required"),
  company: Yup.string().required("Company is required"),
  description: Yup.string().required("Description is required"),
  jobType: Yup.string().required("Job type is required"),
  location: Yup.string().required("Location is required"),
});

const initialValues = {
  title: "",
  category: "",
  company: "",
  description: "",
  jobType: "FULL_TIME", // Default value for jobType
  location: "",
};

const JobForm = ({ jobId }: { jobId?: string }) => {
  const [jobData, setJobData] = useState(null);

  // Fetch job data if editing
  useEffect(() => {
    if (jobId) {
      axios
        .get(`/api/jobs/${jobId}`)
        .then((response) => setJobData(response.data))
        .catch((err) => console.error("Error fetching job data:", err));
    }
  }, [jobId]);

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    try {
      if (jobId) {
        // Edit job
        await axios.put(`/api/jobs/${jobId}`, values);
        alert("Job updated successfully!");
      } else {
        // Add new job
        await axios.post("/api/jobs", values);
        alert("Job created successfully!");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-md shadow-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        {jobId ? "Edit Job" : "Add Job"}
      </h2>
      <Formik
        initialValues={jobData || initialValues}
        validationSchema={jobSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {({ isSubmitting }) => (
          <Form>
            {/* Title */}
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Job Title
              </label>
              <Field
                type="text"
                name="title"
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Job Title"
              />
              <ErrorMessage
                name="title"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Category */}
            <div className="mb-4">
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                Category
              </label>
              <Field
                type="text"
                name="category"
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Category"
              />
              <ErrorMessage
                name="category"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Company */}
            <div className="mb-4">
              <label
                htmlFor="company"
                className="block text-sm font-medium text-gray-700"
              >
                Company
              </label>
              <Field
                type="text"
                name="company"
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Company"
              />
              <ErrorMessage
                name="company"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Description */}
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Job Description
              </label>
              <Field
                as="textarea"
                name="description"
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Job Description"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Job Type */}
            <div className="mb-4">
              <label
                htmlFor="jobType"
                className="block text-sm font-medium text-gray-700"
              >
                Job Type
              </label>
              <Field
                as="select"
                name="jobType"
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="FULL_TIME">Full Time</option>
                <option value="PART_TIME">Part Time</option>
                <option value="CONTRACT">Contract</option>
                <option value="INTERN">Intern</option>
              </Field>
              <ErrorMessage
                name="jobType"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Location */}
            <div className="mb-4">
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700"
              >
                Location
              </label>
              <Field
                type="text"
                name="location"
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Location"
              />
              <ErrorMessage
                name="location"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Submit Button */}
            <div className="mb-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {isSubmitting
                  ? "Submitting..."
                  : jobId
                  ? "Update Job"
                  : "Add Job"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default JobForm;
