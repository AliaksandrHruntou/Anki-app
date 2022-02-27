import './new-card-button.css';

const NewCardButton = ({ setCardModal }) => {
  return (
    <div tabIndex={ 0 } onClick={ () => setCardModal(true) } className="new-card-button">
      <h3>+ New card</h3>
    </div>
  );
};

export default NewCardButton;