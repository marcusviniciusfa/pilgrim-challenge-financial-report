import MongoDB from '@/models/dbConnection'
import Product from '@/models/schemas/Product'
import { v4 as uuid4 } from 'uuid'

const mongodb = new MongoDB(process.env.MONGO_URL)

describe('Name of the group', () => {
  let connection
  let productModel

  beforeAll(async () => {
    connection = await mongodb.connect()
    productModel = Product
  })

  afterAll(async () => {
    await connection.disconnect()
  })

  it('should ', async () => {
    const id = uuid4()

    const mockProducts = {
      __v: 0,
      _id: id,
      title: 'Manso e Humilde',
      distributor: 'Pilgrim',
      locations: 1000,
      price: 50.0,
      createdAt: new Date(),
    }
    const products = new productModel(mockProducts)
    await products.save()

    const insertedProduct = await productModel.findById(id)
    expect(insertedProduct._id).toEqual(mockProducts._id)
  })

  beforeEach(async () => {
    productModel.deleteMany()
  })
})
