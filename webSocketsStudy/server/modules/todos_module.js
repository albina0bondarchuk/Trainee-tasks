const mongoose = require('mongoose');
const { Schema } = mongoose;

const todosSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    completed: {
        type: String,
        default: false
    },
    user: Schema.Types.ObjectId
})

const Todos = mongoose.model('Todos', todosSchema);
module.exports = Todos