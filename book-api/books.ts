import express from 'express'
const router:express.Router = express.Router()
import {connect, Book} from './mongoose'

router.post('/', async(req:any, res:any)=> {

    let b = new Book(req.body)
    let respo
    try {
        respo = await b.save()
    } catch(error) {
        console.log(error)
        return res.status(500).send(error)
    }
    
    return res.status(200).send(respo)
})

module.exports = router