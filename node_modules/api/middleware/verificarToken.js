const jws = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
    const authHeder = req.headers['authorization'];
    
    if (!authHeder) {
        return res.status(400).json({ error: 'Token no proporcionado 1' });
    }
    
    const token = authHeder.split(' ')[1] || authHeder;
    
    try {
        const verificado = jws.verify(token, process.env.jwtSecret);
        req.usuario = verificado;
        next();
    } catch (error) {
        res.status(400).json({ error: 'Token inválido o expirado' });
    }
};
module.exports = verificarToken;

