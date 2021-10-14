import ProductModel from '@/models/schemas/productEntitie'
import { now } from '@/utils/moment'
import { Request, Response } from 'express'
import fs from 'fs'
import path from 'path'
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

  const body: any = [
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
  ]

  for (const product of allProducts) {
    const rowColor = allProducts.indexOf(product) % 2 ? '#FFFFFF' : '#D9D9D9'

    const {
      title,
      distributor,
      locations: totalLocations,
      price,
      consumption: { end: endConsumption, lastTime },
    } = product
    let royalty = 0
    const threshold = (totalLocations * 50) / 100

    let royaltyWarningColor = '#A8FCC0' || rowColor
    if (endConsumption >= threshold) {
      royalty = (price * 10) / 100
      royaltyWarningColor = '#FEAAAA'
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
      { text: totalLocations, fillColor: rowColor },
      { text: `R$${price.toFixed(2)}`, fillColor: rowColor },
      { text: endConsumption, fillColor: rowColor },
      { text: date, fillColor: rowColor },
      { text: time, fillColor: rowColor },
      { text: threshold, fillColor: rowColor },
      {
        text: `R$${royalty.toFixed(2)}`,
        fillColor: royaltyWarningColor,
      },
    ]

    body.push(row)
  }

  const docDefinition: TDocumentDefinitions = {
    content: [
      {
        text: 'Relatório Financeiro',
        style: 'header',
        bold: true,
        fontSize: 16,
        alignment: 'center',
        margin: 5,
      },
      {
        text: 'Documento contendo a relação de produtos e respectivos valores de royalts a serem pagos.',
        margin: 10,
        alignment: 'left',
      },
      {
        style: 'tableExample',
        table: {
          headerRows: 1,
          body,
        },
      },
    ],
    defaultStyle: { font: 'Times' },
  }

  const dateTimeSplit = now().split('T')
  const date = dateTimeSplit[0]
  const time = dateTimeSplit[1].split('-')[0]
  const fileName = `financial-report_${date}_${time}.pdf`
  const filePath = path.resolve('./reports/', fileName)
  console.log('[debug]' + filePath)
  const pdfDoc = printer.createPdfKitDocument(docDefinition, {})
  await pdfDoc.pipe(fs.createWriteStream(filePath))
  pdfDoc.end()

  return res.status(200).send('Report generated successfully!')
}

export { reportGenerator }
