(this["webpackJsonprian-app"]=this["webpackJsonprian-app"]||[]).push([[0],{33:function(e,t,a){},34:function(e,t,a){},35:function(e,t,a){},36:function(e,t,a){},37:function(e,t,a){"use strict";a.r(t);var n=a(0),i=a(1),s=a(21),c=a.n(s),l=a(8),o=a(9),r=a(11),d=a(10),m=a(6),j=a(2),u=a(15),h=a(12),b=function(e){Object(r.a)(a,e);var t=Object(d.a)(a);function a(e){var n;Object(l.a)(this,a),(n=t.call(this,e)).toPokemonList=function(){n.props.history.push("/")},n.createLocalData=function(e){var t=JSON.parse(e);e={nickname:t.nickname,name:t.name,isMyList:t.isMyList,myListId:t.myListId};localStorage.setItem("localdata",JSON.stringify(e))},n.createNicknameCache=function(e){localStorage.setItem(e,"This data exist")},n.detailData=function(){var e={name:n.state.getLocalData.name},t="https://graphql-pokeapi.vercel.app/api/graphql",a={credentials:"omit",headers:{"Content-Type":"application/json"},body:JSON.stringify({query:"query pokemons($name: String!) {\n          pokemon(name: $name) {\n            id\n            name\n            location_area_encounters\n            sprites{\n              back_default\n              front_default\n            }\n            abilities {\n              ability {\n                name\n              }\n            }\n            moves {\n              move {\n                name\n              }\n            }\n            types {\n              type {\n                name\n              }\n            }\n            message\n            status\n          }\n        }",variables:e}),method:"POST"};1==n.state.getLocalData.isMyList?fetch(t,a).then((function(e){return e.json()})).then((function(e){n.setState({isLoaded:!0,items:e.data.pokemon,value:n.state.getLocalData.nickname})}),(function(e){n.setState({isLoaded:!0,error:e})})):fetch(t,a).then((function(e){return e.json()})).then((function(e){n.setState({isLoaded:!0,items:e.data.pokemon,value:e.data.pokemon.name})}),(function(e){n.setState({isLoaded:!0,error:e})}))},n.catchPokemon=function(){var e=Math.floor(100*Math.random());if(n.setState({random:n.state.random+e}),e%2==0){n.setState({isDetail:1,isGatcha:1});var t={nickname:n.state.items.name,name:n.state.items.name,isMyList:null,myListId:null};n.createLocalData(JSON.stringify(t)),console.log(e+" GATCHA")}else{n.setState({isDetail:2,isGatcha:null});t={nickname:n.state.items.name,name:n.state.items.name,isMyList:null,myListId:null};n.createLocalData(JSON.stringify(t)),console.log(n.state.random+" RUN AWAY")}},n.addToMyList=function(){if(n.state.value in localStorage)alert(n.state.value+" is exist, use another nickname");else{alert(n.state.value+" nickname success");var e={nickname:n.state.value,name:n.state.items.name,isMyList:1,myListId:null};n.createLocalData(JSON.stringify(e));var t={isMyList:null,id:null,nickname:n.state.value};n.storeData(JSON.stringify(t)),n.createNicknameCache(n.state.value),n.props.history.push("/my_pokemon_list")}},n.storeData=function(e){var t=n.state,a=(t.error,t.isLoaded,t.items),i=JSON.parse(e),s=new Date,c=s.getDate()+""+(s.getMonth()+1)+s.getFullYear()+s.getHours()+s.getMinutes()+s.getSeconds();if(null==i.isMyList)var l={id:c,name:i.nickname,data:a},o=c;else l={id:i.id,name:i.nickname,data:a},o=i.id;Object(h.c)(o,JSON.stringify(l),n.state.dbname).then((function(){return console.log("It worked!")})).catch((function(e){return console.log("It failed!",e)}))},n.deleteData=function(e,t,a){0==e&&(Object(h.b)(t,n.state.dbname),localStorage.removeItem(a),n.props.history.push("/my_pokemon_list")),1==e&&localStorage.removeItem(a)},n.backData=function(e){0==e&&n.setState({isDetail:null}),1==e&&localStorage.removeItem("localdata")},n.editable=function(){n.setState({isGatcha:1}),null==n.state.isEditable&&n.setState({isEditable:1}),1==n.state.isEditable&&n.setState({isEditable:null})};var i=Object(h.a)("my-list-db","my-pokemon-list");if("localdata"in localStorage)var s=JSON.parse(localStorage.getItem("localdata"));else{var c={nickname:n.props.location.state.nickname,name:n.props.location.state.name,isMyList:n.props.location.state.isMyList,myListId:n.props.location.state.myListId};localStorage.setItem("localdata",JSON.stringify(c));s=JSON.parse(localStorage.getItem("localdata"))}return n.state={error:null,isLoaded:!1,items:[],getLocalData:s,dbname:i,random:0,customName:null,value:null,isDetail:null,isGatcha:null,isEditable:null},n.handleChange=n.handleChange.bind(Object(u.a)(n)),n.handleSubmit=n.handleSubmit.bind(Object(u.a)(n)),n}return Object(o.a)(a,[{key:"componentDidMount",value:function(){this.detailData()}},{key:"handleChange",value:function(e){this.setState({value:e.target.value})}},{key:"handleSubmit",value:function(e){if(this.state.value in localStorage)1==this.state.isEditable&&(alert("This nickname exist"),console.log("This nickname exist"));else{localStorage.removeItem(this.state.getLocalData.nickname);var t={nickname:this.state.value,name:this.state.getLocalData.name,isMyList:null,myListId:this.state.getLocalData.myListId};if(this.createLocalData(JSON.stringify(t)),alert("Nickname "+this.state.value+" Updated"),e.preventDefault(),1==this.state.getLocalData.isMyList){var a={isMyList:1,id:this.state.getLocalData.myListId,nickname:this.state.value};this.storeData(JSON.stringify(a)),this.createNicknameCache(this.state.value)}this.setState({isEditable:null})}}},{key:"render",value:function(){var e,t,a,i,s,c=this,l=this.state,o=l.error,r=l.isLoaded,d=l.items,j=l.isDetail,u=l.isGatcha,h=l.isEditable,b=l.getLocalData;return null==u?(e=Object(n.jsx)("button",{onClick:function(){return c.catchPokemon()},children:Object(n.jsx)("div",{className:"title-catch",children:"Catch"})}),s=Object(n.jsx)("form",{className:"forEdit",children:Object(n.jsx)("input",{type:"text",placeholder:"Pokemon Name",value:this.state.value,disabled:!0})})):(a=Object(n.jsx)("button",{onClick:function(){return c.addToMyList()},children:"Add To My List"}),t=Object(n.jsx)(m.b,{to:{pathname:"/"},children:Object(n.jsx)("div",{children:Object(n.jsx)("button",{onClick:function(){return c.backData(1)},children:"Let It Go"})})}),s=null==h?Object(n.jsxs)("form",{className:"forEdit",children:[Object(n.jsx)("input",{type:"text",placeholder:"Pokemon Name",value:this.state.value,disabled:!0}),Object(n.jsx)("button",{onClick:function(){return c.editable()},children:"Edit"})]}):Object(n.jsxs)("form",{className:"forEdit",onChange:this.handleChange,children:[Object(n.jsx)("input",{className:"isEditable",type:"text",placeholder:"Pokemon Name",value:this.state.value}),Object(n.jsx)("button",{onClick:function(){return c.editable()},children:"Update"})]})),1===b.isMyList&&(e=null,t=null,a=null,i=Object(n.jsx)("div",{children:Object(n.jsx)("button",{onClick:function(){return c.deleteData(0,b.myListId,b.nickname)},children:Object(n.jsx)("div",{className:"title-release",children:"Release"})})}),s=null==h?Object(n.jsxs)("form",{className:"forEdit",children:[Object(n.jsx)("input",{type:"text",placeholder:"Pokemon Name",value:this.state.value,disabled:!0}),Object(n.jsx)("button",{onClick:function(){return c.editable()},children:"Edit"})]}):Object(n.jsxs)("form",{className:"forEdit",onChange:this.handleChange,children:[Object(n.jsx)("input",{className:"isEditable",type:"text",placeholder:"Pokemon Name",value:this.state.value}),Object(n.jsx)("button",{onClick:this.handleSubmit,children:"Update"})]})),o?Object(n.jsx)("div",{className:"panel-loading",children:Object(n.jsxs)("div",{className:"loading",children:["Error : ",o.message]})}):r?1==j?Object(n.jsxs)("div",{className:"panel-gotcha",children:[Object(n.jsx)("div",{className:"img-gotcha"}),Object(n.jsx)("button",{className:"btn-gotcha",onClick:function(){return c.backData(0)},children:"Back"})]}):2==j?Object(n.jsx)("div",{children:Object(n.jsxs)("div",{className:"field-runaway",children:[Object(n.jsx)("div",{className:"img-runaway"}),Object(n.jsx)("div",{className:"title-runaway",children:"Pokemon Run Away"}),Object(n.jsx)(m.b,{to:{pathname:"/"},children:Object(n.jsx)("button",{className:"btn-runaway",children:"back"})})]})}):Object(n.jsx)("div",{className:"panel",children:Object(n.jsxs)("div",{className:"col-12",children:[Object(n.jsxs)("div",{className:"col-12",children:[Object(n.jsx)("div",{className:"btn-catch",children:Object(n.jsx)("div",{children:e})}),Object(n.jsx)("div",{className:"btn-release",children:Object(n.jsx)("div",{children:i})})]}),Object(n.jsx)("div",{className:"col-4",children:Object(n.jsxs)("div",{className:"image-detail",children:[Object(n.jsxs)("div",{className:"panel-detail panel-image",children:[Object(n.jsx)("div",{children:Object(n.jsx)("img",{src:d.sprites.front_default,alt:"img-"+d.name})}),Object(n.jsx)("div",{children:s})]}),Object(n.jsxs)("div",{className:"panel-add",children:[Object(n.jsx)("div",{className:"box-add",children:t}),Object(n.jsx)("div",{className:"box-add",children:a})]})]})}),Object(n.jsxs)("div",{className:"col-8",children:[Object(n.jsx)("div",{className:"col-6",children:Object(n.jsxs)("div",{className:"panel-detail",children:[Object(n.jsx)("div",{className:"title-detail head-green",children:"Type"}),Object(n.jsx)("div",{className:"for-field",children:d.types.length>0?d.types.map((function(e,t){var a=e.type;return Object(n.jsx)("div",{className:"field-box",children:Object(n.jsx)("div",{children:a.name})})})):null}),Object(n.jsx)("div",{className:"title-detail head-blue",children:"Ability"}),Object(n.jsx)("div",{className:"for-field",children:d.abilities.length>0?d.abilities.map((function(e,t){var a=e.ability;return Object(n.jsx)("div",{className:"field-box",children:Object(n.jsx)("div",{children:a.name})})})):null})]})}),Object(n.jsx)("div",{className:"col-6",children:Object(n.jsxs)("div",{className:"panel-detail",children:[Object(n.jsx)("div",{className:"title-detail head-orange",children:"Move"}),Object(n.jsx)("div",{className:"for-field last-field",children:d.moves.length>0?d.moves.map((function(e,t){var a=e.move;return Object(n.jsx)("div",{className:"field-box",children:Object(n.jsx)("div",{children:a.name})})})):null})]})})]})]})}):Object(n.jsx)("div",{className:"panel-loading",children:Object(n.jsx)("div",{className:"loading",children:"Loading...."})})}}]),a}(i.Component),v=function(e){Object(r.a)(a,e);var t=Object(d.a)(a);function a(e){var n;Object(l.a)(this,a),(n=t.call(this,e)).myPokemonList=function(){Object(h.d)(n.state.customStore).then((function(e){n.setState({isLoaded:!0,items:e})}),(function(e){n.setState({isLoaded:!0,error:e})}))},localStorage.removeItem("localdata");var i=Object(h.a)("my-list-db","my-pokemon-list");return n.state={error:null,isLoaded:!1,items:[],customStore:i},n}return Object(o.a)(a,[{key:"componentDidMount",value:function(){this.myPokemonList()}},{key:"render",value:function(){var e=this.state,t=e.error,a=e.isLoaded,i=e.items;return t?Object(n.jsx)("div",{children:Object(n.jsxs)("div",{children:["Error : ",t.message]})}):a?Object(n.jsx)("div",{className:"panel",children:Object(n.jsx)("div",{className:"col-12",children:i.length>0?i.map((function(e,t){var a=JSON.parse(i[t]);return Object(n.jsx)("div",{className:"col-2",children:Object(n.jsx)("div",{className:"box",children:Object(n.jsxs)(m.b,{to:{pathname:"/pokemon_details",state:{nickname:a.name,name:a.data.name,isMyList:1,myListId:a.id}},children:[Object(n.jsx)("div",{children:Object(n.jsx)("img",{src:a.data.sprites.front_default,alt:"img-"+a.name})}),Object(n.jsx)("div",{className:"list-name",children:a.name})]})})},t+1)})):null})}):Object(n.jsx)("div",{children:"Loading...."})}}]),a}(i.Component),O=function(e){Object(r.a)(a,e);var t=Object(d.a)(a);function a(e){var n;Object(l.a)(this,a),(n=t.call(this,e)).getMyPokemon=function(){Object(h.d)(n.state.customStore).then((function(e){n.setState({myList:e})}),(function(e){n.setState({isLoaded:!0,error:e})}))},n.fetchData=function(e){if(void 0==e)var t=24;else t=e;var a={limit:t,offset:0},i={credentials:"omit",headers:{"Content-Type":"application/json"},body:JSON.stringify({query:"query pokemons($limit: Int, $offset: Int){\n        pokemons(limit: $limit, offset: $offset){\n          count\n          next\n          previous\n          status\n          message\n          results{\n            id\n            url\n            name\n            image\n          }\n        }\n      }",variables:a}),method:"POST"};fetch("https://graphql-pokeapi.vercel.app/api/graphql",i).then((function(e){return e.json()})).then((function(e){n.setState({isLoaded:!0,items:e.data.pokemons,result:e.data.pokemons.results,limit:a})}),(function(e){n.setState({isLoaded:!0,error:e})})),n.getMyPokemon()};var i=Object(h.a)("my-list-db","my-pokemon-list");return n.state={error:null,isLoaded:!1,items:[],myList:[],customStore:i},localStorage.removeItem("localdata"),n}return Object(o.a)(a,[{key:"componentDidMount",value:function(){this.fetchData()}},{key:"render",value:function(){var e=this,t=this.state,a=t.error,i=t.isLoaded,s=t.items,c=t.result,l=t.limit,o=t.myList;return a?Object(n.jsx)("div",{className:"panel-loading",children:Object(n.jsxs)("div",{className:"loading",children:["Error : ",a.message]})}):i?Object(n.jsxs)("div",{className:"panel",children:[Object(n.jsx)("div",{className:"col-12",children:c.length>0?c.map((function(e,t){var a=e.name,i=e.image,s=(e.url,e.id),c=0;return Object(n.jsxs)("div",{className:"col-2",children:[o.length>0?o.map((function(e,t){var a=JSON.parse(o[t]);s===a.data.id&&c++})):null,Object(n.jsx)("div",{className:"box",children:Object(n.jsxs)(m.b,{to:{pathname:"/pokemon_details",state:{nickname:a,name:a,isMyList:null,myListId:null}},children:[Object(n.jsx)("div",{children:Object(n.jsx)("img",{src:i,alt:"img-"+a})}),Object(n.jsx)("div",{className:"list-name",children:a}),Object(n.jsxs)("div",{className:"div-owned",children:["owned :  ",Object(n.jsx)("span",{children:c})]})]})})]},t+1)})):null}),Object(n.jsx)("div",{className:"col-12",children:Object(n.jsxs)("div",{className:"box-load-more",children:[null===s.previous?"":Object(n.jsx)("button",{onClick:function(){return e.fetchData(l.offset-l.limit)},children:"Previous"}),0===s.offset?Object(n.jsx)("button",{onClick:function(){return e.fetchData(0)},children:"Load More"}):Object(n.jsx)("button",{onClick:function(){return e.fetchData(l.limit+12)},children:"Load More"})]})})]}):Object(n.jsx)("div",{className:"panel-loading",children:Object(n.jsx)("div",{className:"loading",children:"Loading...."})})}}]),a}(i.Component),p=function(e){Object(r.a)(a,e);var t=Object(d.a)(a);function a(e){return Object(l.a)(this,a),t.call(this,e)}return Object(o.a)(a,[{key:"render",value:function(){return Object(n.jsx)("div",{className:"custom-header",children:Object(n.jsx)("div",{className:"custom-menu",children:Object(n.jsxs)("div",{children:[Object(n.jsx)("div",{children:Object(n.jsxs)(m.b,{to:"/",children:[Object(n.jsx)("div",{children:Object(n.jsx)("div",{className:"img-pokedex"})}),Object(n.jsx)("div",{className:"title-navigation",children:"Pokemon List"})]})}),Object(n.jsx)("div",{children:Object(n.jsxs)(m.b,{to:"/my_pokemon_list",children:[Object(n.jsx)("div",{children:Object(n.jsx)("div",{className:"img-pokebag"})}),Object(n.jsx)("div",{className:"title-navigation",children:"My Pokemon List"})]})})]})})})}}]),a}(i.Component),x=function(e){Object(r.a)(a,e);var t=Object(d.a)(a);function a(e){var n;return Object(l.a)(this,a),(n=t.call(this,e)).clickBody=function(){document.getElementById("navigator")},n}return Object(o.a)(a,[{key:"render",value:function(){return Object(n.jsx)(m.a,{children:Object(n.jsxs)("div",{children:[Object(n.jsx)(p,{}),Object(n.jsx)("div",{onClick:this.clickBody,children:Object(n.jsxs)(j.c,{children:[Object(n.jsx)(j.a,{path:"/",component:O,exact:!0}),Object(n.jsx)(j.a,{path:"/my_pokemon_list",component:v}),Object(n.jsx)(j.a,{path:"/pokemon_details",component:b})]})})]})})}}]),a}(i.Component);a(33),a(34),a(35),a(36);c.a.render(Object(n.jsx)(x,{}),document.getElementById("root"))}},[[37,1,2]]]);
//# sourceMappingURL=main.2e2efcc1.chunk.js.map