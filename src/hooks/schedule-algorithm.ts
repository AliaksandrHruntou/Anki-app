import { DeckAppType, ItemType } from "../types/types";

const store = require('store');

const useScheduleAlgorithm = () => {

  const calculateInterval = (date: Date, timestamp: string | Date) => {
    return Math.floor((date.getTime() - new Date(timestamp).getTime()) / 60000);
  };

  const selectRepetitionCards = (deckItems: ItemType[]) => {
    const currentDate = new Date();

    let sortedDeck: ItemType[] = [];

    deckItems.forEach(item => {
      switch (item.rating) {
      case 2:
        if (calculateInterval(currentDate, item.date) >= 1) {
          sortedDeck = [...sortedDeck, item];
        }
        break;
      case 3:
        if (calculateInterval(currentDate, item.date) >= 10) {
          sortedDeck = [...sortedDeck, item];
        }
        break;
      case 4:
        if (calculateInterval(currentDate, item.date) >= 1440) {
          sortedDeck = [...sortedDeck, item];
        }
        break;
      case 5:
        if (calculateInterval(currentDate, item.date) >= 10080) {
          sortedDeck = [...sortedDeck, item];
        }
        break;
      default:
        sortedDeck = [...deckItems];
      }
    });

    return sortedDeck;
    
  };

  const updateRepetitionInStorage = (deckItems: ItemType[], deckTitle: string) => {
    let deck = store.get(deckTitle);
    
    for (let i = 0; i < deckItems.length; i++) {

      for (let j = 0; j < deck.items.length; j++) {
        
        if (deck.items[j].id === deckItems[i].id) {
          
          deck.items[j].rating = deckItems[i].rating;
          deck.items[j].date = deckItems[i].date;

        }
      }
    }
    
    store.set(deckTitle, deck);
  
  };

  return { selectRepetitionCards, updateRepetitionInStorage };
};

export default useScheduleAlgorithm;
