
import React from "react";

export function Card({ children, classes, ...rest }) {
	return <div className={"card border-light bg-white my-1 " + (classes ? classes : "")} {...rest}>{children}</div>;
}

export function CardBody({ children, classes, ...other }) {
	return <div className={classes} {...other}>{children}</div>;
}

export function CardHeader({ text, classes }) {
	return <h3 className={"card-header text-center " + (classes ? classes : "")}>{text}</h3>;
}

export function CardContent({ children, classes }) {
	return <p className={"card-text " + (classes ? classes : "")}>{children}</p>;
}

export function CardImage({ src, alt, classes, onClick, ...rest }) {
	return <img src={src} className={"card-img-top " + (classes ? classes : "")} alt={alt} {...rest} />
};