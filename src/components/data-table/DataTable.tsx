import React, { useState } from "react";
import { DataTableProps } from "./dataTable.types";

export const DataTable = <T extends Record<string, any>>({
  columns,
  data,
}: DataTableProps<T>) => {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T | null;
    direction: "asc" | "desc";
  }>({ key: null, direction: "asc" });

  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [loading] = useState(false);

  // Sorting logic
  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return data;
    const sorted = [...data].sort((a, b) => {
      const valA = a[sortConfig.key!];
      const valB = b[sortConfig.key!];
      if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
      if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [data, sortConfig]);

  // Sort toggle
  const handleSort = (key: keyof T) => {
    setSortConfig((prev) => {
      if (prev.key === key && prev.direction === "asc") {
        return { key, direction: "desc" };
      }
      return { key, direction: "asc" };
    });
  };

  // Row select
  const toggleRow = (idx: number) => {
    setSelectedRows((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  // Select all
  const toggleAll = () => {
    if (selectedRows.length === data.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(data.map((_, i) => i));
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-colors duration-500">
      <table className="min-w-full">
        <thead className="bg-gray-200 dark:bg-gray-700">
          <tr>
            <th className="py-2 px-4">
              <input
                type="checkbox"
                checked={selectedRows.length === data.length && data.length > 0}
                onChange={toggleAll}
              />
            </th>
            {columns.map((col) => (
              <th
                key={String(col.accessor)}
                className="py-2 px-4 text-left text-gray-700 dark:text-gray-200 cursor-pointer select-none"
                onClick={() => handleSort(col.accessor)}
              >
                {col.header}
                {sortConfig.key === col.accessor &&
                  (sortConfig.direction === "asc" ? " 🔼" : " 🔽")}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td colSpan={columns.length + 1} className="py-6 text-center">
                <span className="animate-spin inline-block w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full"></span>
                <p className="mt-2 text-gray-600 dark:text-gray-300">Loading...</p>
              </td>
            </tr>
          ) : sortedData.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + 1}
                className="py-6 text-center text-gray-500 dark:text-gray-400"
              >
                No data available
              </td>
            </tr>
          ) : (
            sortedData.map((row, idx) => (
              <tr
                key={idx}
                className={`border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors duration-300 ${
                  selectedRows.includes(idx) ? "bg-blue-100 dark:bg-blue-800" : ""
                }`}
              >
                <td className="py-2 px-4">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(idx)}
                    onChange={() => toggleRow(idx)}
                  />
                </td>
                {columns.map((col) => (
                  <td
                    key={String(col.accessor)}
                    className="py-2 px-4 text-gray-700 dark:text-gray-200"
                  >
                    {String(row[col.accessor])}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
