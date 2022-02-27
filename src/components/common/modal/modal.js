import { Button } from 'react-bootstrap';

import './modal.css';

const Modal = ({ cardModal, setCardModal, onSubmitNewCard }) => {
  if (cardModal) {
    return (
      <>
        <div className="overlay" onClick={ () => setCardModal(false) }/>
        <div className='deck-title-modal-container'>
          <form className="add-form d-flex" onSubmit={ (e) => {
            if (e.target.elements[0].value.length < 1 || e.target.elements[1].value.length < 1) return;
            e.preventDefault();
            onSubmitNewCard(e.target.elements[0].value, e.target.elements[1].value);
            setCardModal(false);
          } }>
            <input 
              type="text"
              className="form-control new-post-label"
              placeholder="Front"
              name="deckTitle"
            />
            <input 
              type="text"
              className="form-control new-post-label"
              placeholder="Back"
              name="deckTitle"
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