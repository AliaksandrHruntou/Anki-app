const store = require('store');

class ScheduleAlgorithm {

  findInterval = (currentDate, timestamp) => {
    return Math.floor((currentDate.getTime() - new Date(timestamp).getTime()) / 60000);
  }

  selectRepetitionCards = (deckItems) => {
    let currentDate = new Date();

    let sortedDeck = [];

    deckItems.forEach(item => {
      switch (item.rating) {
        case 2:
          if (this.findInterval(currentDate, item.date) >= 1) {
            sortedDeck = [...sortedDeck, item];
          }
          break;
        case 3:
          if (this.findInterval(currentDate, item.date) >= 10) {
            sortedDeck = [...sortedDeck, item];
          }
          break;
        case 4:
          if (this.findInterval(currentDate, item.date) >= 1440) {
            sortedDeck = [...sortedDeck, item];
          }
          break;
        case 5:
          if (this.findInterval(currentDate, item.date) >= 10080) {
            sortedDeck = [...sortedDeck, item];
          }
          break;
        default:
          return;
      }
    });

    return sortedDeck;
    
  }

  updateRepetitionInStorage = (deckItems, deckTitle) => {
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
}

export default ScheduleAlgorithm;