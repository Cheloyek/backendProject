import express, {Request, Response, NextFunction} from 'express'
import bodyParser from "body-parser"
import {productsRouter} from "./routes/products-router";
import {addressesRouter} from "./routes/addresses-router";
import {log} from "util";
import {runDb} from "./repositories/db";
const app = express()
const port = process.env.PORT || 3000

// const products = [{id: 1, title: 'tomato'}, {id: 2, title: 'orange'}]
// const addresses = [{id: 1, value: 'street 1'}, {id: 2, value: 'street 20'}]

const parserMiddleware = bodyParser({})
app.use(parserMiddleware)
// const guardMiddleware = (req: Request, res: Response, next: NextFunction) => {
//     if (req.query.token === '777') {
//         next()
//     } else {
//         res.send(401)
//     }
// }
let requestCounter = 0
const requestCounterMiddleware = (req: Request, res: Response, next: NextFunction) => {
    requestCounter++
    console.log(requestCounter);
    next()
}
// app.use(guardMiddleware)
app.use(requestCounterMiddleware)


app.get('/', (req: Request, res: Response) => {
    let helloMessage = 'Hello :)';
    res.send(helloMessage)
})

// app.get('/addresses', (req: Request, res: Response) => {
//     res.send(addresses)
// })

// app.get('/addresses/:id', (req: Request, res: Response) => {
//     const idAddress = addresses.find(a => a.id === Number(req.params.id))
//     if (idAddress) {
//         res.send(idAddress)
//     } else {
//         res.send(404)
//     }
// })

// app.get('/products', (req: any, res: Response) => {
//     if (req.query.title) {
//         let searchString = req.query.title.toString();
//         res.send(products.filter(p => p.title.indexOf(searchString) > -1))
//     } else {
//         res.send(products)
//     }
// })
//
// app.get('/products/:id', (req: Request, res: Response) => {
//     const product = products.find(p => p.id === +req.params.id)
//     if (product) {
//         res.send(product)
//     } else {
//         res.send(404)
//     }
// })
//
// app.delete('/products/:id', (req: Request, res: Response) => {
//     for (let i = 0; i < products.length; i++) {
//         if (+req.params.id === products[i].id) {
//             products.splice(i, 1)
//             res.send(204)
//             return
//         }
//     }
//     res.send(404)
// })
//
// app.post('/products', (req: Request, res: Response) => {
//     const newProduct = {
//         id: Number(new Date()),
//         title: req.body.title
//     }
//     products.push(newProduct)
//     res.status(201).send(newProduct)
// })
//
// app.put('/products/:id', (req: Request, res: Response) => {
//     const product = products.find(p => p.id === +req.params.id)
//     if (product) {
//         product.title = req.body.title
//         res.status(201).send(product)
//     } else {
//         res.send(404)
//     }
// })


app.use('/products', productsRouter)
app.use('/addresses', addressesRouter)

const startApp = async () => {
    await runDb()
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}
startApp()


