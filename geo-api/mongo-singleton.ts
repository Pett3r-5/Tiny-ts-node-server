const {MongoClient} = require("mongodb")
const url = "mongodb://localhost:27017/teste01"

let db:any
const openConection = async () => {
    if(!!db) return db;
    db = (await MongoClient.connect(url)).db()
    return db;
}

const estados = async () => {
    await openConection()
    return db.collection('estados')
}

const cidades = async () => {
    await openConection()
    return db.collection('cidades')
}

module.exports = {
    estados,
    cidades
}