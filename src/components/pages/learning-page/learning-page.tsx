import { FC, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import FlashCard from "../../common/card/flashcard";
import DeckInfo from "./deck-info/deck-info";
import useScheduleAlgorithm from "../../../hooks/schedule-algorithm";

import './learning-page.css';
import { useAuth } from "../../contexts/auth-context";
import useFirestore from "../../../hooks/firestore";
import { ItemType } from "../../../types/types";
import Spinner from "../../common/spinner/spinner";

const LearningPage: FC = () => {
  const { updateDeck, getDeckFromFirestore, loading } = useFirestore();
  const { currentDeckId, mode } = useAuth();
  const { getCardsToLearning } = useScheduleAlgorithm();

  const [currentCard, setCurrentCard] = useState(0);
  const [cards, setCards] = useState<ItemType[]>([]);
  const [cardsForLearning, setCardsForLearning] = useState<ItemType[]>([]);
  const [message, setMessage] = useState<string>("There are no cards for learning:(");

  useEffect(() => {
    getDeckFromFirestore(currentDeckId)
      .then((response) => {
        setCards(response.items)
        const items = getCardsToLearning(response.items)
        setCardsForLearning(items)
      })
    //eslint-disable-next-line
  }, []);
  
  const onChangeRating = (
    prop: string, 
    cardsForLearning: ItemType[], 
    currentCard: number, 
    currentDeckId: string
  ) => {
    const card = cardsForLearning[currentCard];
    if (currentCard < cardsForLearning.length) {
      switch (prop) {
      case 'bad':
        setCards((items) => {
          items.forEach(item => {
            if (item.id === card.id) {
              item.rating = 2;
              item.date = new Date().toString();
            }
          })
          return items
        });
        setCurrentCard(currentCard + 1);
        break;
      case 'mid':
        setCards((items) => {
          items.forEach(item => {
            if (item.id === card.id) {
              switch (item.rating) {
              case 3:
                item.rating = 33;
                break;
              case 33:
                item.rating = 4;
                break;
              default:
                item.rating = 3;
              }
              item.date = new Date().toString();
            }
          })
          return items
        });
        setCurrentCard(currentCard + 1);
        break;
      case 'good':
        setCards((items) => {
          items.forEach(item => {
            if (item.id === card.id) {
              switch (item.rating) {
              case 4:
                item.rating = 44;
                break;
              case 44:
                item.rating = 444;
                break;
              default:
                item.rating = 4;
              }
              item.date = new Date().toString();
            }
          })
          return items
        });
        setCurrentCard(currentCard + 1);
        break;
      default:
        return;
      }
    }

    if (currentCard === cardsForLearning.length - 1) {
      updateDeck(currentDeckId, cards);
      setMessage("Learning completed!")
    }

  };

  const isLearning = currentCard < cardsForLearning.length;

  return (
    <>
      <DeckInfo 
        items={ cards }
      />     
      {loading ?
        <Spinner/> :
        <>
          <div className="main-table">
            <FlashCard
              id={'1'}
              onDeleteCard={() => console.log('hi')}
              repetitionMode={ true } 
              front={ isLearning ? cardsForLearning[currentCard].front : message }
              back={ isLearning ? cardsForLearning[currentCard].back : message }
              imgURL={ isLearning ? cardsForLearning[currentCard].imgURL : '' }
              description={ isLearning ? cardsForLearning[currentCard].description : '' }
              mode={ isLearning ? mode : null }
            />
          </div>
          <div className="edit-panel">
            { currentCard < cardsForLearning.length &&
              <div className="buttons">
                <Button 
                  onClick={
                    (e: any) => onChangeRating(
                      e.target.getAttribute('data-type'), 
                      cardsForLearning,
                      currentCard,
                      currentDeckId
                    )
                  }
                  variant="danger"
                  data-type="bad"
                >
                  Again
                </Button>
                <Button 
                  onClick={
                    (e: any) => onChangeRating(
                      e.target.getAttribute('data-type'), 
                      cardsForLearning,
                      currentCard,
                      currentDeckId
                    )              }
                  className="medium"
                  variant="warning"
                  data-type="mid"
                >
                  Good
                </Button>
                <Button 
                  onClick={
                    (e: any) => onChangeRating(
                      e.target.getAttribute('data-type'), 
                      cardsForLearning,
                      currentCard,
                      currentDeckId
                    )              }
                  variant="success"
                  data-type="good"
                >
                  Easy
                </Button>
              </div> 
            }
          </div>
        </>  
      }
    </>
  );
};

export default LearningPage;
