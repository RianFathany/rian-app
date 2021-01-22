import React, { Component } from "react";
import { NavLink, Redirect  } from 'react-router-dom';
import PokemonList from './PokemonList';
import { createStore, get, set, update, del, entries  } from 'idb-keyval';

class PokemonCatch extends Component {
  constructor(props) {
      super(props);
      this.state = {
        error:null,
        isLoaded:false,
        items:[],
      }

  }
}
export default PokemonCatch;
