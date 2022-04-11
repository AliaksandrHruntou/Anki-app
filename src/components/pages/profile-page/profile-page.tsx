import React, { useState } from "react"
import { Card, Button, Alert, Container } from "react-bootstrap"
import { useAuth } from '../../contexts/auth-context';
import { Link, useHistory } from "react-router-dom"
import MakeAdminModal from "./make-admin-modal/make-admin-modal";

const ProfilePage = () => {
  const [error, setError] = useState("")
  const [modal, setModal] = useState(false)
  const { currentUser, logout, isAdmin } = useAuth()
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
    <Container>
      <Container>
        {modal && 
          <MakeAdminModal modal={modal} setModal={setModal}/>
        }
        <Container>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email:</strong> {currentUser.email}
          <Container className="d-flex justify-content-center">
            <Link to="/update-profile" className="btn btn-primary text-center w-10 mt-3">
              Update Profile
            </Link>
            {isAdmin && 
              <Button 
                className="btn btn-primary text-center w-10 mt-3 ml-3"
                onClick={() => setModal(true)}
              >
                Make Admin
              </Button>
            }
          </Container>
        </Container>
      </Container>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </Container>
  )
}

export default ProfilePage