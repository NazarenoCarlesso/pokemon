import { Link } from 'react-router-dom'

export default function Landing() {
    return (
        <div className='Page'>
            <div className='Row Center'>
                <div>
                    <h1 style={{ fontSize: '3rem' }}>Gotta Catch Them All!</h1>
                    <Link to='/home'>
                        <button className='Discover'>
                            <img src='img/pokeball_icon.png' alt='pokeball_icon' style={{ height: 18, marginRight: 6 }} />
                            DISCOVER
                        </button>
                    </Link>
                </div>
                <div>
                    <img src='img/lucario.png' alt='lucario' />
                </div>
            </div>
        </div>
    )
}
