import { Link } from "react-router-dom";
import { Briefcase, Search, Building2 } from "lucide-react";
import { useStore } from "../store-zustand";

function Home() {
  const isDarkMode = useStore((state) => state.isDarkMode);

  return (
    <div
      className={`min-h-screen mt-10 py-16 px-4 md:px-8 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          Find Your Dream Job Today
        </h1>
        <p className="text-lg md:text-xl mb-10 text-gray-400">
          Connect with top employers and land your ideal role in seconds.
        </p>

        <div className="flex justify-center gap-6 flex-wrap">
          <Link
            to="/jobs"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg shadow transition"
          >
            Browse Jobs
          </Link>
          <Link
            to="/register"
            className="bg-gray-700 hover:bg-gray-800 text-white font-medium px-6 py-3 rounded-lg shadow transition"
          >
            Post a Job
          </Link>
        </div>
      </div>

      <div className="mt-20 grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        <FeatureCard
          icon={<Search className="w-10 h-10 text-blue-500" />}
          title="Search Jobs"
          text="Explore thousands of job listings from trusted employers."
          dark={isDarkMode}
        />
        <FeatureCard
          icon={<Briefcase className="w-10 h-10 text-blue-500" />}
          title="Easy Apply"
          text="Apply in just a few clicks using your online resume."
          dark={isDarkMode}
        />
        <FeatureCard
          icon={<Building2 className="w-10 h-10 text-blue-500" />}
          title="Company Profiles"
          text="Learn about work culture, benefits, and teams before you apply."
          dark={isDarkMode}
        />
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, text, dark }: any) {
  return (
    <div
      className={`p-6 rounded-xl shadow-lg transition ${
        dark ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800"
      }`}
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400">{text}</p>
    </div>
  );
}

export default Home;
