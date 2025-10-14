// class UserController {
//   constructor(userService) {
//     this.userService = userService;
//   }

//   async getUsers(req, res) {
//     try {
//       const usuarios = await this.userService.getUsers();
//       res.status(200).json(usuarios);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   }

//   async createUser(req, res) {
//     try {
//       const nuevoUsuario = req.body;
//       const usuarioCreado = await this.userService.createUser(nuevoUsuario);
//       res.status(201).json(usuarioCreado);
//     } catch (error) {
//       console.error(`Error creando usuario: ${nuevoUsuario.nombre}`, error);
//       res.status(500).json({ error: error.message, details: error });
//     }
//   }

//   async updateUser(req, res) {
//     try {
//       const { nombre } = req.params;
//       const usuario = req.body;
//       const usuarioActualizado = await this.userService.updateUser(usuario._id, usuario);
//       if (usuarioActualizado) {
//         res.status(200).json({ message: 'Usuario actualizado', usuario: usuarioActualizado });
//       } else {
//         res.status(404).json({ error: 'Usuario no encontrado' });
//       }
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   }
// }

// module.exports = UserController;
