const express = require('express');
const router = express.Router();

// Mock de productos y carrito
const productos = [
  { id: 1, nombre: 'Producto A', stock: 10, precio: 20 },
  { id: 2, nombre: 'Producto B', stock: 5, precio: 30 },
];

let carrito = [];

// Ruta para finalizar la compra
router.post('/purchase', (req, res) => {
  const productId = req.body.productId;
  const quantity = req.body.quantity;

  // Buscar el producto en la lista de productos
  const product = productos.find((p) => p.id === productId);

  if (!product) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }

  // Verificar si hay suficiente stock para la cantidad deseada
  if (product.stock >= quantity) {
    // Restar la cantidad del stock
    product.stock -= quantity;

    // Agregar el producto al carrito
    carrito.push({ productId, quantity });

    res.status(200).json({ message: 'Producto agregado al carrito' });
  } else {
    res.status(400).json({ error: 'Stock insuficiente' });
  }
});

module.exports = router;
