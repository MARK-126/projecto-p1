// class UserService {
//   constructor(db) {
//     this.db = db;
//   }

//   async getUsers() {
//     try {
//       const usuarios = await this.db.collection('usuarios').find().toArray();
//       return usuarios;
//     } catch (error) {
//       console.error('Error fetching users:', error);
//       throw error;
//     }
//   }

//   async createUser(user) {
//     try {
//       const result = await this.db.collection('usuarios').insertOne(user);
//       return { _id: result.insertedId, ...user };
//     } catch (error) {
//       console.error('Error creating user:', error);
//       throw error;
//     }
//   }

//   async updateUser(id, user) {
//     try {
//       const { ObjectId } = require('mongodb');
//       const _id = new ObjectId(id);
//       const result = await this.db.collection('usuarios').updateOne({ _id }, { $set: user });
//       if (result.modifiedCount === 1) {
//         return { _id, ...user };
//       }
//       return null;
//     } catch (error) {
//       console.error('Error updating user:', error);
//       throw error;
//     }
//   }
// }

// module.exports = UserService;
