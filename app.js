const productos = [
  // ... objetos de ropa

  {
    "id": 1,
    "tipo": "camiseta",
    "marca": "Adidas",
    "color": "azul",
    "talla": "M",
    "precio": 25.99,
    "stock": 20,
    "imagen": "https://picsum.photos/200/300?random=1"
  },
  {
    "id": 2,
    "tipo": "pantalones",
    "marca": "Levis",
    "color": "negro",
    "talla": "32",
    "precio": 49.99,
    "stock": 5,
    "imagen": "https://picsum.photos/200/300?random=2"
  },
  {
    "id": 3,
    "tipo": "falda",
    "marca": "Zara",
    "color": "rojo",
    "talla": "S",
    "precio": 29.99,
    "stock": 30,
    "imagen": "https://picsum.photos/200/300?random=3"
  },
  {
    "id": 4,
    "tipo": "zapatos",
    "marca": "Nike",
    "color": "blanco",
    "talla": "42",
    "precio": 89.99,
    "stock": 10,
    "imagen": "https://picsum.photos/200/300?random=4"
  },
  {
    "id": 5,
    "tipo": "chaqueta",
    "marca": "Columbia",
    "color": "verde",
    "talla": "L",
    "precio": 99.99,
    "stock": 9,
    "imagen": "https://picsum.photos/200/300?random=5"
  },
  {
    "id": 6,
    "tipo": "chaqueta",
    "marca": "Columbia",
    "color": "verde",
    "talla": "L",
    "precio": 99.99,
    "stock": 9,
    "imagen": "https://picsum.photos/200/300?random=6"
  },
  {
    "id": 7,
    "tipo": "chaqueta",
    "marca": "Columbia",
    "color": "verde",
    "talla": "L",
    "precio": 112.99,
    "stock": 9,
    "imagen": "https://picsum.photos/200/300?random=7"
  },
  {
    "id": 8,
    "tipo": "chaqueta",
    "marca": "Columbia",
    "color": "verde",
    "talla": "L",
    "precio": 34.99,
    "stock": 90,
    "imagen": "https://picsum.photos/200/300?random=8"
  },
  {
    "id": 9,
    "tipo": "chaqueta",
    "marca": "Columbia",
    "color": "verde",
    "talla": "L",
    "precio": 95.99,
    "stock": 43,
    "imagen": "https://picsum.photos/200/300?random=9"
  }

];

// Array del carrito de compras
const carrito = [];

// Función para calcular el total del carrito
function calcularTotal() {
  return carrito.reduce((total, producto) => total + producto.precio * producto.cantidad, 0).toFixed(2);
}

// Función para agregar un producto al carrito
// id: El identificador del producto a agregar
function agregarAlCarrito(id) {
  // Encuentra el producto en el array de productos
  const producto = productos.find((producto) => producto.id === id);

  // Verifica si hay stock disponible
  if (producto.stock <= 0) {
    alert('No hay stock disponible de este producto.');
    return;
  }

  // Verifica si el producto ya está en el carrito
  const productoCarrito = carrito.find((item) => item.id === id);

  if (productoCarrito) {
    productoCarrito.cantidad++;
  } else {
    const productoAgregar = { ...producto, cantidad: 1 };
    carrito.push(productoAgregar);
  }

  // Actualiza el stock del producto y renderiza los elementos
  producto.stock--;
  actualizarCarritoNav();
  renderizarCarrito();
  renderizarProductos();
}

// Función para eliminar un producto del carrito
// index: Índice del producto en el array del carrito
function eliminarDelCarrito(index) {
  // Obtiene el producto del carrito y el producto original
  const productoCarrito = carrito[index];
  const producto = productos.find((producto) => producto.id === productoCarrito.id);

  // Actualiza la cantidad en el carrito y el stock del producto
  if (productoCarrito.cantidad > 1) {
    productoCarrito.cantidad--;
  } else {
    carrito.splice(index, 1);
  }

  producto.stock++;

  // Renderiza los elementos
  actualizarCarritoNav();
  renderizarCarrito();
  renderizarProductos();
}

// Función para renderizar la lista de productos disponibles
function renderizarProductos() {
  const container = document.getElementById('productos');
  container.innerHTML = '';

  productos.forEach((producto) => {
    const item = document.createElement('div');
    item.classList.add('item');
    item.innerHTML = `
          <img src="${producto.imagen}" alt="${producto.tipo} ${producto.marca}">
          ${producto.tipo} - ${producto.marca} - ${producto.color} - ${producto.talla} - $${producto.precio} - Stock: ${producto.stock}
          <button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
        `;
    container.appendChild(item);
  });
}

// Función para renderizar los elementos del carrito
function renderizarCarrito() {
  const container = document.getElementById('carrito');
  container.innerHTML = '';

  carrito.forEach((producto, index) => {
    const item = document.createElement('div');
    item.classList.add('item');
    item.innerHTML = `
          ${producto.tipo} - ${producto.marca} - ${producto.color} - ${producto.talla} - $${producto.precio} - Cantidad: ${producto.cantidad}
          <button onclick="eliminarDelCarrito(${index})">Eliminar 1</button>
        `;
    container.appendChild(item);
  });

  document.getElementById('total').innerText = calcularTotal();
}

// Función para actualizar el indicador del carrito en la barra de navegación
function actualizarCarritoNav() {
  document.getElementById('verCarrito').innerText = `Carrito de Compras (${carrito.length})`;
}

// Variables para el temporizador y el tiempo de espera
let temporizador;
const tiempoMuerto = 5 * 60 * 1000; // 5 minutos en milisegundos

// Función para reiniciar el temporizador
function reiniciarTemporizador() {
  clearTimeout(temporizador);
  temporizador = setTimeout(volverProductosAlCarrito, tiempoMuerto);
}

// Función para devolver los productos del carrito al stock
function volverProductosAlCarrito() {
  carrito.forEach((productoCarrito) => {
    const producto = productos.find((producto) => producto.id === productoCarrito.id);
    producto.stock += productoCarrito.cantidad;
  });

  carrito.length = 0;
  renderizarProductos();
  renderizarCarrito();
  actualizarCarritoNav();
}
// Función para agregar los eventos de interacción del usuario
function agregarEventos() {
  document.getElementById('realizarCompra').addEventListener('click', () => {
    alert('Compra realizada!');
    carrito.length = 0;
    renderizarCarrito();
    actualizarCarritoNav();
  });

  document.getElementById('verCarrito').addEventListener('click', () => {
    document.getElementById('productos').classList.add('hidden');
    document.getElementById('carritoContainer').classList.remove('hidden');
  });

  document.getElementById('volver').addEventListener('click', () => {
    document.getElementById('carritoContainer').classList.add('hidden');
    document.getElementById('productos').classList.remove('hidden');
  });

  document.body.addEventListener('click', reiniciarTemporizador);
  document.body.addEventListener('scroll', reiniciarTemporizador);

  document.getElementById('adminLogin').addEventListener('click', login);
}

function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (username === 'admin' && password === 'admin123') {
    // Redirige al usuario a la página admin.html
    window.location.href = 'admin.html';
  } else {
    alert('Usuario o contraseña incorrectos');
  }
}

// function modificarProducto(id, productoModificado) {
//   const index = productos.findIndex(p => p.id === id);
//   if (index !== -1) {
//     productos[index] = productoModificado;
//   } else {
//     productos.push(productoModificado);
//   }
// }


// Inicialización de la aplicación
// modificarProducto();
renderizarProductos();
agregarEventos();
reiniciarTemporizador();
