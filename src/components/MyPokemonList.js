import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { createStore, values  } from 'idb-keyval';

class MyPokemonList extends Component {

  constructor(props) {
    super(props);
    localStorage.removeItem('localdata');
    var customStore = createStore('my-list-db', 'my-pokemon-list');
    this.state = {
      error:null,
      isLoaded:false,
      items:[],
      customStore:customStore,
    }
  }

  componentDidMount(){
      this.myPokemonList();
  }

  myPokemonList = () => {
      values(this.state.customStore)
      .then(
        (values) => {
          this.setState({
              isLoaded:true,
              items:values,
          });
        },
        (error)=>{
            this.setState({
                isLoaded:true,
                error
            });
        }
      )
      // .then((values) => console.log(JSON.parse(values[0])));

  }

  render (){
    const { error, isLoaded, items } = this.state;

    if(error){
      return(
        <div>
          <div>Error : {error.message}</div>
        </div>
      )
    }else if(!isLoaded){
      return(
        <div>
          Loading....
        </div>
      )
    }else{
      return(
        <div className="panel">
          <div className="col-12">
            {
              items.length > 0 ? items.map((data,i) => {
                var xdata = JSON.parse(items[i]);
                return(
                  <div key={i+1} className="col-2">
                    <div className="box">
                      <NavLink
                        to={{
                          pathname: "/pokemon_details",
                          state: {
                            nickname:xdata.name,
                            name:xdata.data.name,
                            isMyList:1,
                            myListId:xdata.id,}
                        }}>
                        <div>
                          <img src={xdata.data.sprites.front_default} alt={"img-"+xdata.name} />
                        </div>
                        <div className="list-name">{xdata.name}</div>
                      </NavLink>
                    </div>
                  </div>
                )
              }):null
            }




          </div>
        </div>
      )
    }

  }
}

export default MyPokemonList;
