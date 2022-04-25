import { useState } from "react"
import { Card, Button, Alert, Container } from "react-bootstrap"
import { useAuth } from '../../contexts/auth-context';
import { Link, useHistory } from "react-router-dom"
import MakeAdminModal from "./make-admin-modal/make-admin-modal";
import useFirestore from "../../../hooks/firestore";

const ProfilePage = () => {
  const [error, setError] = useState("")
  const [modal, setModal] = useState(false)
  const { currentUser, logout, isAdmin, userData } = useAuth()
  const { getUserLogout } = useFirestore();
  const history = useHistory()

  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/")
    } catch {
      setError("Failed to log out")
    }

    getUserLogout(currentUser.uid)
  }

  return (
    <Container>
      <Container>
        {modal && 
          <MakeAdminModal modal={modal} setModal={setModal}/>
        }
        <Container>
          <h2 className="text-center mb-4">Profile</h2>
          <div>
            <strong>Nickname:</strong> {userData.nickname}
          </div>
          <div>
            <strong>Email:</strong> {currentUser.email}
          </div>
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