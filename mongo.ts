//import * as mongodDb from "mongodb"
const mongodDb = require("mongodb")

mongodDb.MongoClient.connect("mongodb://localhost:27017/teste01", async (err:any, client:any)=> {
    if(err){
        console.log(err)
    }
    const db = client.db()
    const query = await queryFind(db)
    console.log("mongo online")
    console.log(query)
    client.close();
})

const queryOne = async(db:any) => {
    const collection = db.collection("usuarios")
    await collection.insertOne({
        nome: "nome",
        email: "email@email.com"
    })
}

const queryMany = async(db:any)=> {
    await db.collection("usuarios").insertMany(
        [
            {
                nome: "nome2",
                email: "email@email.com"
            },
            {
                nome: "nome3",
                email: "email@email.com"
            }
        ])
}

const queryFind = async(db:any)=> {
    return await db.collection("usuarios").find({}, {projection: { _id: 0, nome:1}}).toArray()
}