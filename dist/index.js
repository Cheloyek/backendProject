"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const products_router_1 = require("./routes/products-router");
const addresses_router_1 = require("./routes/addresses-router");
const db_1 = require("./repositories/db");
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// const products = [{id: 1, title: 'tomato'}, {id: 2, title: 'orange'}]
// const addresses = [{id: 1, value: 'street 1'}, {id: 2, value: 'street 20'}]
const parserMiddleware = (0, body_parser_1.default)({});
app.use(parserMiddleware);
// const guardMiddleware = (req: Request, res: Response, next: NextFunction) => {
//     if (req.query.token === '777') {
//         next()
//     } else {
//         res.send(401)
//     }
// }
let requestCounter = 0;
const requestCounterMiddleware = (req, res, next) => {
    requestCounter++;
    console.log(requestCounter);
    next();
};
// app.use(guardMiddleware)
app.use(requestCounterMiddleware);
app.get('/', (req, res) => {
    let helloMessage = 'Hello :)';
    res.send(helloMessage);
});
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
app.use('/products', products_router_1.productsRouter);
app.use('/addresses', addresses_router_1.addressesRouter);
const startApp = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, db_1.runDb)();
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });
});
startApp();
