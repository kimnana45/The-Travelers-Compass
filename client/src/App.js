import React, { Component } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Protected from './pages/Protected';
import API from './utils/API';
import Nav from './components/Nav';
import { Footer, FooterSpan } from './components/Footer';
import Wrapper from './components/Wrapper';
import MembersDashboard from './pages/MembersDashboard';
import NewTrip from './pages/NewTrip';
import JoinTrip from './pages/JoinTrip';
import TripOverview from './pages/TripOverview';
import Gallery from './pages/Gallery';
import AddPicture from './pages/AddPicture';
import MERN from './assets/mern.png';
import { StoreProvider } from './utils/GlobalState';
import MustDoList from './pages/MustDoList';
import IdeaDetails from './pages/IdeaDetails';
import IdeasMain from './pages/IdeasMain';

class App extends Component {
	state = {
		userId: '',
		authorized: false,
		display: false,
	};

	componentDidMount() {
		this.isAuthorized();
	}

	findUser() {
		API.getUser()
			.then((res) => {
				const { _id } = res.data;
				this.setState({ userId: _id });
			})
			.catch((err) => console.log(err));
	}

	isAuthorized = () => {
		this.findUser();
		API.isAuthorized()
			.then((res) => {
				this.setState({
					authorized: res.data.message ? false : true,
					display: true,
				});
			})
			.catch((err) => {
				console.log(err);
				this.setState({ authorized: false, display: true });
			});
	};

	logout = () => {
		API.logout()
			.then((res) => {
				console.log('logged out');
				this.isAuthorized();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	setRedirect = (pathname) => {
		this.setState({ redirect: pathname });
	};

	render() {
		return (
			<Router>
				<Nav authorized={this.state.authorized} logout={this.logout} />
				<Wrapper>
					{this.state.display ? (
						<Switch>
							<Route exact path='/'>
								{this.state.authorized ? <MembersDashboard /> : <Home />}
							</Route>

							<Route exact path='/login'>
								{this.state.authorized ? (
									<MembersDashboard logout={this.logout} />
								) : (
									<Login
										isAuthorized={this.isAuthorized}
										authorized={this.state.authorized}
										redirect={window.location.pathname}
									/>
								)}
							</Route>

							<Route exact path='/register'>
								{this.state.authorized ? (
									<MembersDashboard logout={this.logout} />
								) : (
									<Register isAuthorized={this.isAuthorized} />
								)}
							</Route>

							<Route exact path='/newtrip'>
								{this.state.authorized ? (
									<NewTrip userId={this.state.userId} />
								) : (
									<Redirect to='/login' />
								)}
							</Route>

							<Route exact path='/jointrip'>
								{this.state.authorized ? (
									<JoinTrip />
								) : (
									<Redirect to='/login' />
								)}
							</Route>

							<Route exact path='/trip/:id'>
								{this.state.authorized ? (
									<TripOverview />
								) : (
									<Redirect to='/login' />
								)}
							</Route>

							<Route exact path='/gallery/:id'>
								{this.state.authorized ? <Gallery /> : <Redirect to='/login' />}
							</Route>

							{/* <Route exact path='/uploadphoto'>
								{this.state.authorized ? <AddPicture /> : <Redirect to='/login' />}
							</Route> */}
							
							<StoreProvider>
								<Route exact path='/ideas'>
									{this.state.authorized ? (
										<IdeasMain />
									) : (
										<Redirect to='/login' />
									)}
								</Route>
								<Route exact path='/mustdo'>
									{this.state.authorized ? (
										<MustDoList />
									) : (
										<Redirect to='/ideas' />
									)}
								</Route>
								<Route exact path='/ideas/:id'>
									{this.state.authorized ? (
										<IdeaDetails />
									) : (
										<Redirect to='/ideas' />
									)}
								</Route>
							</StoreProvider>
							<Route>
								<Redirect to='/' />
							</Route>
						</Switch>
					) : (
						''
					)}
				</Wrapper>
				<Footer>
					<FooterSpan classes='text-center mx-right'>
						View on Github
						<br />
						<small>
							<a
								href='https://github.com/kimnana45/The-Travelers-Compass'
								target='_blank'
								className='text-dark'
							>
								project repo
							</a>
						</small>
					</FooterSpan>
					<FooterSpan classes='text-center mx-auto d-none d-sm-block'>
						<small>
							This application was created using the MERN stack.
							<br />
							<img
								src={MERN}
								alt='mern icon'
								className='mx-auto'
								style={{
									width: '100px',
								}}
							/>
						</small>
					</FooterSpan>
					<FooterSpan classes='text-center mx-left'>
						Developed by
						<br />
						<small>Kim Le and Eunah Kim</small>
					</FooterSpan>
				</Footer>
			</Router>
		);
	}
}

export default App;
