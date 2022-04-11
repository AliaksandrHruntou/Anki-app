import { FC } from "react";
import { Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useAuth } from "../../../contexts/auth-context";
import useFirestore from "../../../../hooks/firestore";
import { DeckAppType, ItemType } from "../../../../types/types";

type DeckListItemPropsType = {
  deck: DeckAppType
  onDeleteDeck: (deckId: string) => void
  exportDeck: (deck: Array<ItemType>, deckTitle: string) => void
}

const DeckListItem: FC<DeckListItemPropsType> = ({
  deck,
  onDeleteDeck,
  exportDeck
}) => {

  const { setEditMode, setCurrentDeckId } = useAuth();
  const { getDeckFromFirestore} = useFirestore();

  return (
    <li className="list-group-item d-flex justify-content-between">
      <LinkContainer 
        to="/main-table-page" 
        onClick={ () => setCurrentDeckId(deck.deckId) }
        style={ { 'cursor': 'pointer' } }
      >
        <div 
          className="d-flex align-items-center" 
          data-deck={ deck.deckTitle }
        >
          { deck.deckTitle }
        </div>
      </LinkContainer>
      <div className="button-container">
        <LinkContainer
          to="/main-table-page" 
          onClick={ () => setCurrentDeckId(deck.deckId) }
        >
          <Button variant="success">Learn</Button>
        </LinkContainer>
        <LinkContainer to="/edit-deck-page" onClick={ () => setCurrentDeckId(deck.deckId) }>
          <Button className="ml-3" variant="secondary">Edit</Button>
        </LinkContainer>
        <Button className="ml-3" variant="primary" onClick={() => exportDeck(deck.items, deck.deckTitle)}>
          Export
        </Button>
        <Button 
          className="ml-3"
          variant="danger"
          onClick={ () => onDeleteDeck(deck.deckId) }
        >
          Delete
        </Button>
      </div>
    </li>
  );
};

export default DeckListItem;
