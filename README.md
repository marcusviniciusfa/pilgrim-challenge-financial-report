# Desafio Técnico

## Desenvolvedores Backend - The Pilgrim

![](./docs/images/jorge-luis-ojeda-flota-FqtgyYgBLyQ-unsplash.jpg) [^1]

### Sumário

1. [MVP](#MVP---Geração-de-relatório-financeiro)
1. [Documentação](#Documentação)

### MVP - Geração de relatório financeiro

#### Histórias de Usuário

| Como       | Quero                         | Para                                                              |
| ---------- | ----------------------------- | ----------------------------------------------------------------- |
| Analisador | Disparar um evento de consumo | Ver os dados salvos imediatamente no banco de dados em tempo real |
| Analisador | Gerar um relatório financeiro | Ver os dados em um documento PDF                                  |

[^2]

#### Regras de Negócio

- [ ] Cada produto possui um valor de royalty[^3] e um threshold[^4]
- [ ] O valor de royalty de todos os produtos é de 10% do valor do produto
- [ ] O valor de threshold de todos os produtos é de 50% de consumo
- [ ] Um usuário pode consumir um produto aos poucos, porém, até que chegue a um valor de consumo igual ou maior ao threshold, não haverá valores a serem pagos à distribuidora
- [ ] Cada produto possui um id, um título, um tamanho, uma distribuidora e um preço (royalty)
- [ ] O produto possui apenas um preço que não varia com o tempo
- [ ] Os produtos possuem um tamanho medido em locations[^5]
- [ ] Cada distribuidora disponibiliza um ou mais produtos
- [ ] Os dados de consumo são armazenados assim que o evento de consumo ocorre. Os dados são compostos pela data do consumo e a localização (em locations) de início e de fim daquele consumo

### Documentação

- [Arquitetura](./docs/c4model.md)

[^1]: Fonte: https://unsplash.com/photos/FqtgyYgBLyQ
[^2]: Como (ator); Quero (ação); Para (funcionalidade).
[^3]: Valor pago por consumo.
[^4]: Valor limite para que o royalty comece a ser pago.
[^5]: Uma location pode equivaler a uma página em um ebook, por exemplo.
