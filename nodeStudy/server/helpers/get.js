const jwt = require('jsonwebtoken')
const User = require('../modules/user_module')
const Todos = require('../modules/todos_module')


function get(request, response) {
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
        User.findById(userId)
        .then(user => {
            if(!user) {
                response.statusCode = 404
                response.end()
            } else {
                return Todos.find({
                    user: user._id
                })
                
            }
        })
        .then(todos => {
            response.end(JSON.stringify(todos))
        })
    } catch(e) {
        response.statusCode = 404
    }
}

module.exports = get