import { Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const DeckListItem = ({ title, onSelectDeck, onDeleteDeck }) => {

  return (
    <li className="list-group-item d-flex justify-content-between">
      <LinkContainer 
        to="/main-table-page" 
        onClick={ () => onSelectDeck(title) }
        style={ { 'cursor': 'pointer', 'marginTop': '15px' } }
      >
        <span className="list-group-item-label" data-deck={ title }>
          { title }
        </span>
      </LinkContainer>
      <div className="button-container">
        <LinkContainer to="/edit-deck-page" onClick={ () => onSelectDeck(title, true) }>
          <Button variant="secondary">Edit</Button>
        </LinkContainer>
        <Button 
          variant="danger" 
          style={ { 'marginLeft': '20px' } }
          onClick={ () => onDeleteDeck(title) }
        >Delete</Button>
      </div>
    </li>
  );
};

export default DeckListItem;
