import { Routes, Route, useNavigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import Layout from "../components/Layout";
import CustomLoader from "../components/customloader";
import { useAuthStore } from "../store-zustand/useAuthStore";
import IRoles from "../types/role.type";

const Home = lazy(() => import("../pages/Home"));
const Jobs = lazy(() => import("../pages/Jobs"));
const JobDetails = lazy(() => import("../pages/JobDetails"));
const EmployerDashboard = lazy(() => import("../pages/EmployerDashboard"));
const JobSeekerDashboard = lazy(() => import("../pages/JobSeekerDashboard"));
const LoginForm = lazy(() => import("../components/login"));
const RegisterForm = lazy(() => import("../components/RegisterForm"));
const AddJobs = lazy(() => import("../components/AddJob"));

const { EMPLOYER } = IRoles;

const AppRoutes = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const routes = [
    { path: "/", element: <Home /> },
    { path: "/jobs", element: <Jobs /> },
    { path: "/jobs/:id", element: <JobDetails /> },
    {
      path: "/dashboard",
      element:
        user?.role === EMPLOYER ? (
          <EmployerDashboard />
        ) : (
          <JobSeekerDashboard />
        ),
    },
    { path: "/jobseeker/dashboard", element: <JobSeekerDashboard /> },
    { path: "/login", element: <LoginForm /> },
    {
      path: "/register",
      element: <RegisterForm onClose={() => navigate("/login")} />,
    },
    { path: "/add-job", element: <AddJobs /> },
    { path: "/edit-job/:jobId", element: <AddJobs /> },
  ];

  return (
    <Suspense fallback={<CustomLoader />}>
      <Routes>
        {routes.map(({ path, element }) => (
          <Route key={path} path={path} element={<Layout>{element}</Layout>} />
        ))}
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
