import type { Meta, StoryObj } from "@storybook/react";
import { DataTable } from "./DataTable";
import { DataTableProps } from "./dataTable.types";

interface RowData {
  email: string;
  password: string;
}

const columns: DataTableProps<RowData>["columns"] = [
  { header: "Email", accessor: "email" },
  { header: "Password", accessor: "password" },
];

const meta: Meta<typeof DataTable<RowData>> = {
  title: "Components/DataTable",
  component: DataTable<RowData>,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DataTable<RowData>>;

export const Default: Story = {
  args: {
    columns,
    data: [
      { email: "himesh@example.com", password: "123456" },
      { email: "garv@example.com", password: "abcdef" },
    ],
  },
};

export const Empty: Story = {
  args: {
    columns,
    data: [],
  },
};

export const LargeData: Story = {
  args: {
    columns,
    data: Array.from({ length: 10 }).map((_, i) => ({
      email: `user${i + 1}@example.com`,
      password: `pass${i + 1}`,
    })),
  },
};

export const Loading: Story = {
  args: {
    columns,
    data: [],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Simulate loading by editing DataTable component's `loading` state manually.",
      },
    },
  },
};
