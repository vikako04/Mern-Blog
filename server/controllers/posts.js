const Post = require('../models/Post')

module.exports = {
  // Получить список всех постов
  getAllPosts(req, res) {
    res.json(Post.getAll())
  },

  // Получить пост по ID
  getPostById(req, res) {
    const post = Post.getById(Number(req.params.id))

    if (!post) {
      return res.status(404).json({ error: 'Пост не найден' })
    }

    res.json(post)
  },

  // Создать новый пост
  createPost(req, res) {
    const imagePath = req.file ? `uploads/${req.file.filename}` : '';
    const newPost = Post.create({
      title: req.body.title,
      content: req.body.content,
      img: imagePath,
      authorId: null,
    })

    res.status(201).json(newPost)
  },

  // Обновить существующий пост
  updatePost(req, res) {
    const updatedPost = Post.update(Number(req.params.id), req.body)

    if (!updatedPost) {
      return res.status(404).json({ error: 'Пост не найден' })
    }

    res.json(updatedPost)
  },

  // Удалить пост
  deletePost(req, res) {
    const isDeleted = Post.delete(Number(req.params.id))

    if (!isDeleted) {
      return res.status(404).json({ error: 'Пост не найден' })
    }

    res.status(204).send()
  },
}
