const {parse} = require('querystring')
const jwt = require('jsonwebtoken')
const User = require('../modules/user_module')


function postLogin(request, response) {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Headers', 'content-type');
    response.setHeader('Content-type', 'application/text;charset=utf-8');
    response.setHeader('Access-Control-Expose-Headers', 'autorization');

    let body = ''
    request.on('data', chunk => {
        body += chunk.toString();
    })
    request.on('end', chunk => {
        let params = JSON.parse(body)

        User.findOne({
            login: params.login
        }).then(result => {
            if(!result) {
                response.end()
            } else {
                result.isValidPassword(params.password).then(function(res){
                    const isPassValid = res
                    if (!isPassValid) {
                        response.end()
                    } else {
                        const token = jwt.sign({id: result.id}, "secret", {expiresIn: '1h'})
                        response.setHeader('autorization', token)
                        response.end()
                    }
                })
            }
            
        })
    })
}

module.exports = postLogin