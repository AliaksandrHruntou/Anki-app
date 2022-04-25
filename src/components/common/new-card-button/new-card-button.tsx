import { FC } from 'react';
import './new-card-button.css';

type NewCardButtonPropsType = {
  setCardModal: React.Dispatch<React.SetStateAction<boolean>>
}

const NewCardButton: FC<NewCardButtonPropsType> = ({ setCardModal }) => {
  return (
    <div tabIndex={ 0 } onClick={ () => setCardModal(true) } className="new-card-button">
      <h3>+ New card</h3>
    </div>
  );
};

export default NewCardButton;