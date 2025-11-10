import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';
import path from 'path';
import { fileURLToPath } from 'url';
import { UserService } from './modules/user/user.service.js';
import { UserController } from './modules/user/user.controller.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.BACKEND_PORT || 3000;

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, '../frontend')));

const pool = mysql.createPool({
  host: 'localhost',
  port: 3308,
  user: 'test-db-username',
  password: 'test-db-password',
  database: 'test-db',
});

async function verificarConexion() {
  try {
    const connection = await pool.getConnection();
    console.log('Conexión exitosa a la base de datos MySQL');
    connection.release();
    return true;
  } catch (error) {
    console.error('Error al conectar con la base de datos:');
    console.error(`  - Mensaje: ${error.message}`);
    console.error(`  - Código: ${error.code}`);
    console.error('\nVerifica que:');
    console.error('  1. MySQL esté corriendo (docker-compose up -d)');
    console.error('  2. Las credenciales sean correctas');
    console.error('  3. La base de datos "test-db" exista');
    return false;
  }
}

const userService = new UserService(pool);
const userController = new UserController(userService);

app.get('/usuarios', (req, res) => userController.getUsers(req, res));
app.post('/usuarios', (req, res) => userController.createUser(req, res));
app.put('/usuarios/:id', (req, res) => userController.updateUser(req, res));
app.delete('/usuarios/:id', (req, res) => userController.deleteUser(req, res));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/pages/index.html'));
});

async function iniciarServidor() {
  const conexionExitosa = await verificarConexion();

  if (!conexionExitosa) {
    console.error('\n El servidor no se iniciará debido a problemas de conexión con la base de datos');
    process.exit(1);
  }

  app.listen(port, () => {
    console.log(` Servidor escuchando en el puerto ${port}`);
    console.log(` Frontend disponible en http://localhost:${port}`);
  });
}

iniciarServidor();