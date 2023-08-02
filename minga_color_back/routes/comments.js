import Router from "express"
import create from "../controllers/comments/create.js"
import allFromChapter from "../controllers/comments/allFromChapter.js"
import update from "../controllers/comments/update.js"
import passport from "../middlewares/passport.js"
import verifyCommentOwner from "../middlewares/isPropertyOfComments.js"
import destroy from "../controllers/comments/destroy.js"

let comment_router = Router()

comment_router.post('/', passport.authenticate("jwt", { session: false }), create)
comment_router.get('/', passport.authenticate("jwt", { session: false }), allFromChapter)
comment_router.put('/:id', passport.authenticate("jwt", { session: false }), verifyCommentOwner, update)
comment_router.delete('/:id', passport.authenticate("jwt", { session: false }), verifyCommentOwner, destroy)

export default comment_router