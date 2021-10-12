import request from 'supertest'
import app from '../src/index'

describe('Test the root path', () => {
  it('should response the GET method', done => {
    request(app)
      .get('/')
      .then(res => {
        expect(res.statusCode).toBe(200)
        done()
      })
  })
})

describe('Test the /api/products path', () => {
  it('should response the POST method', done => {
    request(app)
      .post('/api/products')
      .then(res => {
        expect(res.statusCode).toBe(201)
        done()
      })
  })
})

describe('Test the /api/reports path', () => {
  it('should response the GET method', done => {
    request(app)
      .get('/api/reports')
      .then(res => {
        expect(res.statusCode).toBe(200)
        done()
      })
  })
})
