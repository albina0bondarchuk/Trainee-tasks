const {parse} = require('querystring')
const jwt = require('jsonwebtoken')
const Todos = require('../modules/todos_module')


function postTodos(request, response) {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Content-type', 'application/json;charset=utf-8');
    response.setHeader('Access-Control-Allow-Headers', 'Authorization');

    try {
        const token = request.headers.authorization
        
        if (!token) {
            response.statusCode = 401
        }

        const decoded = jwt.verify(token, 'secret')
        const userId = decoded.id

        let body = ''
        request.on('data', chunk => {
            body += chunk.toString();
        })
        request.on('end', chunk => {
            let params = JSON.parse(body)
            const todo = new Todos({
                text: params.text,
                user: userId
            })

            todo.save((err) => {
                if (err) {
                  console.log('err', err)
                }
                response.end(JSON.stringify(todo._id))
            })
        })
    } catch(e) {
        response.statusCode = 404
    }
}


module.exports = postTodos