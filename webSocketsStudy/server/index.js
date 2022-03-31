const addElementInDB = require('./api-methods/addElementInDB');
const deleteElementFromDB = require('./api-methods/deleteElementFromDB');
const getElementsFromDB = require('./api-methods/getElementsFromDB');
const getUserFromDB = require('./api-methods/getUserFromDB');
const updateElementInDB = require('./api-methods/updateElementInDB');
const initDB = require('./database')


initDB(); 

const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
      allowedHeaders: ["Authorization"],
      credentials: true
    }
});

io.on('connection', (socket) => {
    console.log('A user connected');
  
    socket.on('postLogin', data => {
        getUserFromDB(JSON.parse(data)).then(token => {
            token ? socket.emit('sendToken', token) : console.log('error')
        })
    })

    socket.on('getTodos', token => {
        getElementsFromDB(token).then(data => {
            socket.emit('sendTodosArray', JSON.stringify(data))
        })
    })

    socket.on('postTodo', ({token, text}) => {
        const id = addElementInDB(text, token)
        id ? socket.emit('sendId', id) : console.log('error')
    })

    socket.on('deleteTodo', id => {
        deleteElementFromDB(id)
    })

    socket.on('patchTodo', data => {
        updateElementInDB(data)
    })
  });

httpServer.listen(8000);