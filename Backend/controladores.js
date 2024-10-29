exports.regProd = (req, res) => {
    const data = req.body;
    console.log(data); 
    res.json({ message: 'Datos recibidos'});
};