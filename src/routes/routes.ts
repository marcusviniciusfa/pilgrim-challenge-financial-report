import { Router } from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerDocs from '../../docs/swagger.json'
import {
  addProduct,
  addProducts,
  findProducts,
  incrementConsumption,
  updateConsumption,
} from '../controllers/productController'
import { reportGenerator } from '../controllers/reportController'

const routes = Router()

routes.get('/', (_req, res) => {
  res.status(200).send('Ok!')
})

routes.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

routes.post(
  '/api/products/product',
  async (req, res) => await addProduct(req, res)
)

routes.post('/api/products/', async (req, res) => await addProducts(req, res))

routes.get('/api/products', async (req, res) => await findProducts(req, res))

routes.put(
  '/api/products/:id',
  async (req, res) => await updateConsumption(req, res)
)

routes.put(
  '/api/products/product/consumption/:id',
  async (req, res) => await incrementConsumption(req, res)
)

routes.get('/api/reports', async (req, res) => await reportGenerator(req, res))

export default routes
