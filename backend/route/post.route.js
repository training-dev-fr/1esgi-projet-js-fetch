const express = require("express");
const router = express.Router();
const postController = require("./../controller/post.controller");
const commentController = require("./../controller/comment.controller");
const auth = require("./../middleware/auth");


router.get('/list/:number', postController.getAll);
router.post('/', auth, postController.create);
router.put('/:id', auth, postController.update);
router.delete('/:id', auth, postController.delete);

router.post('/:id/comment', auth, commentController.create);
router.delete('/comment/:id', auth, commentController.delete);

module.exports = router;