import { FC, useState } from "react";
import { FlashCardPropsType } from "../../../types/types";

import './flashcard.css';

const FlashCard: FC<FlashCardPropsType> = ({
  id, 
  front, 
  back,
  imgURL,
  description,
  mode, 
  editMode, 
  onDeleteCard,
  setCardModal,
  setCurrentCard
}) => {

  const [flip, setFlip] = useState(false);

  const frontBack = 
    <>
      <div className={ `front ${editMode ? 'edit': ''}` }>
        {!editMode && imgURL && 
        <div className="img">
          <img src={imgURL} className="flashcard-img mx-auto d-block"/>  
        </div>}
        <div className="text-center p-2">{ front }</div>
        {!editMode && description && 
          <div className="description">{ description }</div>}
      </div>
      <div className={ `back ${editMode ? 'edit': ''}` }>
        {!editMode && imgURL && 
          <div className="img">
            <img src={imgURL} className="flashcard-img mx-auto d-block"/>  
          </div>}
        <div className="text-center">{ back }</div>
        {!editMode && description && 
          <div className="description">{ description }</div>}
      </div>
    </>;

  const backFront =
    <>
      <div className={ `front ${editMode ? 'edit': ''}` }>
        {!editMode && imgURL && 
        <div className="img mx-auto">
          <img src={imgURL} className="flashcard-img mx-auto d-block"/>  
        </div>}
        <div className="text-center p-2">{ back }</div>
        {!editMode && description && 
          <div className="description">{ description }</div>}
      </div>
      <div className={ `back ${editMode ? 'edit': ''}` }>
        {!editMode && imgURL && 
        <div className="img">
          <img src={imgURL} className="flashcard-img mx-auto d-block"/>  
        </div>}
        <div className="text-center p-2">{ front }</div>
        {!editMode && description && 
          <div className="description">{ description }</div>}
      </div>
    </>;

  const selectTemplate = (mode: string | null | undefined) => {
    switch (mode) {
    case 'Front/Back':
      return frontBack;
    case 'Back/Front':
      return backFront;
    case 'Mix/Random':
      const arrMode = [frontBack, backFront];
      return arrMode[Math.floor(Math.random() * 2)];
    default:
      return frontBack;
    }
  };

  const template = editMode ? frontBack : selectTemplate(mode);
  
  const className =
    editMode
      ? 'edit-mode-card'
      : `flashcard ${flip ? 'flip' : ''}`;

  return (
    <div className='card-container'>
      <div
        className={ className }
        onClick={ () => setFlip(!flip) }
      >
        { editMode 
          ? <>
            <i className="fas fa-edit edit-mark" onClick={ () => {
              setCurrentCard({
                id,
                front,
                back,
                imgURL,
                description
              })
              setCardModal(true)
            }}></i>
            <i className="fa-solid fa-xmark cross" onClick={ () => onDeleteCard(id) }></i>
          </>
          : null
        }
        { template }
      </div>
    </div>
  );
};

export default FlashCard;