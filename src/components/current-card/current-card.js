import { useState } from "react";

import './current-card.css';

const CurrentCard = ({id, front, back, mode, editMode, onDeleteCard, repetitionMode}) => {

  const [flip, setFlip] = useState(false);

  const frontBack = 
    <>
      <div className={`front ${editMode || !repetitionMode ? 'edit': ''}`}>
        {front}
      </div>
      <div className={`back ${editMode || !repetitionMode ? 'edit': ''}`}>
        {back}
      </div>
    </>;

const backFront =
  <>
    <div className={`front ${editMode ? 'edit': ''}`}>
      {back}
    </div>
    <div className={`back ${editMode ? 'edit': ''}`}>
      {front}
    </div>
  </>;

  const selectTemplate = (mode) => {
    switch (mode) {
      case 'Front/Back':
        return frontBack;
      case 'Back/Front':
        return backFront;
      case 'Mix/Random':
        const arrMode = [frontBack, backFront];
        return arrMode[Math.floor(Math.Random() * 2)];
      default:
        return frontBack;
    }
  };

  const template = selectTemplate(mode);
  const className =
    editMode || !repetitionMode
    ? 'edit-mode-card'
    : `card ${flip ? 'flip' : ''}`;

  return (
    <div className='container'>
      <div
        className={className}
        onClick={() => setFlip(!flip)}
      >
        {editMode || !repetitionMode 
          ? <i className="fa-solid fa-xmark cross" onClick={() => onDeleteCard(id)}></i>
          : null
        }
        {template}
      </div>
    </div>
  );
};

export default CurrentCard;