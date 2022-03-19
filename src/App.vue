<template>

  <div id="app">
    
    <div class="column is-half is-offset-one-quarter">
       <img class="imgs" src="./assets/Pokemon_logo.png">
       <hr>
       <h4 class='is-size-4'>Pokedex</h4>
      <hr>
      <input class="input is-rounded" type="text" v-model="busca" placeholder="Buscar pokemon pelo nome">
      <button class="button is-normal is-fullwidth is-success"  @click="buscar" id="buscaBtn">Buscar</button>
    <div v-for="(poke,index) in filteredPokemons" :key="poke.url">
      <Pokemon :name="poke.name" :url="poke.url" :num="index+1"/>
    </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Pokemon from './components/Pokemon';
export default {
  name: 'App',
  data(){
    return{
      pokemons: [],
      filteredPokemons: [],
      busca: ""
    }
  },
  created: function() {
    axios.get("https://pokeapi.co/api/v2/pokemon?limit=151&offset=0").then((res)=>{
      console.log("Obteve lista de Pokemons!");
      this.pokemons = res.data.results;
      this.filteredPokemons = res.data.results;
    });

  },
  components:{
    Pokemon
  },
  methods:{
    buscar: function(){
      this.filteredPokemons = this.pokemons;
      if(this.busca == ''|| this.busca == ' '){
          this.filteredPokemons = this.pokemons;
        }else{
          this.filteredPokemons = this.pokemons.filter(pokemon => pokemon.name == this.busca);
        }
    }
  },
  computed:{
/*
  resultadoBusca: function(){
      if(this.busca == ''|| this.busca == ' '){
        return this.pokemons;
      }else{
        return this.pokemons.filter(pokemon => pokemon.name == this.busca);
      }
    }
    */
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.imgs{
  height: 250px;
}
#buscaBtn{
  margin-top: 3%;
  margin-bottom: 5%;
}
</style>