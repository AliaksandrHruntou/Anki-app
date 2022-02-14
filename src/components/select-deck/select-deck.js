import { useState } from 'react';
import DeckListItem from '../deck-list-item/deck-list-item';

import './select-deck';

const store = require('store');

const SelectDeck = ({onSelectDeck}) => {

  const [titles, setTitles] = useState(store.get('titles'));

  const onDeleteDeck = (title) => {
    store.remove(title);
    const updatedTitles = titles;
    updatedTitles.forEach((item, i) => {
      if (item === title) {
        updatedTitles.splice(i, 1);
      }
    });
    setTitles((titles) => titles.filter(item => item !== title));
    store.set('titles', titles);
  }

  function renderItems(titles) {
    const items = titles.map(item => {
      return (
        <DeckListItem 
          title={item} 
          key={item} 
          onSelectDeck={onSelectDeck}
          onDeleteDeck={onDeleteDeck}
        />
      );
    });

    return items;
  }

  const elements = renderItems(titles);

  // const warning = <h1>There is no decks yet</h1>;

  return (
    <>
      <div className="app-info">
        <h2>Select deck to learn</h2>
      </div>
      <ul className="app-list list-group" style={{'border': '2px solid #505050'}}>
        {elements}
      </ul>
    </>
  );
};

export default SelectDeck;
