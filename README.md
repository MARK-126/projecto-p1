# Proyecto Final – Programación 1

¡Bienvenido al proyecto final de la materia Programación 1! 🚀

Este proyecto es el resultado de todo el aprendizaje y esfuerzo realizado durante el curso. Aquí aplicamos conceptos fundamentales de desarrollo backend, frontend, bases de datos y buenas prácticas de programación para construir una aplicación web completa con gestión de usuarios.

## Descripción del Proyecto

Desarrollamos una aplicación web full-stack utilizando Node.js, Express, MySQL y JavaScript vanilla. La aplicación permite gestionar usuarios mediante una interfaz web intuitiva y una API REST robusta con operaciones CRUD completas:

- **GET**: Listar todos los usuarios
- **POST**: Crear un nuevo usuario
- **PUT**: Actualizar los datos de un usuario existente
- **DELETE**: Eliminar un usuario

La arquitectura está pensada para ser escalable y fácil de mantener, separando claramente el frontend del backend, utilizando controladores y servicios, y conectando con una base de datos MySQL ejecutada en Docker.

## Tecnologías Utilizadas

### Backend
- **Node.js** - Entorno de ejecución de JavaScript
- **Express** - Framework web para Node.js
- **MySQL2** - Cliente MySQL para Node.js
- **CORS** - Middleware para habilitar CORS

### Frontend
- **HTML5** - Estructura de la página
- **CSS3** - Estilos y diseño responsive
- **JavaScript (ES6+)** - Lógica del cliente
- **Fetch API** - Comunicación con la API REST

### Base de Datos
- **MySQL 8.0** - Sistema de gestión de base de datos relacional
- **Docker** - Contenerización de MySQL

### Herramientas de Desarrollo
- **ESLint** - Linter para mantener código limpio
- **Docker Compose** - Orquestación de contenedores

## Estructura del Proyecto

```
projecto-p1/
├── .docker/
│   └── mysql/
│       └── data/                    # Datos persistentes de MySQL
├── src/
│   └── apps/
│       ├── backend/
│       │   ├── modules/
│       │   │   └── user/
│       │   │       ├── user.controller.js    # Controlador de usuarios
│       │   │       └── user.service.js       # Lógica de negocio
│       │   └── server.js                     # Servidor Express
│       └── frontend/
│           ├── pages/
│           │   └── index.html                # Página principal
│           ├── scripts/
│           │   └── app.js                    # Lógica del frontend
│           └── styles/
│               └── index.css                 # Estilos de la aplicación
├── docker-compose.yml                        # Configuración de Docker
├── eslint.config.mjs                         # Configuración de ESLint
├── package.json                              # Dependencias y scripts
└── README.md                                 # Este archivo
```

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (v18 o superior)
- [Docker](https://www.docker.com/) y Docker Compose
- [Git](https://git-scm.com/)

## Instalación y Configuración

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd projecto-p1
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Iniciar la base de datos

```bash
docker-compose up -d
```

Esto iniciará un contenedor de MySQL en el puerto 3308 con la siguiente configuración:
- Base de datos: `test-db`
- Usuario: `test-db-username`
- Contraseña: `test-db-password`

### 4. Crear la tabla de usuarios

#### Estructura de la tabla `usuarios`

| Campo | Tipo | Restricciones | Descripción |
|-------|------|---------------|-------------|
| `id` | INT | PRIMARY KEY, AUTO_INCREMENT | Identificador único del usuario |
| `first_name` | VARCHAR(45) | NOT NULL | Nombre del usuario |
| `las_name` | VARCHAR(45) | NOT NULL | Apellido del usuario |
| `email` | VARCHAR(45) | NOT NULL | Correo electrónico del usuario |
| `dni` | INT | NOT NULL | Documento Nacional de Identidad |

Conecta a MySQL y ejecuta:

```sql
CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(45) NOT NULL,
  las_name VARCHAR(45) NOT NULL,
  email VARCHAR(45) NOT NULL,
  dni INT NOT NULL
);
```

O usando el comando:

```bash
docker exec -i projecto-p1-test-db-1 mysql -utest-db-username -ptest-db-password test-db << EOF
CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(45) NOT NULL,
  las_name VARCHAR(45) NOT NULL,
  email VARCHAR(45) NOT NULL,
  dni INT NOT NULL
);
EOF
```

### 5. Iniciar el servidor

```bash
npm start
```

El servidor se iniciará en `http://localhost:3000`

## Uso de la Aplicación

### Interfaz Web

Abre tu navegador en `http://localhost:3000` para acceder a la aplicación web donde podrás:

1. **Ver la lista de usuarios** - Se muestra automáticamente al cargar la página
2. **Crear un usuario** - Completa el formulario con nombre, apellido, email y DNI
3. **Editar un usuario** - Haz clic en "Editar" en la tarjeta del usuario
4. **Eliminar un usuario** - Haz clic en "Eliminar" (requiere confirmación)

### API REST Endpoints

| Método | Endpoint | Descripción | Body |
|--------|----------|-------------|------|
| GET | `/usuarios` | Obtener todos los usuarios | - |
| POST | `/usuarios` | Crear un nuevo usuario | `{ first_name, las_name, email, dni }` |
| PUT | `/usuarios/:id` | Actualizar un usuario | `{ first_name, las_name, email, dni }` |
| DELETE | `/usuarios/:id` | Eliminar un usuario | - |

### Ejemplos de Uso con cURL

**Listar usuarios:**
```bash
curl http://localhost:3000/usuarios
```

**Crear un usuario:**
```bash
curl -X POST http://localhost:3000/usuarios \
  -H "Content-Type: application/json" \
  -d '{
    "first_name": "Juan",
    "las_name": "Pérez",
    "email": "juan@example.com",
    "dni": "12345678"
  }'
```

**Actualizar un usuario:**
```bash
curl -X PUT http://localhost:3000/usuarios/1 \
  -H "Content-Type: application/json" \
  -d '{
    "first_name": "Juan",
    "las_name": "García",
    "email": "juan.garcia@example.com",
    "dni": "12345678"
  }'
```

**Eliminar un usuario:**
```bash
curl -X DELETE http://localhost:3000/usuarios/1
```

## Scripts Disponibles

- `npm start` - Inicia el servidor en modo watch (se reinicia automáticamente al detectar cambios)
- `npm test` - Ejecuta los tests (actualmente sin implementar)

## Características Destacadas

### Backend
- ✅ Arquitectura en capas (Controlador → Servicio → Base de datos)
- ✅ Manejo de errores con try-catch
- ✅ Verificación de conexión a la base de datos antes de iniciar
- ✅ Servir archivos estáticos del frontend
- ✅ CORS habilitado para desarrollo

### Frontend
- ✅ Diseño responsive y moderno
- ✅ Interfaz intuitiva con feedback visual
- ✅ Validación de formularios
- ✅ Mensajes de éxito/error
- ✅ Edición inline de usuarios
- ✅ Confirmación antes de eliminar

### Base de Datos
- ✅ Configuración con Docker Compose
- ✅ Datos persistentes
- ✅ Pool de conexiones para mejor rendimiento

## Comandos Útiles

### Docker

**Ver logs de MySQL:**
```bash
docker-compose logs -f test-db
```

**Detener la base de datos:**
```bash
docker-compose down
```

**Reiniciar la base de datos:**
```bash
docker-compose restart
```

**Conectar a MySQL:**
```bash
docker exec -it projecto-p1-test-db-1 mysql -utest-db-username -ptest-db-password test-db
```

### Git

**Crear y cambiar a una nueva rama:**
```bash
git checkout -b nombre-de-la-rama
```

**Agregar archivos al área de preparación:**
```bash
git add .
```

**Hacer commit de los cambios:**
```bash
git commit -m "Descripción de los cambios"
```

**Subir la rama al repositorio remoto:**
```bash
git push origin nombre-de-la-rama
```

**Ver el estado del repositorio:**
```bash
git status
```

## Solución de Problemas

### Error de conexión a MySQL

Si obtienes un error de conexión, verifica que:
1. Docker esté corriendo
2. El contenedor de MySQL esté activo: `docker-compose ps`
3. El puerto 3308 no esté ocupado
4. Las credenciales en `server.js` coincidan con las de `docker-compose.yml`

### El servidor no inicia

1. Verifica que el puerto 3000 esté disponible
2. Asegúrate de haber instalado las dependencias: `npm install`
3. Revisa los logs del servidor para ver errores específicos

### Error "Table doesn't exist"

Asegúrate de haber creado la tabla `usuarios` en la base de datos (ver paso 4 de Instalación)

## Mejoras Futuras

- [ ] Agregar autenticación y autorización
- [ ] Implementar paginación en la lista de usuarios
- [ ] Agregar búsqueda y filtrado de usuarios
- [ ] Validación de datos más robusta
- [ ] Tests unitarios y de integración
- [ ] Documentación de API con Swagger
- [ ] Variables de entorno para configuración
- [ ] Deploy en producción

## Contribuciones

Este es un proyecto educativo. Si encuentras algún bug o tienes sugerencias de mejora, no dudes en abrir un issue o crear un pull request.

## Licencia

Este proyecto es de código abierto y está disponible bajo la licencia ISC.

---

¡Gracias por visitar este proyecto! Espero que te inspire a seguir aprendiendo y creando. 💡
