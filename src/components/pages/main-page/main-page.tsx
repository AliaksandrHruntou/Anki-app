import { FC, useEffect, useState } from 'react';
import { Button, Container } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap';
import ErrorBoundary from '../../common/error-boundary/error-boundary';
import { useAuth } from '../../contexts/auth-context';

import './main-page.css';

const MainPage: FC = () => {
  const [flip, setFlip] = useState(false);

  const { currentUser} = useAuth();

  const learningButton = <LinkContainer to="/select-deck-page">
    <Button variant='success' size='sm'>learning</Button>
  </LinkContainer>;
  
  const createButton = <LinkContainer to="/create-deck-page">
    <Button variant='secondary' size='sm'>create</Button>
  </LinkContainer>;

  return (
    <ErrorBoundary>
      <Container
        className={ `card-welcome ${flip ? 'flip' : ''}` }
        onClick={ () => setFlip(!flip) }
      >
        <div className="front">
          <b>Hello, {currentUser.email}!</b>
          <br/>
          <p>click to explore</p>
        </div>
        <div className="back">
          Start { learningButton } with already created decks or { createButton } a new one.
        </div>
      </Container>
    </ErrorBoundary>
  );
};

export default MainPage;
