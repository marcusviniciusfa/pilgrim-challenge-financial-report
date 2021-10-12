import mongoose from 'mongoose'

mongoose.connect(`${process.env.MONGO_URI}/${process.env.MONGO_DB_NAME}`)

export default mongoose
