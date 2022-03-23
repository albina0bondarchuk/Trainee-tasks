const mongoose = require('mongoose'); 
const connexionString = require('./config/app-config'); 

const initDB = () => {  
    mongoose.connect(connexionString);
    mongoose.connection.once('open', () => { 
      console.log('connected to database'); 
    }); 
    
    mongoose.connection.on('error', console.error); 
} 

module.exports = initDB;