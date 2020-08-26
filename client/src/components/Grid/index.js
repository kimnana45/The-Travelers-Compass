import React from "react";

export function Container({ fluid, children }) {
  return <div className={`container${fluid ? "-fluid p-0" : "-lg"}`}>{children}</div>;
}

export function Row(props) {
  return <div className="row" {...props}> {props.children} </div>;
}

export function Col({ size, children }) {
  return (
    <div
      className={size
        .split(" ")
        .map(size => "col-" + size)
        .join(" ")}
    >
      {children}
    </div>
  );
}