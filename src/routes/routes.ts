import {
  addProduct,
  addProducts,
  findProducts,
  updateConsumption,
  // eslint-disable-next-line prettier/prettier
  updateProduct,
} from '@/controllers/productController'
import { reportGenerator } from '@/controllers/reportController'
import { Router } from 'express'

const routes = Router()

routes.get('/', (_req, res) => {
  res.status(200).send('Ok!')
})

routes.post(
  '/api/products/product',
  async (req, res) => await addProduct(req, res)
)

routes.post('/api/products/', async (req, res) => await addProducts(req, res))

routes.put(
  '/api/products/product/:id',
  async (req, res) => await updateProduct(req, res)
)

routes.put(
  '/api/products/product/consumption/:id',
  async (req, res) => await updateConsumption(req, res)
)

routes.get('/api/products', async (req, res) => await findProducts(req, res))

routes.get('/api/reports', async (req, res) => await reportGenerator(req, res))

export default routes
