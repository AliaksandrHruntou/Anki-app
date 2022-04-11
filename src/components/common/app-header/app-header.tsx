import { FC } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useAuth } from '../../contexts/auth-context';

import img from './logo.svg';
import './app-header.css';

const AppHeader: FC = () => {
  const { isAdmin } = useAuth();
  return (
    <Navbar 
      className='header' 
      bg="light" 
      variant="light"
    >
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand href="#home">
            <img
              src={img}
              width="30"
              height="30"
              className="d-inline-block align-top mr-2"
              alt="Memory Cardzzz logo"
            />
            Memory Cardzzz
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="justify-content-end" />
        <Navbar.Collapse id="justify-content-end"></Navbar.Collapse>
        <Nav className="me-auto m-2">
          {isAdmin && 
            <LinkContainer className='text-danger border-right' to="/users">
              <Nav.Link>Users</Nav.Link>
            </LinkContainer>
          }
          <LinkContainer to="/select-deck-page">
            <Nav.Link>Select Deck</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/create-deck-page">
            <Nav.Link>Create Deck</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/settings-page">
            <Nav.Link>Settings</Nav.Link>
          </LinkContainer>
          <LinkContainer className='text-info border-left' to="/Dashboard">
            <Nav.Link>My Profile</Nav.Link>
          </LinkContainer>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default AppHeader;
