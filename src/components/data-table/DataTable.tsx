// src/components/data-table/DataTable.tsx
import React from "react";
import { DataTableProps } from "./dataTable.types";

export const DataTable = <T extends object>({ columns, data }: DataTableProps<T>) => {
  return (
    <table className="min-w-full bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md transition-colors duration-500">
      <thead className="bg-gray-200 dark:bg-gray-700">
        <tr>
          {columns.map((col) => (
            <th
              key={String(col.accessor)}
              className="py-2 px-4 text-left text-gray-700 dark:text-gray-200"
            >
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr
            key={idx}
            className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors duration-300"
          >
            {columns.map((col) => (
              <td
                key={String(col.accessor)}
                className="py-2 px-4 text-gray-700 dark:text-gray-200"
              >
                {String(row[col.accessor])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
