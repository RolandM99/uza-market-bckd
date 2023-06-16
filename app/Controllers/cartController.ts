// controllers/cartController.ts
import { Request, Response } from 'express';
// import { User, Product, Cart } from '../Models';
import { isLoggedin } from '../Middleware/userAuth';

const dbData = require('../Models');
const User = dbData.user;
const Product = dbData.product;
const Cart = dbData.cart;

// Add a product to the cart
export const addToCart = async (req: Request, res: Response) => {
    try {
        await isLoggedin(req, res, async () => {
      const { userId, productId } = req.body;
  
      // Find the user by their ID
      const user = await User.findByPk(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Find the product by its ID
      const product = await Product.findByPk(productId);
  
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      // Create a new entry in the Cart table to associate the user and product
      await Cart.create({ userId, productId });
  
      return res.status(200).json({ message: 'Product added to cart successfully' });
    });
    return;
    } catch (error) {
      console.error('Error adding to cart:', error);
      return res.status(500).json({ message: 'Failed to add product to cart' });
    }
  };
  

// Remove a product from the cart
export const removeFromCart = async (req: Request, res: Response) => {
  try {
    // const { userId, productId } = req.body;
    const userId = req.params.id;
    const productId = req.params.id;

    // Find the user by their ID
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the cart entry associated with the user and product
    const cartEntry = await Cart.findOne({
      where: {
        userId,
        productId,
      },
    });

    if (!cartEntry) {
      return res.status(404).json({ message: 'Product not found in the cart' });
    }

    // Delete the cart entry
    await cartEntry.destroy();

    return res.status(200).json({ message: 'Product removed from cart successfully' });
  } catch (error) {
    console.error('Error removing from cart:', error);
    return res.status(500).json({ message: 'Failed to remove product from cart' });
  }
};

// Get the cart contents
export const getCart = async (req: Request, res: Response) => {
  try {
    // const { userId } = req.body;
    const userId = req.params.id;

    // Find the user by their ID
    const user = await User.findByPk(userId, {
      include: [{ model: Product }],
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const cartItems = user.Products;

    return res.status(200).json(cartItems);
  } catch (error) {
    console.error('Error getting cart:', error);
    return res.status(500).json({ message: 'Failed to get cart' });
  }
};
