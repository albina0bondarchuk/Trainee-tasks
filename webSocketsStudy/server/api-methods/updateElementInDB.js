const Todos = require('../modules/todos_module')

const updateElementInDB = async(params) => {
    const todo = await Todos.findByIdAndUpdate(params.id, {
        text: params.text,
        completed: params.completed
    })

    if(!todo) {
        return false
    } 

    return true
}

module.exports = updateElementInDB;