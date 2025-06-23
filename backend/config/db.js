const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log('Intentando conectar a MongoDB con URI:', process.env.MONGO_URI);
    
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    console.log(`MongoDB Conectado correctamente: ${conn.connection.host}`);
    console.log(`Base de datos: ${conn.connection.name}`);
    
    // Verificar que las colecciones se puedan crear
    mongoose.connection.on('connected', () => {
      console.log('Mongoose conectado a MongoDB');
    });
    
    mongoose.connection.on('error', (err) => {
      console.error('Error de conexión MongoDB:', err);
    });
    
  } catch (error) {
    console.error(`Error de conexión a MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;