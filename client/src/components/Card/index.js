import React from 'react';

export function Card({ children, classes }) {
	return <div className={"card border-light bg-white mb-3 mt-3 " + (classes ? classes : "")}>{children}</div>;
}

export function CardBody({ children, classes }) {
	return <div className={classes}>{children}</div>;
}

export function CardHeader({ children, classes }) {
	return <div className={classes}>{children}</div>;
}

export function CardContent({ text }) {
	return <p className="card-text">{text}</p>;
}