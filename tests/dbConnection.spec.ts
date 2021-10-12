import { IConsumption, IProduct } from '@/models/IProduct'
import mongoose from 'mongoose'
import { v4 as uuid4 } from 'uuid'

function defaultConsumption(): IConsumption {
  return {
    start: 0,
    end: 0,
    lastTime: '',
  }
}

describe('Test database connection', () => {
  let db
  let ProductSchema
  let ProductModel

  beforeAll(async () => {
    db = await mongoose.connect(process.env.MONGO_URL)

    ProductSchema = new mongoose.Schema({
      _id: { type: String, default: uuid4, immutable: true },
      title: String,
      distributor: String,
      locations: Number,
      price: Number,
      consumption: { type: Object, default: defaultConsumption },
    })

    ProductModel = mongoose.model('Product', ProductSchema)
  })

  beforeEach(async () => {
    ProductModel.deleteMany()
  })

  it('should insert a product into the database', async () => {
    const mockProducts: IProduct = {
      title: 'Manso e Humilde',
      distributor: 'Pilgrim',
      locations: 1000,
      price: 50.0,
      consumption: {
        start: 0,
        end: 0,
        lastTime: '',
      },
    }
    const products = new ProductModel(mockProducts)
    await products.save()

    const insertedProduct = await ProductModel.findOne({
      title: mockProducts.title,
    })

    expect(insertedProduct.title).toEqual(mockProducts.title)
  })
})
