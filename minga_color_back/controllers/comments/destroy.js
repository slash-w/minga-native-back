import createHttpError from 'http-errors';
import Comment from "../../models/Comment.js"

const destroy = async (req, res, next) => {
  try {
    const commentId = req.params.id;
    const token = req.headers.authorization.split(' ')[1];

    console.log(token);

    // Usamos findByIdAndDelete para buscar y eliminar el comentario directamente
    const deletedComment = await Comment.findByIdAndDelete(commentId)

    if (!deletedComment) {
      // El comentario no existe
      return next(createHttpError(404, 'Comment not found'));
    }

    return res.status(200).json({
      success: true,
      message: "Comment deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export default destroy;

