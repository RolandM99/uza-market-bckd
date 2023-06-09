import { Request, Response } from 'express';
import { isVendor } from '../Middleware/userAuth';
const dataPro = require('../Models');

const Product = dataPro.product;

// Create a new product
export const createProduct = async (req: Request, res: Response) => {
  try {
    
    await isVendor(req, res, async () => {;

    const { productName, productImage, productPrice, attributes, productCategory, reviews, rating } = req.body;

    const productData = {
        productName,
        productImage,
        productPrice,
        attributes,
        productCategory,
        reviews,
        rating
    }
    const vendorId = req.params.id;

    // Create the product and associate it with the user
    const product = await Product.create(productData, { vendorId });
    return res.status(201).json(product);
    });
    return;
  } catch (error) {
    console.error('Error creating product:', error);
    return res.status(500).json({ message: 'Failed to create product' });
  }
};

// Get all products
export const getAllProducts = async (req: Request, res: Response) => {
    try {
        await isVendor(req, res, async () => {
            const products = await Product.findAll();
            return res.status(200).json(products);
        });
        return;
    } catch (error) {
        console.error('Error getting products:', error);
        return res.status(500).json({ message: 'Failed to get products' });
    }
};

// Update a product
export const updateProduct = async (req: Request, res: Response) => {
    try {
        await isVendor(req, res, async () => {
            const { id } = req.params;
            const { productName, productImage, productPrice, attributes, productCategory, reviews, rating } = req.body;

            // Find the product by its ID
            const product = await Product.findByPk(id);

            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }

            // Update the product
            await product.update({
                productName,
                productImage,
                productPrice,
                attributes,
                productCategory,
                reviews,
                rating
            });

            return res.status(200).json(product);
        });
    } catch (error) {
        
    }
};

// Delete a product
export const deleteProduct = async (req: Request, res: Response) => {
    try {
        await isVendor(req, res, async () => {
            const { id } = req.params;

            // Find the product by its ID
            const product = await Product.findByPk(id);

            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }

            // Delete the product
            await product.destroy();

            return res.status(204).json({ message: 'Product deleted successfully' });
        });
    } catch (error) {
        
    }
};