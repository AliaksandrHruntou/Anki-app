import DeckListItem from '../deck-list-item/deck-list-item';
import { Link } from 'react-router-dom';

import './select-deck';

const store = require('store');

const SelectDeck = (props) => {

    let deckTitles = store.get('titles');

    const elements = deckTitles.map(item => {
        return (
            <DeckListItem title={item} key={item} onSelectDeck={props.onSelectDeck} />
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
