const products = [{id: 1, title: 'tomato'}, {id: 2, title: 'orange'}]


export const productsRepository = {
    findProducts(title: string | null | undefined) {
        if (title) {
            let filteredProducts = products.filter(p => p.title.indexOf(title) > -1)
            return filteredProducts
        } else {
            return products
        }
    },
    findProductById(id: number) {
        const product = products.find(p => p.id === id)
        return product
    },
    updateProduct(id: number, title: string) {
        const product = products.find(p => p.id === id)
        if (product) {
            product.title = title
            return true
        } else {
            return false
        }
    },
    createProduct(title: string) {
        const newProduct = {
            id: Number(new Date()),
            title
        }
        products.push(newProduct)
        return newProduct
    },
    deleteProduct(id: number) {
        for (let i = 0; i < products.length; i++) {
            if (id === products[i].id) {
                products.splice(i, 1)
                return true
            }
        }
        return false
    }
}
