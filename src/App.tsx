import { useState } from "react";
import { InputField } from "./components/input-field/InputField";
import { DataTable } from "./components/data-table/DataTable";
import { DataTableProps } from "./components/data-table/dataTable.types";

interface RowData {
  email: string;
  password: string;
}

const App: React.FC = () => {
  const columns: DataTableProps<RowData>["columns"] = [
    { header: "Email", accessor: "email" },
    { header: "Password", accessor: "password" },
  ];

  const [data, setData] = useState<RowData[]>([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); 
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      alert("⚠️ Please fill all fields");
      return;
    }
    setData([...data, { email, password }]);
    setEmail("");
    setPassword("");
  };

  const filteredData = data.filter(
    (row) =>
      row.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.password.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-500 p-4">
      <h1 className="text-3xl font-bold text-blue-900 dark:text-blue-400 mb-6">
        Form Project
      </h1>

      <button
        onClick={toggleTheme}
        className="mb-6 px-4 py-2 rounded-xl shadow-md font-semibold
                  bg-gradient-to-r from-blue-600 to-indigo-700 text-white
                  hover:scale-105 transform transition-all duration-300
                  dark:from-yellow-400 dark:to-orange-500"
      >
        {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
      </button>

      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-md transition-colors duration-500"
      >
        <InputField
          label="Email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <InputField
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="mt-4 w-full py-2 rounded-lg font-semibold
                     bg-blue-900 hover:bg-blue-700 text-white
                     transition-all duration-300"
        >
          Add User
        </button>
      </form>

      <div className="mt-6 w-full max-w-md">
        <input
          type="text"
          placeholder="🔍 Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
      </div>

      <div className="mt-8 w-full max-w-2xl">
        <DataTable<RowData> columns={columns} data={filteredData} />
      </div>
    </div>
  );
};

export default App;
