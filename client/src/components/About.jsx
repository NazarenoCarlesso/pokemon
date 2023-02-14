import React from 'react'

export default function About() {
    // about Render
    return (
        <div className='Page'>
            <div className='Spacing' />
            <div className='Row Center' style={{ width: '100%' }}>
                <div className='Line' style={{ marginRight: 10 }} />
                <h1 style={{ color: '#cc1f1f', textShadow: '0px 0px 12px #cc1f1f' }}>ABOUT</h1>
                <div className='Line' style={{ marginLeft: 10 }} />
            </div>
            <div className='Row Three'>
                <div className='Paper About'>
                    <h2 className=''>What is this?</h2>
                    <hr />
                    <span>In this webside you have access to about 900+ pokemons with 20+
                        diferent types, learn about their strengths and weaknesses before
                        going into battle</span>
                    <button className='Links'>
                        Go to the API <img className='Pokeapi' src='img/pokeapi.png' alt='pokeapi' />
                    </button>
                </div>
                <div className='Paper About'>
                    <h2>What is this?</h2>
                    <hr />
                    <span>I'm Nazareno Carlesso a Fullstack Web Developer, who likes to learn
                        new things and collaborate in different types of projects, like this
                        website.</span>
                    <button className='Links'>
                        Go to my Github <img className='Github' src='img/github.svg' alt='github' />
                    </button>
                </div>
                <div className='Paper About'>
                    <h2>What is this?</h2>
                    <hr />
                    <span>I built this app during my four months Fullstack Developer Bootcamp
                        at soyHenry as an Individual Project to demonstrate what has been learned
                        </span>
                    <button className='Links'>
                        Support
                    </button>
                </div>
            </div>
            <div className='Line' style={{ marginTop: 16 }} />
        </div>
    )
}
