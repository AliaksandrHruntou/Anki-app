import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Card from "../common/card/card";
import DeckInfo from "../deck-info/deck-info";
import useScheduleAlgorithm from "../../hooks/schedule-algorithm";

import './main-table-page.css';

const MainTablePage = ({ deck, mode, clearState }) => {

  const { items, deckTitle } = deck;

  const [currentCard, setCurrentCard] = useState(0);
  const [cards, setCards] = useState(items);

  const { updateRepetitionInStorage } = useScheduleAlgorithm(); 

  useEffect(() => {
    if (cards) {
      updateRepetitionInStorage(cards, deckTitle);
    }
  }, [cards, deckTitle, updateRepetitionInStorage]);

  useEffect(() => {
    return () => {
      clearState();
    };
  }, [clearState]);
  
  const onChangeRating = (prop) => {
    const deck = [...cards];
    const card = deck[currentCard];
    console.log(currentCard);
    if (currentCard < items.length) {
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

  };

  const endMessage = "Learning Completed!";
  const isLearning = currentCard < items.length;

  return (
    <>
      <DeckInfo items={ items }/>     
      <div className="main-table">
        <Card 
          repetitionMode={ true } 
          front={ isLearning ? items[currentCard].front : endMessage }
          back={ isLearning ? items[currentCard].back : endMessage }
          mode={ isLearning ? mode : null }
        />
      </div>
      <div className="edit-panel">
        { currentCard < items.length &&
          <div className="buttons">
            <Button 
              onClick={ (e) => onChangeRating(e.target.getAttribute('data-type')) }
              variant="danger"
              data-type="bad"
            >
              Again
            </Button>
            <Button 
              onClick={ (e) => onChangeRating(e.target.getAttribute('data-type')) }
              className="medium"
              variant="warning"
              data-type="mid"
            >
              Good
            </Button>
            <Button 
              onClick={ (e) => onChangeRating(e.target.getAttribute('data-type')) }
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
