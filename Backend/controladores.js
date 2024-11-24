const db = require('./db');

exports.regProd = async (req, res) => {
    let data = req.body;
    let sqlCode = `INSERT INTO productos (nombre, precio, descripcion, categoria, stock, imagen)
                    VALUES ("${data.nombre}", "${data.precio}", "${data.descripcion}", "${data.categoria}", "${data.stock}", "${data.imagen}");`
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

exports.consProd = async (req, res) => {
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

exports.elimProdId = async (req, res) => {
    let id = req.body;
    let sqlCode = `DELETE FROM productos WHERE id = ` + id.id + ";"
    try {
        let result = await db.promise().execute(sqlCode);
        /*db.end(err => {
            if (err) {
                return console.error('Error al cerrar la conexión:', err);
            }
        });*/
        res.status(201).json({mensaje : "Producto eliminado"});
    }
    catch(error){
        console.log(error);
    }
};

exports.consProdAll = async (req,res) => {
    let sqlCode = `SELECT id, nombre FROM productos;`;
    try {
        let result = await db.promise().execute(sqlCode);
        res.status(201).json(result);
    }
    catch(error){
        console.log(error);
    }
}

exports.editProd = async function (req, res){
    let data = req.body;
    let sqlCode = `UPDATE productos
    SET nombre = "${data.nombre}", precio = "${data.precio}", descripcion = "${data.descripcion}", imagen = "${data.imagen}", categoria = "${data.categoria}", stock = "${data.stock}"
    WHERE id = "${data.id}";`;
    
    try {
        let result = await db.promise().execute(sqlCode);
        res.status(201).json({mensaje : "Producto Actualizado"});
    }
    catch(error){
        console.log(error);
    }
}