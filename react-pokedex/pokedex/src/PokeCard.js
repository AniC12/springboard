const poke_API = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';

function Pokecard(props) {
    let imgSrc = `${poke_API}${props.id}.png`
    return (
        <div>
            <div>Name: {props.name}</div>
            <img src={imgSrc} alt="img"/>
            <div>Type: {props.type}</div>
        </div>
    );
}

export default Pokecard;