const db = require('./db');

exports.regProd = async (req, res) => {
    let data = req.body;
    let sqlCode = `INSERT INTO productos (nombre, precio, descripcion, imagen, categoria, stock)
                    VALUES ("${data.nombre}", "${data.precio}", "${data.descripcion}", "${data.imagen}", "${data.categoria}", "${data.stock}");`
    try {
        db.connection;
        let result = await db.promise().execute(sqlCode);
        /*db.end(err => {
            if (err) {
                return console.error('Error al cerrar la conexión:', err);
            }
        });*/
        res.status(201).json({ message: 'Datos insertados'});
    } catch (error) {
        /*db.end(err => {
            if (err) {
                return console.error('Error al cerrar la conexión:', err);
            }
            console.log('Conexión cerrada.');
        });*/
        console.error(error);
        res.status(500).json({ error: 'Error al insertar datos' });
    }
};

exports.elimProd = async (req, res) => {
    let id = req.body;
    let sqlCode = `SELECT * FROM productos WHERE id = ` + id.id + ";"
    try {
        let result = await db.promise().execute(sqlCode);
        /*db.end(err => {
            if (err) {
                return console.error('Error al cerrar la conexión:', err);
            }
        });*/
        res.status(201).json(result[0][0]);
    }
    catch(error){
        console.log(error);
    }
};