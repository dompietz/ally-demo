import React from 'react';
import './TableWidget.css';

const rows = [
  { id: 1, name: 'Item A', status: 'Active' },
  { id: 2, name: 'Item B', status: 'Inactive' },
  { id: 3, name: 'Item C', status: 'Pending' },
];

const TableWidget: React.FC = () => {
  return (
    <table className="data-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.id}>
            <td>{row.id}</td>
            <td>{row.name}</td>
            <td>{row.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableWidget;
