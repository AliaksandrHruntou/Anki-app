import MainTable from './components/main-table/main-table'
import Header from './components/header/header';
import SelectDeck from './components/select-deck/select-deck';
import CreateDeck from './components/create-deck/create-deck';
import { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; 

import './app.css';
import WelcomePage from './components/welcome-page/welcome-page';

const store = require('store');

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      deck: [
        {eng: "Money", rus: "Деньги", rating: 1},
        {eng: "Tiger", rus: "Тигр", rating: 1},
        {eng: "Pen", rus: "Ручка", rating: 1},
        {eng: "Bottle", rus: "Бутылка", rating: 1},
        {eng: "Tree", rus: "Дерево", rating: 1},
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
