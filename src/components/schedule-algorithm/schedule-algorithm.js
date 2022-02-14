const store = require('store');

const ScheduleAlgorithm = () => {

  const findInterval = (date, timestamp) => {
    return Math.floor((date.getTime() - new Date(timestamp).getTime()) / 60000);
  }

  const selectRepetitionCards = (deckItems) => {
    const currentDate = new Date();

    let sortedDeck = [];

    deckItems.forEach(item => {
      switch (item.rating) {
        case 2:
          if (findInterval(currentDate, item.date) >= 1) {
            sortedDeck = [...sortedDeck, item];
          }
          break;
        case 3:
          if (findInterval(currentDate, item.date) >= 10) {
            sortedDeck = [...sortedDeck, item];
          }
          break;
        case 4:
          if (findInterval(currentDate, item.date) >= 1440) {
            sortedDeck = [...sortedDeck, item];
          }
          break;
        case 5:
          if (findInterval(currentDate, item.date) >= 10080) {
            sortedDeck = [...sortedDeck, item];
          }
          break;
        default:
          sortedDeck = [...deckItems];
      }
    });

    return sortedDeck;
    
  }

  const updateRepetitionInStorage = (deckItems, deckTitle) => {
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
  
  }

  return {selectRepetitionCards, updateRepetitionInStorage};
}

export default ScheduleAlgorithm;