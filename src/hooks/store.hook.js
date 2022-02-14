const store = require('store');

const useStorage = () => {

  const getDeckFromStorage = (deckTitle) => {
    const deckFromStorage = store.get(deckTitle);
  }
}

export default getDeckFromStorage;