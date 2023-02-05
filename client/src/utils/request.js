export default function postPokemon(pokemon) {
    let { name, height, weight, health, attack, defense, speed,
        types, imagePokedex, imageDetail } = pokemon
    // types Refactor
    types = types.filter(t => t !== undefined)
    types = types.filter(t => t !== '')
    if (types[0] === types[1]) types.pop()
    // pokemon before Stringify
    return {
        ...pokemon,
        name: name.toLowerCase(),
        imagePokedex: imagePokedex,
        imageDetail: imageDetail,
        types: types,
        height: height ? height : null,
        weight: weight ? weight : null,
        health: health ? health : null,
        attack: attack ? attack : null,
        defense: defense ? defense : null,
        speed: speed ? speed : null,
    }
}