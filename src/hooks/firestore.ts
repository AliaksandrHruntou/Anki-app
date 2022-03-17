import { db } from '../db/firebase-config';
import { collection, getDocs, addDoc, query, where, updateDoc, getDoc, doc, deleteDoc } from 'firebase/firestore';
import { DeckType, ItemType } from '../types/types';
import { useState } from 'react';

const useFirestore = () => {

  const [loading, setLoading] = useState(false);
  const decksCollectionRef = collection(db, "decks");

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

  const getDeckFromFirestore = async (deckId: string) => {
    setLoading(true);
    const deckRef = doc(decksCollectionRef, deckId);
    
    const querySnapshot = await getDoc(deckRef);

    setLoading(false);
    return { ...querySnapshot.data(), deckId: querySnapshot.id }
  };

  const getUserDecksFromFirestore = async (userId: string) => {
    setLoading(true);
    let decks = [];
    const userDecks = query(decksCollectionRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(userDecks);

    decks = querySnapshot.docs.map((doc) => ({ ...doc.data(), deckId: doc.id }));
    setLoading(false);
    return decks;
  }

  return {
    createDeck,
    deleteDeck,
    updateDeck,
    getDeckFromFirestore,
    getUserDecksFromFirestore,
    loading
  };

}

export default useFirestore;