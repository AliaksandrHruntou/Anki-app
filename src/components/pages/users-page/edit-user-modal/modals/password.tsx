import { FC, useState } from "react"
import { Alert, Button } from "react-bootstrap"
import { Field, Form } from "react-final-form"

import './modals.css'

type ValuesType = {
  password: string
  passwordConfirm: string
}

type PropsType = {
  setPasswordModal: React.Dispatch<React.SetStateAction<boolean>>
  updateUserPassword: (uid: string, newPassword: string) => void
  userId: string
}

const PasswordModal: FC<PropsType> = ({
  setPasswordModal,
  updateUserPassword,
  userId
}) => {

  const [error, setError] = useState("")

  const onSubmit = (values: ValuesType) => {
    setPasswordModal(false);
    if (values.password !== values.passwordConfirm) {
      return setError("Passwords do not match")
    }
    updateUserPassword(userId, values.password)
  }

  return (
    <>
      <div className="overlay" onClick={ () => setPasswordModal(false) }/>
      <div className='users-modal-container'>
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit }) => (
            <form className="add-form d-flex" onSubmit={handleSubmit}>
              <i className="fa-solid fa-xmark cross" onClick={ () => {
                setPasswordModal(false)
              }}></i>
              {error && <Alert variant="danger">{error}</Alert>}
              <Field
                component="input"
                className="form-control new-post-label"
                placeholder="Enter new password"
                name="password"
                required
              />
              <Field
                component="input"
                className="form-control new-post-label"
                placeholder="Confirm new password"
                name="passwordConfirm"
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

export default PasswordModal