import CurrentCard from '../current-card/current-card';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button } from 'react-bootstrap';

import './create-deck.css';

const store = require('store');

const CreateDeck = ({deck, clearState, editMode, onSetEditMode}) => {

  const [items, setItems] = useState(deck.items);
  const [deckTitle, setDeckTitle] = useState(deck.deckTitle);
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
  }

  useEffect(() => {
    return () => {
      onSetEditMode(false);
    }
  }, []);

  const onAddDeckToLocalStorage = (key, values) => {
    const deck = {
      deckTitle: key,
      items: [...values]
    }

    store.set(key, deck);

    setItems([]);
    setDeckTitle('');
  }

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
    clearState();
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

  function renderCards(cardsArray) {
    const items = cardsArray.map((item, i) => {
      return <CurrentCard 
               editMode={editMode} 
               repetitionMode={false}
               front={item.front} 
               back={item.back} 
               key={i}
               onDeleteCard={onDeleteCard}
               id={i}
             />
    });

    return items;
  }

  const cards = renderCards(items);
  console.log(items);

  const endEditingMessage = "Editing completed!";

  const showDeckTitleModal = deckTitle || editMode
  ? null 
  : <DeckTitleModal onSubmitDeckTitle={onSubmitDeckTitle}/> ;

  const showNewCardButton = deckTitle 
  ? <NewCardButton setCardModal={setCardModal}/> 
  : null;

  const showCardModal = cardModal 
  ? <CardModal 
      cardModal={cardModal} 
      setCardModal={setCardModal}
      onSubmitNewCard={onSubmitNewCard}  
    /> 
  : null;

  const showEndEditing = editMode && !deckTitle && !items.length
  ? <CurrentCard 
      front={endEditingMessage} 
      back={endEditingMessage}
    />
  : null; 

  return (
    <>
      <div className='deck-panel'>
        <h1 
          data-type='deck-title' 
          onClick={(e) => console.log(e.currentTarget.getAttribute('data-type'))}>{deckTitle}</h1>
        {deckTitle &&       
          <Button onClick={() => onSubmitNewDeck(deckTitle, items)}>
            Save
          </Button>
        }
      </div>
      <div 
        className="deck-container" 
        style={
          editMode && !deckTitle ? {'display':'flex'} : null
        }
      >
        {showEndEditing}
        {showDeckTitleModal}
        {showNewCardButton}
        {showCardModal}
        {cards}
      </div>
    </>
  );
}

const DeckTitleModal = ({onSubmitDeckTitle}) => {
  
  return (
    <>
      <div className='deck-title-modal-container'>
        <form className="add-form d-flex" onSubmit={(e) => {
          e.preventDefault();
          onSubmitDeckTitle(e.target.elements[0].value)
        }}>
          <input 
            type="text"
            className="form-control new-post-label"
            placeholder="Name your deck"
            name="deckTitle"
          />
          <Button 
            type="submit" 
            variant="danger" 
            style={{'margin': '10px'}}>
            Add
          </Button>
        </form>
      </div>
    </>
  );
  
}

const NewCardButton = ({setCardModal}) => {
  return (
    <div tabIndex={0} onClick={() => setCardModal(true)} className="new-card-button">
      <h3>+ New card</h3>
    </div>
  );
}

const CardModal = ({cardModal, setCardModal, onSubmitNewCard}) => {
  if (cardModal) {
    return (
      <>
        <div className="overlay" onClick={() => setCardModal(false)}/>
        <div className='deck-title-modal-container' style={{'height':'200px'}}>
          <form className="add-form d-flex" onSubmit={(e) => {
            if (e.target.elements[0].value.length < 1 || e.target.elements[1].value.length < 1) return;
            e.preventDefault();
            onSubmitNewCard(e.target.elements[0].value, e.target.elements[1].value)
            setCardModal(false);
          }}>
            <input 
              type="text"
              className="form-control new-post-label"
              placeholder="Front"
              name="deckTitle"
            />
            <input 
              type="text"
              className="form-control new-post-label"
              placeholder="Back"
              name="deckTitle"
            />
            <Button 
              type="submit" 
              variant="danger" 
              style={{'margin': '10px'}}>
              Add
            </Button>
          </form>
        </div>
      </>
    );
  } else {
    return null;
  }
}

export default CreateDeck;