import Users from '../models/UsersModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export const getUsers = async (req,res) => {
    try {
        console.log('getUsers')
        const users = await Users.findAll()

        return res.status(200).json(users)
    } catch (error) {
        return res.status(404).json({msg:error})
    }
}

export const deleteUser = async (req,res) => {
    try {
        console.log('deleteUser')
        const user = await Users.findByPk(req.params.userId)

        if(user) { 
            await user.destroy()
            return res.status(200).json({msg:"User deleted successfully"})
        }else {
            return res.status(404).json({msg:"User not found"})
        }
        
    } catch (error) {
        return res.status(404).json({msg:error})
    }
}




export const login = async (req,res) => {
    try {
        const user = await Users.findAll({
            where:{
                email: req.body.email
            }
        })

        if(user.length == 0) {
            return res.status(404).json({msg:'User not found'})
        }

        const match = await bcrypt.compare(req.body.password, user[0].password)
        if(!match)
            return res.status(400).json({mgs:"Wrong password"})

        const userid = user[0].id 
        const email  = user[0].email

        const access_token = jwt.sign({userId, email}, process.env.ACCESS_TOKEN_SECRET, { expiresIn:'60s'} )
        res.cookie('access_token',access_token, {
            httplOnly: true,
            maxAge: 60 * 1000
        })

        return res.status(200).json({access_token})

    } catch (error) {
        res.status(404).json({msg:'Email not found!'})
    }
}

export const register = async (req,res) => {
    const {body} = req;

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(body.password, salt);

    try{
        await Users.create({
            firstName: body.firstName,
            lastName: body.lastName,
            address: body.address,
            city: body.city,
            zipcode: body.zipcode,
            country: body.country,
            phone: body.phone,
            email: body.email, 
            password: hashPassword
        })
        res.json({msg:'Register Successful!'})
    }
    catch(e) {
        res.status(403).json({msg:'User already exists!'})
    }
}


export const updateUser = async (req,res) => {

    try{
        console.log('updateEvent', req.body)
        const {body} = req

        const user = await Users.findByPk(req.params.userId)
        if(user) {
            const salt = await bcrypt.genSalt();
            const hashPassword = await bcrypt.hash(body.password, salt);

            user.set({
                firstName: body.firstName,
                lastName: body.lastName,
                address: body.address,
                city: body.city,
                zipcode: body.zipcode,
                country: body.country,
                phone: body.phone,
                email: body.email, 
                password: hashPassword
            })
            user.save()
            res.status(200).json({msg:'User Successfully modified!'})
        }else {
            res.status(404).json({msg:'User not found!'})
        }
    }
    catch(e) {
        res.status(400).json({msg:e})
    }
}