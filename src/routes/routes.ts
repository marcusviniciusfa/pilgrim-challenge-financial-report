import {
  addProduct,
  findProducts,
  // eslint-disable-next-line prettier/prettier
  updateProduct,
} from '@/controllers/productController'
import { Router } from 'express'

const routes = Router()

routes.get('/', (_req, res) => {
  res.status(200).send('Ok!')
})

routes.post('/api/products', async (req, res) => await addProduct(req, res))

routes.put(
  '/api/products/:id',
  async (req, res) => await updateProduct(req, res)
)

routes.get('/api/products', async (req, res) => await findProducts(req, res))

routes.get('/api/reports', (_req, res) => {
  res.status(200).end()
})

export default routes
