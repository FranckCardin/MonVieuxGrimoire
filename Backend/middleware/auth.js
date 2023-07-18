//IMPORT PACKAGE JSONWEBTOKEN 
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        //Extraction du token
        const token = req.headers.authorization.split(' ')[1];
        console.log(token);
        //Verification du token
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        //Extraction de l'userID afin de le rajouter à l'objet Request pour que les routes puisse l'exploiter 
        const userId = decodedToken.userId;
        req.auth = {
            userId: userId
        };
        next();
    } catch (error) {
        res.status(401).json({ error });
    }
};