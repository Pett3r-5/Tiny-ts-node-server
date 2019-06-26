import express = require("express");
import productRouter from "./routes/product"
import * as bodyParser from "body-parser"
let cidadesJsons = require("./jsons/cidades.json")
let estadosJsons = require("./jsons/estados.json")

// import default from "./routes/estados"

const app:express.Application = express()
const router:express.Router = express.Router()

router.use(bodyParser.json())

router.get("/estados", (req: express.Request, res: express.Response)=> {
    return res.json(estadosJsons)
})

router.get("/estados/:sigla", (req: express.Request, res: express.Response)=> {
    let {sigla} = req.params

    let response;
    response = estadosJsons.filter((elem:any)=> {
        return elem.sigla === sigla.toUpperCase()
    })
    console.log("/estados/:sigla")
    console.log(estadosJsons)
    return res.json(response)
})

router.get("/estados/:sigla/cidades", (req: express.Request, res: express.Response)=> {
    let {sigla} = req.params

    let response;
    response = cidadesJsons.filter((elem:any)=> {
        return elem.estado === sigla.toUpperCase()
    })

    return res.json(response)
})

router.get("/estados/:sigla/cidades/:id", (req: express.Request, res: express.Response)=> {
    let {id} = req.params

    let response;
    response = cidadesJsons.filter((elem:any)=> {
        return Number(elem.id) === Number(id)
    })

    return res.json(response)
})

app.use("/teste", router)

app.listen(5002)