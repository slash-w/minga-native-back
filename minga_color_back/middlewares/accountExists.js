import User from "../models/User.js"

export default async function(req,res,next) {

    try{
        const user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({
                success: false,
                message: 'User registered!'
            })
        }
        return next()
    }
    catch(error){
        return next(error)
    }
}