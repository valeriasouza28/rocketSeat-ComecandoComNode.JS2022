const express = require('express')
const { randomUUID } = require('crypto')

const app = express()

app.use(express.json())

const products = []

/**
 * ===POST => é para inserir um dado
 * === GET => é para buscar um/ou mais dados
 * === PUT => é para alterar um dado
 * === DELETE => é para remover um dado
 */

/**
 * === BODY => Sempre que eu quiser enviar dados para a minha aplicação
 * === PARAMS => /products/8912345678
 * === QUERY => / product?id=27265464875623
 */
app.post('/products', (request, response) => {
  //Nome e preço => name e price
  const { name, price } = request.body

  const product = {
    name,
    price,
    id: randomUUID()
  }

  products.push(product)

  return response.json(product)
})

app.get('/products', (request, response) => {
  return response.json(products)
})

app.get('/products:id', (request, response) => {
  const { id } = request.params
  const product = products.find(product => product.id === id)
})

app.listen(4002, () => console.log('Servidor está rodando na porta 4002'))
