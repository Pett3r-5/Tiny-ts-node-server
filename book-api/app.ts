import express from "express"
import bodyParser from 'body-parser'
import cors from 'cors'
const bookRouter =require('./books')
import {connect, Book} from './mongoose'


const app:express.Application = express()
app.use(bodyParser.json())
app.use(cors())


app.get('/', (req:express.Request, res:express.Response)=> {
    res.json([])
})



app.use('/books', bookRouter)

app.listen(8080, async()=>{
    let res = await connect
    console.log(res);
    
    console.log("book-api running on port 8080")
    
})