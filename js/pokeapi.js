const pokeimage = document.getElementById("pokeimage");
const nombre = document.getElementById("nombre");
const tipo = document.getElementById("tipo");
const fetchPokemon = () => {
    const pokename = document.getElementById("pokename");
    let pokeinput = pokename.value.toLowerCase();

    const url = `https://pokeapi.co/api/v2/pokemon/${pokeinput}`;
    fetch(url).then((res) => {
        //console.log(res)
        if(res.status != "200"){
            console.log(res)
            noEncontrado();
        }
        else{
            return res.json();
        }
        
    }).then((data) => {
        console.log(data);                   
        mostrarPoke(data);
    });
}




const mostrarPoke = (data) => {
    pokeimage.src = data.sprites.front_default;
    nombre.innerHTML = '<strong>'+data.name+'</strong>';
    data.types.forEach(obj => {
        
    });
 
    data.types.forEach(element => {
        tipo.innerHTML += `<div class="col"><h6> ${element.type.name}</h6></div>`;
    });
    
}

const noEncontrado = () => {    
    pokeimage.src = './images/llorando.gif';
    nombre.innerHTML = '';
}