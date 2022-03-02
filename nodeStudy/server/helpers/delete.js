const {parse} = require('querystring')
const Todos = require('../modules/todos_module')


function _delete(request, response) {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Content-type', 'application/json;charset=utf-8');

    
    let body = ''
    request.on('data', chunk => {
        body += chunk.toString();
    })
    request.on('end', chunk => {
        let params = body
        Todos.findByIdAndDelete(params.id).then(todo => {
            if(!todo) {
                response.statusCode = 404
            } else {                 
                response.write(JSON.stringify(todo))
            }
            response.end()
        })
    })
}

module.exports = _delete