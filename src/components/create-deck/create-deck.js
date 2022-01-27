import { Component } from 'react';

import './create-deck.css';

const store = require('store');

class CreateDeck extends Component {
    constructor(props) {
        super(props);
        this.state = {
            eng: '',
            rus: '',
            deck: [],
            deckTitle: ''
        };
        this.maxId = 1;
    }

    onValueChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onAddToDeck = (eng, rus) => {
        const newCard = {
            eng,
            rus,
            rating: 1,
            id: this.maxId++
        };
        this.setState(({deck}) => {
            const newDeck = [...deck, newCard];
            return {
                deck: newDeck
            }
        });
    }

    onAddDeckToLocalStorage = (key, values) => {
        store.set(key, values);
        this.setState({
            deck: []
        });
    }

    onSubmitNewCard = (e) => {
        e.preventDefault();
        if (this.state.eng.length < 1 || this.state.rus.length < 1) return;
        this.onAddToDeck(this.state.eng, this.state.rus);
        this.setState({
            eng: '',
            rus: ''
        });
    }

    onAddTitleToLocalStorage = (title) => {
        if (store.get('titles')) {
            const newTitles = [...store.get('titles'), title];
            store.set('titles', newTitles);
        } else {
            const newTitles = [title];
            store.set('titles', newTitles);
        }
    }

    onSubmitNewDeck = (e) => {
        e.preventDefault();
        if (this.state.deckTitle.length < 1) return;
        this.onAddDeckToLocalStorage(this.state.deckTitle, this.state.deck);
        this.onAddTitleToLocalStorage(this.state.deckTitle);
        this.setState({
            eng: '',
            rus: '',
            deckTitle: ''
        });
    }

    render() {
        const {eng, rus, deckTitle} = this.state;

        return (
            <div className="app-add-form">
                <h3>Добавьте новую карточку в колоду</h3>
                <form
                    className="add-form d-flex"
                    onSubmit={this.onSubmitNewCard}>
                    <input type="text"
                        className="form-control new-post-label"
                        placeholder="Введите слово на английском"
                        name="eng"
                        value={eng}
                        onChange={this.onValueChange} />
                    <input type="text"
                        className="form-control new-post-label"
                        placeholder="Введите слово на русском"
                        name="rus"
                        value={rus}
                        onChange={this.onValueChange} />
    
                    <button type="submit"
                            className="btn btn-outline-light">Добавить карточку</button>
                </form>
                <form
                    className="add-form d-flex"
                    onSubmit={this.onSubmitNewDeck}>
                    <input type="text"
                        className="form-control new-post-label"
                        placeholder="Введите название колоды"
                        name="deckTitle"
                        value={deckTitle}
                        onChange={this.onValueChange} />    
                    <button type="submit"
                            className="btn btn-outline-light">Завершить колоду</button>
                </form>
            </div>
        );
    }
}

export default CreateDeck;