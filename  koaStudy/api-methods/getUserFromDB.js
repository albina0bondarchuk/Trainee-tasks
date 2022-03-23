const jwt = require('jsonwebtoken')
const User = require('../modules/user_module')

const getUserFromDB = async(params) => {
    const result = await User.findOne({
        login: params.login
    })

    if(!result) {
        return null
    } else {
        const isPassValid = await result.isValidPassword(params.password)

        if (!isPassValid) {
            return null
        } else {
            const token = jwt.sign({id: result.id}, "secret", {expiresIn: '1h'})
            return token
        }
    }
}

module.exports = getUserFromDB;