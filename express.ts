import express = require("express");

class Server {
    private app:express.Application;

    constructor(){
        this.app = express()
    }

    public getRoute(){
        return this.app.get("/", (req:express.Request, res:express.Response)=>{
            res.send("okkkkk")
        }).listen(5001)
    }

    public postLoginRoute(){
        return this.app.post('/login', (req, res)=>{
            res.send("POST recebido em /login")
        })
    }

}

const server:Server  = new Server();
server.getRoute();
server.postLoginRoute();