const compra = {
    productos: ['Producto 1', 'Producto 2', 'Producto 3'],
    fecha: new Date(),
    precioTotal: 100.00,
    usuario: {
      nombre: 'Nombre del Usuario',
      email: 'usuario@example.com'
    }
  };

  
  function generarTicket(compra) {
    // Crear una cadena de texto con los datos del ticket
    const ticket = `
      Ticket de Compra
      ----------------
      Fecha: ${compra.fecha.toLocaleString()}
      
      Productos:
      ${compra.productos.map((producto, index) => `${index + 1}. ${producto}`).join('\n')}
      
      Precio Total: $${compra.precioTotal.toFixed(2)}
      
      Usuario:
      Nombre: ${compra.usuario.nombre}
      Email: ${compra.usuario.email}
    `;
    
    return ticket;
  }
  
  // Llamar a la función para generar el ticket
  const ticketDeCompra = generarTicket(compra);
  
  // Imprimir el ticket en la consola o hacer lo que desees con él
  console.log(ticketDeCompra);
  