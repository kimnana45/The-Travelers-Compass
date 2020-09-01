import React from 'react';
import logo from '../../assets/logo2.png';

const Nav = ({ authorized, logout }) => {
	return (
		<nav
			className='navbar navbar-expand-lg navbar-dark'
			style={{ backgroundColor: '#222323' }}
		>
			<img
				src={logo}
				alt="traveler's compass logo"
				className='mx-auto'
				style={{
					width: '150px',
				}}
			/>
			<button
				className='navbar-toggler'
				type='button'
				data-toggle='collapse'
				data-target='#navbarTogglerDemo02'
				aria-controls='navbarTogglerDemo02'
				aria-expanded='false'
				aria-label='Toggle navigation'
				style={{width: "auto"}}
			>
				<span className='navbar-toggler-icon'></span>
			</button>

			<div className='collapse navbar-collapse text-right' id='navbarTogglerDemo02'>
				<ul className='navbar-nav ml-auto mt-2 mt-lg-0'>
					<li className='nav-item active'>
						<a className='nav-link' href='/'>
							Home <span className='sr-only'>(current)</span>
						</a>
					</li>
					<li className='nav-item'>
						{authorized ? (
							<a className='nav-link' onClick={logout}>
								Logout
							</a>
						) : (
							<a className='nav-link' href='/login'>
								Login
							</a>
						)}
					</li>
					<li className='nav-item'>
						{authorized ? (
							<span></span>
						) : (
							<a className='nav-link' href='/register'>
								Signup
							</a>
						)}
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default Nav;
