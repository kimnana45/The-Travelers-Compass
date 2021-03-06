import React from 'react';

export function Accordion({ children }) {
	return (
		<div className='accordion' id='accordionExample'>
			{children}
		</div>
	);
};

export function AccordionHeader({ classes, num, text, title, children}) {
	return (
	<div className='card'>
		<div className={'card-header ' + (classes ? classes : '')} id={`heading${num}`}>
			<button
				className='btn btn-link text-left'
				type='button'
				data-toggle='collapse'
				data-target={`#collapse${num}`}
				aria-expanded='true'
				aria-controls={`collapse${num}`}
			>
				<h5>{title}</h5>
			</button>
			<small className='m-0 p-0 font-italic'>{text}</small>
		</div>
		{children}
	</div>
	)
};

export function AccordionContent({ num, children }) {
	return (
		<div
			id={`collapse${num}`}
			className='collapse collapsed'
			aria-labelledby={`heading${num}`}
			data-parent='#accordionExample'
		>
			<div className='card-body'>
				{children}
			</div>
		</div>
	);
}
