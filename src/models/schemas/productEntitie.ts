import { v4 as uuid4 } from 'uuid'
import mongoose from '../dbConnection'

interface IConsumption {
  start: number
  end: number
  lastTime: string
}

function defaultConsumption(): IConsumption {
  return {
    start: 0,
    end: 0,
    lastTime: '',
  }
}

const ProductSchema = new mongoose.Schema({
  _id: { type: String, default: uuid4, immutable: true },
  title: String,
  distributor: String,
  locations: Number,
  price: { type: Number, immutable: true },
  consumption: { type: Object, default: defaultConsumption },
})

export default mongoose.model('Product', ProductSchema)
