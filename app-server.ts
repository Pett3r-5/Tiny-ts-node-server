import express = require("express");
import productRouter from "./routes/product"
import * as bodyParser from "body-parser"
let cidadesJsons = require("./jsons/cidades.json")
let estadosJsons = require("./jsons/estados.json")

// import default from "./routes/estados"

const app:express.Application = express()
const router:express.Router = express.Router()

router.use(bodyParser.json())

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

router.get("/", (req: express.Request, res: express.Response)=> {
    console.log("estados1")
    return res.json(estadosJsons)
})

router.get("/:sigla", (req: express.Request, res: express.Response)=> {
    //let {sigla} = req.params
    req.body = {sigla: req.params.sigla};
    let response;
    response = estadosJsons.filter((elem:any)=> {
        return elem.sigla === req.params.sigla.toUpperCase()
    })
    console.log("/estados/:sigla")
    return res.json(response)
})

app.use("/estados", router)



//app.use("/:sigla", router)

router.get("/cidades", (req: express.Request, res: express.Response)=> {
    //let sigla = req.body.sigla
    console.log('req.params')
    console.log(req.params)
    let sigla = req.body.sigla
    let response;
    response = cidadesJsons.filter((elem:any)=> {
        return elem.estado === sigla.toUpperCase()
    })

    return res.json(response)
})

router.get("/cidades/:id", (req: express.Request, res: express.Response)=> {
    let {id} = req.params

    let response;
    response = cidadesJsons.filter((elem:any)=> {
        return Number(elem.id) === Number(id)
    })

    return res.json(response)
})

app.use("/:sigla", router)

app.post("/estados/:sigla", (req, res)=> {
    const {id, nome } = req.body;
    const {sigla} = req.params
    const obj =  {
            id,
            nome,
            estados: sigla
        }
    
    return res.sendStatus(201)
    
})




app.listen(5003)