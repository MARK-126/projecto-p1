export class UserService {
  constructor(pool) {
    this.pool = pool;
  }

  async getUsers() {
    try {
      const [rows] = await this.pool.query('SELECT * FROM usuarios');
      return rows;
    } catch (error) {
      console.error('Error al obtener usuarios: ' + error.message);
    }
  }

  async createUser(user) {
    try {
      const { first_name, las_name, email, dni } = user;
      const [result] = await this.pool.query(
        'INSERT INTO usuarios (first_name, las_name, email, dni) VALUES (?, ?, ?, ?)',
        [first_name, las_name, email, dni]
      );
      return { id: result.insertId, first_name, las_name, email, dni };
    } catch (error) {
      console.error('Error al crear usuario: ' + error.message);
    }
  }

  async updateUser(id, user) {
    try {
      const { first_name, las_name, email, dni } = user;
      const [result] = await this.pool.query(
        'UPDATE usuarios SET first_name = ?, las_name = ?, email = ?, dni = ? WHERE id = ?',
        [first_name, las_name, email, dni, id]
      );
      if (result.affectedRows === 1) {
        return { id, first_name, las_name, email, dni };
      }
      return null;
    } catch (error) {
      console.error('Error al actualizar usuario: ' + error.message);
    }
  }

  async deleteUser(id) {
    try {
      const [result] = await this.pool.query('DELETE FROM usuarios WHERE id = ?', [id]);
      return result.affectedRows === 1;
    } catch (error) {
      console.error('Error al eliminar usuario: ' + error.message);
    }
  }
}

