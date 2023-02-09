/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai')
const session = require('supertest-session')
const app = require('../../src/app.js')
const { Pokemon, conn } = require('../../src/db.js')

const agent = session(app)
const pokemon = { name: 'pikachu' }

describe('Pokemon routes', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err)
    }))

  beforeEach(() => Pokemon.sync({ force: true })
    .then(() => Pokemon.create(pokemon)))

  // TEST
  describe('GET /pokemons', () => {
    it('should get 200', () => agent.get('/pokemons').expect(200))
  })

  describe('GET /pokemons?name', () => {
    it('should get 200', () => agent.get('/pokemons?name=venusaur').expect(200))
    it('should get 200', () => agent.get('/pokemons?name=venuSAUR').expect(200))
    it('should get 404', () => agent.get('/pokemons?name=v3nus4ur').expect(404))
  })

  describe('GET /pokemons/:id', () => {
    it('should get 200', () => agent.get('/pokemons/9').expect(200))
    it('should get 400', () => agent.get('/pokemons/-5').expect(400))
  })

  describe('GET /types', () => {
    it('should get 200', () => agent.get('/types').expect(200))
  })

  describe('POST /pokemons', () => {
    // pokemon valido
    it('should get 201', () => agent.post('/pokemons')
      .send({ name: 'lucario', types: ['shadow', 'fire'] })
      .set('Content-Type', 'application/json')
      .expect(201))
    // el pokemon ya existe
    it('should get 400', () => agent.post('/pokemons')
      .send({ name: 'pikachu', types: ['shadow', 'fire'] })
      .set('Content-Type', 'application/json')
      .expect(400))
    // falta el nombre
    it('should get 400', () => agent.post('/pokemons')
      .send({ types: ['shadow', 'fire'] })
      .set('Content-Type', 'application/json')
      .expect(400))
    // falta tipos
    it('should get 400', () => agent.post('/pokemons')
      .send({ name: 'pikachu', types: [] })
      .set('Content-Type', 'application/json')
      .expect(400))
    // tiene mas de 2 tipos
    it('should get 400', () => agent.post('/pokemons')
      .send({ name: 'charizard', types: ['fire', 'water', 'fairy', 'ice'] })
      .set('Content-Type', 'application/json')
      .expect(400))
  })
})
