// const express = require('express')
// const { MongoClient } = require('mongodb')

// const app = express()
// const cors = require('cors')
// const port = process.env.BACKEND_PORT || 3000
// const mongoUrl = `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@localhost:27017/`

// const whitelist = ['http://localhost:3000']
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }

// app.use(cors(corsOptions))
// app.use(express.json())

// const dbName = 'mongo-prueba'
// const db = MongoClient.db(dbName)

// async function connectToMongo() {
//   try {
//     const client = await MongoClient.connect(mongoUrl)
//     db = client.db(dbName)
//     console.log('Conectado a MongoDB')
//   } catch (err) {
//     console.error('Error conectando a MongoDB:', err)
//     process.exit(1)
//   }
// }

// app.get('/usuarios', async (req, res) => {
//   try {
//     const usuarios = await db.collection('usuarios').find().toArray()
//     res.status(200).json(usuarios)
//   } catch (err) {
//     res.status(500).json({ error: err.message })
//   }
// })

// app.post('/usuarios', async (req, res) => {
//   try {
//     const nuevoUsuario = req.body
//     const result = await db.collection('usuarios').insertOne(nuevoUsuario)
//     res.status(201).json({ _id: result.insertedId, ...nuevoUsuario })
//   } catch (err) {
//     console.error(`Error creando usuario: ${nuevoUsuario.nombre}`, err)
//     res.status(500).json({ error: err.message, details: err})
//   }
// })

// app.patch('/usuarios/:nombre', async (req, res) => {
//   try {
//     const { nombre } = req.params
//     const usuario = req.body
//     usuario._id = new require('mongodb').ObjectId(id)
//     const result = await db.collection('usuarios').updateOne({ _id: usuario._id }, { $set: usuario })
//     if (result.modifiedCount === 1) {
//       res.status(200).json({ message: 'Usuario actualizado', usuario })
//     } else {
//       res.status(404).json({ error: 'Usuario no encontrado' })
//     }
//   } catch (err) {
//     res.status(500).json({ error: err.message })
//   }
// })

// async function startServer() {
//   await connectToMongo()
//   app.listen(port, () => {
//     console.log(`Server listening on port ${port}`)
//   })
// }

// startServer()
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/usuario', (req, res) => {
  res.send('Hola marcos')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})