import moment from 'moment'

moment.locale('pt-BR')

function now(inp?: moment.MomentInput): string {
  return inp ? moment(inp).format() : moment().format()
}

export { now }
