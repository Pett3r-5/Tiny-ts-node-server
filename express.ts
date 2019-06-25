import express = require("express");

class Server {
    private app:express.Application;

    constructor(){
        this.app = express()
        this.app.use(express.static('public')) //vai buscar arquivos dentro da pasta public
        this.app.listen(5001)
    }

    public getRoute(){
        return this.app.get("/", (req:express.Request, res:express.Response)=>{
            return res.send("okkkkk")
        })
    }

    public postLoginRoute(){
        return this.app.post('/login', (req:express.Request, res:express.Response)=>{
            return res.send("POST recebido em /login")
        })
    }

    public putSettingsRoute(){
        return this.app.put("/settings", (req:express.Request, res:express.Response)=>{
            return res.send("Settings alteradas")
        })
    }

    public deleteRoute(){
        return this.app.delete("/logs", (req, res)=>{
            return res.send("logs deleted")
        })
    }

}

const server:Server  = new Server();
server.getRoute();
server.postLoginRoute();
server.putSettingsRoute();
server.deleteRoute();