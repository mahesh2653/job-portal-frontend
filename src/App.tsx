import Navbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";
import { useAuthStore } from "./store-zustand/useAuthStore";

function App() {
  const { isDarkMode } = useAuthStore();
  return (
    <>
      <div
        className={` ${
          isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        }`}
      >
        <Navbar />
        <AppRoutes />
      </div>
    </>
  );
}

export default App;
