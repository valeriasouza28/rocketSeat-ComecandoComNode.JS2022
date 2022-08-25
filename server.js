/** para atualizar a versão do node usamos o comando no terminal: nvm use 'número da versão' */
/** Para selicionar posicionamos o cursor na linha e ou bloco de comando pressionamos ctrl + l*/
const http = require('http')

http
  .createServer((request, response) => {
    response.writeHead(200, { 'Content-Type': 'application/json' })

    if (request.url === '/produto') {
      response.end(
        JSON.stringify({
          message: 'Rota de produto'
        })
      )
    }

    if (request.url === '/usuarios') {
      response.end(
        JSON.stringify({
          message: 'Rota de usuário'
        })
      )
    }

    response.end(
      JSON.stringify({
        message: 'Qualquer outra rota'
      })
    )
  })
  .listen(4001, () => console.log('Servidor está rodando na porta 4001'))
