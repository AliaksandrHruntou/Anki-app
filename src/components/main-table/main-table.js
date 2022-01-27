import { Component } from "react";
import { Button } from "react-bootstrap";
import CurrentCard from "../current-card/current-card";
import ScheduleAlgorithm from "../schedule-algorithm/schedule-algorithm";

import './main-table.css';

class MainTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentCard: this.props.deck.length - 1,
            cards: this.props.deck,
            cardsLength: this.props.deck.length
        }
    }

    ScheduleAlgorithm = new ScheduleAlgorithm();

    // onSaveLearnedCards = () => {
    //     debugger
    //     let {cards, currentCard} = this.state;
    //     console.log(cards[currentCard]);
    //     this.setState({
    //         currentCard: currentCard - 1
    //     });
    // }

    componentDidUpdate(prevProps, prevState) {
        console.log(prevState);
    }

    onChangeRating = (prop) => {
        debugger
        const {cards, currentCard} = this.state;
        debugger
        const card = cards[currentCard];
        let newCards = cards;
        newCards = newCards.forEach(item => { 
            debugger
            if (item.id === card.id) {
                item.rating = 2;
            }
        });
        console.log(newCards);

        if (this.state.currentCard !== -1) {
            switch (prop) {
                case 'bad':
                    this.setState({
                        cards: newCards,
                        currentCard: currentCard - 1
                    });
                    break;
                case 'mid':
                    this.setState({
                        cards: newCards.forEach(item => {
                            debugger
                            if (item.id === card.id) {
                                item.rating = 3;
                            }
                        }),
                        currentCard: currentCard - 1
                    });
                    break;
                case 'good':
                    this.setState({
                        cards: newCards.forEach(item => {
                            debugger
                            if (item.id === card.id) {
                                item.rating = 4;
                            }
                        }),
                        currentCard: currentCard - 1
                    });
                    break;
            }
        }

    }

    render() {

        const {currentCard} = this.state;
        const {deck} = this.props;
        const endMessage = <div>
                                <p>Learning Completed!</p>
                           </div>;
        const isLearning = currentCard ? <CurrentCard eng={deck[currentCard].eng} rus={deck[currentCard].rus}/> : endMessage;

        return (
            <>
                <div className="main-table">
                    {isLearning}
                </div>
                <div className="edit-panel">
                    <div className="buttons">
                        <Button onClick={(e) => this.onChangeRating(e.target.getAttribute('data-type'))}
                                variant="danger"
                                data-type="bad">Плохо</Button>
                        <Button onClick={(e) => this.onChangeRating(e.target.getAttribute('data-type'))}
                                className="medium"
                                variant="warning"
                                data-type="mid">Средне</Button>
                        <Button onClick={(e) => this.onChangeRating(e.target.getAttribute('data-type'))}
                                variant="success"
                                data-type="good">Хорошо</Button>
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