import express = require("express");
import productRouter from "./routes/product"
import * as bodyParser from "body-parser"



class Server {
    private app:express.Application;

    constructor(){
        this.app = express()
        this.app.use(express.static('public')) //vai buscar arquivos dentro da pasta public
        this.defineMiddlewares();
        this.app.listen(5001)
    }

    public getApp(): express.Application{
        return this.app;
    }

    public defineMiddlewares(): void {
        this.app.use(bodyParser.json())
        this.app.use('/login', this.dataAtual)

        this.app.all("/admin", (req, res, next)=>{
            console.log(`admin request do tipo ${req.method}`)
            return next()
        })

        this.app.get("/admin", (req, res, next)=>{
            console.log(`admin request do tipo ${req.method}`)
            return next()
        })
    }

    public dataAtual (req: express.Request, res: express.Response, next: express.NextFunction): void {
        console.log("new date:" + new Date())
        return next()
    }

    public getRoute(): express.Application {
        return this.app.get("/", (req:express.Request, res:express.Response)=>{
            return res.send("okkkkk")
        })
    }

    public postLoginRoute(): express.Application {
        return this.app.post('/login', (req:express.Request, res:express.Response)=>{
            console.log("req body: " + JSON.stringify(req.body, undefined, 4))
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

server.getIds();
server.getJSON();
//server.getApp().use('/products', server.getAdminRoute)