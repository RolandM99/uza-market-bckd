import { Request, Response } from 'express';
const dataPro = require('../Models');

const Product = dataPro.product;

// Create a new product
export const createProduct = async (req: Request, res: Response) => {
  try {
    const { userType } = req.body; // Assuming the authenticated user's userType is available in req.body

    if (userType !== 'Vendor') {
      return res.status(403).json({ message: 'Only vendors can create products' });
    }

    const productData = req.body;
    const userId = req.params.id;

    // Create the product and associate it with the user
    const product = await Product.create({ ...productData, userId });

    return res.status(201).json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    return res.status(500).json({ message: 'Failed to create product' });
  }
};

// Get all products
export const getAllProducts = async (res: Response) => {
    try {
        const products = await Product.findAll();
    
        return res.status(200).json(products);
    } catch (error) {
        console.error('Error getting products:', error);
        return res.status(500).json({ message: 'Failed to get products' });
    }
};

// Update a product
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { userType } = req.body; // Assuming the authenticated user's userType is available in req.body

    if (userType !== 'Vendor') {
      return res.status(403).json({ message: 'Only vendors can update products' });
    }

    const { id } = req.params;
    const productData = req.body;

    // Find the product by its ID
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Update the product
    await product.update(productData);

    return res.status(200).json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    return res.status(500).json({ message: 'Failed to update product' });
  }
};

// Delete a product
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { userType } = req.body; // Assuming the authenticated user's userType is available in req.body

    if (userType !== 'Vendor') {
      return res.status(403).json({ message: 'Only vendors can delete products' });
    }

    const { id } = req.params;

    // Find the product by its ID
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Delete the product
    await product.destroy();

    return res.status(204).end();
  } catch (error) {
    console.error('Error deleting product:', error);
    return res.status(500).json({ message: 'Failed to delete product' });
  }
};
