import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = (props) => {
  const { columns, sortColumns, onSort, data } = props;

  return (
    <table className="table">
      <TableHeader
        columns={columns}
        sortColumn={sortColumns}
        onSort={onSort}
      ></TableHeader>

      <TableBody columns={columns} data={data} />
    </table>
  );
};

export default Table;
