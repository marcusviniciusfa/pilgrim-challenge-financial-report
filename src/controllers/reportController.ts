import ProductModel from '@/models/schemas/productEntitie'
import { Request, Response } from 'express'
import PdfPrinter from 'pdfmake'
import { TDocumentDefinitions } from 'pdfmake/interfaces'

async function reportGenerator(_req: Request, res: Response): Promise<any> {
  const allProducts = await ProductModel.find({})

  const fonts = {
    Times: {
      normal: 'Times-Roman',
      bold: 'Times-Bold',
      italics: 'Times-Italic',
      bolditalics: 'Times-BoldItalic',
    },
    Symbol: {
      normal: 'Symbol',
    },
  }

  const printer = new PdfPrinter(fonts)

  const body = []

  for (const product of allProducts) {
    const rowColor = allProducts.indexOf(product) % 2 ? '#FFFFFF' : '#D9D9D9'

    const title = product.title
    const distributor = product.distributor
    const locations = product.locations
    const price = product.price
    const { end, lastTime } = product.consumption
    let royalty = 0
    const threshold = ((locations * 50) / 100).toFixed(0)

    let royaltyColor = '#A8FCC0'

    if (end >= threshold) {
      royalty = (price * 10) / 100
      royaltyColor = '#FEAAAA'
    }

    let date = ''
    let time = ''
    if (lastTime) {
      const last = lastTime.split('T')
      date = last[0].split('-')
      const day = date[2]
      const month = date[1]
      const year = date[0]
      date = `${day}/${month}/${year}`
      time = last[1].split('-')[0]
    }

    const row: any = [
      { text: title, fillColor: rowColor },
      { text: distributor, fillColor: rowColor },
      { text: locations, fillColor: rowColor },
      { text: `R$${price.toFixed(2)}`, fillColor: rowColor },
      { text: end, fillColor: rowColor },
      { text: date, fillColor: rowColor },
      { text: time, fillColor: rowColor },
      { text: threshold, fillColor: rowColor },
      {
        text: `R$${royalty.toFixed(2)}`,
        fillColor: royaltyColor,
      },
    ]

    body.push(row)
  }

  const docDefinition: TDocumentDefinitions = {
    content: [
      {
        text: 'Relatório Financeiro - The Pilgrim',
        style: 'header',
        bold: true,
        fontSize: 16,
        alignment: 'center',
        margin: 20,
      },
      {
        text: 'Documento contendo a relação de produtos e respectivos valores de royalts a serem pagos por consumo.',
        alignment: 'left',
      },
      {
        text: '',
        margin: 5,
      },
      {
        style: 'tableExample',
        table: {
          headerRows: 1,
          body: [
            [
              { text: 'Título', bold: true },
              { text: 'Distribuidor', bold: true },
              { text: 'Tamanho', bold: true },
              { text: 'Preço', bold: true },
              { text: 'Consumo', bold: true },
              { text: 'Data', bold: true },
              { text: 'Hora', bold: true },
              { text: 'Threshold', bold: true },
              { text: 'Royalts', bold: true },
            ],
            ...body,
          ],
        },
      },
    ],
    pageMargins: [40, 60, 40, 60],
    defaultStyle: { font: 'Times' },
  }

  // const dateTimeSplit = now().split('T')
  // const date = dateTimeSplit[0]
  // const time = dateTimeSplit[1].split('-')[0]
  // const fileName = `financial-report_${date}_${time}.pdf`
  // const filePath = path.resolve('./reports/', fileName)
  // console.log('[debug]' + filePath)
  const pdfDoc = printer.createPdfKitDocument(docDefinition)
  // await pdfDoc.pipe(fs.createWriteStream(filePath))

  const chunks = []

  pdfDoc.on('data', chunk => {
    chunks.push(chunk)
  })
  pdfDoc.end()

  pdfDoc.on('end', () => {
    const file = Buffer.concat(chunks)
    console.log('Financial report generated successfully!')
    res.status(201).end(file)
  })
}

export { reportGenerator }
