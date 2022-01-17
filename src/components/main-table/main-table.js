import { Component } from "react";
import { Button } from "react-bootstrap";
import CurrentCard from "../current-card/current-card";

import './main-table.css';

class MainTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentCard: 0,
            prevCard: 0,
            cards: this.props.deck,
            cardsLength: this.props.deck.length
        }
    }

    changeCards(change) {
        const { length } = this.props.deck;
        const prevCard = this.state.currentCard;
        let currentCard = prevCard + change;
        if (currentCard < 0) currentCard = length - 1;
        if (currentCard >= length) currentCard = 0;
        this.setState({
            currentCard,
            prevCard
        });
    }

    render() {

        const {currentCard} = this.state;
        const {deck} = this.props;

        return (
            <>
                <div className="main-table">
                <div><button className="btn" onClick={() => this.changeCards(-1)}>Назад</button></div>
                <CurrentCard eng={deck[currentCard].eng} rus={deck[currentCard].rus}/>
                <div><button className="btn" onClick={() => this.changeCards(1)}>Вперед</button></div>
                </div>
                <div className="edit-panel">
                    <div className="buttons">
                        <Button variant="danger">Плохо</Button>
                        <Button className="medium" variant="warning">Средне</Button>
                        <Button variant="success">Хорошо</Button>
                    </div>
                    <div className="all-in-one-page">
                        <Button variant="secondary">Показать все</Button>
                    </div>
                </div>
            </>
        );

    }
}

export default MainTable;