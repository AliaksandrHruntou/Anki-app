import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import './header.css';

const Header = () => {
    return (
        <Navbar className='header' variant="light" bg="primary" expand="lg">
        <Container fluid>
          <LinkContainer to="/">
            <Navbar.Brand>Memory Cards</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="navbar-dark-example" />
          <Navbar.Collapse id="navbar-dark-example">
            <Nav>
              <NavDropdown
                id="nav-dropdown-dark-example"
                title="Menu"
                menuVariant="dark"
              >
                <LinkContainer to="/select-deck">
                    <NavDropdown.Item>Select Deck</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/create-deck">
                    <NavDropdown.Item>Create Deck</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
}

export default Header;