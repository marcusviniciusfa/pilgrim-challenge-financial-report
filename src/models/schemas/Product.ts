import mongoose from 'mongoose'

const Product = new mongoose.Schema({
  _id: String,
  title: String,
  distributor: String,
  locations: Number,
  price: Number,
  createdAt: Date,
})

export default mongoose.model('ProductModel', Product)
