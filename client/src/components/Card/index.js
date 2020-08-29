import React from 'react';

export function Card({ children, classes }) {
	return <div className={"card border-light bg-white mb-3 mt-3 " + (classes ? classes : "")}>{children}</div>;
}

export function CardBody({ children, classes }) {
	return <div className={classes}>{children}</div>;
}

export function CardHeader({ text, classes }) {
	return <h3 className={"card-header text-center " + (classes ? classes : "")}>{text}</h3>;
}

export function CardContent({ children }) {
	return <p className="card-text">{children}</p>;
}