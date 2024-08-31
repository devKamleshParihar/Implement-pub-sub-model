const { log } = require('console')
const  express = require('express')
const fs = require('fs')
const app = express()
const port  = 2000

// const path = `${__dirname}/tables`

// let readedFile = fs.readFileSync(`${path}/user.json`,'utf-8')
// readedFile = JSON.parse(readedFile)
// console.log(readedFile);





app.listen(port,()=>{
    console.log(`Apllication running on port ${port}`);
})