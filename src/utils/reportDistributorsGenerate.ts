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

  let allDistributors = allProducts.map(product => {
    return product.distributor
  })

  allDistributors = [...new Set(allDistributors)]

  let totalRoyalties = 0

  allDistributors.forEach(distributor => {
    const rowColor =
      allDistributors.indexOf(distributor) % 2 ? whiteColor : greyColor

    const distributorProducts = allProducts.filter(product => {
      return product.distributor === distributor
    })

    let totalRoyaltiesForDistributor = 0
    let royaltyColor = successColor

    distributorProducts.forEach(product => {
      const locations = product.locations
      const price = product.price
      const { end } = product.consumption
      let royalty = 0
      const threshold = ((locations * 50) / 100).toFixed(0)

      if (end >= threshold) {
        royalty = (price * 10) / 100
        totalRoyaltiesForDistributor += royalty
      }
    })

    if (totalRoyaltiesForDistributor > 0) {
      royaltyColor = warningColor
    }

    const row = [
      { text: distributor, fillColor: rowColor },
      {
        text: totalRoyaltiesForDistributor.toLocaleString('pt-br', {
          style: 'currency',
          currency: 'BRL',
        }),
        fillColor: royaltyColor,
      },
    ]

    body.push(row)
    totalRoyalties += totalRoyaltiesForDistributor
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
        text: `Relação entre as Distribuidoras de produtos e os Royalties`,
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
                text: 'Distribuidor',
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
