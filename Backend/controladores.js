const db = require('./db');

exports.regProd = async (req, res) => {
    const data = req.body;
    let sqlCode = `INSERT INTO productos (nombre, precio, descripcion, imagen, categoria, stock)
                    VALUES ("${data.nombre}", "${data.precio}", "${data.descripcion}", "${data.imagen}", "${data.categoria}", "${data.stock}");`
    console.log(sqlCode);
    try {
        const result = await db.promise().execute(sqlCode);
        db.end(err => {
            if (err) {
                return console.error('Error al cerrar la conexión:', err);
            }
            console.log('Conexión cerrada.');
        });
        res.status(201).json({ message: 'Datos insertados'});
    } catch (error) {
        db.end(err => {
            if (err) {
                return console.error('Error al cerrar la conexión:', err);
            }
            console.log('Conexión cerrada.');
        });
        console.error(error);
        res.status(500).json({ error: 'Error al insertar datos' });
    }
};