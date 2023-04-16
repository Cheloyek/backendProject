import express, {Request, Response} from 'express'
const app = express()
const port = process.env.PORT || 3000

const products = [{id: 1, title: 'tomato'}, {id: 2, title: 'orange'}]
const addresses = [{id: 1, value: 'street 1'}, {id: 2, value: 'street 20'}]

app.get('/', (req: Request, res: Response) => {
    let helloMessage = 'Hello :)';
    res.send(helloMessage)
})

app.get('/products', (req: any, res: Response) => {
    if (req.query.title) {
        let searchString = req.query.title.toString();
        res.send(products.filter(p => p.title.indexOf(searchString) > -1))
    } else {
        res.send(products)
    }
})

app.get('/products/:id', (req: Request, res: Response) => {
    const product = products.find(p => p.id === +req.params.id)
    if (product) {
        res.send(product)
    } else {
        res.send(404)
    }
})

app.get('/addresses', (req: Request, res: Response) => {
    res.send(addresses)
})

app.get('/addresses/:id', (req: Request, res: Response) => {
    const idAddress = addresses.find(a => a.id === Number(req.params.id))
    if (idAddress) {
        res.send(idAddress)
    } else {
        res.send(404)
    }
})

app.delete('/products/:id', (req: Request, res: Response) => {
    for (let i = 0; i < products.length; i++) {
        if (+req.params.id === products[i].id) {
            products.splice(i, 1)
            res.send(204)
            return
        }
    }
    res.send(404)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

