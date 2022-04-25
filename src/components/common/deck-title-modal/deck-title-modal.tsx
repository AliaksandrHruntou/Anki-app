import { ValidationErrors } from 'final-form';
import { FC } from 'react';
import { Button } from 'react-bootstrap';
import { Field, Form } from 'react-final-form';

import './deck-title-modal.css';

type ModalPropsType = {
  onSubmitDeckTitle: (deckTitle: string) => void
}

type ValuesType = {
  deckTitle: string
}

const DeckTitleModal: FC<ModalPropsType> = ({ onSubmitDeckTitle }) => {

  const onSubmit = (values: ValuesType) => {
    onSubmitDeckTitle(values.deckTitle);
  }

  const validate = (values: ValuesType): ValidationErrors | Promise<ValidationErrors> => {
    return
  }
  
  return (
    <>
      <div className='deck-title-modal-container'>
        <Form
          onSubmit={onSubmit}
          validate={validate}
          render={({ handleSubmit }) => (
            <form className="add-form d-flex" onSubmit={handleSubmit}>
              <Field 
                component="input"
                className="form-control new-post-label"
                placeholder="Name your deck"
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
          )}
        />
      </div>
    </>
  );
  
};

export default DeckTitleModal;