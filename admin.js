const form = document.getElementById('addProductForm');
const table = document.getElementById('productTable');
const tbody = table.querySelector('tbody');
const productos = [];

// Agregar o editar producto
form.addEventListener('submit', e => {
  e.preventDefault();

  const tipo = document.getElementById('tipo').value;
  const marca = document.getElementById('marca').value;
  const color = document.getElementById('color').value;
  const talla = document.getElementById('talla').value;
  const precio = document.getElementById('precio').value;
  const stock = document.getElementById('stock').value;
  const imagen = document.getElementById('imagen').value;

  const producto = {
    id: Date.now(),
    tipo,
    marca,
    color,
    talla,
    precio,
    stock,
    imagen
  };

  const index = productos.findIndex(p => p.id === producto.id);

  if (index !== -1) {
    // El producto ya existe, actualizarlo
    productos[index] = producto;
    const row = table.querySelector(`tr[data-id="${producto.id}"]`);
    row.innerHTML = `
      <td>${producto.id}</td>
      <td>${producto.tipo}</td>
      <td>${producto.marca}</td>
      <td>${producto.color}</td>
      <td>${producto.talla}</td>
      <td>${producto.precio}</td>
      <td>${producto.stock}</td>
      <td><img src="${producto.imagen}" alt="${producto.tipo}"></td>
      <td>
        <button class="edit" data-id="${producto.id}">Editar</button>
        <button class="delete" data-id="${producto.id}">Eliminar</button>
      </td>
    `;
  } else {
    // El producto es nuevo, agregarlo
    productos.push(producto);
    const row = document.createElement('tr');
    row.setAttribute('data-id', producto.id);
    row.innerHTML = `
      <td>${producto.id}</td>
      <td>${producto.tipo}</td>
      <td>${producto.marca}</td>
      <td>${producto.color}</td>
      <td>${producto.talla}</td>
      <td>${producto.precio}</td>
      <td>${producto.stock}</td>
      <td><img src="${producto.imagen}" alt="${producto.tipo}"></td>
      <td>
        <button class="edit" data-id="${producto.id}">Editar</button>
        <button class="delete" data-id="${producto.id}">Eliminar</button>
      </td>
    `;
    tbody.appendChild(row);
  }

  form.reset();
});

// Editar o eliminar producto
table.addEventListener('click', e => {
  const button = e.target.closest('button');
  if (button) {
    const id = Number(button.dataset.id);
    const index = productos.findIndex(p => p.id === id);
    if (button.classList.contains('edit')) {
      // Editar producto
      const producto = productos[index];
      document.getElementById('tipo').value = producto.tipo;
      document.getElementById('marca').value = producto.marca;
      document.getElementById('color').value = producto.color;
      document.getElementById('talla').value = producto.talla;
      document.getElementById('precio').value = producto.precio;
      document.getElementById('stock').value = producto.stock;
      document.getElementById('imagen').value = producto.imagen;
    } else if (button.classList.contains('delete')) {
      // Eliminar producto
      productos.splice(index, 1);
      const row = button.closest('tr');
      tbody.removeChild(row);
    }
  }
});

