import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";
import { useAuthStore } from "../store-zustand/useAuthStore";

interface TableProps<T> {
  columns: ColumnDef<T, any>[];
  data: T[];
  title?: string;
  addData?: () => void;
  buttonName?: string;
  renderActions?: (row: T) => React.ReactNode;
}

const CustomTable = <T,>({
  columns,
  data,
  title,
  addData,
  buttonName = "Add",
  renderActions,
}: TableProps<T>) => {
  const { isDarkMode } = useAuthStore();
  const allColumns: ColumnDef<T, any>[] = renderActions
    ? [
        ...columns,
        {
          id: "actions",
          header: "Actions",
          cell: ({ row }) => renderActions(row.original),
        },
      ]
    : columns;

  const table = useReactTable({
    data,
    columns: allColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div
      className={`p-6 border rounded-lg shadow-sm ${
        isDarkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-300"
      }`}
    >
      {/* Title + Action */}
      <div className="flex justify-between items-center mb-4">
        {title && (
          <h2
            className={`text-xl font-bold ${
              isDarkMode ? "text-gray-100" : "text-gray-800"
            }`}
          >
            {title}
          </h2>
        )}
        {addData && (
          <button
            onClick={addData}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            {buttonName}
          </button>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-sm">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className={`${
                  isDarkMode ? "bg-gray-800" : "bg-gray-100"
                } text-left`}
              >
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className={`px-4 py-2 font-semibold ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    } border-b ${
                      isDarkMode ? "dark:border-gray-600" : "border-gray-200"
                    }`}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className={`${
                    row.index % 2 === 0
                      ? isDarkMode
                        ? "bg-gray-900"
                        : "bg-white"
                      : isDarkMode
                      ? "bg-gray-800"
                      : "bg-gray-50"
                  } hover:${isDarkMode ? "bg-gray-700" : "bg-gray-100"}`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className={`px-4 py-2 ${
                        isDarkMode ? "text-gray-200" : "text-gray-700"
                      } border-b ${
                        isDarkMode ? "dark:border-gray-700" : "border-gray-200"
                      }`}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={allColumns.length}
                  className={`text-center ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  } py-4 font-semibold`}
                >
                  * No records found *
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomTable;
