/**
 * Валидация данных задачи
 * @param {Object} req - Объект запроса
 * @param {Object} res - Объект ответа
 * @param {Function} next - Следующий middleware
 */
module.exports = (req, res, next) => {
  const { title, content } = req.body

  if (!title || title.trim().length === 0) {
    return res.status(400).json({
      error: 'Название поста обязательно для заполнения',
    })
  }

  if (title.length > 100) {
    return res.status(400).json({
      error: 'Название не должно превышать 100 символов',
    })
  }

  if (!content || content.trim().length === 0) {
    return res.status(400).json({
      error: 'Содержание поста обязательно для заполнения',
    })
  }

  if (content.length > 5000) {
    return res.status(400).json({
      error: 'Содержание не должно превышать 5000 символов',
    })
  }

  next()
}
