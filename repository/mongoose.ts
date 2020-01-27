import mongoose from "mongoose"
import { Coffee, CoffeeMongo } from '../schemas/Coffee'
const url2:string = "mongodb://localhost:27017/teste02"


const connect = ():Promise<typeof mongoose> => mongoose.connect(url)

console.log("Valid: " + mongoose.mongo.ObjectID.isValid('5d1548295aebf4166877edfd'))
console.log("Invalid: " + mongoose.mongo.ObjectID.isValid('abc,'))


const searchAllCoffeeRequests = () => Coffee.find()

const insertCoffee = ():Promise<CoffeeMongo> => {
    let b = new Coffee({price: 5, grains: 5, type: "mocha"})
    return b.save()
}

const updateCoffee = async():Promise<CoffeeMongo | null> => {
    const coffee = await Coffee.findOne({price: 5, grains: 5, type: "mocha"})
    let response:CoffeeMongo

    if(!coffee){
        return null
    }
    coffee.grains = 6
    let b = new Coffee(coffee)
    return b.save() //pq pais tem um id, o save() só vai atualizar, e nao criar um novo documento
}

const deleteCoffee = async():Promise<CoffeeMongo | null> => {
    let cafe = await Coffee.findById("5d1548295aebf4166877edfd")
    if(!!cafe){
        return cafe.remove()
    }
    return null
}

export {
    connect,
    searchAllCoffeeRequests,
    insertCoffee,
    updateCoffee,
    deleteCoffee
}