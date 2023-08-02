import Comment from "../../models/Comment.js"

let create = async (req, res, next) => {
  try {
    const { text } = req.body

    if (!req.query.chapter_id) {
      return res.status(400).json({ error: "The chapter_id field is required." });
    }

    const comment = await Comment.create ({
      chapter_id: req.query.chapter_id,
      user_id: req.user._id,
      text
    })
    
    let newComment = await comment.populate('user_id')

    console.log(req.user)

    console.log(comment)

    const { email } = req.user

    return res.status(201).json({
      success: true,
      message: "new comment from " + email + ": " + "'" + text + "'",
      comment: newComment
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "server error: " + error.message });
  }
}

export default create;

