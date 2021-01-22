import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import PokemonDetails from './PokemonDetails';
import MyPokemonList from './MyPokemonList';
import { createStore,values  } from 'idb-keyval';

class PokemonList extends Component {

  constructor(props) {
    super(props);
    var customStore = createStore('my-list-db', 'my-pokemon-list');
    this.state = {
      error:null,
      isLoaded:false,
      items:[],
      myList:[],
      customStore:customStore,
    }
    localStorage.removeItem('localdata');
  }

  getMyPokemon = () => {
      values(this.state.customStore)
      .then(
        (values) => {
          this.setState({
              myList:values,
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

  componentDidMount(){
      this.fetchData();
  }

  fetchData = (x) => {
      const gqlQuery = `query pokemons($limit: Int, $offset: Int){
        pokemons(limit: $limit, offset: $offset){
          count
          next
          previous
          status
          message
          results{
            id
            url
            name
            image
          }
        }
      }`;

      if(x == undefined){
          var y = 24;

      }else{
          var y = x;
      }
      const gqlVariables = {
        limit: y,
        offset: 0,
      };



      var url = "https://graphql-pokeapi.vercel.app/api/graphql";
      var header = {
        credentials: 'omit',
        headers:{ 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: gqlQuery,
          variables: gqlVariables,
        }),
        method: 'POST',
      };

      fetch(url,header)
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
                isLoaded:true,
                items:result.data.pokemons,
                result:result.data.pokemons.results,
                limit:gqlVariables,
            });
          },
          (error)=>{
              this.setState({
                  isLoaded:true,
                  error
              });
          }
        )

        this.getMyPokemon();

  }

  render (){
    const { error, isLoaded, items, result, limit, myList} = this.state;

    if(error){
      return(
        <div className="panel-loading" ><div className="loading">Error : {error.message}</div></div>
      )
    }else if(!isLoaded){
        return(
          <div className="panel-loading" ><div className="loading">Loading....</div></div>
        )
    }else{
      return(
        <div className="panel">

          <div className="col-12">
            {
              result.length > 0 ? result.map((data,i) => {
                const {name, image, url, id} = data;
                let count = 0;
                return(
                  <div key={i+1} className="col-2">
                    {myList.length > 0 ? myList.map((data,i) => {
                        var xdata = JSON.parse(myList[i]);
                        if (id === xdata.data.id) count++;

                    }):null}
                    <div className="box">
                      <NavLink
                        to={{
                          pathname: "/pokemon_details",
                          state: {
                            nickname:name,
                            name:name,
                            isMyList:null,
                            myListId:null
                          }
                        }}>
                        <div>
                          <img src={image} alt={"img-"+name} />
                        </div>
                        <div className="list-name">{name}</div>
                        <div className="div-owned">owned :  <span>{count}</span></div>
                      </NavLink>

                    </div>
                  </div>

                )

              }):null
            }
          </div>
          <div className="col-12">
            <div className="box-load-more">
              {items.previous === null ? '':<button onClick={ () => this.fetchData(limit.offset - limit.limit)}>Previous</button>}
              {items.offset === 0 ? <button onClick={ () => this.fetchData(0)}>Load More</button>:<button onClick={ () => this.fetchData(limit.limit + 12)}>Load More</button>}
            </div>
          </div>
        </div>
      )
    }

  }
}

export default PokemonList;
