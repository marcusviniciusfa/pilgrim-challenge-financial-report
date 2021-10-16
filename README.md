# Desafio Técnico

## Desenvolvedores Backend - The Pilgrim

![](./docs/images/jorge-luis-ojeda-flota-FqtgyYgBLyQ-unsplash.jpg) [^1]

### Sumário

1. [MVP](#MVP---Geração-de-relatório-financeiro)
1. [Documentação](#Documentação)

### MVP - Geração de relatório financeiro

#### Histórias de Usuário

| Como    | Quero                         | Para                                                              |
| ------- | ----------------------------- | ----------------------------------------------------------------- |
| Usuário | Disparar um evento de consumo | Ver os dados salvos imediatamente no banco de dados em tempo real |
| Usuário | Gerar um relatório financeiro | Ver os dados em um documento PDF                                  |

[^2]

#### Regras de Negócio

- [x] Cada produto possui um valor de royalty[^3] e um threshold[^4]
- [x] O valor de royalty de todos os produtos é de 10% do preço do produto
- [x] O valor de threshold de todos os produtos é de 50% de consumo de um produto
- [x] Um usuário pode consumir um produto aos poucos, porém, até que chegue a um valor de consumo igual ou maior ao threshold, não haverá valores a serem pagos à distribuidora
- [x] Cada produto possui um id, um título, um tamanho, uma distribuidora e um preço
- [x] O produto possui apenas um preço que não varia com o tempo
- [x] Os produtos possuem um tamanho medido em locations[^5]
- [x] Cada distribuidora disponibiliza um ou mais produtos
- [x] Os dados de consumo são armazenados assim que o evento de consumo ocorre. Os dados são compostos pela data do consumo e a localização (em locations) de início e de fim daquele consumo

### Documentação

- [Arquitetura](./docs/c4model.md)
- [API (com Swagger)](http://localhost:3000/api/docs/) - Antes siga os passos descritos [abaixo](#Execute-localmente) em _"Execute localmente"_

### Execute localmente

A aplicação é composta por um Serviço construído em NodeJS e um Banco de Dados MongoDB, que, para fins de testes, pode rodar localmente em um Container Docker. Para instalar o Docker em uma máquina linux siga os passos descritos [neste tutorial](https://gist.github.com/marcusviniciusfa/5a6772ea347f21c0401386cf4e894a02#Instala%C3%A7%C3%A3o-no-Linux). Após instalação do Docker siga os passos descritos abaixo.

1. Faça o download da imagem oficial do MongoDB e gere um container do Banco de Dados. Verifique se o container está em execução, e caso não esteja execute-o

```bash
# Caso esteja numa máquina Windows o path (/home/$USER/mongo/data/db),
# após o argumento -v precisará ser redefinido considerando a configuração
# de diretórios do sistema
docker container run -it --name mongodb -v /home/$USER/mongo/data/db:/data/db -p 27017:27017 -d mongo

# Veja se o container de nome "mongodb" está Up
docker container ps -a

# Caso não esteja em execução rode
docker container start mongodb
```

2. Faça o download do projeto

```bash
git clone https://github.com/marcusviniciusfa/pilgrim-challenge-financial-report.git
```

3. Na raiz do projeto execute os seguintes comandos

- `npm install`
- `npm run dev` - Para executar em modo de teste usando o ts-node-dev
- ou `npm start` - Para compilar o Typescript e rodar usando o node no diretório do código `./dist`

4. Para fazer as requisições utilize a documentação da API, que pode ser encontrada em [http://localhost:3000/api/docs/](http://localhost:3000/api/docs/)

5. O relatório pode ser gerado à partir de duas visões distintas: em relação as Distribuidoras e os Royalties e em relação aos Produtos e os Royalties. Após adicionar alguns produtos e consumir os produtos gere um novo relatório na rota: [http://localhost:3000/api/reports?type=products](http://localhost:3000/api/reports?type=products), use a _query_ `type=products` ou `type=distributors` para escolher o tipo de relatório. **Atenção! O relatório não estará disponível para acesso através da documentação no Swagger**

### Observações

- O Typescript foi escolhido ao invés do Javascript puro por dois motivos:

  1. O pensamento inicial na construção desse projeto era usar o máximo de Clean Architecture com os princípios SOLID, pelos quais estou gostando muito ultimamente, começando a aprender. Pelo fato dos princípios possuírem uma perfeita harmonia com a Orientação a Objetos, resolvi começar com o TS (:x: Não teve continuidade porque não tenho maturidade no uso dos princípios, por tanto tive dificuldades para seguir)
  2. Por acreditar que Tipagens ajudam muito em projetos Back-end

- Tentei iniciar com TDD mais não dei continuidade por questão de tempo e falta de maturidade no uso do Jest

- Utilizei o padrão [Conventional Commits](https://www.conventionalcommits.org/pt-br/v1.0.0/#resumo), com a ajuda dos modulos [commitlint](https://commitlint.js.org/#/) e [husky](https://typicode.github.io/husky/#/), além do [lintstaged](https://github.com/okonet/lint-staged) para auxiliar na automatização das verificações.

- Utilizei o [ESLint](https://eslint.org/), [Prettier](https://prettier.io/) e o [.editorconfig](https://editorconfig.org/) para seguir bons padrões e formatação de código

- Utilizei o [C4 Model](https://c4model.com/) para criar Diagramas de estilo Zoom In/Zoom Out

- Utilizei o [Swagger](https://swagger.io/docs/specification/about/) para documentar a API

- Utilizei configurações do VSCode para auxiliar na utilização de outras ferramentas e fazer Debug

- Vou dar continuidade nos meus estudos sobre Arquitetura e Código Limpo, utilizando este projeto, através dos materiais (Cursos, vídeos no Youtube, Livros) de grandes feras como o [Pessoal da Rocketseat](https://www.rocketseat.com.br/), [Otavio Lemos](https://www.linkedin.com/in/otavio-lemos-0271399/), [Rodrigo Manguinho](https://www.linkedin.com/in/rmanguinho/), [Uncle Bob](https://www.google.com/search?q=uncle+bob+books&oq=uncle+bob+books&aqs=edge..69i57j0i22i30l7.3892j0j1&sourceid=chrome&ie=UTF-8)

[^1]: Fonte: https://unsplash.com/photos/FqtgyYgBLyQ
[^2]: Como (ator); Quero (ação); Para (funcionalidade).
[^3]: Valor pago por consumo.
[^4]: Valor limite para que o royalty comece a ser pago.
[^5]: Uma location pode equivaler a uma página em um ebook, por exemplo.
