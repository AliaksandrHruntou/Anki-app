import { httpsCallable } from "firebase/functions";
import { FC, useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { functions } from "../../../firebase/firebase-config";
import Spinner from "../../common/spinner/spinner";
import { useAuth } from "../../contexts/auth-context";
import PasswordModal from "./edit-user-modal/modals/password";
import EmailModal from "./edit-user-modal/modals/email";
import useFirestore from "../../../hooks/firestore";

import './users-page.css';

type UsersType = {
  email: string
  isAdmin: boolean
  nickname: string
  online: boolean
  settings: {},
  userId: string
}

const UsersPage: FC = () => {

  const [userId, setUserId] = useState('')
  const [passwordModal, setPasswordModal] = useState(false);
  const [emailModal, setEmailModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<Array<UsersType>>([]);

  const {currentUser} = useAuth()
  const { updateUserDeck } = useFirestore();

  const headings: Array<string> = [
    'nickname',
    'email',
    'isAdmin',
    'online'
  ];

  const getUsers = httpsCallable(functions, 'getUsers'); 
  const resetPassword = httpsCallable(functions, 'resetPassword')
  const resetEmail = httpsCallable(functions, 'resetEmail')

  const updateUserPassword = (uid: string, newPassword: string) => {
    resetPassword({uid, newPassword})
      .then((userRecord: any) => {
        console.log('Successfully updated user', userRecord);
      })
      .catch((error) => {
        console.log('Error updating user:', error);
        console.dir(error)
      });
  }

  const updateUserEmail = (uid: string, newEmail: string) => {
    resetEmail({uid, newEmail})
      .then((userRecord: any) => {
        console.log('Successfully updated user', userRecord);
      })
      .catch((error) => {
        console.log('Error updating user:', error);
        console.dir(error)
      });
    updateUserDeck(uid, newEmail)
    setUsers(users => {
      users.forEach((item: UsersType) => {
        if (item.userId === uid) {
          item.email = newEmail
        }
      });
      return users;
    })
  }

  useEffect(() => {
    setLoading(true)
    getUsers()
      .then((result: any) => {
        setUsers(result.data)
        setLoading(false)
      })
    //eslint-disable-next-line
  }, [])

  const usersTableBody = users.map((item, i) => {
    return (
      <tr key={i}>
        <td>
          <div className='d-flex'>
            {item['nickname']}
          </div>
        </td>
        <td>
          {item['email']}
        </td>
        <td>
          <span className="icon">
            <i className={item['isAdmin'] ? "fa-solid fa-check" : "fa-solid fa-xmark"}></i>
          </span>
        </td>
        <td>
          <div style={{'display': 'flex', 'justifyContent': 'space-between'}}>
            <span className="icon">
              <i className={item['online'] ? "fa-solid fa-check ml-3" : "fa-solid fa-xmark"}></i>
            </span>
            <div>
              <Button
                variant="success"
                onClick={() => {
                  setUserId(item["userId"])
                  setEmailModal(true)
                }} 
              >
                Change Email
              </Button>
              <Button 
                className="ml-2" 
                variant="secondary" 
                onClick={() => {
                  setUserId(item["userId"])
                  setPasswordModal(true)
                }} 
              >
                Reset Password
              </Button>
              <Button 
                className="ml-2" 
                variant="danger"
                disabled={(currentUser.uid === item["userId"]) ? true : false}
              >
                Delete User
              </Button>
            </div>
          </div>
        </td>
      </tr>
    )
  })

  return (
    <Container>
      {
        loading 
          ? <Spinner/>
          : <Table striped bordered hover size="sm">
            <thead>
              <tr>
                {
                  headings.map((heading, i) => <th key={i}>{heading}</th>)
                }
              </tr>
            </thead>
            <tbody>
              {usersTableBody}
            </tbody>
          </Table>
      }
      {
        passwordModal && 
        <PasswordModal
          userId={userId}
          setPasswordModal={setPasswordModal}
          updateUserPassword={updateUserPassword}
        />
      }
      {
        emailModal && 
        <EmailModal
          userId={userId}
          setEmailModal={setEmailModal}
          updateUserEmail={updateUserEmail}
        />
      }
    </Container>
  )
}

export default UsersPage;