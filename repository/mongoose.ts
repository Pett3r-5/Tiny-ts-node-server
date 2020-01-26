import mongoose from "mongoose"
const url2:string = "mongodb://localhost:27017/teste02"

const connect = ():Promise<typeof mongoose> => mongoose.connect(url)

const coffeeSchema = new mongoose.Schema({
    price: {
        type: Number, min: [2, "minimum price is USD 2"], max: [12, "maximum price is USD 12"]
    },
    grains: {
        type: Number, required: function(b:number):boolean { return b > 3 }
    },
    type: {
        type:String,
        enum: ["mocha", "espresso"],
        required: true
    }
}, {strict: true})
 //strict true vai disparar erro caso tu inclua um documento com campos que nao estao definidos no schema

const Cafe = mongoose.model('Cafe', coffeeSchema)

console.log("Valid: " + mongoose.mongo.ObjectID.isValid('5d1548295aebf4166877edfd'))
console.log("Invalid: " + mongoose.mongo.ObjectID.isValid('abc,'))

mongoose.connect(url2).then(async(data:any)=> {
    console.log("mongoose conectado " + data)
    let bb
    try{
        bb = await updateCoffee()
    } catch(err) {
        console.log("err:" + err)
    }
    
    console.log(bb)

}).catch((err:Error)=>{console.log(err)})

const searchAllCoffeeRequests = () => Cafe.find()

const insertCoffee = () => {
    let b = new Cafe({price: 5, grains: 5, type: "mocha"})
    return b.save()
}

const updateCoffee = async() => {
    const coffee = await Cafe.findOne({price: 5, grains: 5, type: "mocha"})
    if(coffee) {
        coffee.grains = 6
        let b = new Cafe(coffee)
        await b.save() //pq pais tem um id, o save() só vai atualizar, e nao criar um novo documento
    }
    
    
    console.log("país atualizado: " + coffee)

}

const deleteCoffee = async() => {
    let pais = await Cafe.findById("5d1548295aebf4166877edfd")
    if(!!pais){
        pais.remove()
    }
}

export {
    connect,
    Cafe
}