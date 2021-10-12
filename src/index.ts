import express from 'express'
import routes from './routes/routes'

const app = express()

app
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(routes)

export default app
