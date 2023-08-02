import Comment from "../../models/Comment.js"

export default async (req, res) => {
    
  const chapterId = req.query.chapter_id

  const page = parseInt(req.query.page) || 1

  const limit = 4

  try {
    const totalComments = await Comment.countDocuments({ chapter_id: chapterId })

    const totalPages = Math.ceil(totalComments / limit)

    const comments = await Comment.find({ chapter_id: chapterId }) 
    .populate("user_id") 
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit)

    const response = {
        comments: comments,
        currentPage: page,
        totalPages: totalPages,
        totalComments: totalComments
    }
    
    if (page > 1) {
      response.prev = true;
      response.next = false;
    } else if (page < totalPages) {
      response.prev = false;
      response.next = true;
    }

    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error getting comments" });
  }
}