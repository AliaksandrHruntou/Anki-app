import { useState } from 'react';

import './card.css';

const Card = ({front, back}) => {

  const [repetitionMode, setRepetitionMode] = useState(false);

  const classNames = `card-container ${repetitionMode ? 'repetition-mode' : 'review-mode'}`;

  return (
    <div className={classNames}>
      <div className="front">{front}</div>
      <div className="back">{back}</div>
    </div>
  );
}

export default Card;