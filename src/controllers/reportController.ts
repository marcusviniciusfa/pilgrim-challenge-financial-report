import ProductModel from '@/models/schemas/productEntitie'
import reportDistributorsGenerate from '@/utils/reportDistributorsGenerate'
import reportProductsGenerate from '@/utils/reportProductsGenerate'
import { Request, Response } from 'express'
import PdfPrinter from 'pdfmake'

async function reportGenerator(req: Request, res: Response): Promise<any> {
  const allProducts = await ProductModel.find({})

  const fonts = {
    Times: {
      normal: 'Times-Roman',
      bold: 'Times-Bold',
      italics: 'Times-Italic',
      bolditalics: 'Times-BoldItalic',
    },
  }

  const printer = new PdfPrinter(fonts)

  let docDefinition = reportProductsGenerate

  if (req.query.type === 'distributors') {
    docDefinition = reportDistributorsGenerate
  } else if (req.query.type === 'products') {
    docDefinition = reportProductsGenerate
  } else {
    return res.status(404).send(
      `<h2>Busca inválida!</h2>
        <p>A busca contém um tipo de relatório inválido, use <i>?type=distributors</i> ou <i>?type=products no final do path</i></p>
        `
    )
  }

  const pdfDoc = printer.createPdfKitDocument(docDefinition(allProducts))

  const chunks = []

  pdfDoc.on('data', chunk => {
    chunks.push(chunk)
  })
  pdfDoc.end()

  pdfDoc.on('end', () => {
    const file = Buffer.concat(chunks)
    console.log('Financial report generated successfully!')
    return res.status(201).end(file)
  })
}

export { reportGenerator }
