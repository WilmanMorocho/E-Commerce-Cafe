// Configuración de la API
const API_URL = '/api/products';

// Clase para manejar las operaciones con productos
class ProductService {
    // Obtener todos los productos
    static async getProducts() {
        try {
            console.log('ProductService: Solicitando productos...');
            const response = await fetch(API_URL);
            console.log('ProductService: Respuesta recibida:', response.status);
            
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            
            const data = await response.json();
            console.log('ProductService: Productos obtenidos:', data.length);
            return data;
        } catch (error) {
            console.error('ProductService Error en getProducts:', error);
            return [];
        }
    }

    // Crear un nuevo producto
    static async createProduct(product) {
        try {
            console.log('ProductService: Enviando producto:', product);
            
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product)
            });
            
            console.log('ProductService: Respuesta de creación:', response.status);
            
            if (!response.ok) {
                let errorMessage = 'Error desconocido';
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.message || `Error HTTP: ${response.status}`;
                } catch (e) {
                    const errorText = await response.text();
                    errorMessage = errorText || `Error HTTP: ${response.status}`;
                }
                throw new Error(errorMessage);
            }
            
            const data = await response.json();
            console.log('ProductService: Producto creado exitosamente:', data);
            return data;
        } catch (error) {
            console.error('ProductService Error en createProduct:', error);
            throw error;
        }
    }

    // Obtener un producto por ID
    static async getProduct(id) {
        try {
            console.log('ProductService: Solicitando producto con ID:', id);
            const response = await fetch(`${API_URL}/${id}`);
            
            if (!response.ok) {
                throw new Error('Error al obtener producto');
            }
            
            const data = await response.json();
            console.log('ProductService: Producto obtenido:', data);
            return data;
        } catch (error) {
            console.error('ProductService Error en getProduct:', error);
            return null;
        }
    }

    // Actualizar un producto
    static async updateProduct(id, product) {
        try {
            console.log('ProductService: Actualizando producto con ID:', id, product);
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product)
            });
            
            if (!response.ok) {
                throw new Error('Error al actualizar producto');
            }
            
            const data = await response.json();
            console.log('ProductService: Producto actualizado exitosamente:', data);
            return data;
        } catch (error) {
            console.error('ProductService Error en updateProduct:', error);
            return null;
        }
    }

    // Eliminar un producto
    static async deleteProduct(id) {
        try {
            console.log('ProductService: Eliminando producto con ID:', id);
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            });
            
            if (!response.ok) {
                throw new Error('Error al eliminar producto');
            }
            
            const data = await response.json();
            console.log('ProductService: Producto eliminado exitosamente:', data);
            return data;
        } catch (error) {
            console.error('ProductService Error en deleteProduct:', error);
            return null;
        }
    }
}