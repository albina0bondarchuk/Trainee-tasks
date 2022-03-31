const Todos = require('../modules/todos_module')

const deleteElementFromDB = async(id) => {
    const todo = await Todos.findByIdAndDelete(id)

    if(!todo) {
        return false
    } 

    return true
}

module.exports = deleteElementFromDB;