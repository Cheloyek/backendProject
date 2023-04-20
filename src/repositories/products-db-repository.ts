import {client, ProductType} from "./db";

const products = [{id: 1, title: 'tomato'}, {id: 2, title: 'orange'}]

const productsCollection = client.db("shop").collection<ProductType>("products");
export const productsRepository = {
    async findProducts(title: string | null | undefined): Promise<ProductType[]> {
        const filter: any = {}
        if (title) {
            filter.title = {$regex: title}
        }
            return productsCollection.find(filter).toArray()
    },
    async findProductById(id: number) {
        const product: ProductType | null = await productsCollection.findOne({id: id})
            return product
    },
    async createProduct(newProduct: ProductType) {
        const result = await productsCollection.insertOne(newProduct)
        return newProduct
    },
    async updateProduct(id: number, title: string) {
        const result = await productsCollection.updateOne({id: id}, {$set: {title: title}})
        return result.matchedCount === 1
    },
    async deleteProduct(id: number) {
        const result = await productsCollection.deleteOne({id: id})
        return result.deletedCount === 1
    }
}
