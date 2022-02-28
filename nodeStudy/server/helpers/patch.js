const {parse} = require('querystring')
const Todos = require('../modules/todos_module')


function patch(request, response) {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Content-type', 'application/json;charset=utf-8');

    let body = ''
        
    request.on('data', chunk => {
        body += chunk.toString();
    })
        
    request.on('end', chunk => {
        let params = JSON.parse(body)
        Todos.findByIdAndUpdate(params.id, {
            text: params.text,
            completed: params.completed
        })
            .then(todo => {
                if(!todo) {
                    response.end(':(((')
                } else {                
                    response.write(JSON.stringify(todo))
                }
                response.end()
            })
    })
}

module.exports = patch