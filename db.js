// use mysql as a database 
const mysql = require('mysql2')

const connection = mysql.createConnection({
    host:process.env.HOST,
    database:process.env.DATABASE,
    user:process.env.USER,
    password:process.env.PASSWORD
})

connection.connect((err)=>{
    if(err){
        console.log('db not connected');
        return
    }
    console.log('db connected successfully');
    
})

module.exports = connection
