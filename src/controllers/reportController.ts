import ProductModel from '@/models/schemas/productEntitie'
import { Request, Response } from 'express'
import PdfPrinter from 'pdfmake'
import { TDocumentDefinitions } from 'pdfmake/interfaces'

async function reportGenerator(_req: Request, res: Response): Promise<any> {
  const allProducts = await ProductModel.find({})

  const whiteColor = '#FFFFFF'
  const greyColor = '#D9D9D9'
  const darkGreyColor = '#707070'
  const successColor = '#A8FCC0'
  const warningColor = '#FEAAAA'

  const fonts = {
    Times: {
      normal: 'Times-Roman',
      bold: 'Times-Bold',
      italics: 'Times-Italic',
      bolditalics: 'Times-BoldItalic',
    },
  }

  const printer = new PdfPrinter(fonts)

  const body = []
  let totalRoyalts = 0

  for (const product of allProducts) {
    const rowColor = allProducts.indexOf(product) % 2 ? whiteColor : greyColor

    const title = product.title
    const distributor = product.distributor
    const locations = product.locations
    const price = product.price
    const { end, lastTime } = product.consumption
    let royalty = 0
    const threshold = ((locations * 50) / 100).toFixed(0)

    let royaltyColor = successColor

    if (end >= threshold) {
      royalty = (price * 10) / 100
      totalRoyalts += royalty
      royaltyColor = warningColor
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

    const dynamicAlignment = (value): string => {
      return value ? 'left' : 'center'
    }

    const row = [
      { text: title, fillColor: rowColor },
      { text: distributor, fillColor: rowColor },
      { text: locations, fillColor: rowColor },
      { text: `R$${price.toFixed(2)}`, fillColor: rowColor },
      {
        text: end || '-',
        fillColor: rowColor,
        alignment: dynamicAlignment(end),
      },
      {
        text: date || '-',
        fillColor: rowColor,
        alignment: dynamicAlignment(date),
      },
      {
        text: time || '-',
        fillColor: rowColor,
        alignment: dynamicAlignment(time),
      },
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
        fontSize: 18,
        alignment: 'center',
        margin: 0,
      },
      {
        text: 'Relação entre consumo de produtos e Royalts',
        style: 'subheader',
        fontSize: 16,
        alignment: 'center',
        margin: 10,
      },
      {
        text: '',
        margin: 5,
      },
      {
        text: `Débito total: R$${totalRoyalts}`,
        alignment: 'left',
        bold: true,
        fontSize: 14,
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
              {
                text: 'Título',
                bold: true,
                alignment: 'center',
                color: whiteColor,
                fillColor: darkGreyColor,
              },
              {
                text: 'Distribuidor',
                bold: true,
                alignment: 'center',
                color: whiteColor,
                fillColor: darkGreyColor,
              },
              {
                text: 'Tamanho',
                bold: true,
                alignment: 'center',
                color: whiteColor,
                fillColor: darkGreyColor,
              },
              {
                text: 'Preço',
                bold: true,
                alignment: 'center',
                color: whiteColor,
                fillColor: darkGreyColor,
              },
              {
                text: 'Consumo',
                bold: true,
                alignment: 'center',
                color: whiteColor,
                fillColor: darkGreyColor,
              },
              {
                text: 'Data',
                bold: true,
                alignment: 'center',
                color: whiteColor,
                fillColor: darkGreyColor,
              },
              {
                text: 'Hora',
                bold: true,
                alignment: 'center',
                color: whiteColor,
                fillColor: darkGreyColor,
              },
              {
                text: 'Threshold',
                bold: true,
                alignment: 'center',
                color: whiteColor,
                fillColor: darkGreyColor,
              },
              {
                text: 'Royalts',
                bold: true,
                alignment: 'center',
                color: whiteColor,
                fillColor: darkGreyColor,
              },
            ],
            ...body,
          ],
        },
      },
    ],
    pageMargins: [30, 60, 30, 60],
    defaultStyle: { font: 'Times' },
  }

  // const fileName = `financial-report.pdf`
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
