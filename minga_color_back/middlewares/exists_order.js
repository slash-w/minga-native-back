import chapter from "../models/chapter.js";

const orderExists = async function (req, res, next) {
  try {
    const chapter = await chapter.findOne({ manga_id: req.body.manga_id, order: req.body.order });
    if (chapter) {
      return res.status(400).send({ message: "chapter already exists" });
    }
    return next;
  } catch (error) {
    return res.status(400).send(error.message);
  }
};
export default orderExists;
