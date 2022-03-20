<template>
  <hr />
  <h2>Lista de Pokemones</h2>
  <hr />
  <div class="list">
    <article
      v-for="(pokemon, index) in pokemons"
      :key="'poke' + index"
      :class="pokemon.tipo"
      @click="setPokemonUrl(pokemon.url)"
    >
      <img
        :src="imageUrl + pokemon.id + '.png'"
        width="96"
        height="96"
        alt=""
      />
      <h4>{{ pokemon.name }}</h4>
      <p>{{ pokemon.id }}</p>
    </article>
    <div id="scroll-trigger" ref="infinitescrolltrigger">
      <i class="fas fa-spinner fa-spin"></i>
    </div>
  </div>
</template>

<script>
export default {
  props: ["imageUrl", "apiUrl"],
  data: () => {
    return {
      pokemons: [],
      nextUrl: "",
      currentUrl: "",
    };
  },
  methods: {
    fetchData() {
      let req = new Request(this.currentUrl);

      fetch(req)
        .then((resp) => {
          if (resp.status === 200) return resp.json();
        })
        .then((data) => {
          this.nextUrl = data.next;

          data.results.forEach((pokemon) => {
            pokemon.tipo = "defecto";
            pokemon.id = pokemon.url
              .split("/")
              .filter(function (part) {
                return !!part;
              })
              .pop();
            this.definirclase(pokemon);
            console.log("pre push: " + pokemon.tipo);
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    definirclase(pokemon) {
      var tippo = "";
      console.log(this.currentUrl);
      
      fetch(pokemon.url)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
            try {
              tippo = data.types[1].type.name;
            } catch (error) {
              tippo = data.types[0].type.name;
            }
            pokemon.tipo = tippo;
            this.pokemons.push(pokemon);
        });
    },
    scrollTrigger() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio > 0 && this.nextUrl) {
            this.next();
          }
        });
      });

      observer.observe(this.$refs.infinitescrolltrigger);
    },
    next() {
      this.currentUrl = this.nextUrl;
      this.fetchData();
    },
    setPokemonUrl(url) {
      this.$emit("setPokemonUrl", url);
    },
  },
  created() {
    this.currentUrl = this.apiUrl;
    this.fetchData();
  },
  mounted() {
    this.scrollTrigger();
  },
};
</script>

<style lang="scss" scoped>
h2 {
  color: #cde7ff;
}
.list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  grid-gap: 10px;
  width: 100%;
  max-width: 510px;
}
article {
  height: 180px;

  text-align: center;
  text-transform: capitalize;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2), 0 10px 10px rgba(0, 0, 0, 0.2);
}

h4 {
  margin: 0;
}
#scroll-trigger {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 150px;
  font-size: 2rem;
  color: #efefef;
}

.grass {
  background: radial-gradient(#f7fff9, rgb(193, 231, 144) );
}
.poison {
  background: radial-gradient(#ffffff, rgb(169, 185, 255) );
}
.water {
  background: radial-gradient(#ffffff, rgb(156, 215, 255) );
}
.dragon {
  background: radial-gradient(#ffffff,  rgb(133, 58, 255));
}
.ice {
  background: radial-gradient(#ffffff, rgb(110, 209, 255) );
}
.flying {
  background: radial-gradient(#ffffff, rgb(182, 228, 255) );
}
.fire {
  background: radial-gradient(#ffffff,rgb(255, 177, 113)  );
}
.ghost {
  background: radial-gradient(#ffffff, rgb(162, 134, 179) );
}
.fighting {
  background: radial-gradient(#ffffff, rgb(255, 159, 159) );
}
.normal {
  background: radial-gradient(#ffffff, #ffffff);
}
.psychic {
  background: radial-gradient(#ffffff, rgb(225, 125, 255) );
}
.bug {
  background: radial-gradient(#ffffff, rgb(182, 255, 197));
}
.dark {
  background: radial-gradient(#ffffff, rgb(77, 77, 77) );
}
.steel {
  background: radial-gradient(#ffffff, rgb(153, 153, 153) );
}
.fairy {
  background: radial-gradient(#ffffff, rgb(255, 186, 246) );
}
.electric {
  background: radial-gradient(#ffffff, rgb(255, 215, 105) );
}
.rock {
  background: radial-gradient(#ffffff, rgb(157, 167, 175) );
}
.ground {
  background: radial-gradient(#ffffff, rgb(255, 214, 187) );
}
</style>