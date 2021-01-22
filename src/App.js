
import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import PokemonList from './components/PokemonList';
import MyPokemonList from './components/MyPokemonList';
import PokemonDetails from './components/PokemonDetails';
import Navigation from './components/Navigation';

const routerBaseName = process.env.PUBLIC_URL;

// import logo from './logo.svg';
// import './App.css';

class App extends Component {

  constructor(props) {
      super(props);

  }

  clickBody = () => {
      const nav = document.getElementById("navigator");
  }

  render(){
    return(
      <HashRouter>
        <div>
          <Navigation />
          <div onClick={this.clickBody}>
            <Switch>
              <Route path='/' component={PokemonList} exact/>
              <Route path='/my_pokemon_list' component={MyPokemonList} />
              <Route path='/pokemon_details' component={PokemonDetails} />
            </Switch>
          </div>
        </div>
      </HashRouter>
    )
  }

}

export default App;
