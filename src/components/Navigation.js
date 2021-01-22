import React, { Component } from "react";
import { NavLink } from 'react-router-dom';

class Navigation extends Component {

  constructor(props) {
    super(props);
  }

  render(){
    return(
      <div className="custom-header">
        <div className="custom-menu">
          <div>
            <div>
              <NavLink to='/'>
              <div><div className="img-pokedex"></div></div>
              <div className="title-navigation">Pokemon List</div>
              </NavLink>
            </div>
            <div>
              <NavLink to='/my_pokemon_list'>
                <div><div className="img-pokebag"></div></div>
                <div className="title-navigation">My Pokemon List</div>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

export default Navigation;
