import { Link } from 'react-router-dom'

export default function Landing() {
    return (
        <>
            <div className='Bg' />
            <div className='Page' style={{ backdropFilter: 'blur(20px)' }} >
                <div style={{ minHeight: 50 }} />
                <div className='Row Center Flex'>
                    <div>
                        <img className='Squirtle' src='img/squirtle.png' alt='squirtle' />
                    </div>
                    <div className='Paper Center Gotta' style={{ flexDirection: 'column', justifyContent: 'start' }}>
                        <h1 className='Main'>Gotta Catch Them All!</h1>
                        <h2 className='Neon'>POKEMON POKEDEX</h2>
                        <h4 className='Lore'>Welcome trainer, this will be the beginning of an incredible adventure. Together we will visit all the pokemon towns. Learning about your pokemons is an essential step to succeed in your tournaments and be able to get all the badges</h4>
                        <h4 className='Lore2'>Take a look at our pokedex, it has over 900+ pokemons with 20 different types</h4>
                        <Link to='/home'>
                            <button className='Discover'>
                                <img src='img/pokeball_icon.png' alt='pokeball_icon' style={{ height: 18, marginRight: 6 }} />
                                DISCOVER
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}
