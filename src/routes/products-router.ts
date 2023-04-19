import {Request, Response, Router} from "express";
// import {productsRepository} from "../repositories/products-in-memory-repository";
import {productsRepository} from "../repositories/products-db-repository";
import {body, validationResult} from "express-validator";
import {validationMiddleware} from "../middlewares/validationMiddleware";

// const products = [{id: 1, title: 'tomato'}, {id: 2, title: 'orange'}]

export const productsRouter = Router({})

productsRouter.get('/', async (req: any, res: Response) => {
    const foundProducts = await productsRepository.findProducts(req.query.title?.toString())
        res.send(foundProducts)
})

// productsRouter.get('/:id', (req: Request, res: Response) => {
//     const product = products.find(p => p.id === +req.params.id)
//     if (product) {
//         res.send(product)
//     } else {
//         res.send(404)
//     }
// })
productsRouter.get('/:id', async (req: Request, res: Response) => {
    const product = await productsRepository.findProductById(+req.params.id)
    if (product) {
        res.send(product)
    } else {
        res.send(404)
    }
})

// productsRouter.delete('/:id', (req: Request, res: Response) => {
//     for (let i = 0; i < products.length; i++) {
//         if (+req.params.id === products[i].id) {
//             products.splice(i, 1)
//             res.send(204)
//             return
//         }
//     }
//     res.send(404)
// })
productsRouter.delete('/:id', async (req: Request, res: Response) => {
    const isDeleted = await productsRepository.deleteProduct(+req.params.id)
    if (isDeleted) {
        res.send(204)
    } else {
        res.send(404)
    }
})

// productsRouter.post('/', (req: Request, res: Response) => {
//     const newProduct = {
//         id: Number(new Date()),
//         title: req.body.title
//     }
//     products.push(newProduct)
//     res.status(201).send(newProduct)
// })


let titleValidation = body('title').trim().isLength({min: 6}).withMessage('Title length should be from 6 symbols');
productsRouter.post('/', titleValidation, validationMiddleware, async (req: Request, res: Response) => {
        // const errors = validationResult(req)
        // if (!errors.isEmpty()) {
        //     return res.status(400).json({errors: errors.array()})
        // }
    const newProduct = await productsRepository.createProduct(req.body.title)
    res.status(201).send(newProduct)
})

// productsRouter.put('/:id', (req: Request, res: Response) => {
//     const product = products.find(p => p.id === +req.params.id)
//     if (product) {
//         product.title = req.body.title
//         res.status(201).send(product)
//     } else {
//         res.send(404)
//     }
// })
productsRouter.put('/:id', titleValidation, validationMiddleware, async (req: Request, res: Response) => {
    const isUpdated = await productsRepository.updateProduct(+req.params.id, req.body.title)
    if (isUpdated) {
        const product = await productsRepository.findProductById(+req.params.id)
        res.status(201).send(product)
    } else {
        res.send(404)
    }
})
