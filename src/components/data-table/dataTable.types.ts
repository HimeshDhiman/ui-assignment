/**
 * A single column definition for DataTable.
 */
export interface Column {
  /** Column header label shown in table head */
  header: string;
  /** Key in row object used to read cell value */
  accessor: string;
}

/**
 * Props for the DataTable component.
 */
export interface DataTableProps {
  /** Visible columns of the table */
  columns: Column[];
  /** Array of row objects (string/number values are recommended) */
  data: Record<string, any>[];
}
