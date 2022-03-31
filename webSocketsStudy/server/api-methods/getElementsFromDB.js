const jwt = require('jsonwebtoken')
const User = require('../modules/user_module')
const Todos = require('../modules/todos_module')

const getElementsFromDB = async(token) => {
    const decoded = jwt.verify(token, 'secret')
    const userId = decoded.id

    const user = await User.findById(userId)
    if(!user) {
        return new Promise(() => {
            return null
        })
    } else {
        return Todos.find({
            user: user._id
        })
        
    }
}

module.exports = getElementsFromDB;