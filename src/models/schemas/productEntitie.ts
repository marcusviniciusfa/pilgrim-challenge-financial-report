import { v4 as uuid4 } from 'uuid'
import mongoose from '../dbConnection'

interface Consumption {
  start: number
  end: number
  lastTime: string
}

function defaultConsumption(): Consumption {
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
  price: Number,
  consumption: { type: Object, default: defaultConsumption },
})

export default mongoose.model('Product', ProductSchema)
