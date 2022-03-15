const fetchPokemon = () => {
    const pokename = document.getElementById("pokename");
    let pokeinput = pokename.value;

    const url = `https://pokeapi.co/api/v2/pokemon/${pokeinput}`;
    fetch(url).then((res) => {
        //console.log(res)
        return res.json();
    }).then((data) => {
        //console.log(data);
        let pokeImg = data.sprites.front_default;
        //console.log(pokeImg);
        pokeImage(pokeImg);
    });
}
//fetchPokemon();

const pokeImage = (url) => {
    const pokeimage = document.getElementById("pokeimage");
    pokeimage.src = url;
}

const imprimir = () => {
    const pokename = document.getElementById("pokename");
    let pokeinput = pokename.value;
    console.log("Hola " + pokeinput);
}