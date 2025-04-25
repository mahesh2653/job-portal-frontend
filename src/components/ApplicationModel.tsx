"use client";
import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toastError, toastInfo } from "../utils/toast";
import { useAuthStore } from "../store-zustand/useAuthStore";
import axiosApi from "../utils/interceptor";
import IRoles from "../types/role.type";

const applicationSchema = Yup.object().shape({
  message: Yup.string()
    .min(10, "Message must be at least 10 characters")
    .required("Message is required"),
  status: Yup.string().required("Status is required"),
});

interface Job {
  _id: string;
  title: string;
  company: string;
}

interface IUser {
  _id: string;
  name: string;
  email: string;
}

interface JobApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: Job;
  applicationId?: string;
  initialMessage?: string;
  initialStatus?: string;
  userData?: IUser;
}

const JobApplicationModal: React.FC<JobApplicationModalProps> = ({
  isOpen,
  onClose,
  job,
  applicationId,
  initialMessage = "",
  initialStatus = "PENDING",
  userData,
}) => {
  const { user } = useAuthStore();

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const handleSubmit = async (
    values: { message: string; status: string },
    { setSubmitting }: { setSubmitting: (val: boolean) => void }
  ) => {
    try {
      const payload = {
        ...values,
        userId: userData?._id,
        jobId: job._id,
      };

      const response = applicationId
        ? await axiosApi.put(`/applications/${applicationId}`, payload)
        : await axiosApi.post(`/applications`, payload);

      toastInfo(response.data.message);
      setTimeout(() => onClose(), 500);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toastError(error.response.data.message);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur z-50">
          <div className="w-full max-w-lg p-6  rounded-lg shadow-2xl">
            <h2 className="text-xl font-bold text-center  mb-4">
              {applicationId ? "Update Application" : "Apply for Job"}
            </h2>
            <Formik
              initialValues={{ message: initialMessage, status: initialStatus }}
              validationSchema={applicationSchema}
              onSubmit={handleSubmit}
              enableReinitialize
            >
              {({ isSubmitting }) => (
                <Form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium ">
                      User Name
                    </label>
                    <input
                      type="text"
                      value={userData?.name || ""}
                      disabled
                      className="input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium ">
                      User Email
                    </label>
                    <input
                      type="email"
                      value={userData?.email || ""}
                      disabled
                      className="input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium ">
                      Job Title
                    </label>
                    <input
                      type="text"
                      value={job?.title}
                      disabled
                      className="input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium ">
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={job?.company}
                      // readOnly
                      disabled
                      className="input"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="status"
                      className="block text-sm font-medium "
                    >
                      Status
                    </label>
                    <Field
                      as="select"
                      name="status"
                      className="input"
                      disabled={user?.role === IRoles.JOB_SEEKER}
                    >
                      <option value="PENDING">PENDING</option>
                      <option value="ACCEPTED">ACCEPTED</option>
                      <option value="REJECTED">REJECTED</option>
                    </Field>
                    <ErrorMessage
                      name="status"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium "
                    >
                      Message
                    </label>
                    <Field
                      as="textarea"
                      name="message"
                      rows={4}
                      placeholder="Write your message to the employer..."
                      className="input"
                      disabled={user?.role === IRoles.EMPLOYER}
                    />
                    <ErrorMessage
                      name="message"
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
                        : applicationId
                        ? "Update Application"
                        : "Apply"}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </>
  );
};

export default JobApplicationModal;
