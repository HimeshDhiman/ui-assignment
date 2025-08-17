// src/components/data-table/dataTable.types.ts
export interface Column<T> {
  header: string;
  accessor: keyof T;
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
}
