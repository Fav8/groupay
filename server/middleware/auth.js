const admin = require("../firebase.config")

class MiddleWare{
    async decodeToken(req, res, next){
        try{
            const token = req.headers.authorization.split(" ")[1];
            const decodeValue = await admin.auth().verifyIdToken(token)
            if(decodeValue){
            return next();
            }
            return res.send('unauthorized')}
        catch(err){
            console.log(err);
            res.send('unknown error');
            
            return;
        }
    }
}

module.exports = new MiddleWare()