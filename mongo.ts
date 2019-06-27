//import * as mongodDb from "mongodb"
const mongodDb = require("mongodb")

mongodDb.MongoClient.connect("mongodb://localhost:27017/teste01", async (err:any, client:any)=> {
    if(err){
        console.log(err)
    }
    const db = client.db()
    const query = await queryFind(db)
    
    console.log(query)
    console.log("mongo online")
    client.close();
})

const queryOne = async(db:any) => {
    const collection = db.collection("usuarios")
    await collection.insertOne({
        nome: "nome",
        email: "email@email.com"
    })
}

const queryMany = (db:any)=> {
    return db.collection("usuarios").insertMany(
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

const queryFind = (db:any): Array<Object> => db.collection("usuarios").find({nome:{$regex: ".*noM.*", $options: 'i'} }, {projection: { _id: 0, nome:1}}).toArray()

const queryUpdate = (db:any): Object => db.collection("usuarios").updateOne({nome: "nome2"}, {$set: {email: "t@gmail.com"}})

const deleteUser = (db:any): Object => db.collection("usuarios").deleteOne({nome: "nome3"})

