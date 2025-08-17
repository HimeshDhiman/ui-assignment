import React from "react";
import { DataTableProps } from "./dataTable.types";

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
}: DataTableProps<T>) {
  if (!columns?.length) {
    return (
      <div className="w-full max-w-2xl rounded-xl border border-gray-200 dark:border-gray-700 p-6 text-gray-600 dark:text-gray-300">
        No columns provided.
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto rounded-xl shadow-md">
      <table className="min-w-full bg-white dark:bg-gray-800 transition-colors duration-300">
        <thead className="bg-gray-100 dark:bg-gray-700">
          <tr>
            {columns.map((col) => (
              <th
                key={String(col.accessor)}
                className="py-3 px-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-200"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                className="py-6 px-4 text-center text-gray-500 dark:text-gray-400"
                colSpan={columns.length}
              >
                No data found.
              </td>
            </tr>
          ) : (
            data.map((row, idx) => (
              <tr
                key={idx}
                className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
              >
                {columns.map((col) => (
                  <td
                    key={String(col.accessor)}
                    className="py-3 px-4 text-sm text-gray-800 dark:text-gray-200"
                  >
                    {String(row[col.accessor] ?? "")}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
