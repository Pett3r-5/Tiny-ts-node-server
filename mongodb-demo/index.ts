import * as mongodDb from "mongodb"
//const mongodDb = require("mongodb")

mongodDb.MongoClient.connect("mongodb://localhost:27017/teste01", (err:any, client:mongodDb.MongoClient)=> {
    if(err){
        console.log(err)
    }
    const db = client.db()
    console.log("mongo online")
})