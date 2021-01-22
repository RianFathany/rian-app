import React, { Component } from "react";
import { NavLink } from 'react-router-dom';
import { createStore,set, update, del, entries  } from 'idb-keyval';

class PokemonDetails extends Component {

  constructor(props) {
      super(props);

      var dbname = createStore('my-list-db', 'my-pokemon-list');

      if('localdata' in localStorage){
          var getLocalData = JSON.parse(localStorage.getItem('localdata'));
      } else {
        var localdata = {
          nickname:this.props.location.state.nickname,
          name:this.props.location.state.name,
          isMyList:this.props.location.state.isMyList,
          myListId:this.props.location.state.myListId,
        };
        localStorage.setItem('localdata', JSON.stringify(localdata));
        var getLocalData = JSON.parse(localStorage.getItem('localdata'));
      }

      this.state = {
        error:null,
        isLoaded:false,
        items:[],
        getLocalData:getLocalData,
        dbname:dbname,
        random:0,
        customName:null,
        value:null,
        isDetail:null,
        isGatcha:null,
        isEditable:null,
      }

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
      this.detailData();
  }

  toPokemonList = () =>{
    this.props.history.push("/");
  }

  createLocalData = (localdata) =>{
    var parseData = JSON.parse(localdata);
    var localdata = {
      nickname: parseData.nickname,
      name:parseData.name,
      isMyList:parseData.isMyList,
      myListId:parseData.myListId
    };
    localStorage.setItem('localdata', JSON.stringify(localdata));
  }

  createNicknameCache = (nickname) => {
    localStorage.setItem(nickname, "This data exist");
  }

  //view data
  detailData = () => {

    const gqlQuery = `query pokemons($name: String!) {
          pokemon(name: $name) {
            id
            name
            location_area_encounters
            sprites{
              back_default
              front_default
            }
            abilities {
              ability {
                name
              }
            }
            moves {
              move {
                name
              }
            }
            types {
              type {
                name
              }
            }
            message
            status
          }
        }`;

    // if(this.props.location.state !== null){
    //   var localdata = {
    //     nickname:this.props.location.state.nickname,
    //     name:this.props.location.state.name,
    //     isEditable:this.props.location.state.isEditable,
    //     isMyList:this.props.location.state.isMyList,
    //     myListId:this.props.location.state.myListId,
    //   }
    // }
    // this.createLocalData(JSON.stringify(localdata));

    const gqlVariables = { name: this.state.getLocalData.name,};
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

    if(this.state.getLocalData.isMyList == 1){
      fetch(url,header)
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
                isLoaded:true,
                items:result.data.pokemon,
                value:this.state.getLocalData.nickname
            });
          },
          (error)=>{
              this.setState({
                  isLoaded:true,
                  error
              });
          }
        )
    }else{
      fetch(url,header)
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
                isLoaded:true,
                items:result.data.pokemon,
                value:result.data.pokemon.name
            });
          },
          (error)=>{
              this.setState({
                  isLoaded:true,
                  error
              });
          }
        )
    }

  }

  catchPokemon = () => {

    const rand = Math.floor(Math.random()*100);
    this.setState({ random: this.state.random + rand });

    if(rand % 2 == 0){
      this.setState({isDetail: 1,isGatcha:1});
      var localdata = {
        nickname:this.state.items.name,
        name:this.state.items.name,
        isMyList:null,
        myListId:null,
      }
      this.createLocalData(JSON.stringify(localdata));
      console.log(rand + ' GATCHA');
    }else{
      this.setState({isDetail: 2,isGatcha:2});
      var localdata = {
        nickname:this.state.items.name,
        name:this.state.items.name,
        isMyList:null,
        myListId:null,
      }
      this.createLocalData(JSON.stringify(localdata));
      console.log(this.state.random + ' RUN AWAY');
    }

  }

  handleChange(event){
    this.setState({value: event.target.value});
  }

  handleSubmit(event){

    if(this.state.isEditable == 2){
      if(this.state.value in localStorage){
         alert('Nickname Exist')
      } else {

        localStorage.removeItem(this.state.getLocalData.nickname);

        var localdata = {
          nickname:this.state.value,
          name:this.state.getLocalData.name,
          isMyList:null,
          myListId:this.state.getLocalData.myListId,
        }
        this.createLocalData(JSON.stringify(localdata));

        alert('Nickname '+ this.state.value +' Updated');
        event.preventDefault();

        if(this.state.getLocalData.isMyList == 1){
          var req = {
            isMyList:1,
            id:this.state.getLocalData.myListId,
            nickname:this.state.value
          }
          this.storeData(JSON.stringify(req));
          this.createNicknameCache(this.state.value);
        }

        this.setState({isEditable:null});
      }
    }


  }

  addToMyList = () => {

    if(this.state.value in localStorage ){
      alert(this.state.value + " is exist, use another nickname")
    }else{
      alert(this.state.value + " nickname success")
      var localdata = {
        nickname:this.state.value,
        name:this.state.items.name,
        isMyList:1,
        myListId:null,
      };
      this.createLocalData(JSON.stringify(localdata));

      var req = {
        isMyList:null,
        id:null,
        nickname:this.state.value
      }
      this.storeData(JSON.stringify(req));

      this.createNicknameCache(this.state.value);
      this.props.history.push("/my_pokemon_list");

    }
  }

  storeData = (req) => {
    const { error, isLoaded, items} = this.state;
    var xdata = JSON.parse(req);
    var date = new Date();
    var setId = date.getDate() + ""
                + (date.getMonth()+1) + ""
                + date.getFullYear() + ""
                + date.getHours() + ""
                + date.getMinutes() + ""
                + date.getSeconds();
    if(xdata.isMyList == null){
      var vdata = {
        id:setId,
        name:xdata.nickname,
        data:items
      };
      var forId = setId;
    }else{
      var vdata = {
        id:xdata.id,
        name:xdata.nickname,
        data:items
      };
      var forId = xdata.id;
    }

    set(forId, JSON.stringify(vdata), this.state.dbname)
    .then(() => console.log('It worked!'))
    .catch(err => console.log('It failed!', err));


  };

  deleteData = (status,id,nickname) => {
      //var x = '218362';
      if(status == 0){
        del(id,this.state.dbname)
        localStorage.removeItem(nickname);
        this.props.history.push("/my_pokemon_list");
      }
      if(status==1){
        localStorage.removeItem(nickname);
      }

  }

  backData = (status) => {
      if(status == 0){ this.setState({ isDetail:null });}
      if(status == 1){ localStorage.removeItem("localdata");}
  }

  editable = () => {
    if(this.state.isEditable == null){
      this.setState({isEditable:1});
    }
    if(this.state.isEditable == 1){
      this.setState({isEditable:2});
    }

  }

  render(){
    const { error, isLoaded, items, isDetail, isGatcha, isEditable, getLocalData} = this.state;

    var info;
    if(isDetail == null){
      info = "Detail Pokemon";
      var btnCatch = <button  onClick={ () => this.catchPokemon()}><div className="title-catch">Catch</div></button>;
    }

    if(isGatcha == 1){
      info = "Pokemon Catched";
      var btnAddToMyList = <button  onClick={ () => this.addToMyList()}>Add To My List</button>;
      var btnLetItGo = <NavLink
                          to={{
                            pathname: "/",
                          }}>
                          <div>
                            <button  onClick={ () => this.backData(1)}>Let It Go</button>
                          </div>
                       </NavLink>;
    }

    if(getLocalData.isMyList === 1){
      info = "My Pokemon List";
      var btnRelease = <div><button  onClick={ () => this.deleteData(0,getLocalData.myListId,getLocalData.nickname)}><div className="title-release">Release</div></button></div>;
    }

    if(isEditable == null){
      if(isGatcha == null){
        var input = <form className="forEdit">
                      <input
                        type="text"
                        placeholder="Pokemon Name"
                        value={this.state.value}
                      disabled/>
                    </form>;
      }else{
        var input = <form className="forEdit">
                      <input
                        type="text"
                        placeholder="Pokemon Name"
                        value={this.state.value}
                      disabled/>
                      <button onClick={ () => this.editable()}>Edit </button>
                    </form>;
      }
      if(getLocalData.isMyList == 1){
        var input = <form className="forEdit">
                      <input
                        type="text"
                        placeholder="Pokemon Name"
                        value={this.state.value}
                      disabled/>
                      <button onClick={ () => this.editable()}>Edit</button>
                    </form>;
      }
    }else{
        var input = <form className="forEdit" onSubmit={this.handleSubmit}>
                      <input
                        type="text"
                        placeholder="Pokemon Name"
                        value={this.state.value}
                        onChange={this.handleChange}
                      />
                      <button onClick={ () => this.editable()}>Edit</button>
                    </form>;
    }

    if(error){ return( <div className="panel-loading"><div className="loading">Error : {error.message}</div></div>) }

    else if(!isLoaded){ return( <div className="panel-loading" ><div className="loading">Loading....</div></div> )}

    else if(isDetail == 1){
      return(
        <div className="panel-gotcha">
          <div className="img-gotcha"></div>
          <button className="btn-gotcha"  onClick={ () => this.backData(0)}>Back</button>
        </div>
      )
    }

    else if(isDetail == 2){
      return(
        <div>
          <div className="field-runaway">
              <div className="img-runaway"></div>
              <div className="title-runaway">Pokemon Run Away</div>
              <NavLink
                to={{
                  pathname: "/",
                }}>
                <button className="btn-runaway">back</button>
              </NavLink>

          </div>
        </div>
      )
    }

    else{
      return(
        <div className="panel">
          <div className="col-12">
            <div className="col-12">

              <div className="btn-catch">
                <div>{btnCatch}</div>
              </div>

              <div className="btn-release">
                <div>{btnRelease}</div>
              </div>

            </div>
            <div className="col-4">

              <div className="image-detail">
                <div className="panel-detail panel-image">
                  <div>
                    <img src={items.sprites.front_default} alt={"img-"+items.name} />
                  </div>
                  <div>
                    {input}
                  </div>
                </div>
                <div className="panel-add">
                  <div className="box-add">{btnLetItGo}</div>
                  <div className="box-add">{btnAddToMyList}</div>
                </div>
              </div>
            </div>
            <div className="col-8">
              <div className="col-6">
                <div className="panel-detail">
                  <div className="title-detail head-green">Type</div>
                  <div className="for-field">
                  {
                    items.types.length > 0 ? items.types.map((data,i) => {
                      const {type} = data
                      return(
                        <div className="field-box">
                          <div>{type.name}</div>
                        </div>
                      )
                    }):null
                  }
                  </div>
                  <div className="title-detail head-blue">Ability</div>
                  <div className="for-field">
                    {
                      items.abilities.length > 0 ? items.abilities.map((data,i) => {
                        const {ability} = data
                        return(
                          <div className="field-box">
                            <div>{ability.name}</div>
                          </div>
                        )
                      }):null
                    }
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="panel-detail">
                  <div className="title-detail head-orange">Move</div>
                  <div className="for-field last-field">
                    {
                      items.moves.length > 0 ? items.moves.map((data,i) => {
                        const {move} = data
                        return(
                          <div className="field-box">
                            <div>{move.name}</div>
                          </div>
                        )
                      }):null
                    }
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      )
    }


  }

}

export default PokemonDetails;
