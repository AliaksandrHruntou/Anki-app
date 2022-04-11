import { useState } from "react"
import { Card, Button, Alert, Container } from "react-bootstrap"
import { useAuth } from '../contexts/auth-context';
import { Link, useHistory } from "react-router-dom"
import { ValidationErrors } from "final-form";
import { Field, Form } from "react-final-form";

import { functions } from '../../firebase/firebase-config';
import { httpsCallable } from 'firebase/functions'

import '../common/modal/modal.css'

type ValuesType = {
  userEmail: string
}

const Dashboard = () => {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const history = useHistory()

  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/")
    } catch {
      setError("Failed to log out")
    }
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email:</strong> {currentUser.email}
          <MakeUserByEmailAdminModal/>
          <Container>
            <Link to="/update-profile" className="btn btn-primary text-center w-10 mt-3">
              Update Profile
            </Link>
            <Button className="btn btn-primary text-center w-10 mt-3 ml-3">
              Make Admin
            </Button>
          </Container>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </>
  )
}

const MakeUserByEmailAdminModal = () => {

  

  const onSubmit = (values: ValuesType) => {
    console.log(values.userEmail)
    const addAdminRole = httpsCallable(functions, 'addAdminRole')
    addAdminRole({email: values.userEmail})
      .then(result => {
        console.log(result)
      })
  }

  const validate = (values: ValuesType): ValidationErrors | Promise<ValidationErrors> => {
    return
  }

  return (
    <Container className="">
      <Container className='deck-title-modal-container'>
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
                style={ { 'margin': '10px' } }>
                Make
              </Button>
            </form>
          )}
        />
      </Container>
    </Container>
  )
}

export default Dashboard