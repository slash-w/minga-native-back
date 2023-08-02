import User from "../../models/User.js";

export default async(req,res,next)=> {
    try {
        let one = await User.findById(
            req.user._id
        )
        delete one.password
        return res.status(200).json({
            success:true,
            message:'user signed in!',
            response: {
                user: one.email,
                photo: one.photo,
                token: req.token
            }
        })
    } catch (error) {
        return next()
    }
}