import { FC, FormEvent } from 'react';
import { Button } from 'react-bootstrap';

import './modal.css';

// type ModalPropsType = {
//   cardModal: boolean
//   setCardModal: any
//   onSubmitNewCard: (front: string, back: string) => void
// }

const Modal = ({
  cardModal,
  setCardModal,
  onSubmitNewCard
}) => {
  if (cardModal) {
    return (
      <>
        <div className="overlay" onClick={ () => setCardModal(false) }/>
        <div className='deck-title-modal-container'>
          <form className="add-form d-flex" onSubmit={ (e) => {
            const target = e.target;
            if (target.elements[0].value.length < 1 || target.elements[1].value.length < 1) return;
            e.preventDefault();
            onSubmitNewCard(target.elements[0].value, target.elements[1].value);
            setCardModal(false);
          } }>
            <input 
              type="text"
              className="form-control new-post-label"
              placeholder="Front"
              name="deckTitle"
              required
            />
            <input 
              type="text"
              className="form-control new-post-label"
              placeholder="Back"
              name="deckTitle"
              required
            />
            <Button 
              type="submit" 
              variant="danger" 
              style={ { 'margin': '10px' } }>
              Add
            </Button>
          </form>
        </div>
      </>
    );
  } else {
    return null;
  }
};

export default Modal;