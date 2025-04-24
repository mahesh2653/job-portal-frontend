// import { Search } from "lucide-react";
// import { ICategory } from "../types/jobs.type";
// import { useNavigate } from "react-router-dom";
// import { useAuthStore } from "../store-zustand/useAuthStore";
// import React from "react";
// import IRoles from "../types/role.type";

// interface IProps {
//   category: string;
//   setSearchTerm: (value: string) => void;
//   setPage: (value: number) => void;
//   setCategory: (value: string) => void;
// }

// const Head: React.FC<IProps> = ({
//   setCategory,
//   setPage,
//   setSearchTerm,
//   category,
// }) => {
//   const navigate = useNavigate();
//   const { isDarkMode, user } = useAuthStore();
//   return (
//     <>
//       <div className="sticky top-0 z-10 bg-inherit p-6 border-b border-gray-300 shadow-md">
//         <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
//           <h1 className="text-2xl font-bold">Find Your Next Opportunity</h1>
//           <button
//             onClick={() => navigate("/add-job")}
//             className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//           >
//             Add Job
//           </button>
//         </div>

//         <div className="flex flex-col md:flex-row gap-4">
//           <div className="flex-1">
//             <div
//               className={`flex items-center ${
//                 isDarkMode ? "bg-gray-800" : "bg-white"
//               } rounded-lg p-2 shadow-sm`}
//             >
//               <Search className="w-5 h-5 text-gray-400 mr-2" />
//               <input
//                 type="text"
//                 placeholder="Search jobs..."
//                 value={searchTerm}
//                 onChange={(e) => {
//                   setSearchTerm(e.target.value);
//                   setPage(1); // Reset page on new search
//                 }}
//                 className={`w-full bg-transparent focus:outline-none ${
//                   isDarkMode ? "text-white" : "text-gray-900"
//                 }`}
//               />
//             </div>
//           </div>

//           <select
//             value={category}
//             onChange={(e) => {
//               setCategory(e.target.value);
//               setPage(1); // Reset page on filter
//             }}
//             className={`p-2 rounded-lg shadow-sm ${
//               isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
//             }`}
//           >
//             <option value="">All Categories</option>
//             {Object.values(ICategory).map((category, idx) => (
//               <option key={idx} value={category}>
//                 {category}
//               </option>
//             ))}
//           </select>
//           {user?.role === IRoles.EMPLOYER && (
//             <button
//               onClick={() => navigate("/add-job")}
//               className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//             >
//               Add Job
//             </button>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };
