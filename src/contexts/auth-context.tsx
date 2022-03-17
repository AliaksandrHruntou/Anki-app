import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateEmail } from 'firebase/auth';
import { createContext, useContext, useState, useEffect, FC } from 'react';
import { auth } from '../db/firebase-config';
import useFirestore from '../hooks/firestore';
import { DeckAppType } from '../types/types';

const AuthContext = createContext<any | null>(null)

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider: FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [mode, setMode] = useState("Front/Back");
  const [currentDeck, setCurrentDeck] = useState<DeckAppType | null>(null);

  const signup = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const logout = () => {
    return signOut(auth)
  }

  const resetPassword = (email: string): any => {
    return sendPasswordResetEmail(auth, email)
  }

  const updateEmail = (email: string): any => {
    return currentUser.updateEmail(email);
  }

  const updatePassword = (password: string): any => {
    return currentUser.updatePassword(password)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
    //eslint-disable-next-line
  }, [])

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    editMode,
    setEditMode,
    mode,
    setMode,
    currentDeck,
    setCurrentDeck
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}