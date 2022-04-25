import { FC, useEffect, useState } from 'react';
import { useAuth } from '../../contexts/auth-context';
import useFirestore from '../../../hooks/firestore';
import { DeckAppType, ItemType } from '../../../types/types';
import Spinner from '../../common/spinner/spinner';
import DeckListItem from './deck-list-item/deck-list-item';
import { saveAs } from "file-saver";

import './select-deck-page.css';
import ErrorBoundary from '../../common/error-boundary/error-boundary';
import { Button, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const SelectDeckPage: FC = () => {

  const [decks, setDecks] = useState<DeckAppType[]>([]);

  const { deleteDeck, getUserDecksFromFirestore, loading } = useFirestore();
  const { currentUser } = useAuth();

  useEffect(() => {
    getUserDecksFromFirestore(currentUser.uid)
      .then(response => setDecks(response))
      .catch((e) => console.log(e))
    //eslint-disable-next-line
  }, []);

  const onDeleteDeck = (deckId: string) => {
    deleteDeck(deckId);
    console.log(deckId);
    getUserDecksFromFirestore(currentUser.uid)
      .then(response => {
        setDecks(response)
      })
      .catch((e) => console.log(e))
  };

  const exportDeck = (deckItems: Array<ItemType>, deckTitle: string) => {
    const itemsArray: string[] = []
    deckItems.forEach(item => (
      itemsArray.push(`${item.front};${item.back}`)
    ))
    const fileText = itemsArray.join('\n')
    const blob = new Blob([fileText], {type: "text/plain;charset=utf-8"})
    saveAs(blob, deckTitle);
  }

  const renderItems = (decks: DeckAppType[]) => {
    const items = decks.map((item, i) => {
      return (
        <DeckListItem 
          key={ i }
          deck={ item } 
          onDeleteDeck={ onDeleteDeck }
          exportDeck={ exportDeck }
        />
      );
    });

    return items;
  }
  const elements = renderItems(decks);

  const warning = <h1>There is no decks yet</h1>;

  return (
    <Container>
      {loading && !decks.length ?
        <Spinner/> :
        <>
          <div className="app-info">
            <h2>Select deck for learning</h2>
          </div>
          <ul className="app-list list-group" style={ { 'border': '2px solid #505050' } }>
            { elements.length 
              ? elements
              : <Container className="p-5">
                <h2 className="text-center">There is no decks yet...</h2>
                <Container className="text-center mt-4">
                  <LinkContainer to="/create-deck-page">
                    <Button variant="success" size="lg">Create Deck</Button>
                  </LinkContainer>
                </Container>
              </Container> }
          </ul>
        </>
      }
    </Container>
  );
};

export default SelectDeckPage;
