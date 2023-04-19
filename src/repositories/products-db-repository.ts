import {client} from "./db";

const products = [{id: 1, title: 'tomato'}, {id: 2, title: 'orange'}]

const productsCollection = client.db("shop").collection<ProductType>("products");
export const productsRepository = {
    async findProducts(title: string | null | undefined): Promise<ProductType[]> {

        const filter: any = {}
        if (title) {
            // return productsCollection.find({title: {$regex: title}}).toArray()
            filter.title = {$regex: title}
        }
            return productsCollection.find(filter).toArray()

        // if (title) {
        //     let filteredProducts = products.filter(p => p.title.indexOf(title) > -1)
        //     return filteredProducts
        // } else {
        //     return products
        // }
    },
    async findProductById(id: number) {
        const product: ProductType | null = await productsCollection.findOne({id: id})
        // const product = products.find(p => p.id === id)
        if (product) {
            return product
        } else {
            return null
        }
    },
    async createProduct(title: string) {
        const newProduct = {
            id: Number(new Date()),
            title
        }
        const result = await productsCollection.insertOne(newProduct)
        // products.push(newProduct)
        return newProduct
    },
    async updateProduct(id: number, title: string) {
        const result = await productsCollection.updateOne({id: id}, {$set: {title: title}})
        return result.matchedCount === 1

        // const product = products.find(p => p.id === id)
        // if (product) {
        //
        //     product.title = title
        //     return true
        // } else {
        //     return false
        // }
    },
    async deleteProduct(id: number) {
        const result = await productsCollection.deleteOne({id: id})
        return result.deletedCount === 1
        // for (let i = 0; i < products.length; i++) {
        //     if (id === products[i].id) {
        //         products.splice(i, 1)
        //         return true
        //     }
        // }
        // return false
    }
}

type ProductType = {
    id: number
    title: string
}