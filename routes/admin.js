const express = require('express');
const router = express.Router();

// Ruta para eliminar un producto
router.delete('/products/:productId', async (req, res) => {
  const { productId } = req.params;
  const { user } = req; // Suponiendo que el usuario se ha autenticado y está disponible en req.user

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    if (user.role === 'admin') {
      // El administrador puede eliminar cualquier producto
      await product.remove();
      return res.status(200).json({ message: 'Producto eliminado con éxito' });
    } else if (user.role === 'premium' && product.owner === user.email) {
      // Un usuario premium solo puede eliminar sus propios productos
      await product.remove();
      return res.status(200).json({ message: 'Producto eliminado con éxito' });
    } else {
      return res.status(403).json({ message: 'No tienes permiso para eliminar este producto' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error al eliminar el producto', error });
  }
});

module.exports = router;
