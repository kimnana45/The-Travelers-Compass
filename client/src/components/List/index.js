import React from "react";
import "./style.css";

export function List({ children, ...rest }) {
  return (
    <div className="list-overflow-container">
      <ul className="list-group" {...rest}>{children}</ul>
    </div>
  );
}

export function ListItem({ children, ...rest }) {
  return <li className="list-group-item" {...rest}>{children}</li>;
}