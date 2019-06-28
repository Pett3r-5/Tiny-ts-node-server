import express = require("express");
import productRouter from "./routes/product"
import * as bodyParser from "body-parser"
let cidadesJsons = require("./jsons/cidades.json")
let estadosJsons = require("./jsons/estados.json")
const {estados, cidades} = require("./geo-api/mongo-singleton")



// import default from "./routes/estados"

const app:express.Application = express()
const router:express.Router = express.Router()

app.use(bodyParser.json())

const auth = (req:express.Request, res:express.Response, next:express.NextFunction)=> {
    const {authorization} = req.headers
    let decoded:String = "";
    if(!!authorization){
        console.log(authorization)
        decoded = Buffer.from(authorization.split(" ")[1], "base64").toString()
        console.log(decoded)
    }
    if(decoded.split(":")[0] === "admin" && decoded.split(":")[1] === "1234"){
        return next()
    }
    return res.sendStatus(401)
    
}


app.use(auth)

router.get("/", async(req: express.Request, res: express.Response)=> {
    console.log("estados1")
    let Estados
    let result
    try {
        Estados = await estados();
        result = await Estados.find({}).toArray()
    } catch(err){
        console.log(err)
        return res.sendStatus(500)
    }
    
    return res.json(result)
})

router.post("/", async(req: express.Request, res: express.Response)=> {
    const {sigla, nome} = req.body

    if(!sigla || !nome) {
        return res.status(400).send("faltando sigla ou nome")
    }

    const estado = {sigla, nome}
    let result
    try {
        let es = await estados()
        result = await es.insertOne(estado)
    } catch(err0r){
        console.log(err0r)
        return res.sendStatus(500)
    }
    

    if(!result.result.ok){
        return res.sendStatus(500)
    }
    return res.status(201).send("okkkkk")
    
})

router.get("/:sigla", async(req: express.Request, res: express.Response)=> {
    let {sigla} = req.params
    //req.body = {sigla: req.params.sigla};
    let response;
    //response = estadosJsons.filter((elem:any)=> {
    //    return elem.sigla === sigla.toUpperCase()
    //})
    console.log("/estados/:sigla")
    try {
        let Estados = await estados()
        response = await Estados.findOne({sigla})
    } catch(err0r){
        console.log(err0r)
        return res.sendStatus(500)
    }


    return res.json(response)
})

app.use("/estados", router)

const router2:express.Router = express.Router()

//app.use("/:sigla", router)


app.get("/estados/:sigla/cidades", async(req: express.Request, res: express.Response)=> {
    //let sigla = req.body.sigla

    let {sigla} = req.params
    let responseCidade;
    //response = cidadesJsons.filter((elem:any)=> {
    //    return elem.estado === sigla.toUpperCase()
    //})
    try {
        let Cidades = await cidades()
        responseCidade = await Cidades.find({estado: sigla.toUpperCase()}).toArray()
    } catch(err0r) {
        console.log(err0r)
        return res.sendStatus(500)
    }
    return res.json(responseCidade)
})

app.get("/estados/:sigla/cidades/:id", async(req: express.Request, res: express.Response)=> {
    let {id} = req.params
    let responseCidade;

    try {

        let Cidades = await cidades()
        responseCidade = await Cidades.find({id: id}).toArray()
    } catch(err0r) {
        console.log(err0r)
        return res.sendStatus(500)
    }

    //let response;
    //response = cidadesJsons.filter((elem:any)=> {
    //    return Number(elem.id) === Number(id)
    //})

    return res.json(responseCidade)
})

//app.use("/estados/:sigla", router2)

app.post("/estados", async(req: express.Request, res: express.Response)=> {
    const {nome, sigla} = req.body;
    let responseEstado;

    try {
        let Estados = await estados()
        responseEstado = await Estados.insertOne({nome: nome, sigla: sigla})
    } catch(err0r) {
        console.log(err0r)
        return res.sendStatus(500)
    }

    if(!!responseEstado.result && !responseEstado.result.ok){
        return res.sendStatus(500)
    }
    
    return res.sendStatus(201)
    
})

app.post("/estados/:sigla/cidades", async(req: express.Request, res: express.Response)=> {
    const {nome, id} = req.body;
    let {sigla} = req.params
    sigla = sigla.toUpperCase()

    let responseCidade;

    try {
        let Cidades = await cidades()
        responseCidade = await Cidades.insertOne({id: id, nome: nome, estado: sigla})
    } catch(err0r) {
        console.log(err0r)
        return res.sendStatus(500)
    }

    if(!!responseCidade.result && !responseCidade.result.ok){
        return res.sendStatus(500)
    }
    
    return res.sendStatus(201)
    
})




app.listen(5003)