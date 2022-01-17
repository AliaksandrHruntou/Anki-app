import { Link } from "react-router-dom";

const DeckListItem = (props) => {

    const {title} = props;

    return (
        <li className="list-group-item d-flex justify-content-between">
            <Link to="/main-table" onClick={(e) => props.onSelectDeck(e.target.getAttribute('data-deck'))}>
                <span className="list-group-item-label" data-deck={title}>{title}</span>
            </Link>
        </li>
    );
};

export default DeckListItem;