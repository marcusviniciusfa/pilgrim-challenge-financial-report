import mongoose from 'mongoose'

class MongoDB {
  public readonly connection
  private readonly uri

  constructor(uri: string = process.env.MONGO_URI) {
    this.uri = uri
    this.connection = this.connect()
  }

  async connect(): Promise<mongoose.Mongoose> {
    return await mongoose.connect(this.uri)
  }
}

export default MongoDB
