import React, { forwardRef } from "react";
import "./style.css";

// This file exports the Input, TextArea, and FormBtn components

export const Input = forwardRef(({ type, classes, placeholder, ...other }) => {
  return <input type={type} className={"form-control " + (classes ? classes : "")} placeholder={placeholder}
  {...other} />;
});

export function Label({ text, classes }) {
  return <label className={classes}> {text} </label>;
}

export function Small({ text, classes }) {
  return <small className={'form-text text-muted mb-2' + (classes ? classes : '')}> {text} </small>;
}

export function FormGroup({ children }) {
  return <div className="form-group"> {children} </div>;
}

export function FormBtn({text, classes, ...rest}) {
    return <button className={`btn ${classes}`} {...rest}>{text}</button>;
}
