const jwt = require('jsonwebtoken');

//Token verification
let tokenVerification = async (req, res, next) => {
    const token = req.get('token'); //If the token exists we retrieve it
    try {
        const decoded = await jwt.verify( token, process.env.SEED);
        req.usuario = decoded.usuario; // Get the user from the payload encrypted by the token
    } catch (error) {
        return res.status(401).json({ok:false, message: error});
    };
    
    next();
};

//Admin role verification
const verifyAdminRole = (req, res, next) => {
    const { role } = req.usuario;
    if(role === 'ADMIN_ROLE') next();
    if(role === 'USER_ROLE') { 
        return res.status(404).json({ok:false, message:'Forbiden action!'});
    };
};


//Token to validate Image requests
imgTokenVerification = async (req, res, next) => {
    const token = req.query.token;
    try {
        const decoded = await jwt.verify( token, process.env.SEED);
        req.usuario = decoded.usuario; // Get the user from the payload encrypted by the token
    } catch (error) {
        return res.status(401).json({ok:false, message: error});
    };
    
    next();
};

module.exports = { tokenVerification, verifyAdminRole, imgTokenVerification };
