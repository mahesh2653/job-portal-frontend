// components/StatCard.tsx

import React from "react";

interface StatCardProps {
  title: string;
  value: number;
  color: string;
  isDarkMode: boolean;
  onClick?: () => void;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  color,
  isDarkMode,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`p-6 rounded-lg shadow-md cursor-pointer transition-transform hover:scale-105 ${
        isDarkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <h3 className="text-md font-semibold mb-2">{title}</h3>
      <p className={`text-3xl font-bold ${color}`}>{value}</p>
    </div>
  );
};

export default StatCard;
