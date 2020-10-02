import * as React from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import BooksNavbar from "./components/books_navbar/BooksNavbar";

export interface bookType{
id: number;
title: string;
author: string;
price: number;
name: string;
categoryid: number;
}
interface AppProps {}
const App: React.FC<AppProps> = (props) => {

	return (
		<Router>
			<Switch>
				{['/'].map((path) => (
					<Route
						path={path}
						exact
						key={path}
						render={(props) => (
							<>
								<BooksNavbar  history={props.history} location={props.location} match={props.match} />
								<Container fluid className={'d-flex align-items-center justify-content-center bg-color min-vh-100'}>
									<p className={'display-2'}>Welcome!</p>
								</Container>
							</>
						)}
					/>
				))}
			</Switch>
		</Router>
	);
};



export default App;
