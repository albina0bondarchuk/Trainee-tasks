const http = require('http')

const options = require('./helpers/options')
const postLogin = require('./helpers/postLogin')
const postTodos = require('./helpers/postTodos')
const get = require('./helpers/get')
const patch = require('./helpers/patch')
const _delete = require('./helpers/delete')
const start = require('./helpers/start')

 
const server = http.createServer((request, response) => {

    if(request.method === 'OPTIONS') {
        options(response)
    }

    if (request.method === 'GET' && request.url === '/todos') {
        get(request, response)
    } 

    if (request.method === 'POST' && request.url === '/login'){    
        postLogin(request, response)
    }

    if (request.method === 'POST' && request.url === '/todos'){    
        postTodos(request, response)
    }
    
    if (request.method === 'PATCH' && request.url === '/todos') {
        patch(request, response)
    } 

    if (request.method === 'DELETE' && request.url === '/todos') {
        _delete(request, response)
    }
})

start(server)