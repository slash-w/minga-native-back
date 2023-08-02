import createHttpError from 'http-errors';
import Comment from "../models/Comment.js";

const verifyCommentOwner = async (req, res, next) => {
  try {
    const commentId = req.params.id;

    // Obtener el comentario por el ID
    const comment = await Comment.findById(commentId);

    if (!comment) {
      // El comentario no existe
      return next(createHttpError(404, 'Comment not found'));
    }

    // Verificar si el user_id del comentario coincide con el user_id del usuario logueado
    if (comment.user_id.toString() === req.user._id.toString()) {
      // El usuario tiene permiso para actualizar el comentario
      return next();
    }

    // El usuario no tiene permiso para actualizar el comentario
    return next(createHttpError(403, 'You do not have permission to update this comment'));
  } catch (error) {
    next(error);
  }
};

export default verifyCommentOwner;
