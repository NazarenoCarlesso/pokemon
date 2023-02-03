export default function postPokemon(pokemon) {
    const { name, height, weight, health, attack, defense, speed } = pokemon
    return {
        ...pokemon,
        name: name.toLowerCase(),
        height: height ? height : null,
        weight: weight ? weight : null,
        health: health ? health : null,
        attack: attack ? attack : null,
        defense: defense ? defense : null,
        speed: speed ? speed : null
    }
}