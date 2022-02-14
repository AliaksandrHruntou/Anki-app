import { useState } from 'react';
import { Button } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap';

import './welcome-page.css';

const WelcomePage = () => {
  const [flip, setFlip] = useState(false); 

  const learningButton = <LinkContainer to="/select-deck">
    <Button variant='success' size='sm'>learning</Button>
  </LinkContainer>;
  
  const createButton = <LinkContainer to="/create-deck">
    <Button variant='secondary' size='sm'>create</Button>
  </LinkContainer>;

  return (
    <div className='container'>
      <div
        className={`card-welcome ${flip ? 'flip' : ''}`}
        onClick={() => setFlip(!flip)}
      >
        <div className="front">
          <b>Hello, Alex!</b>
          <br/>
          <p>click to explore</p>
        </div>
        <div className="back">
          Start {learningButton} with already created decks or {createButton} a new one.
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;