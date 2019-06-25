import express = require("express");

class Server {
    private app:express.Application;

    constructor(){
        this.app = express()
    }

    public getRoute(){
        this.app.get("/", (req:express.Request, res:express.Response)=>{
            res.send("okkkkk")
        }).listen(5001)
    }

}

const server:Server  = new Server();
server.getRoute();