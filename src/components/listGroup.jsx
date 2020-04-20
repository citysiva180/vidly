import React from "react";

const ListGroup = (props) => {
  const { items, textProperty, valueProperty } = props;

  return (
    <ul className="list-group">
      {items.map((items) => (
        <li key={items[valueProperty]} className="list-group-item">
          {items[textProperty]}
        </li>
      ))}
    </ul>
  );
};

export default ListGroup;
