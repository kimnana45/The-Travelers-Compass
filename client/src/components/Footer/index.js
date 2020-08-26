import React from 'react';

export function Footer({ children }) {
	return (
		<nav className="navbar fixed-bottom navbar-light bg-light" id="footer">
			{children}
		</nav>
	);
}

export function FooterSpan({ classes, children }) {
	return <span className={"navbar-brand " + (classes ? classes : "")}>{children}</span>;
}
  