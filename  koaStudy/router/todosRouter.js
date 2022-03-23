const koaRouter = require('koa-router')
const context = require('koa/lib/context')
const addElementInDB = require('../api-methods/addElementInDB')
const deleteElementFromDB = require('../api-methods/deleteElementFromDB')
const getElementsFromDB = require('../api-methods/getElementsFromDB')
const updateElementInDB = require('../api-methods/updateElementInDB')

const router = new koaRouter()

router.get('todos', '/todos', async (context) => {
    context.set({
        'Access-Control-Allow-Origin': '*',
        'Content-type': 'application/text;charset=utf-8',
        'Access-Control-Expose-Headers': 'autorization'
    })

    const token = context.request.headers.authorization
        
    if (!token) {
        context.response.status = 401
    }

    const result = await getElementsFromDB(token)
    context.body = result
}) 

router.post('todos', '/todos', async (context) => {
    context.set({
        'Access-Control-Allow-Origin': '*',
        'Content-type': 'application/text;charset=utf-8',
        'Access-Control-Expose-Headers': 'autorization'
    })

    const token = context.request.headers.authorization

    if (!token) {
        context.response.status = 401
    }

    const result = addElementInDB(context.request.body, token)
    console.log(result);
    context.body = result 
})

router.patch('todos', '/todos', context => {
    context.set({
        'Access-Control-Allow-Origin': '*',
        'Content-type': 'application/text;charset=utf-8',
    })

    const result = updateElementInDB(context.request.body)
    result ? context.status = 200 : context.status = 404
})

router.delete('todos', '/todos', context => {
    context.set({
        'Access-Control-Allow-Origin': '*',
        'Content-type': 'application/text;charset=utf-8',
    })

    const result = deleteElementFromDB(context.request.body)
    result ? context.status = 200 : context.status = 404
})


module.exports = router