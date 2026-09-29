const jwt = require("jsonwebtoken")
module.exports = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.sendStatus(401)  //unauthorised
    }

    jwt.verify(token, process.env.JWT_Secret, (err, user) => {
        if (err) {
            return res.sendStatus(401)   //invalid token
        }

        req.user = user;
        next()

    })




}