// Elementos del DOM
const productForm = document.getElementById('product-form');
const productsList = document.getElementById('products-list');
const productIdInput = document.getElementById('product-id');
const nameInput = document.getElementById('name');
const descriptionInput = document.getElementById('description');
const priceInput = document.getElementById('price');
const stockInput = document.getElementById('stock');
const cancelBtn = document.getElementById('cancel-btn');

// Cargar productos al iniciar la página
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM cargado, iniciando aplicación...');
    loadProducts();
});

// Event listeners
if (productForm) {
    productForm.addEventListener('submit', saveProduct);
    console.log('Event listener agregado al formulario');
} else {
    console.error('No se encontró el formulario de productos');
}

if (cancelBtn) {
    cancelBtn.addEventListener('click', resetForm);
}

// Cargar productos desde la API
async function loadProducts() {
    console.log('Cargando productos...');
    try {
        const products = await ProductService.getProducts();
        console.log('Productos cargados:', products);
        displayProducts(products);
    } catch (error) {
        console.error('Error al cargar productos:', error);
    }
}

// Mostrar productos en la tabla
function displayProducts(products) {
    if (!productsList) {
        console.error('No se encontró elemento #products-list');
        return;
    }
    
    productsList.innerHTML = '';
    
    if (!products || products.length === 0) {
        productsList.innerHTML = '<tr><td colspan="5" style="text-align: center;">No hay productos registrados</td></tr>';
        return;
    }
    
    products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.description}</td>
            <td>$${product.price.toFixed(2)}</td>
            <td>${product.stock}</td>
            <td>
                <button class="action-btn edit-btn" data-id="${product._id}">Editar</button>
                <button class="action-btn delete-btn" data-id="${product._id}">Eliminar</button>
            </td>
        `;
        
        // Agregar event listeners a los botones
        const editBtn = row.querySelector('.edit-btn');
        const deleteBtn = row.querySelector('.delete-btn');
        
        if (editBtn) editBtn.addEventListener('click', () => editProduct(product._id));
        if (deleteBtn) deleteBtn.addEventListener('click', () => deleteProduct(product._id));
        
        productsList.appendChild(row);
    });
}

// Guardar o actualizar un producto
async function saveProduct(e) {
    e.preventDefault();
    console.log('Formulario enviado, procesando datos...');
    
    try {
        // Validar que los campos tengan valores
        if (!nameInput.value.trim()) {
            alert('Por favor ingresa un nombre para el producto');
            return;
        }
        
        if (!descriptionInput.value.trim()) {
            alert('Por favor ingresa una descripción para el producto');
            return;
        }
        
        if (!priceInput.value || priceInput.value <= 0) {
            alert('Por favor ingresa un precio válido');
            return;
        }
        
        if (!stockInput.value || stockInput.value < 0) {
            alert('Por favor ingresa una cantidad de stock válida');
            return;
        }
        
        const product = {
            name: nameInput.value.trim(),
            description: descriptionInput.value.trim(),
            price: parseFloat(priceInput.value),
            stock: parseInt(stockInput.value)
        };
        
        console.log('Datos del producto a enviar:', product);
        
        let result;
        
        if (productIdInput.value) {
            console.log('Actualizando producto existente...');
            result = await ProductService.updateProduct(productIdInput.value, product);
        } else {
            console.log('Creando nuevo producto...');
            result = await ProductService.createProduct(product);
        }
        
        if (result) {
            console.log('Operación exitosa:', result);
            alert('Producto guardado exitosamente');
            resetForm();
            loadProducts();
        } else {
            console.error('La operación falló');
            alert('Error al guardar el producto');
        }
    } catch (error) {
        console.error('Error al guardar producto:', error);
        alert('Error al guardar el producto: ' + error.message);
    }
}

// Editar un producto
async function editProduct(id) {
    console.log('Editando producto con ID:', id);
    try {
        const product = await ProductService.getProduct(id);
        
        if (product) {
            productIdInput.value = product._id;
            nameInput.value = product.name;
            descriptionInput.value = product.description;
            priceInput.value = product.price;
            stockInput.value = product.stock;
            
            cancelBtn.style.display = 'inline-block';
            document.querySelector('button[type="submit"]').textContent = 'Actualizar';
        }
    } catch (error) {
        console.error('Error al cargar producto para editar:', error);
        alert('Error al cargar el producto');
    }
}

// Eliminar un producto
async function deleteProduct(id) {
    console.log('Eliminando producto con ID:', id);
    if (confirm('¿Estás seguro de eliminar este producto?')) {
        try {
            const result = await ProductService.deleteProduct(id);
            
            if (result) {
                alert('Producto eliminado exitosamente');
                loadProducts();
            } else {
                alert('Error al eliminar el producto');
            }
        } catch (error) {
            console.error('Error al eliminar producto:', error);
            alert('Error al eliminar el producto');
        }
    }
}

// Resetear el formulario
function resetForm() {
    console.log('Reseteando formulario...');
    productForm.reset();
    productIdInput.value = '';
    cancelBtn.style.display = 'none';
    document.querySelector('button[type="submit"]').textContent = 'Guardar';
}