import express = require("express")
const router:express.Router = express.Router()

const products: Array<object> = [
    {id: 1, name: "iPhone"},
    {id:2, name: "zenphone"}
]

router.get('/', (req, res)=> {
    return res.json(products);
})

export default router