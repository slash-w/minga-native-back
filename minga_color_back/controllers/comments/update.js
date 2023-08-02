import Comment from "../../models/Comment.js"

const update = async (req, res, next) => {
  try {
    const commentId = req.params.id
    const { text } = req.body
    const token = req.headers.authorization.split(' ')[1]

    console.log(token)

    // Usamos findByIdAndUpdate para buscar y actualizar el comentario directamente
    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      { text }, // Los campos que queremos actualizar
      { new: true } // Opción para devolver el comentario actualizado
    ).populate('user_id')

    if (!updatedComment) {
      // El comentario no existe
      return next(createHttpError(404, 'Comment not found'))
    }

    return res.status(200).json({
      success: true,
      message: "Comment updated successfully",
      comment: updatedComment,
    })
  } catch (error) {
    next(error)
  }
}

export default update




