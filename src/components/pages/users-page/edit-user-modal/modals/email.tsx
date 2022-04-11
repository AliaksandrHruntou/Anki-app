import { FC, useState } from "react"
import { Alert, Button } from "react-bootstrap"
import { Field, Form } from "react-final-form"

import './modals.css'

type ValuesType = {
  email: string
}

type PropsType = {
  setEmailModal: React.Dispatch<React.SetStateAction<boolean>>
  updateUserEmail: (uid: string, newPEmail: string) => void
  userId: string
}

const EmailModal: FC<PropsType> = ({
  setEmailModal,
  updateUserEmail,
  userId
}) => {

  const onSubmit = (values: ValuesType) => {
    updateUserEmail(userId, values.email)
    setEmailModal(false);
  }

  return (
    <>
      <div className="overlay" onClick={ () => setEmailModal(false) }/>
      <div className='users-modal-container'>
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit }) => (
            <form className="add-form d-flex" onSubmit={handleSubmit}>
              <i className="fa-solid fa-xmark cross" onClick={ () => {
                setEmailModal(false)
              }}></i>
              <Field
                component="input"
                className="form-control new-post-label"
                placeholder="Enter new email"
                name="email"
                required
              />
              <Button 
                type="submit" 
                variant="danger" 
                style={ { 'margin': '10px' } }
              >
                Edit
              </Button>
            </form>
          )}
        />
      </div>
    </>
  )
}

export default EmailModal;