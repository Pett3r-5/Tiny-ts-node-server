import mongoose from "mongoose"
import { Coffee } from '../models/Coffee'

type CoffeeMongo = Coffee & mongoose.Document

const coffeeSchema = new mongoose.Schema<CoffeeMongo>({
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

const Coffee = mongoose.model<CoffeeMongo>('Cafe', coffeeSchema)

export { Coffee, CoffeeMongo }