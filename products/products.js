
// MOSTRAR PRODUCTOS (interfaz)


function mostrarProductos() {
    const contenedorProductos = document.getElementById('productos');
  
    productos.forEach(producto => {
      const productoDiv = document.createElement('div');
      productoDiv.innerHTML = `
        <h3>${producto.nombre}</h3>
        <p>Precio: $${producto.precio}</p>
        <p>Stock: ${producto.stock}</p>
      `;
      contenedorProductos.appendChild(productoDiv);
    });
  }
  

//   AGREGAR PRODUCTOS

function agregarProducto(producto) {
    productos.push(producto);
    // Actualizar la UI para mostrar el nuevo producto
    mostrarProductos();
  }

//   EDITAR PRODUCTOS

function editarProducto(id, nuevoProducto) {
    const productoIndex = productos.findIndex(producto => producto.id === id);
    if (productoIndex !== -1) {
      productos[productoIndex] = { ...productos[productoIndex], ...nuevoProducto };
      // Actualizar la UI para reflejar los cambios
      mostrarProductos();
    }
  }

//   ELIMINAR PRODUCTOS

function eliminarProducto(id) {
    const productoIndex = productos.findIndex(producto => producto.id === id);
    if (productoIndex !== -1) {
      productos.splice(productoIndex, 1);
      // Actualizar la UI para reflejar la eliminación
      mostrarProductos();
    }
  }
  