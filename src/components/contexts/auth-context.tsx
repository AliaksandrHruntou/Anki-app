import { 
  createContext, 
  useContext, 
  useState, 
  useEffect, 
  FC 
} from 'react';

import { 
  createUserWithEmailAndPassword, 
  onAuthStateChanged, 
  sendPasswordResetEmail, 
  signInWithEmailAndPassword, 
  signOut, 
  updateEmail,
  updatePassword 
} from 'firebase/auth';

import { auth, db } from '../../firebase/firebase-config';

import { doc, setDoc } from 'firebase/firestore';
import useFirestore from '../../hooks/firestore';
import { UserData } from '../../types/types';

const AuthContext = createContext<any | null>(null)

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider: FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<any | null>(null);
  const [userData, setUserData] = useState<UserData>()
  const [isAdmin, setIsAdmin] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true);

  const [editMode, setEditMode] = useState<boolean>(false);
  const [mode, setMode] = useState<string>("Front/Back");
  const [currentDeckId, setCurrentDeckId] = useState<string>('');

  const { getUser } = useFirestore();

  const signup = async (nickname: string, email: string, password: string) => {
    const res = await createUserWithEmailAndPassword(auth, email, password)

    await setDoc(doc(db, "users", res.user.uid), {
      online: true,
      nickname,
      email,
      isAdmin: false,
      settings: {
        learningMode: "Front/Back",
        textStyle: {}
      }      
    });
  }

  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const logout = () => {
    setIsAdmin(false)
    return signOut(auth)
  }

  const resetPassword = (email: string): any => {
    return sendPasswordResetEmail(auth, email)
  }

  const updateUserEmail = (currentUser: any, email: string): any => {
    return updateEmail(currentUser, email)
  }

  const updateUserPassword = (currentUser: any, password: string): any => {
    return updatePassword(currentUser, password)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        user.getIdTokenResult()
          .then(getIdTokenResult => {
            if(getIdTokenResult.claims.admin) {
              setIsAdmin(true)
            }
          })

        getUser(user.uid)
          .then(userData => {
            setUserData(userData)
          })
      }
      setCurrentUser(user)                                  
      setLoading(false) 
    })

    return unsubscribe
    //eslint-disable-next-line
  }, [])

  const value = {
    currentUser,
    isAdmin,
    login,
    signup,
    logout,
    resetPassword,
    updateUserEmail,
    updateUserPassword,
    editMode,
    setEditMode,
    mode,
    setMode,
    currentDeckId,
    setCurrentDeckId,
    userData
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}