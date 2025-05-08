import { Request, Response } from 'express'
import Product, { CategoryType } from '../models/Product.model'

// Siempre que interactúe con el modelo las funciones deben ser asincronas
// ESTO HACE QUE SE DETENGA LA EJECUCIÓN HASTA OBTENER RESULTADOS

export const getProducts = async (req: Request, res: Response) => {
    const products = await Product.findAll({
        order: [
            ['id', 'ASC']
        ], 
        attributes: {exclude: ['createdAt', 'updatedAt']} //esta propiedad excluye los valores que se agreguen al objeto
    })
    res.json({data: products})
}

export const getProductById = async (req: Request, res: Response) => {
    console.log(req.params.id)
    const { id } = req.params
    const product = await Product.findByPk(id)

    if(!product) {
         res.status(404).json({
             error: 'Producto no encontrado'
        })
        return
    }

    res.json({ data : product })
}

export const createProduct = async (req: Request, res: Response) => {
    const product = await  Product.create(req.body)
    res.status(201).json({data: product})
}

export const updateProduct = async (req: Request, res: Response) => {
        const { id } = req.params
        const product = await Product.findByPk(id)

        if(!product) {
             res.status(404).json({
                 error: 'Producto no encontrado'
            })
            return
        }

        // Actualizar
        await product.update(req.body)
        await product.save()
        res.json({ data : product })

}

export const updateAvailability = async (req: Request, res: Response) => {
    const { id } = req.params
    const product = await Product.findByPk(id)

    if(!product) {
         res.status(404).json({
             error: 'Producto no encontrado'
        })
        return
    }

    // Actualizar
    product.availability = !product.dataValues.availability
    await product.save()

    console.log(product.dataValues.availability)

    res.json({ data : product })
    
}

export const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params
    const product = await Product.findByPk(id)

    if(!product) {
         res.status(404).json({
             error: 'Producto no encontrado'
        })
        return
    }

    await product.destroy()
    res.json({data: 'Producto Eliminado'})

}

// Traer Categorias para usar para el formulario
export const getCategories = (req: Request, res: Response) => {
    const categories = Object.values(CategoryType)
    res.json({ data: categories })
}