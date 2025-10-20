const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const Product = require('../models/Product');

/**
 * @swagger
 * components:
 *   schemas:
 *     CartItem:
 *       type: object
 *       properties:
 *         productId:
 *           type: string
 *           description: The ID of the product in cart
 *         quantity:
 *           type: number
 *           description: Quantity of the product
 *     CartResponse:
 *       type: object
 *       properties:
 *         product:
 *           $ref: '#/components/schemas/Product'
 *         quantity:
 *           type: number
 *           description: Quantity of the product
 */

/**
 * @swagger
 * /api/cart:
 *   get:
 *     summary: Get user's cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of items in cart
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CartResponse'
 *       500:
 *         description: Internal server error
 */

router.get('/', auth, async (req, res) => {
  try {
    // In a real application, you would store cart items in the database
    // For now, we'll simulate it with a simple array
    const cart = req.user.cart || [];
    
    // Get product details for each item in cart
    const cartItems = await Promise.all(
      cart.map(async (item) => {
        const product = await Product.findById(item.productId);
        return {
          product,
          quantity: item.quantity
        };
      })
    );

    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /api/cart/add:
 *   post:
 *     summary: Add item to cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - quantity
 *             properties:
 *               productId:
 *                 type: string
 *                 description: ID of the product to add
 *               quantity:
 *                 type: number
 *                 description: Quantity to add
 *     responses:
 *       200:
 *         description: Item added to cart
 *       400:
 *         description: Not enough stock available
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */

router.post('/add', auth, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    
    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if product is in stock
    if (product.stock < quantity) {
      return res.status(400).json({ message: 'Not enough stock available' });
    }

    // Add to cart
    const cart = req.user.cart || [];
    const existingItem = cart.find(item => item.productId === productId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ productId, quantity });
    }

    // Update user's cart
    await User.findByIdAndUpdate(req.user.id, { cart });

    res.json({ message: 'Item added to cart' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /api/cart/update/{productId}:
 *   put:
 *     summary: Update cart item quantity
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the product to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - quantity
 *             properties:
 *               quantity:
 *                 type: number
 *                 description: New quantity
 *     responses:
 *       200:
 *         description: Cart updated successfully
 *       400:
 *         description: Not enough stock available
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Item not in cart
 *       500:
 *         description: Internal server error
 */

router.put('/update/:productId', auth, async (req, res) => {
  try {
    const { quantity } = req.body;
    
    // Check if product exists
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if product is in stock
    if (product.stock < quantity) {
      return res.status(400).json({ message: 'Not enough stock available' });
    }

    // Update cart
    const cart = req.user.cart || [];
    const itemIndex = cart.findIndex(item => item.productId === req.params.productId);

    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not in cart' });
    }

    cart[itemIndex].quantity = quantity;

    // Update user's cart
    await User.findByIdAndUpdate(req.user.id, { cart });

    res.json({ message: 'Cart updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Remove item from cart
router.delete('/remove/:productId', auth, async (req, res) => {
  try {
    const cart = req.user.cart || [];
    const updatedCart = cart.filter(item => item.productId !== req.params.productId);

    // Update user's cart
    await User.findByIdAndUpdate(req.user.id, { cart: updatedCart });

    res.json({ message: 'Item removed from cart' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Checkout
router.post('/checkout', auth, async (req, res) => {
  try {
    const cart = req.user.cart || [];
    
    // Check stock availability
    for (const item of cart) {
      const product = await Product.findById(item.productId);
      if (!product || product.stock < item.quantity) {
        return res.status(400).json({ message: 'Not enough stock available' });
      }
    }

    // Update product stock and clear cart
    await Promise.all(
      cart.map(async (item) => {
        const product = await Product.findById(item.productId);
        product.stock -= item.quantity;
        await product.save();
      })
    );

    // Clear cart
    await User.findByIdAndUpdate(req.user.id, { cart: [] });

    res.json({ message: 'Order placed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
