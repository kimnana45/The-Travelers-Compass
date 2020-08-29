import React from 'react';

export function Accordion({ title, text, children }) {
	return (
		<div className='accordion' id='accordionExample'>
			<div className='card'>
				<div className='card-header' id='headingOne'>
                    <button
                        className='btn btn-link text-left'
                        type='button'
                        data-toggle='collapse'
                        data-target='#collapseOne'
                        aria-expanded='true'
                        aria-controls='collapseOne'
                    >
                        {title}
                    </button>
					<small className='m-0 p-0 font-italic'>{text}</small>
				</div>
				{children}
			</div>
		</div>
	);
}

export function AccordionContent({ children }) {
	return (
		<div
			id='collapseOne'
			className='collapse collapsed'
			aria-labelledby='headingOne'
			data-parent='#accordionExample'
		>
			<div className='card-body'>
				{children}
			</div>
		</div>
	);
}
