export interface IProduct {
  title: string
  distributor: string
  locations: number
  price: number
  consumption: IConsumption
}

export interface IConsumption {
  start: number
  end: number
  lastTime: string
}
