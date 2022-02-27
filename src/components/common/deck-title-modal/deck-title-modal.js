import { Button } from 'react-bootstrap';

import './deck-title-modal.css';

const DeckTitleModal = ({ onSubmitDeckTitle }) => {
  
  return (
    <>
      <div className='deck-title-modal-container'>
        <form className="add-form d-flex" onSubmit={ (e) => {
          e.preventDefault();
          onSubmitDeckTitle(e.target.elements[0].value);
        } }>
          <input 
            type="text"
            className="form-control new-post-label"
            placeholder="Name your deck"
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
  
};

export default DeckTitleModal;