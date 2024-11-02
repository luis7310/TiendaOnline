var mysql = require('mysql2');


const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root', 
    password: 'admin', 
    database: 'SistemaCompras' 
});

/*connection.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos: ' + err.stack);
        return;
    }
    console.log('Conectado a la base de datos');
}); */




module.exports = connection;
