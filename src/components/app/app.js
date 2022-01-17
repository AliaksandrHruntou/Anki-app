import MainTable from '../main-table/main-table';
import Header from '../header/header';
import SelectDeck from '../select-deck/select-deck';
import CreateDeck from '../create-deck/create-deck';
import { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; 

import './app.css';
import WelcomePage from '../welcome-page/welcome-page';

const store = require('store');

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      deck: [
        {eng: "Money", rus: "Деньги"},
        {eng: "Tiger", rus: "Тигр"},
        {eng: "Pen", rus: "Ручка"},
        {eng: "Bottle", rus: "Бутылка"},
        {eng: "Tree", rus: "Дерево"},
      ]
    }
  }

  onSelectDeck = (prop) => {
    let selectedDeck = store.get(prop);
    this.setState({
      deck: selectedDeck
    });
  }

  render() {
    return (
      <Router>
        <div className="app">
          <Header/>
          <Switch>
            <Route exact path="/">
              <WelcomePage/>
            </Route>
            <Route exact path="/select-deck">
              <SelectDeck onSelectDeck={this.onSelectDeck} />
            </Route>
            <Route exact path="/create-deck">
              <CreateDeck/>
            </Route>
            <Route exact path="/main-table">
              <MainTable deck={this.state.deck} />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }

}

export default App;
