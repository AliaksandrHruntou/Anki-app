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
import FileInput from '../../common/file-input/file-input';
import { Link } from 'react-router-dom';

const CreateDeckPage: FC = () => {

  const [items, setItems] = useState<ItemType[]>([]);
  const [deckTitle, setDeckTitle] = useState("");
  const [cardModal, setCardModal] = useState(false);
  const [currentCard, setCurrentCard] = useState({})

  const { createDeck } = useFirestore();
  const { currentUser} = useAuth();

  const onAddToDeck = (front: string, back: string, description: string = '', imgURL: string = '') => {
    const newCard: ItemType = {
      front,
      back,
      description,
      imgURL,
      rating: 1,
      date: new Date().toString(),
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

  const onSubmitNewCard = (
    front: string, 
    back: string, 
    description: string, 
    imgURL: string,
    id?: string
  ) => {
    if (front.length < 1 || back.length < 1 || description.length > 150) return;
    if (id) {
      setItems(items => {
        items.forEach((item) => {
          if (item.id === id) {
            item.front = front
            item.back = back
            item.description = description
            item.imgURL = imgURL
          }
        })
        return items;
      })
    } else {
      onAddToDeck(front, back, description, imgURL);
    }
  };

  const onSubmitDeckTitle = (title: string) =>{
    if (title.length < 1) return;
    setDeckTitle(title);
  };

  const onSubmitNewDeck = (deckTitle: string, items: ItemType[]) => {
    onAddDeckToFirestore(deckTitle, items);
  };

  const onDeleteCard: (id: string) => void = (id) => {
    setItems(items => {
      let newItems: ItemType[] = [];
      items.forEach((item, i) => {
        if (id === item.id) {
          newItems = [...items.slice(0, i), ...items.slice(i + 1)];
        }
      });
      return newItems;
    });
  };

  const handleDataFromFile = (fileContent: string | ArrayBuffer | null) => {
    let text = fileContent as string;
    const regExpForCard = /^[\w \d+.-]+;[А-Яа-я\d+. -]+$/gm;
    text.match(regExpForCard)?.forEach(item => {
      const cardBasis = item.split(/;/)
      console.log(`front: ${cardBasis[0]}\nback: ${cardBasis[1]}`)
      onAddToDeck(cardBasis[0], cardBasis[1]);
    })
  }

  const renderCards = (cardsArray: ItemType[]) => {
    const items = cardsArray.map((item, i) => {
      return <FlashCard
        editMode={true}
        front={ item.front } 
        back={ item.back }
        imgURL={ item.imgURL }
        description = { item.description }
        key={ i }
        onDeleteCard={ onDeleteCard }
        id={ item.id }
        setCardModal={ setCardModal }
        setCurrentCard={setCurrentCard}
      />;
    });

    return items;
  };

  const cards = renderCards(items);
  
  const showDeckTitleModal = !deckTitle && <DeckTitleModal onSubmitDeckTitle={ onSubmitDeckTitle }/> ;

  const showNewCardButton = deckTitle && <NewCardButton setCardModal={ setCardModal }/>;

  const showCardModal = cardModal  &&
    <Modal 
      currentCard={currentCard}
      setCurrentCard={setCurrentCard}
      cardModal={ cardModal } 
      setCardModal={ setCardModal }
      onSubmitNewCard={ onSubmitNewCard }  
    />;

  return (
    <>
      <div className='deck-panel'>
        <h1 
          data-type='deck-title' 
          onClick={ 
            (e) => console.log(e.currentTarget.getAttribute('data-type')) 
          }
        >
          { deckTitle }
        </h1>
        { deckTitle && 
          <>
            <div className='d-flex justify-content-between'>
              <FileInput handleDataFromFile={ handleDataFromFile }/>
            </div>
            <Link to="/select-deck-page">
              <Button onClick={ () => onSubmitNewDeck(deckTitle, items) }>
                Save
              </Button>
            </Link>
          </>
        }
      </div>
      <div className="deck-container mt-2">
        { showDeckTitleModal }
        { showNewCardButton }
        { showCardModal }
        { cards }
      </div>
    </>
  );
};

export default CreateDeckPage;