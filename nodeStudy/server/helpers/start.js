const mongoose = require('mongoose')

async function start(server) {
    try {
        await mongoose.connect(
            'mongodb+srv://albin23:1234@cluster0.rg71d.mongodb.net/todoList', {
            useNewUrlParser: true
        })

        server.listen(8000, (err) => {
            if (err) {
                return console.log('something bad happened', err)
            }
            console.log(`server is listening`)
        })
    } catch(e) {
        console.log(e);
    }
}

module.exports = start