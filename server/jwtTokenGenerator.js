const jwt = require('jsonwebtoken');
const generateAuthToken = function(data){
        data  =  JSON.stringify(data);
        const token =  jwt.sign(data , process.env.JWT_SECRET);
        return token;
    }
    
module.exports  = generateAuthToken;