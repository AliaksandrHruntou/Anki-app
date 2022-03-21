import { FC, useEffect, useState } from 'react';
import { useAuth } from '../../contexts/auth-context';
import useFirestore from '../../../hooks/firestore';
import { DeckAppType } from '../../../types/types';
import Spinner from '../../common/spinner/spinner';
import DeckListItem from './deck-list-item/deck-list-item';

import './select-deck-page.css';

const SelectDeckPage: FC = () => {

  const [decks, setDecks] = useState<DeckAppType[]>([]);

  const { updateDeck, deleteDeck, getUserDecksFromFirestore, loading } = useFirestore();
  const { currentUser } = useAuth();
  useEffect(() => {
    getUserDecksFromFirestore(currentUser.uid)
      .then(response => {
        setDecks(response)
      })
      .catch((e) => console.log(e))
    //eslint-disable-next-line
  }, []);

  //here should be method which choose deck from decks array

  const onDeleteDeck = (deckId: string) => {
    deleteDeck(deckId);
    console.log(deckId);
    getUserDecksFromFirestore(currentUser.uid)
      .then(response => {
        setDecks(response)
      })
      .catch((e) => console.log(e))
  };

  const renderItems = (decks: DeckAppType[]) => {
    const items = decks.map((item, i) => {
      return (
        <DeckListItem 
          key={ i }
          deck={ item } 
          onDeleteDeck={ onDeleteDeck }
        />
      );
    });

    return items;
  }
  const elements = renderItems(decks);

  const warning = <h1>There is no decks yet</h1>;

  return (
    <>
      <div className="app-info">
        <h2>Select deck to learn</h2>
      </div>
      {loading && !decks.length ?
        <Spinner/> :
        <ul className="app-list list-group" style={ { 'border': '2px solid #505050' } }>
          { elements }
        </ul>
      }
    </>
  );
};

export default SelectDeckPage;
