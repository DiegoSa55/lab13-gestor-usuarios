const sql = require('mssql');

// 1. Crear usuario (CREATE)
exports.createUser = async (req, res) => {
  const { name, email } = req.body;
  try {
    const request = new sql.Request();
    request.input('name', sql.VarChar, name);
    request.input('email', sql.VarChar, email);

    await request.query('INSERT INTO Users (name, email) VALUES (@name, @email)');
    res.status(201).json({ message: 'Usuario creado exitosamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error creando usuario: ' + err.message });
  }
};

// 2. Obtener usuarios (READ)
exports.getUsers = async (req, res) => {
  try {
    const request = new sql.Request();
    const result = await request.query('SELECT * FROM Users');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: 'Error obteniendo usuarios: ' + err.message });
  }
};

// 3. Actualizar usuario (UPDATE)
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  try {
    const request = new sql.Request();
    request.input('id', sql.Int, id);
    request.input('name', sql.VarChar, name);
    request.input('email', sql.VarChar, email);

    await request.query('UPDATE Users SET name = @name, email = @email WHERE id = @id');
    res.json({ message: 'Usuario actualizado exitosamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error actualizando usuario: ' + err.message });
  }
};

// 4. Eliminar usuario (DELETE)
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const request = new sql.Request();
    request.input('id', sql.Int, id);

    await request.query('DELETE FROM Users WHERE id = @id');
    res.json({ message: 'Usuario eliminado exitosamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error eliminando usuario: ' + err.message });
  }
};