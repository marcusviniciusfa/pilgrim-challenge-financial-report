import ProductModel from '@/models/schemas/productEntitie'
import { now } from '@/utils/moment'
import { Request, Response } from 'express'

async function addProduct(req: Request, res: Response): Promise<any> {
  const productModel = new ProductModel({ ...req.body })
  const savedProduct = await productModel.save()
  return res.status(201).send(savedProduct)
}

async function updateProduct(req: Request, res: Response): Promise<any> {
  if (req.body.consumption) {
    req.body.consumption.lastTime = now()
  }
  const updatedProduct = await ProductModel.findByIdAndUpdate(req.params.id, {
    $set: { ...req.body },
  })
  return res.status(201).send(updatedProduct)
}

async function findProducts(_req: Request, res: Response): Promise<any> {
  const allProducts = await ProductModel.find({})
  return res.status(200).send(allProducts)
}

export { addProduct, updateProduct, findProducts }
