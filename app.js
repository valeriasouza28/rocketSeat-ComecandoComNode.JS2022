const express = require('express')

const { randomUUID } = require('crypto')

const app = express()

const fs = require('fs')

app.use(express.json())

let products = []

fs.readFile('products.json', 'utf-8', (err, data) => {
  if (err) {
    console.log(err)
  } else {
    products = JSON.parse(data)
  }
})

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

  productFile()
  return response.json(product)
})

app.get('/products', (request, response) => {
  return response.json(products)
})

app.get('/products/:id', (request, response) => {
  const { id } = request.params
  const product = products.find(product => product.id === id)
  productFile()
  return response.json(product)
})

app.put('/products/:id', (request, response) => {
  const { id } = request.params
  const { name, price } = request.body

  const productIndex = products.findIndex(product => product.id === id)
  products[productIndex] = {
    ...products[productIndex],
    name,
    price
  }

  productFile()

  return response.json({ message: 'Produto alterado com sucesso!' })
})

app.delete('/products/:id', (request, response) => {
  const { id } = request.params

  const productIndex = products.findIndex(product => product.id === id)

  products.splice(productIndex, 1)

  productFile()
  
  return response.json({ message: 'Produto removido com sucesso!' })
})

function productFile() {
  fs.writeFile('products.json', JSON.stringify(products), err => {
    if (err) {
      console.log(err)
    } else {
      console.log('Produto inserido')
    }
  })
}
app.listen(4002, () => console.log('Servidor está rodando na porta 4002'))
