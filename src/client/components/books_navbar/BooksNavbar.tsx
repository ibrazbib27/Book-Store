import * as React from "react";
import {useEffect, useState} from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link, RouteComponentProps } from "react-router-dom";
import { matchPath } from "react-router";

interface BooksNavbarProps extends RouteComponentProps <any> {}

const BooksNavbar: React.FC<BooksNavbarProps> = (props) => {
    const token: any = localStorage.getItem('token');
    const [size, setSize] = useState<number>(991.98);
    const bigScreen: string = 'm-3 border border-white rounded text-center';

    useEffect(() => {
        const screenSize = () => setSize(window.innerWidth);
        window.addEventListener('resize', screenSize);
        screenSize();
        return () => window.removeEventListener('resize', screenSize);
    }, []);

    const findActiveLink = (path: string) => {
        const match: any = matchPath(props.location.pathname, {path, exact: true});

        return match !== null && match.params.id !== 'new';
    }

    return(
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand as={Link} to={'/'}>Book Store</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className={`text-white small ${size >= 991.98 ? 'ml-auto' : 'mt-3 border border-white rounded'}`}>
                    <Nav.Link eventKey={1} as={Link} to={'/'} active={findActiveLink('/')} className={size >= 991.98 ? 'mx-5' : bigScreen}>Home</Nav.Link>
                    <Nav.Link eventKey={2} as={Link} to={'/books'} active={findActiveLink('/books') || findActiveLink('/books/:id') || findActiveLink('/books/:id/update')} className={size >= 991.98 ? 'mx-5' : bigScreen}>View Books</Nav.Link>
                    <Nav.Link eventKey={3} as={Link} to={token ? '/books/new': '/login'} active={findActiveLink(token ? '/books/new': '/login')} className={size >= 991.98 ? 'mx-5' : bigScreen}>{token ? 'Add New Book': 'Login'}</Nav.Link>
                    <Nav.Link eventKey={4} as={Link} to={token ? props.location.pathname : '/register'} active={findActiveLink('/register')} className={size >= 991.98 ? 'ml-5' : bigScreen}
                              onClick={(e: React.MouseEvent) => {
                                if(token){
                                    localStorage.clear();
                                    location.replace(location.origin + '/');
                                }
                              }}
                    >{token ? 'Logout': 'Register'}</Nav.Link>



                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default BooksNavbar;