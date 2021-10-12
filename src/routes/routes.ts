import { Router } from 'express'

const routes = Router()

routes.get('/', (_req, res) => {
  res.status(200).send('Ok!')
})

routes.post('/api/products', (_req, res) => {
  res.status(201).end()
})

routes.get('/api/reports', (_req, res) => {
  res.status(200).end()
})

export default routes
