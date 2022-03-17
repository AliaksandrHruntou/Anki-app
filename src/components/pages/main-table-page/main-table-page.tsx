import { FC, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import FlashCard from "../../common/card/flashcard";
import DeckInfo from "./deck-info/deck-info";
import useScheduleAlgorithm from "../../../hooks/schedule-algorithm";

import './main-table-page.css';
import { useAuth } from "../../contexts/auth-context";
import useFirestore from "../../../hooks/firestore";

const MainTablePage: FC = () => {
  const { updateDeck } = useFirestore();
  const { currentDeck, mode } = useAuth();
  const { items, deckTitle } = currentDeck;

  const [currentCard, setCurrentCard] = useState(0);
  const [cards, setCards] = useState(items);

  const { updateRepetitionInStorage } = useScheduleAlgorithm();

  // useEffect(() => {
  //   if (cards) {
  //     updateRepetitionInStorage(cards, deckTitle);
  //   }
  // }, [cards, deckTitle, updateRepetitionInStorage]);


  
  const onChangeRating = (prop: string) => {
    const deck = [...cards];
    const card = deck[currentCard];
    console.log('current card: ', currentCard);
    console.log('cards count: ', cards.length);
    if (currentCard < cards.length) {
      switch (prop) {
      case 'bad':
        deck.forEach(item => {
          if (item.id === card.id) {
            item.rating = 2;
            item.date = new Date();
          }
        });
        setCards(deck);
        setCurrentCard(currentCard + 1);
        break;
      case 'mid':
        deck.forEach(item => {
          if (item.id === card.id) {
            item.rating = 3;
            item.date = new Date();
          }
        });
        setCards(deck);
        setCurrentCard(currentCard + 1);
        break;
      case 'good':
        deck.forEach(item => {
          if (item.id === card.id) {
            item.rating = 4;
            item.date = new Date();
          }
        });
        setCards(deck);
        setCurrentCard(currentCard + 1);
        break;
      default:
        return;
      }
    }

    if (currentCard === cards.length - 1) {
      console.log(cards);
      updateDeck(currentDeck.deckId, cards);
    }

  };

  const endMessage = "Learning Completed!";
  const isLearning = currentCard < cards.length;

  return (
    <>
      <DeckInfo items={ cards }/>     
      <div className="main-table">
        <FlashCard
          id={1}
          onDeleteCard={() => console.log('hi')}
          repetitionMode={ true } 
          front={ isLearning ? cards[currentCard].front : endMessage }
          back={ isLearning ? cards[currentCard].back : endMessage }
          mode={ isLearning ? mode : null }
        />
      </div>
      <div className="edit-panel">
        { currentCard < cards.length &&
          <div className="buttons">
            <Button 
              onClick={
                (e: any) => onChangeRating(e.target.getAttribute('data-type'))
              }
              variant="danger"
              data-type="bad"
            >
              Again
            </Button>
            <Button 
              onClick={
                (e: any) => onChangeRating(e.target.getAttribute('data-type'))
              }
              className="medium"
              variant="warning"
              data-type="mid"
            >
              Good
            </Button>
            <Button 
              onClick={
                (e: any) => onChangeRating(e.target.getAttribute('data-type'))
              }
              variant="success"
              data-type="good"
            >
              Easy
            </Button>
          </div> }
      </div>
    </>
  );

};

export default MainTablePage;
