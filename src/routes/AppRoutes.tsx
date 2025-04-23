import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Layout from "../components/Layout";

const Home = lazy(() => import("../pages/Home"));
const Jobs = lazy(() => import("../pages/Jobs"));
const JobDetails = lazy(() => import("../pages/JobDetails"));
const EmployerDashboard = lazy(() => import("../pages/EmployerDashboard"));
const JobSeekerDashboard = lazy(() => import("../pages/JobSeekerDashboard"));
const LoginForm = lazy(() => import("../components/login"));
const RegisterForm = lazy(() => import("../components/RegisterForm"));

const AppRoutes = () => (
  <Suspense fallback={<p className="text-center">Loading...</p>}>
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />
      <Route
        path="/jobs"
        element={
          <Layout>
            <Jobs />
          </Layout>
        }
      />
      <Route
        path="/jobs/:id"
        element={
          <Layout>
            <JobDetails />
          </Layout>
        }
      />
      <Route
        path="/employer/dashboard"
        element={
          <Layout>
            <EmployerDashboard />
          </Layout>
        }
      />
      <Route
        path="/jobseeker/dashboard"
        element={
          <Layout>
            <JobSeekerDashboard />
          </Layout>
        }
      />
      <Route
        path="/login"
        element={
          <Layout>
            <LoginForm />
          </Layout>
        }
      />
      <Route
        path="/register"
        element={
          <Layout>
            <RegisterForm onClose={() => console.log("Mahesh clicked close")} />
          </Layout>
        }
      />
    </Routes>
  </Suspense>
);

export default AppRoutes;
