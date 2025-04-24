import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { toastError, toastInfo } from "../utils/toast";
import { ToastContainer } from "react-toastify";
import registerSchema from "../validator/auth";
import backendURL from "../constant/const";
import axiosApi from "../utils/interceptor";
import IRoles from "../types/role.type";

const initialValues = {
  name: "",
  email: "",
  mobileNo: "",
  password: "",
  confirmPassword: "",
  role: "",
  profile: "",
};

interface RegisterFormValues {
  onClose: () => void;
}

const RegisterForm: React.FC<RegisterFormValues> = ({ onClose }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (
    values: typeof initialValues,
    { setSubmitting, resetForm }: FormikHelpers<typeof initialValues>
  ) => {
    try {
      const { confirmPassword, ...rest } = values;
      const response = await axiosApi.post(`/users/register`, {
        ...rest,
      });

      toastInfo(response.data.message);
      setTimeout(() => {
        resetForm();
        onClose();
      }, 500);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toastError(error.response.data.message);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen  px-4">
      <div className="w-full max-w-2xl p-8 rounded-xl shadow-xl  border">
        <h2 className="text-3xl font-bold text-center mb-8">Create Account</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={registerSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium">
                    Full Name
                  </label>
                  <Field
                    type="text"
                    name="name"
                    className="input"
                    placeholder="Enter your name"
                  />
                  <ErrorMessage name="name" component="div" className="error" />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium">
                    Email
                  </label>
                  <Field
                    type="email"
                    name="email"
                    className="input"
                    placeholder="Enter your email"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="error"
                  />
                </div>

                <div>
                  <label
                    htmlFor="mobileNo"
                    className="block text-sm font-medium"
                  >
                    Phone Number
                  </label>
                  <Field
                    type="text"
                    name="mobileNo"
                    className="input"
                    placeholder="Enter your phone number"
                  />
                  <ErrorMessage
                    name="mobileNo"
                    component="div"
                    className="error"
                  />
                </div>

                <div>
                  <label
                    htmlFor="profile"
                    className="block text-sm font-medium"
                  >
                    Profile
                  </label>
                  <Field
                    type="text"
                    name="profile"
                    className="input"
                    placeholder="Enter your profile."
                  />
                  <ErrorMessage
                    name="profile"
                    component="div"
                    className="error"
                  />
                </div>

                <div className="relative">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium"
                  >
                    Password
                  </label>
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="input"
                    placeholder="Enter password"
                  />
                  <button
                    type="button"
                    className="eye-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="error"
                  />
                </div>

                <div className="relative">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium"
                  >
                    Confirm Password
                  </label>
                  <Field
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    className="input"
                    placeholder="Confirm password"
                  />
                  <button
                    type="button"
                    className="eye-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="error"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">Role</label>
                  <div className="flex gap-6 mt-2">
                    <label className="flex items-center gap-2">
                      <Field type="radio" name="role" value={IRoles.EMPLOYER} />
                      Job Hiring
                    </label>
                    <label className="flex items-center gap-2">
                      <Field
                        type="radio"
                        name="role"
                        value={IRoles.JOB_SEEKER}
                      />
                      Job Seeker
                    </label>
                  </div>
                  <ErrorMessage name="role" component="div" className="error" />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
              >
                {isSubmitting ? "Signing Up..." : "Sign Up"}
              </button>

              <p className="text-center text-sm text-gray-500 mt-4">
                Already have an account?{" "}
                <a
                  onClick={onClose}
                  className="text-blue-600 font-medium cursor-pointer hover:underline"
                >
                  Login
                </a>
              </p>
            </Form>
          )}
        </Formik>
        <ToastContainer />
      </div>
    </div>
  );
};

export default RegisterForm;
