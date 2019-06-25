import express = require("express");



class Server {
    private app:express.Application;

    constructor(){
        this.app = express()
        this.app.use(express.static('public')) //vai buscar arquivos dentro da pasta public
        this.defineMiddlewares();
        this.app.listen(5001)
    }

    public defineMiddlewares(): void {
        this.app.all("/admin", (req, res, next)=>{
            console.log(`admin request do tipo ${req.method}`)
            return next()
        })

        this.app.get("/admin", (req, res, next)=>{
            console.log(`admin request do tipo ${req.method}`)
            return next()
        })
    }

    public getRoute(): express.Application {
        return this.app.get("/", (req:express.Request, res:express.Response)=>{
            return res.send("okkkkk")
        })
    }

    public postLoginRoute(): express.Application {
        return this.app.post('/login', (req:express.Request, res:express.Response)=>{
            return res.send("POST recebido em /login")
        })
    }

    public putSettingsRoute(): express.Application {
        return this.app.put("/settings", (req:express.Request, res:express.Response)=>{
            return res.send("Settings alteradas")
        })
    }

    public deleteRoute(): express.Application {
        return this.app.delete("/logs", (req:express.Request, res:express.Response)=>{
            return res.send("logs deleted")
        })
    }

    public getAdminRoute(): express.Application {
        return this.app.get("/admin", (req:express.Request, res:express.Response)=> {
            return res.status(200).send("got the admin")
        })
    }

    public getIds(): express.Application {
        return this.app.get("/users/:userId/books/:books", (req:express.Request, res:express.Response)=>{
            const { userId, books } = req.params
            return res.send(`user's id is: ${userId} | ${books}`)
        })
    }

    public getJSON(): express.Application {
        return this.app.get('/users', (req: express.Request, res: express.Response)=> {
            const users: Array<Object> = [
                {username: "john"},
                {username: "paul"}
            ]

            return res.json(users)
        })
    }

}

const server:Server  = new Server();
server.getRoute();
server.postLoginRoute();
server.putSettingsRoute();
server.deleteRoute();
server.getAdminRoute();
server.getIds();
server.getJSON();