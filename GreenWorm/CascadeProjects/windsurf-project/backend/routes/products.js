const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { adminAuth } = require('../middleware/auth');

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only image files are allowed (jpeg, jpg, png, gif)'));
  }
});

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product information
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */

router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin routes
router.use(adminAuth);

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Add new product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - name
 *               - description
 *               - price
 *               - category
 *               - stock
 *             properties:
 *               id:
 *                 type: string
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *               category:
 *                 type: string
 *                 enum: [men, women, kids, accessories]
 *               stock:
 *                 type: number
 *               size:
 *                 type: string
 *               color:
 *                 type: string
 *               brand:
 *                 type: string
 *               material:
 *                 type: string
 *               tags:
 *                 type: string
 *                 description: Comma-separated list of tags
 *               dftImage:
 *                 type: string
 *                 format: binary
 *                 description: Default image for the product (separate from product images, base64 encoded string with data URI)
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

router.post('/', upload.array('images'), async (req, res) => {
  try {
    // Process uploaded images
    const images = req.files.map(file => ({
      data: file.buffer,
      contentType: file.mimetype,
      filename: file.originalname
    }));

    // Handle dftImage if provided in the request
    let dftImage = null;
    if (req.body.dftImage) {
      try {
        // Assuming dftImage is sent as a base64 string in the format 'data:image/png;base64,...'
        const matches = req.body.dftImage.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
        if (matches && matches.length === 3) {
          dftImage = {
            data: Buffer.from(matches[2], 'base64'),
            contentType: matches[1],
            filename: 'dftImage' // or generate a custom name
          };
        }
      } catch (error) {
        console.error('Error processing dftImage:', error);
      }
    }

    const product = new Product({
      id: req.body.id,
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      images: images,
      dftImage: dftImage,
      category: req.body.category,
      stock: req.body.stock,
      size: req.body.size,
      color: req.body.color,
      brand: req.body.brand,
      material: req.body.material,
      tags: req.body.tags?.split(',')
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *               category:
 *                 type: string
 *                 enum: [men, women, kids, accessories]
 *               stock:
 *                 type: number
 *               size:
 *                 type: string
 *               color:
 *                 type: string
 *               brand:
 *                 type: string
 *               material:
 *                 type: string
 *               tags:
 *                 type: string
 *                 description: Comma-separated list of tags
 *               dftImage:
 *                 type: string
 *                 format: binary
 *                 description: Default image for the product (separate from product images, base64 encoded string with data URI)
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */

router.put('/:id', upload.array('images'), async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Update fields
    product.name = req.body.name || product.name;
    product.description = req.body.description || product.description;
    product.price = req.body.price || product.price;
    
    // Handle new images
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map(file => ({
        data: file.buffer,
        contentType: file.mimetype,
        filename: file.originalname
      }));
      
      // Add new images to existing ones
      product.images = [...(product.images || []), ...newImages];
    }

    // Handle dftImage if provided in the request
    if (req.body.dftImage) {
      try {
        // Assuming dftImage is sent as a base64 string in the format 'data:image/png;base64,...'
        const matches = req.body.dftImage.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
        if (matches && matches.length === 3) {
          product.dftImage = {
            data: Buffer.from(matches[2], 'base64'),
            contentType: matches[1],
            filename: 'dftImage' // or generate a custom name
          };
        }
      } catch (error) {
        console.error('Error processing dftImage:', error);
      }
    }

    product.category = req.body.category || product.category;
    product.stock = req.body.stock || product.stock;
    product.size = req.body.size || product.size;
    product.color = req.body.color || product.color;
    product.brand = req.body.brand || product.brand;
    product.material = req.body.material || product.material;
    product.tags = req.body.tags ? req.body.tags.split(',') : product.tags;

    await product.save();
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */

router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.remove();
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get product image by ID and image index
router.get('/:id/image/:index', async (req, res) => {
  try {
    const product = await Product.findOne({ id: req.params.id });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const index = parseInt(req.params.index);
    if (isNaN(index) || index < 0 || index >= product.images.length) {
      return res.status(404).json({ message: 'Image not found' });
    }

    const image = product.images[index];
    res.set('Content-Type', image.contentType);
    res.send(image.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get default product image by ID
router.get('/:id/default-image', async (req, res) => {
  try {
    const product = await Product.findOne({ id: req.params.id });
    if (!product || !product.dftImage) {
      return res.status(404).json({ message: 'Default image not found' });
    }

    res.set('Content-Type', product.dftImage.contentType);
    res.send(product.dftImage.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /api/products/{id}/image/{index}:
 *   get:
 *     summary: Get product image by index
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *       - in: path
 *         name: index
 *         required: true
 *         schema:
 *           type: integer
 *         description: Zero-based index of the image
 *     responses:
 *       200:
 *         description: Image data
 *         content:
 *           image/*:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: Product or image not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id/image/:index', async (req, res) => {
  try {
    const product = await Product.findOne({ id: req.params.id });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const index = parseInt(req.params.index);
    if (isNaN(index) || index < 0 || index >= product.images.length) {
      return res.status(404).json({ message: 'Image not found' });
    }

    const image = product.images[index];
    res.set('Content-Type', image.contentType);
    res.send(image.data);
  } catch (error) {
    console.error('Error fetching product image:', error);
    res.status(500).json({ 
      message: 'Failed to fetch image',
      error: error.message 
    });
  }
});

/**
 * @swagger
 * /api/products/{id}/default-image:
 *   get:
 *     summary: Get default product image
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Default image data
 *         content:
 *           image/*:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: Product or default image not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id/default-image', async (req, res) => {
  try {
    const product = await Product.findOne({ id: req.params.id });
    if (!product || !product.dftImage) {
      return res.status(404).json({ message: 'Default image not found' });
    }

    res.set('Content-Type', product.dftImage.contentType);
    res.send(product.dftImage.data);
  } catch (error) {
    console.error('Error fetching default image:', error);
    res.status(500).json({ 
      message: 'Failed to fetch default image',
      error: error.message 
    });
  }
});

module.exports = router;
