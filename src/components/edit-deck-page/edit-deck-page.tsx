import { FC, ReactElement, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from '../../contexts/auth-context';
import useFirestore from '../../hooks/firestore';
import { ItemType } from '../../types/types';

import FlashCard from '../common/card/flashcard';
import Modal from '../common/modal/modal';
import NewCardButton from '../common/new-card-button/new-card-button';

import './edit-deck-page.css';


type EditDeckPagePropsType = {
  clearState: () => void
}

const EditDeckPage: FC<EditDeckPagePropsType> = ({
  clearState 
}) => {

  const { currentDeck, editMode, setEditMode } = useAuth();
  const { updateDeck } = useFirestore();

  const [items, setItems] = useState<ItemType[]>(currentDeck.items);
  const [deckTitle, setDeckTitle] = useState(currentDeck.deckTitle);
  const [cardModal, setCardModal] = useState(false);

  const onAddToDeck = (front: string, back: string) => {
    const newCard = {
      front,
      back,
      rating: 1,
      date: new Date(),
      id: uuidv4()
    };

    setItems(items => [...items, newCard]);
  };
  
  useEffect(() => {//how to work useEffect
    setEditMode(false);
  }, [setEditMode]);

  const onAddUpdatedDeckToFirestore = (deckId: string, items: ItemType[]) => {

    updateDeck(deckId, items);

    setItems([]);
    setDeckTitle('');
  };

  const onSubmitNewCard = (front: string, back: string) => {
    if (front.length < 1 || back.length < 1) return;
    onAddToDeck(front, back);
  };

  const onSubmitNewDeck = (deckId: string, items: ItemType[]) => {
    onAddUpdatedDeckToFirestore(deckId, items);
    clearState();
  };

  const onDeleteCard = (id: number) => {
    setItems(items => {
      let newItems: Array<ItemType> = [];
      items.forEach((item, i) => {
        if (id === i) {
          newItems = [...items.slice(0, i), ...items.slice(i + 1)];
        }
      });
      return newItems;
    });
  };

  const renderCards = (cardsArray: ItemType[]): ReactElement[]=> {
    const items = cardsArray.map((item, i) => {
      return <FlashCard 
        editMode={ editMode } 
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
  
  const endEditingMessage = "Editing completed!";

  const showNewCardButton = deckTitle && <NewCardButton setCardModal={ setCardModal }/>;

  const showCardModal = cardModal  &&
    <Modal 
      cardModal={ cardModal } 
      setCardModal={ setCardModal }
      onSubmitNewCard={ onSubmitNewCard }  
    />;

  // const showEndEditing = editMode && !deckTitle && !items.length
  //   ? <FlashCard 
  //     front={ endEditingMessage } 
  //     back={ endEditingMessage }
  //   />
  //   : null; 

  return (
    <>
      <div className='deck-panel'>
        <h1 
          data-type='deck-title' 
          onClick={ (e) => console.log(e.currentTarget.getAttribute('data-type')) }>{ currentDeck.deckTitle }</h1>
        { deckTitle &&       
          <Button onClick={ () => onSubmitNewDeck(currentDeck.deckId, items) }>
            Save
          </Button>
        }
      </div>
      <div 
        className="deck-container" 
        style={
          editMode && !deckTitle ? { 'display':'flex' } : {}
        }
      >
        {/* { showEndEditing } */}
        { showNewCardButton }
        { showCardModal }
        { cards }
      </div>
    </>
  );
};

export default EditDeckPage;