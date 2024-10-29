const express = require("express");
const rutas = require('./rutas');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://127.0.0.1:5500' // Permite solo este origen
}));
app.use('/', rutas);

app.listen(3000, ()=>{
    console.log("Running on port 3000");
})

