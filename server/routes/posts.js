const express = require('express')
const router = express.Router()
const controller = require('../controllers/posts')
const validator = require('../middleware/validator')
const upload = require("../middleware/multerConfig");

// Маршруты для работы с постами
router.get('/', controller.getAllPosts) // GET /posts
router.get('/:id', controller.getPostById) // GET /posts/:id
router.post('/', upload.single("image"), validator, controller.createPost) // POST /posts
router.put('/:id', validator, controller.updatePost) // PUT /posts/:id
router.delete('/:id', controller.deletePost) // DELETE /posts/:id

module.exports = router
