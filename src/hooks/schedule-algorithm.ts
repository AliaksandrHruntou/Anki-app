import { ItemType } from "../types/types";

const useScheduleAlgorithm = () => {

  const calculateInterval = (date: Date, timestamp: string) => {
    return Math.floor((date.getTime() - new Date(timestamp).getTime()) / 60000);
  };

  const getCardsToLearning = (deckItems: ItemType[]) => {
    const currentDate = new Date();
    let sortedDeck: ItemType[] = [];

    deckItems.forEach(item => {
      switch (item.rating) {
      case 1:
        sortedDeck = [...sortedDeck, item];
        break;
      case 2:
        if (calculateInterval(currentDate, item.date) >= 2) {
          sortedDeck = [...sortedDeck, item];
        }
        break;
      case 3:
        if (calculateInterval(currentDate, item.date) >= 10) {
          sortedDeck = [...sortedDeck, item];
        }
        break;
      case 33:
        if (calculateInterval(currentDate, item.date) >= 60) {
          sortedDeck = [...sortedDeck, item];
        }
        break;
      case 4:
        if (calculateInterval(currentDate, item.date) >= 300) {
          sortedDeck = [...sortedDeck, item];
        }
        break;
      case 44:
        if (calculateInterval(currentDate, item.date) >= 7200) {
          sortedDeck = [...sortedDeck, item];
        }
        break;
      default:
        return
      }
    });

    return sortedDeck;
  };

  return {  getCardsToLearning };
};

export default useScheduleAlgorithm;
