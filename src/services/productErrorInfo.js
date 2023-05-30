export const generateProductErrorInfo = (prod) => {
    return `
        Alguno de los campos para crear el producto no es válido
        Lista de campos requeridos:
        title: debe ser String, pero se recibió ${prod.title}
        description: debe ser String, pero se recibió ${prod.description}
        price: debe ser Number, pero se recibió ${prod.price}
        code: debe ser Number, pero se recibió ${prod.code}
        stock: debe ser Number, pero se recibió ${prod.stock}
        category: debe ser String, pero se recibió ${prod.category}
    `
}