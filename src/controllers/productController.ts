import ProductModel from '@/models/schemas/productEntitie'
import { now } from '@/utils/moment'
import { Request, Response } from 'express'

async function addProduct(req: Request, res: Response): Promise<any> {
  const productModel = new ProductModel({ ...req.body })
  const savedProduct = await productModel.save()
  return res.status(201).send(savedProduct)
}

async function addProducts(req: Request, res: Response): Promise<any> {
  const savedProduct = await ProductModel.insertMany(req.body)
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

async function updateConsumption(req: Request, res: Response): Promise<any> {
  const { consumption: oldConsumption } = await ProductModel.findById(
    req.params.id
  )
  const updatedProduct = await ProductModel.findByIdAndUpdate(req.params.id, {
    $set: {
      consumption: {
        start: oldConsumption.end,
        end: Number(oldConsumption.end) + Number(req.body.consumption),
        lastTime: now(),
      },
    },
  })
  return res.status(201).send(updatedProduct)
}

async function findProducts(_req: Request, res: Response): Promise<any> {
  const allProducts = await ProductModel.find({})
  return res.status(200).send(allProducts)
}

export {
  addProduct,
  addProducts,
  updateProduct,
  findProducts,
  updateConsumption,
}
