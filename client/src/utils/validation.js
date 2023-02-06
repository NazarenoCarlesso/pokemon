export const regexAlphabet = /^[a-zA-Z ]*$/

export default function validate(pokemon) {
    const { name, imagePokedex, imageDetail, types, height,
        weight, health, attack, defense, speed } = pokemon
    // Name Validations
    if (!name) return 'Name is required'
    if (name.length > 25) return 'Name must be shorter than 25 char.'
    if (!regexAlphabet.test(name)) return 'Name must be alphabetical (a-Z)'
    // Image Validations
    if (!imagePokedex) return 'Pokedex Image is required'
    if (!imageDetail) return 'Detail Image is required'
    if (imagePokedex.length > 255) return 'Pokedex Image must be shorter than 255 char.'
    if (imageDetail.length > 255) return 'Detail Image must be shorter than 255 char.'
    // Types Validations
    if (!types[0] && !types[1]) return 'At least one type is required'
    // Stats Validations
    if (height !== '' && height <= 0) return 'Height should be a positive value'
    if (weight !== '' && weight <= 0) return 'Weight should be a positive value'
    if (health !== '' && health <= 0) return 'Health should be a positive value'
    if (attack !== '' && attack <= 0) return 'Attack should be a positive value'
    if (defense !== '' && defense <= 0) return 'Defense should be a positive value'
    if (speed !== '' && speed <= 0) return 'Speed should be a positive value'
    // Everything is valid
    return false
}