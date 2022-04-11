import { ValidationErrors } from "final-form"
import { Button, Container } from "react-bootstrap"
import { Field, Form } from "react-final-form"
import { functions } from '../../../../firebase/firebase-config';
import { httpsCallable } from 'firebase/functions'
import { FC } from "react";

import '../../../common/modal/modal.css'

type PropsType = {
  modal: boolean
  setModal: React.Dispatch<React.SetStateAction<boolean>>
}

type ValuesType = {
  userEmail: string
}

const MakeAdminModal: FC<PropsType> = ({ modal, setModal }) => {
  const addAdminRole = httpsCallable(functions, 'addAdminRole')
  
  const onSubmit = (values: ValuesType) => {
    console.log(values.userEmail)
    addAdminRole({email: values.userEmail})
      .then(result => {
        console.log(result)
      })
  }

  const validate = (values: ValuesType): ValidationErrors | Promise<ValidationErrors> => {
    return;
  }

  if(modal) {
    return (
      <>
        <div className="overlay" onClick={ () => setModal(false) }></div>
        <div className='deck-title-modal-container'>
          <Form
            onSubmit={onSubmit}
            validate={validate}
            render={({ handleSubmit }) => (
              <form className="add-form d-flex" onSubmit={handleSubmit}>
                <Field 
                  component="input"
                  className="form-control"
                  placeholder="Type user email"
                  name="userEmail"
                  required
                />
                <Button 
                  type="submit" 
                  variant="danger" 
                  style={ { 'margin': '10px' } }
                >
                  Make
                </Button>
              </form>
            )}
          />
        </div>
      </>
    )
  } else {
    return null
  }
 
}

export default MakeAdminModal;