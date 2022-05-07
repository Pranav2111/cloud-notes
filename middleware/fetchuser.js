var jwt = require('jsonwebtoken');
const JWT_SECRET = 'abcdefg';

const fetchuser = (req, res, next) =>{
    //Get user id from JWT tocken and add it to require object

    const tocken = req.header('auth-tocken');

    if(!tocken)
    {
        return res.status(401).send({ errors: "invalid Tocken" });
    }

    try {
        
        const data = jwt.verify(tocken,JWT_SECRET);
        req.user = data.user;

    next()

    } catch (error) {
         return res.status(401).send({ errors: "invalid Tocken" });
    }
    
}
module.exports = fetchuser;