import { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

import './create-deck.css';

const store = require('store');

class CreateDeck extends Component {
    constructor(props) {
        super(props);
        this.state = {
            front: '',
            back: '',
            items: [],
            deckTitle: ''
        };
    }

    onValueChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onAddToDeck = (front, back) => {
        const newCard = {
            front,
            back,
            rating: 1,
            date: new Date(),
            id: uuidv4()
        };
        this.setState(({items}) => {
            const newItems = [...items, newCard];
            return {
                items: newItems
            }
        });
    }

    onAddDeckToLocalStorage = (key, values) => {
        const deck = {
            deckTitle: key,
            items: [...values]
        }

        store.set(key, deck);
        
        this.setState({
            items: []
        });
    }

    onSubmitNewCard = (e) => {
        e.preventDefault();
        if (this.state.front.length < 1 || this.state.back.length < 1) return;
        this.onAddToDeck(this.state.front, this.state.back);
        this.setState({
            front: '',
            back: ''
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
        this.onAddDeckToLocalStorage(this.state.deckTitle, this.state.items);
        this.onAddTitleToLocalStorage(this.state.deckTitle);
        this.setState({
            front: '',
            back: '',
            deckTitle: ''
        });
    }

    render() {
        const {front, back, deckTitle} = this.state;

        return (
            <div className="app-add-form">
                <h3>Добавьте новую карточку в колоду</h3>
                <form
                    className="add-form d-flex"
                    onSubmit={this.onSubmitNewCard}>
                    <input type="text"
                        className="form-control new-post-label"
                        placeholder="Введите слово на английском"
                        name="front"
                        value={front}
                        onChange={this.onValueChange} />
                    <input type="text"
                        className="form-control new-post-label"
                        placeholder="Введите слово на русском"
                        name="back"
                        value={back}
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