import { db } from '../firebase/firebase-config';
import { collection, getDocs, addDoc, query, where, updateDoc, getDoc, doc, deleteDoc } from 'firebase/firestore';
import { DeckType, ItemType } from '../types/types';
import { useState } from 'react';

const useFirestore = () => {

  const [loading, setLoading] = useState(false);
  const decksCollectionRef = collection(db, "decks");
  const usersCollectionRef = collection(db, "users")

  const createDeck = async (deck: DeckType) => {
    await addDoc(decksCollectionRef, deck)
      .then(response => {
        console.log(response);
      })
      .catch(e => console.log(e));
  };

  const deleteDeck = async (deckId: string) => {
    const deckDocRef = doc(decksCollectionRef, deckId);
    await deleteDoc(deckDocRef);
  };

  const updateDeck = async (deckId: string, items: ItemType[]) => {
    const deckRef = doc(decksCollectionRef, deckId);
    
    await updateDoc(deckRef, { items });
  };

  const updateUserDeck = async (userId: string, item: string) => {
    const userDocRef = doc(usersCollectionRef, userId)

    await updateDoc(userDocRef, {
      email: item
    })
  }

  const getDeckFromFirestore = async (deckId: string) => {
    setLoading(true);
    const deckRef = doc(decksCollectionRef, deckId);
    
    const querySnapshot = await getDoc(deckRef);

    const data = { ...querySnapshot.data() }
    
    setLoading(false);
    return { 
      deckTitle: data.deckTitle,
      items: data.items,
      userId: data.userId, 
      deckId: querySnapshot.id 
    }
  };

  const getUserDecksFromFirestore = async (userId: string) => {
    setLoading(true);
    let decks = [];
    const userDecks = query(decksCollectionRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(userDecks);

    decks = querySnapshot.docs.map((doc) => {
      const data = { ...doc.data() }

      return ({ 
        deckTitle: data.deckTitle,
        items: data.items,
        userId: data.userId,
        deckId: doc.id 
      })
    });
    setLoading(false);
    return decks;
  }

  return {
    createDeck,
    deleteDeck,
    updateDeck,
    getDeckFromFirestore,
    getUserDecksFromFirestore,
    updateUserDeck,
    loading
  };

}

export default useFirestore;