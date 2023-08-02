import createHttpError from 'http-errors'
import Manga from "../models/Manga.js"

const verifyAuthor = async (req, res, next) => {
    try {
      // Obtengo el titulo 'mandado'
      const manga_id = req.body.manga_id
  
      // Si en el objeto req de requerimietnos existe la propiedad 'author' con todos los datos del autor
      if (req.author) {
        const manga = await Manga.findOne({ _id: manga_id , author_id:  req.author._id})
            //Busco el manga que sea de este autor y tenga el id del manga al cual se le quiere agregar un capitulo
            if(manga){
                return next()
            }
            return next(createHttpError(403, 'You do not have permission to add a chapter to this manga.'))
        }
      // Si en el objeto req de requerimietnos existe la propiedad 'company' con todos los datos de la empresa
      if (req.company) {
        const manga = await Manga.findOne({ _id: manga_id , company_id:  req.company._id})
            //Busco el manga que sea de esta empresa y tenga el id del manga al cual se le quiere agregar un capitulo
            if(manga){
                return next()
            }
            return next(createHttpError(403, 'You do not have permission to add a chapter to this manga.'))
        }
        return next(createHttpError(403, 'You do not have permission to add a chapter to this manga.'))
    } 
    catch(error){
        next(error)
    }
}
  
export default verifyAuthor
