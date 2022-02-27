import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';

import Card from '../common/card/card';
import Modal from '../common/modal/modal';
import NewCardButton from '../common/new-card-button/new-card-button';
import DeckTitleModal from '../common/deck-title-modal/deck-title-modal';

import './create-deck-page.css';

const store = require('store');

const CreateDeckPage = () => {

  const [items, setItems] = useState([]);
  const [deckTitle, setDeckTitle] = useState("");
  const [cardModal, setCardModal] = useState(false);

  const onAddToDeck = (front, back) => {
    const newCard = {
      front,
      back,
      rating: 1,
      date: new Date(),
      id: uuidv4()
    };

    setItems(items => [...items, newCard]);
  };

  const onAddDeckToLocalStorage = (key, values) => {
    const deck = {
      deckTitle: key,
      items: [...values]
    };

    store.set(key, deck);

    setItems([]);
    setDeckTitle('');
  };

  const onSubmitNewCard = (front, back) => {
    if (front.length < 1 || back.length < 1) return;
    onAddToDeck(front, back);
  };

  const onAddTitleToLocalStorage = (title) => {
    const titles = store.get('titles');
    if (titles.includes(title)) return;
    if (titles) {
      const newTitles = [...titles, title];
      store.set('titles', newTitles);
    } else {
      const newTitles = [title];
      store.set('titles', newTitles);
    }
  };

  const onSubmitDeckTitle = (title) =>{
    if (title.length < 1) return;
    setDeckTitle(title);
  };

  const onSubmitNewDeck = () => {
    onAddTitleToLocalStorage(deckTitle);
    onAddDeckToLocalStorage(deckTitle, items);
  };

  const onDeleteCard = (id) => {
    console.log(id);
    setItems(items => {
      let newItems = [];
      items.forEach((item, i) => {
        if (id === i) {
          newItems = [...items.slice(0, i), ...items.slice(i + 1)];
        }
      });
      return newItems;
    });
  };

  const renderCards = cardsArray => {
    const items = cardsArray.map((item, i) => {
      return <Card
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