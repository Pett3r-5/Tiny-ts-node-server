import mongoose from 'mongoose'
const url:string = 'mongodb://localhost:27017/book-mngr'

const connect = ():Promise<typeof mongoose> => mongoose.connect(url)
//:mongoose.Schema<any>
const books = new mongoose.Schema({
    title: {type:String, required: true},
    author: String,
    category: String,
    numberOfPages:{type:Number,min:1},
    publicationYear: Number
})

const Book = mongoose.model('Book', books)

export {
    connect,
    Book

}