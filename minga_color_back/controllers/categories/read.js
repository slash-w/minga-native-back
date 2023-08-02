import createHttpError from 'http-errors'
import Category from '../../models/Category.js'

export default async(req,res,next) => {
    try{
        let categories = await Category.find()
        if(categories.length > 0){
            return res.status(200).json({
                categories,
                success:true,
                message:'you have requested GET /api/categories/',
                date: new Date()
            })
        }
        else{
            return next(createHttpError(404, 'Not found categories'))
        }
    }
    catch(error){
        next(error)
    }
}