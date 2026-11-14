const express = require('express');
const cors = require('cors');
const sql = require('mssql');

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

// Configuración de conexión a SQL Server
const sqlConfig = {
  user: 'sa',          // Reemplaza por tu usuario de SQL Server (ej: 'sa')
  password: 'Pedritopa0504&',    // Reemplaza por tu contraseña de SQL Server
  server: '127.0.0.1',         // Usamos la IP local directa en lugar de 'localhost'
  database: 'miapp2_sql',      
  options: {
    instanceName: 'SQLEXPRESS', // Definición explícita de la instancia
    encrypt: false,
    trustServerCertificate: true
  }
};

// Conectar a la base de datos
sql.connect(sqlConfig)
  .then(() => console.log('✅ Conectado exitosamente a SQL Server (miapp2_sql)'))
  .catch(err => console.error('❌ Error de conexión con SQL Server:', err));

// Configurar Rutas
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

// Iniciar Servidor
app.listen(port, () => {
  console.log(`🚀 Servidor backend corriendo en http://localhost:${port}`);
});