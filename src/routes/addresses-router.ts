import {Request, Response, Router} from "express";

const addresses = [{id: 1, value: 'street 1'}, {id: 2, value: 'street 20'}]

export const addressesRouter = Router({})

addressesRouter.get('/', (req: Request, res: Response) => {
    res.send(addresses)
})

addressesRouter.get('/:id', (req: Request, res: Response) => {
    const idAddress = addresses.find(a => a.id === Number(req.params.id))
    if (idAddress) {
        res.send(idAddress)
    } else {
        res.send(404)
    }
})