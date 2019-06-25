import * as url from "url"
import * as fs from "fs"

import * as http from "http"
import {dataAtual} from "./dataAtual"
import {tt} from "./dataAtual"

http.createServer((req: any, res: any)=>{
    res.writeHead(200, {"Content-Type": "text/plain"})
    console.log("req.url: ", req.url)
    const q = url.parse(req.url, true).query //,true: parseia o param '?' tambem
    console.log("typeof req")
    console.log(typeof req)

    fs.readFile("./teste.txt", (err, data)=> {
        if(err) console.log(err)

        console.log("data: " + data)
        res.end(data)
    })
    
}).listen(8080, ()=>console.log("Servidor rodando"))

console.log("Depois do listen: ", dataAtual())
console.log("Segunda função: ", tt())