import { ValidationErrors } from 'final-form';
import { FC, FormEvent } from 'react';
import { Button } from 'react-bootstrap';
import { Form, Field } from 'react-final-form'

import './modal.css';

type ModalPropsType = {
  cardModal: boolean
  setCardModal: any
  onSubmitNewCard: (front: string, back: string) => void
}

type ValuesType = {
  front: string
  back: string
}

const Modal: FC<ModalPropsType> = ({
  cardModal,
  setCardModal,
  onSubmitNewCard
}) => {
  const onSubmit = (values: ValuesType) => {
    if (values.front.length < 1 || values.back.length < 1) return;
    onSubmitNewCard(values.front, values.back);
    setCardModal(false);
  }

  const validate = (values: ValuesType): ValidationErrors | Promise<ValidationErrors> => {
    console.log(values);
    return
  }

  if (cardModal) {
    return (
      <>
        <div className="overlay" onClick={ () => setCardModal(false) }/>
        <div className='deck-title-modal-container'>
          <Form
            onSubmit={onSubmit}
            validate={validate}
            render={({ handleSubmit }) => (

              <form className="add-form d-flex" onSubmit={handleSubmit}>
                <Field 
                  component="input"
                  className="form-control new-post-label"
                  placeholder="Front"
                  name="front"
                  required
                />
                <Field
                  component="input"
                  className="form-control new-post-label"
                  placeholder="Back"
                  name="back"
                  required
                />

                {/* <div>
                  <Field name="firstName" component="input" placeholder="First Name" />
                </div>

                <div>
                  <Field name="interests" component={InterestPicker} />
                </div>

                <Field
                  name="bio"
                  render={({ input, meta }) => (

                    <div>
                      <label>Bio</label>
                      <textarea {...input} />
                      {meta.touched && meta.error && <span>{meta.error}</span>}
                    </div>

                  )}
                />

                <Field name="phone">
                  {({ input, meta }) => (
                    <div>
                      <label>Phone</label>
                      <input type="text" {...input} placeholder="Phone" />
                      {meta.touched && meta.error && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field> */}

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
  } else {
    return null;
  }
};

export default Modal;