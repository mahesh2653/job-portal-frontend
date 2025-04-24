import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Eye, EyeOff } from "lucide-react";
import RegisterForm from "./RegisterForm";
import { ToastContainer } from "react-toastify";
import { toastError, toastInfo } from "../utils/toast";
import "react-toastify/dist/ReactToastify.css";
import axiosApi from "../utils/interceptor";
import axios from "axios";
import { loginSchema } from "../validator/auth";
import { useAuthStore } from "../store-zustand/useAuthStore";
import { useNavigate } from "react-router-dom";

const initialValues = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const { setToken, setUser } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (
    values: { email: string; password: string },
    {
      setSubmitting,
      resetForm,
    }: { setSubmitting: (isSubmitting: boolean) => void; resetForm: () => void }
  ) => {
    try {
      const response = await axiosApi.post(`/users/login`, values);
      toastInfo("Login successfully");
      console.log(response.data);
      setToken(response.data.data.token);
      setUser(response.data.data.user);

      setTimeout(() => {
        localStorage.setItem("Token", response.data.data.token);
        resetForm();
      }, 500);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toastError(error.response.data.message);
      }
      resetForm();
    } finally {
      setSubmitting(false);
    }
  };

  if (signUp) {
    return <RegisterForm onClose={() => setSignUp(false)} />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="w-full max-w-md p-8  rounded-2xl shadow-md border">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={loginSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium ">
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
                  className="text-sm text-red-500 mt-1"
                />
              </div>

              {/* Password */}
              <div className="relative">
                <label htmlFor="password" className="block text-sm font-medium">
                  Password
                </label>
                <Field
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="input"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute top-9 right-3 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-sm text-red-500 mt-1"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors duration-200 disabled:bg-blue-300"
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </button>
            </Form>
          )}
        </Formik>

        {/* Signup Link */}
        <p className="mt-4 text-sm text-center text-gray-600">
          Don&apos;t have an account?
          <span
            className="text-blue-500 hover:underline cursor-pointer ml-1"
            onClick={() => navigate("/register")}
          >
            Sign up
          </span>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginForm;
