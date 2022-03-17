import { FC } from "react";
import { Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useAuth } from "../../../contexts/auth-context";
import useFirestore from "../../../../hooks/firestore";
import useScheduleAlgorithm from "../../../../hooks/schedule-algorithm";
import { DeckAppType } from "../../../../types/types";

type DeckListItemPropsType = {
  deck: DeckAppType
  onDeleteDeck: (deckId: string) => void
}

const DeckListItem: FC<DeckListItemPropsType> = ({
  deck,
  onDeleteDeck
}) => {

  const { setEditMode, setCurrentDeck } = useAuth();
  const { getDeckFromFirestore} = useFirestore();
  const { selectRepetitionCards } = useScheduleAlgorithm();

  const onSelectDeck = (deckId: string, editMode: boolean) => {
    setEditMode(editMode);
    if (!editMode) {
      getDeckFromFirestore(deckId)
        .then(response => setCurrentDeck(response))
        .catch((e) => console.log(e))
    }
  };

  return (
    <li className="list-group-item d-flex justify-content-between">
      <LinkContainer 
        to="/main-table-page" 
        onClick={ () => setCurrentDeck(deck)}
        style={ { 'cursor': 'pointer', 'marginTop': '15px' } }
      >
        <span className="list-group-item-label" data-deck={ deck.deckTitle }>
          { deck.deckTitle }
        </span>
      </LinkContainer>
      <div className="button-container">
        <LinkContainer to="/edit-deck-page" onClick={ () => setCurrentDeck(deck)}>
          <Button variant="secondary">Edit</Button>
        </LinkContainer>
        <Button 
          variant="danger" 
          style={ { 'marginLeft': '20px' } }
          onClick={ () => onDeleteDeck(deck.deckId) }
        >
          Delete
        </Button>
      </div>
    </li>
  );
};

export default DeckListItem;
