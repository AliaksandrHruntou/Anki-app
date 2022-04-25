import { FC, ReactElement, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from '../../contexts/auth-context';
import useFirestore from '../../../hooks/firestore';
import { ItemType } from '../../../types/types';

import FlashCard from '../../common/card/flashcard';
import Modal from '../../common/modal/modal';
import NewCardButton from '../../common/new-card-button/new-card-button';

import './edit-deck-page.css';;
import FileInput from '../../common/file-input/file-input';
import { Link } from 'react-router-dom';

const EditDeckPage: FC = () => {

  const { mode, editMode, setEditMode, currentDeckId } = useAuth();
  const { updateDeck, getDeckFromFirestore } = useFirestore();

  const [items, setItems] = useState<ItemType[]>([]);
  const [deckTitle, setDeckTitle] = useState<string>('');
  const [deckId, setDeckId] = useState<string>('');
  const [cardModal, setCardModal] = useState(false);
  const [currentCard, setCurrentCard] = useState({})

  const onAddToDeck = (front: string, back: string, description: string = '', imgURL: string = '') => {
    const newCard = {
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
  
  useEffect(() => {
    setEditMode(false);
  }, [setEditMode]);

  useEffect(() => {
    getDeckFromFirestore(currentDeckId)
      .then((response) => {
        setItems(response.items)
        setDeckTitle(response.deckTitle)
        setDeckId(response.deckId)
      })
  //eslint-disable-next-line
  }, [])

  const onAddUpdatedDeckToFirestore = (deckId: string, items: ItemType[]) => {

    updateDeck(deckId, items);

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

  const onSubmitNewDeck = (deckId: string, items: ItemType[]) => {
    onAddUpdatedDeckToFirestore(deckId, items);
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

  const onDeleteCard = (id: string) => {
    setItems(items => {
      let newItems: Array<ItemType> = [];
      items.forEach((item, i) => {
        if (id === item.id) {
          newItems = [...items.slice(0, i), ...items.slice(i + 1)];
        }
      });
      return newItems;
    });
  };

  const renderCards = (cardsArray: ItemType[]): ReactElement[]=> {
    const items = cardsArray.map((item, i) => {
      return <FlashCard 
        editMode={ true } 
        mode={ mode }
        front={ item.front } 
        back={ item.back }
        imgURL={ item.imgURL }
        description={ item.description }
        key={ i }
        onDeleteCard={ onDeleteCard }
        id={ item.id }
        setCardModal={ setCardModal }
        setCurrentCard={ setCurrentCard }
      />;
    });

    return items;
  };

  const cards = renderCards(items);
  
  const endEditingMessage = "Editing completed!";

  const showNewCardButton = deckTitle && <NewCardButton setCardModal={ setCardModal }/>;

  const showCardModal = cardModal  &&
    <Modal 
      currentCard={ currentCard }
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
          onClick={ (e) => console.log(e.currentTarget.getAttribute('data-type')) }>{ deckTitle }</h1>
        <div className='d-flex justify-content-between'>
          <FileInput handleDataFromFile={ handleDataFromFile }/>
        </div>
        { deckTitle &&       
          <Link to="select-deck-page">
            <Button onClick={ () => onSubmitNewDeck(deckId, items) }>
              Save
            </Button>
          </Link>
        }
      </div>
      <div 
        className="edit-deck-container" 
        style={
          editMode && !deckTitle ? { 'display':'flex' } : {}
        }
      >
        { showNewCardButton }
        { showCardModal }
        { cards }
      </div>
    </>
  );
};

export default EditDeckPage;