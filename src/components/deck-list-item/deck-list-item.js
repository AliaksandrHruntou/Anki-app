import React from 'react';

const DeckListItem = (props) => {

    const {title} = props;

    return (
        <li className="list-group-item d-flex justify-content-between">
            <span className="list-group-item-label">{title}</span>
        </li>
    );
};

export default DeckListItem;