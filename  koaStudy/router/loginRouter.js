const koaRouter = require('koa-router')
const getUserFromDB = require('../api-methods/getUserFromDB')

const router = new koaRouter()

router.post('login', '/login', async (context) => {
    context.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'content-type',
        'Content-type': 'application/text;charset=utf-8',
        'Access-Control-Expose-Headers': 'authorization',
    })

    let token = await getUserFromDB(context.request.body)
    if(token) {
        context.status = 200
        context.set('authorization', token)
    } else {
        context.status = 401
    } 
}) 

router.options(context => {
    context.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PATCH, DELETE',
        'Access-Control-Allow-Headers': 'X-Requested-With,content-type, Authorization',
        'Access-Control-Allow-Credentials': true,
    })
})


module.exports = router