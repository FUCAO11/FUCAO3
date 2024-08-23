import React from 'react';
import { Table } from 'react-bootstrap';

function CarTable({ cars }) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Brand</th>
          <th>Model</th>
          <th>Quantity</th>
          <th>Unit Price (Baht)</th> {/* 更新列名 */}
        </tr>
      </thead>
      <tbody>
        {cars.map((car, index) => (
          <tr key={index}>
            <td>{car.brand}</td>
            <td>{car.model}</td>
            <td>{car.quantity}</td>
            <td>{car.value}</td> {/* 显示单价 */}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default CarTable;


