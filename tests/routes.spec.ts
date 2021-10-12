import request from 'supertest'
import app from '../src/index'

describe.skip('Test the root path', () => {
  it('should response the GET method', async () => {
    return await request(app)
      .get('/')
      .then(res => {
        expect(res.statusCode).toBe(200)
      })
  })
})
