const Todos = require('../modules/todos_module')

const deleteElementFromDB = async(params) => {
    const todo = await Todos.findByIdAndDelete(params.id)

    if(!todo) {
        return false
    } 

    return true
}

module.exports = deleteElementFromDB;