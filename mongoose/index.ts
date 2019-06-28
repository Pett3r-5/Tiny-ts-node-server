import mongoose from "mongoose"
const url2:string = "mongodb://localhost:27017/teste02"

const paisSchema = new mongoose.Schema({
    nome: String,
    sigla: String
}, {strict: true}) //strict true vai disparar erro caso tu inclua um documento com campos que nao estao definidos no schema
const Pais = mongoose.model('Pais', paisSchema)


const cafeSchema = new mongoose.Schema({
    ovos: {
        type: Number, min: [6, "mínimo de 6 ovos"], max: [12, "maximo 12"]
    },
    bacon: {
        type: Number, required: function(b:number):boolean { return b > 3 }
    },
    bebida: {
        type:String,
        enum: ["café", "chá"],
        required: true
    }
})
const Cafe = mongoose.model('Cafe', cafeSchema)

console.log("Valid: " + mongoose.mongo.ObjectID.isValid('5d1548295aebf4166877edfd'))
console.log("Invalid: " + mongoose.mongo.ObjectID.isValid('abc,'))

mongoose.connect(url2).then(async(data:any)=> {
    console.log("mongoose conectado " + data)
    let bb
    try{
        bb = await atualizaPais()
    } catch(err) {
        console.log("err:" + err)
    }
    
    console.log(bb)

}).catch((err:Error)=>{console.log(err)})

const buscaPais = () => Pais.find()

const inserePais = () => {
    let b = new Pais({nome:"brasil", sigla: "BR"})
    return b.save()
}

const atualizaPais = async() => {
    const pais = await Pais.findOne({sigla: "BR"})
    if(pais) {
        //pais.nome = "Brazil"
        //let b = new Pais(pais)
        await pais.save() //pq pais tem um id, o save() só vai atualizar, e nao criar um novo documento
    }
    
    
    console.log("país atualizado: " + pais)

}

const deletaPais = async() => {
    let pais = await Pais.findById("5d1548295aebf4166877edfd")
    if(!!pais){
        pais.remove()
    }
}