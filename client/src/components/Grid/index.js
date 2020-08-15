import React from "react";

export function Container({ children }) {
  return <div className="container-lg"> {children} </div>;
}

export function Row({ children }) {
  return <div className="row mt-1"> {children} </div>;
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