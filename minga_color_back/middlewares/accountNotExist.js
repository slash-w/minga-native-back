import User from "../models/User.js"

export default async(req, res, next)=> {
    try {
        let one = await User.findOne({email:req.body.email})
        if (one) {
            return next()
        }
        return res.status(404).json({
            success: false,
            message: 'user not registered!'
        })
    } catch (error) {
        return next(error)
    }
}