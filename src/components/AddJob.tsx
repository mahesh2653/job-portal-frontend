import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import jobSchema from "../validator/jobs";
import axiosApi from "../utils/interceptor";
import { ICategory, IJobType } from "../types/jobs.type";
import { useAuthStore } from "../store-zustand/useAuthStore";
import { toastError, toastInfo, toastSuccess } from "../utils/toast";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import CustomLoader from "./customloader";

const initialValues = {
  title: "",
  category: ICategory.ENGINEERING,
  company: "",
  description: "",
  jobType: IJobType.FULL_TIME,
  location: "",
  salary: { from: "", to: "" },
  companyInfo: "",
};

const JobForm = () => {
  const [jobData, setJobData] = useState(null);
  const { jobId } = useParams();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (jobId) {
      axiosApi
        .get(`/jobs/${jobId}`)
        .then((response) => {
          setJobData(response.data.data);
        })
        .catch((err) => console.error("Error fetching job data:", err));
    }
  }, [jobId]);

  const handleSubmit = async (
    values: any,
    {
      setSubmitting,
      resetForm,
    }: { setSubmitting: (isSubmitting: boolean) => void; resetForm: () => void }
  ) => {
    try {
      if (jobId) {
        await axiosApi.put(`/jobs/${jobId}`, { ...values, postedBy: user?.id });
        toastInfo("Job updated successfully!");
      } else {
        await axiosApi.post("/jobs", { ...values, postedBy: user?.id });
        toastSuccess("Job created successfully!");
      }
      resetForm();
      navigate(-1);
    } catch (error) {
      toastError("Error submitting form.");
    } finally {
      setSubmitting(false);
    }
  };
  if (jobId && !jobData) {
    return <CustomLoader />;
  }
  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12">
      <div className="w-full max-w-4xl p-6 rounded-xl shadow-xl">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-800 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Jobs
        </button>
        <h2 className="text-2xl font-bold text-center underline mb-6">
          {jobId ? "Edit Job" : "Add Job"}
        </h2>
        <Formik
          initialValues={jobData || initialValues}
          validationSchema={jobSchema}
          onSubmit={handleSubmit}
          enableReinitialize={true}
        >
          {({ isSubmitting }) => (
            <Form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium ">
                  Job Title
                </label>
                <Field
                  type="text"
                  name="title"
                  placeholder="Job Title"
                  className="input"
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              {/* Category */}
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium "
                >
                  Category
                </label>
                <Field as="select" name="category" className="input">
                  {Object.values(ICategory).map((category, idx) => (
                    <option value={category} key={idx}>
                      {category}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="category"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium ">
                  Company
                </label>
                <Field
                  type="text"
                  name="company"
                  placeholder="Company"
                  className="input"
                />
                <ErrorMessage
                  name="company"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium "
                >
                  Location
                </label>
                <Field
                  type="text"
                  name="location"
                  placeholder="Location"
                  className="input"
                />
                <ErrorMessage
                  name="location"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="salary.from"
                    className="block text-sm font-medium "
                  >
                    Salary From
                  </label>
                  <Field
                    type="text"
                    name="salary.from"
                    placeholder="Enter minimum salary"
                    className="input"
                  />
                  <ErrorMessage
                    name="salary.from"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <label
                    htmlFor="salary.to"
                    className="block text-sm font-medium "
                  >
                    Salary To
                  </label>
                  <Field
                    type="text"
                    name="salary.to"
                    placeholder="Enter maximum salary"
                    className="input"
                  />
                  <ErrorMessage
                    name="salary.to"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="jobType" className="block text-sm font-medium ">
                  Job Type
                </label>
                <Field as="select" name="jobType" className="input">
                  {Object.values(IJobType).map((type, idx) => (
                    <option value={type} key={idx}>
                      {type}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="jobType"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="md:col-span-2">
                <label
                  htmlFor="companyInfo"
                  className="block text-sm font-medium "
                >
                  Company Description
                </label>
                <Field
                  as="textarea"
                  name="companyInfo"
                  placeholder="Company information "
                  className="input"
                  rows={4}
                />
                <ErrorMessage
                  name="companyInfo"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div className="md:col-span-2">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium "
                >
                  Job Description
                </label>
                <Field
                  as="textarea"
                  name="description"
                  placeholder="Job Description"
                  className="input"
                  rows={4}
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div className="md:col-span-2">
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
    </div>
  );
};

export default JobForm;
