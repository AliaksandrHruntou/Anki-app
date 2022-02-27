import { useState } from 'react';
import { Button } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap';

import './main-page.css';

const MainPage = () => {
  const [flip, setFlip] = useState(false); 

  const learningButton = <LinkContainer to="/select-deck-page">
    <Button variant='success' size='sm'>learning</Button>
  </LinkContainer>;
  
  const createButton = <LinkContainer to="/create-deck-page">
    <Button variant='secondary' size='sm'>create</Button>
  </LinkContainer>;

  return (
    <div className='container'>
      <div
        className={ `card-welcome ${flip ? 'flip' : ''}` }
        onClick={ () => setFlip(!flip) }
      >
        <div className="front">
          <b>Hello, Alex!</b>
          <br/>
          <p>click to explore</p>
        </div>
        <div className="back">
          Start { learningButton } with already created decks or { createButton } a new one.
        </div>
      </div>
    </div>
  );
};

export default MainPage;
