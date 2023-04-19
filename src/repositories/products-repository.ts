const products = [{id: 1, title: 'tomato'}, {id: 2, title: 'orange'}]


export const productsRepository = {
    async findProducts(title: string | null | undefined): Promise<ProductType[]> {
        if (title) {
            let filteredProducts = products.filter(p => p.title.indexOf(title) > -1)
            return filteredProducts
        } else {
            return products
        }
    },
    async findProductById(id: number) {
        const product = products.find(p => p.id === id)
        return product
    },
    async updateProduct(id: number, title: string) {
        const product = products.find(p => p.id === id)
        if (product) {
            product.title = title
            return true
        } else {
            return false
        }
    },
    async createProduct(title: string) {
        const newProduct = {
            id: Number(new Date()),
            title
        }
        products.push(newProduct)
        return newProduct
    },
    async deleteProduct(id: number) {
        for (let i = 0; i < products.length; i++) {
            if (id === products[i].id) {
                products.splice(i, 1)
                return true
            }
        }
        return false
    }
}

type ProductType = {
    id: number
    title: string
}