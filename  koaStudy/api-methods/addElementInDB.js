const jwt = require('jsonwebtoken')
const Todos = require('../modules/todos_module')

const addElementInDB = (params, token) => {
    const decoded = jwt.verify(token, 'secret')
    const userId = decoded.id

    const todo = new Todos({
        text: params.text,
        user: userId
    })

    todo.save((err) => {
        if (err) {
            console.log(err);
        }
    })
    
    return todo._id
}

module.exports = addElementInDB;