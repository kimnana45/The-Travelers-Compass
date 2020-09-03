import React from "react";

export function Container({ fluid, children, classes, ...rest }) {
  return <div className={`container${fluid ? "-fluid p-0" : "-lg"} ` + (classes ? classes : "")} {...rest}>{children}</div>;
}

export function Row({ classes, children, ...rest}) {
  return <div className={"row " + (classes ? classes : "")} {...rest}> {children} </div>;
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