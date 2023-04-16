
import jwt from 'jsonwebtoken'
import Users from '../models/UsersModel.js'
import dotenv from 'dotenv'

dotenv.config()

export const verifyToken = (   req , res, next) => {

    const acces_token = req.cookies.access_token || req.headers['x-access-token']
    if(!acces_token) {
        return res.status(401).json({msg:"Not authorized"})
    }

    jwt.verify(acces_token, process.env.ACCESS_TOKEN_SECRET,async  (error, decoded)=>{ 

        if(error) 
            return res.status(403).json({msg:"verify token failed"})
            req.email = decoded.email;
            req.userid = decoded.userid;

        try{
            const user = await Users.findAll({
                where: {
                    email: decoded.email
                }
            })
           user.length === 0?
           res.status(403).json({msg:'verify user failed!'}) : next()
        }    
        catch(e){
            res.status(403).json({msg:'verify user failed!'})
        }
        next()
    })

    
}
