import { TDocumentDefinitions } from 'pdfmake/interfaces'

export default function reportProductsGenerate(
  allProducts
): TDocumentDefinitions {
  const whiteColor = '#FFFFFF'
  const greyColor = '#D9D9D9'
  const darkGreyColor = '#707070'
  const successColor = '#A8FCC0'
  const warningColor = '#FEAAAA'

  const body = []
  let totalRoyalties = 0

  allProducts.forEach(product => {
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
      totalRoyalties += royalty
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
      {
        text: price.toLocaleString('pt-br', {
          style: 'currency',
          currency: 'BRL',
        }),
        fillColor: rowColor,
      },
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
        text: royalty.toLocaleString('pt-br', {
          style: 'currency',
          currency: 'BRL',
        }),
        fillColor: royaltyColor,
      },
    ]

    body.push(row)
  })

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
        text: 'Relação entre o consumo de Produtos e Royalties',
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
        text: `Total de Royalties: ${totalRoyalties.toLocaleString('pt-br', {
          style: 'currency',
          currency: 'BRL',
        })}`,
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
                text: 'Locations',
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
                text: 'Royalties',
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

  return docDefinition
}
