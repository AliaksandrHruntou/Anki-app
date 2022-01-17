import DeckListItem from '../deck-list-item/deck-list-item';

import './select-deck';

const store = require('store');

const SelectDeck = () => {

    let deckTitles = store.get('titles');

    const elements = deckTitles.map(item => {
        return (
            <DeckListItem title={item} />
        );
    });

    return (
        <>
            <div className="app-info">
                <h2>Выберите колоду</h2>
            </div>
            <ul className="app-list list-group">
                {elements}
            </ul>
        </>
    );
};

export default SelectDeck;
