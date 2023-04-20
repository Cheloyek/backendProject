import {productsRepository} from "../repositories/products-db-repository";
const products = [{id: 1, title: 'tomato'}, {id: 2, title: 'orange'}]

//BLL
export const productsService = {
    async findProducts(title: string | null | undefined): Promise<ProductType[]> {
        return productsRepository.findProducts(title)
    },
    async findProductById(id: number) {
            return productsRepository.findProductById(id)
    },
    async createProduct(title: string) {
        const newProduct = {
            id: Number(new Date()),
            title
        }
        const createdProduct = productsRepository.createProduct(newProduct)
        return createdProduct
    },
    async updateProduct(id: number, title: string) {
        return productsRepository.updateProduct(id,title)
    },
    async deleteProduct(id: number) {
        return productsRepository.deleteProduct(id)
    }
}

type ProductType = {
    id: number
    title: string
}