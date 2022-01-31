import { Component } from "react";
import { Button } from "react-bootstrap";
import CurrentCard from "../current-card/current-card";
import ScheduleAlgorithm from "../schedule-algorithm/schedule-algorithm";

import './main-table.css';

class MainTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentCard: 0,
            cards: [...this.props.deck.items],
            cardsLength: this.props.deck.items.length
        }
    }

    scheduleAlgorithm = new ScheduleAlgorithm();    

    componentWillUnmount() {
        if (this.state.cards) {
            this.scheduleAlgorithm.updateRepetitionInStorage(this.state.cards, this.props.deck.deckTitle);
        }
    }
    
    onChangeRating = (prop) => {
        const {currentCard, cardsLength} = this.state;
        let deck = [...this.state.cards];
        const card = deck[currentCard];

        if (currentCard < cardsLength) {
            switch (prop) {
                case 'bad':
                    deck.forEach(item => {
                        if (item.id === card.id) {
                            item.rating = 2;
                            item.date = new Date();
                        }
                    });
                    this.setState({
                        cards: deck,
                        currentCard: currentCard + 1
                    });
                    break;
                case 'mid':
                    deck.forEach(item => {
                        if (item.id === card.id) {
                            item.rating = 3;
                            item.date = new Date();
                        }
                    });
                    this.setState({
                        cards: deck,
                        currentCard: currentCard + 1
                    });
                    break;
                case 'good':
                    deck.forEach(item => {
                        if (item.id === card.id) {
                            item.rating = 4;
                            item.date = new Date();
                        }
                    });
                    this.setState({
                        cards: deck,
                        currentCard: currentCard + 1
                    });
                    break;
                default:
                    return;
            }
        }

    }

    render() {

        const {currentCard, cardsLength} = this.state;
        const {items} = this.props.deck;
        const endMessage = <div>
                                <p>Learning Completed!</p>
                           </div>;
        const isLearning = currentCard < cardsLength ? <CurrentCard front={items[currentCard].front} back={items[currentCard].back}/> : endMessage;

        return (
            <>
                <div className="main-table">
                    {isLearning}
                </div>
                <div className="edit-panel">
                    <div className="buttons">
                        <Button onClick={(e) => this.onChangeRating(e.target.getAttribute('data-type'))}
                                variant="danger"
                                data-type="bad">Again</Button>
                        <Button onClick={(e) => this.onChangeRating(e.target.getAttribute('data-type'))}
                                className="medium"
                                variant="warning"
                                data-type="mid">Good</Button>
                        <Button onClick={(e) => this.onChangeRating(e.target.getAttribute('data-type'))}
                                variant="success"
                                data-type="good">Easy</Button>
                    </div>
                    <div className="all-in-one-page">
                        <Button variant="secondary">Show all</Button>
                    </div>
                </div>
            </>
        );

    }
}

export default MainTable;