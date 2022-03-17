import { FC, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';

import FlashCard from '../../common/card/flashcard';
import Modal from '../../common/modal/modal';
import NewCardButton from '../../common/new-card-button/new-card-button';
import DeckTitleModal from '../../common/deck-title-modal/deck-title-modal';

import './create-deck-page.css';
import useFirestore from '../../../hooks/firestore';
import { useAuth } from '../../contexts/auth-context';
import { ItemType } from '../../../types/types';

const CreateDeckPage: FC = () => {

  const [items, setItems] = useState<ItemType[]>([]);
  const [deckTitle, setDeckTitle] = useState("");
  const [cardModal, setCardModal] = useState(false);

  const { createDeck } = useFirestore();
  const { currentUser } = useAuth();

  const onAddToDeck = (front: string, back: string) => {
    const newCard: ItemType = {
      front,
      back,
      rating: 1,
      date: new Date(),
      id: uuidv4()
    };

    setItems(items => [...items, newCard]);
  };

  const onAddDeckToFirestore = (key: string, values: ItemType[]) => {
    const deck = {
      deckTitle: key,
      items: [...values],
      userId: currentUser.uid
    };

    createDeck(deck);

    setItems([]);
    setDeckTitle('');
  };

  const onSubmitNewCard = (front: string, back: string) => {
    if (front.length < 1 || back.length < 1) return;
    onAddToDeck(front, back);
  };

  const onSubmitDeckTitle = (title: string) =>{
    if (title.length < 1) return;
    setDeckTitle(title);
  };

  const onSubmitNewDeck = (deckTitle: string, items: ItemType[]) => {
    onAddDeckToFirestore(deckTitle, items);
  };

  const onDeleteCard: (id: number) => void = (id) => {
    console.log(id);
    setItems(items => {
      let newItems: ItemType[] = [];
      items.forEach((item, i) => {
        if (id === i) {
          newItems = [...items.slice(0, i), ...items.slice(i + 1)];
        }
      });
      return newItems;
    });
  };

  const renderCards = (cardsArray: ItemType[]) => {
    const items = cardsArray.map((item, i) => {
      return <FlashCard
        repetitionMode={ false }
        front={ item.front } 
        back={ item.back } 
        key={ i }
        onDeleteCard={ onDeleteCard }
        id={ i }
      />;
    });

    return items;
  };

  const cards = renderCards(items);
  
  const showDeckTitleModal = !deckTitle && <DeckTitleModal onSubmitDeckTitle={ onSubmitDeckTitle }/> ;

  const showNewCardButton = deckTitle && <NewCardButton setCardModal={ setCardModal }/>;

  const showCardModal = cardModal  &&
    <Modal 
      cardModal={ cardModal } 
      setCardModal={ setCardModal }
      onSubmitNewCard={ onSubmitNewCard }  
    />;

  return (
    <>
      <div className='deck-panel'>
        <h1 
          data-type='deck-title' 
          onClick={ (e) => console.log(e.currentTarget.getAttribute('data-type')) }>{ deckTitle }</h1>
        { deckTitle &&       
          <Button onClick={ () => onSubmitNewDeck(deckTitle, items) }>
            Save
          </Button>
        }
      </div>
      <div className="deck-container">
        { showDeckTitleModal }
        { showNewCardButton }
        { showCardModal }
        { cards }
      </div>
    </>
  );
};

export default CreateDeckPage;