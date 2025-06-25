const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.POSTGRES_DB || 'cafeAroma',
  process.env.POSTGRES_USER || 'admin', 
  process.env.POSTGRES_PASSWORD || 'password123',
  {
    host: process.env.POSTGRES_HOST || 'postgres', // Cambiar de 'database' a 'postgres'
    port: 5432,
    dialect: 'postgres',
    logging: console.log // Para debug
  }
);

// Función para conectar
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a PostgreSQL establecida correctamente');
    
    // Sincronizar modelos
    await sequelize.sync({ force: false });
    console.log('Modelos sincronizados con la base de datos');
  } catch (error) {
    console.error('Error al conectar a PostgreSQL:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
module.exports.sequelize = sequelize;