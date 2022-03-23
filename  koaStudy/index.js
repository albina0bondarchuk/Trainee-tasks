const Koa = require('koa')
const cors = require('@koa/cors');
var bodyParser = require('koa-bodyparser')
const initDB = require('./database')
const loginRouter = require('./router/loginRouter')
const todosRouter = require('./router/todosRouter')

initDB(); 

const app = new Koa()
app.use(cors());
app.use(bodyParser());

app.use(loginRouter.routes())
    .use(loginRouter.allowedMethods())

app.use(todosRouter.routes())
    .use(todosRouter.allowedMethods())

app.listen(8000, () => console.log('Server running at PORT 8000'))