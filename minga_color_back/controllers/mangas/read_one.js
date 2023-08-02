import Manga from "../../models/Manga.js"

// Controlador para ver un manga específico basado en su ID
export default async (req, res, next) => {
    
  const mangaId = req.params.id

  try {
    const manga = await Manga.findById(mangaId)
    .select('title cover_photo description -_id')
    .populate({
      path: 'category_id',
      select: 'name -_id'
    })
    .populate({
      path: 'author_id',
      select: 'name last_name -_id'
    })
    
    res.status(200).json({ 
        success: true,
        message: 'Manga found',
        manga: manga
     })
  } 
  catch (error) {
     next(error)
  }
}



