const fs = require('fs');
const path = require('path');
const DATA_PATH = path.join(__dirname, '../data/posts.json');

// Имитация базы данных в памяти
let posts = require('../data/posts.json')

let lastId = posts.length ? Math.max(...posts.map((p) => p.id)) : 0 // Счетчик для генерации ID

// Функция для сохранения постов в файл
const savePostsToFile = () => {
  fs.writeFileSync(DATA_PATH, JSON.stringify(posts, null, 2));
};

module.exports = {
  /**
   * Получить все посты
   * @returns {Array} Массив постов
   */
  getAll() {
    return posts
  },

  /**
   * Найти пост по ID
   * @param {number} id - Идентификатор поста
   * @returns {Object|null} Объект поста или null
   */
  getById(id) {
    return posts.find((post) => post.id === id) || null
  },

  /**
   * Создать новый пост
   * @param {Object} data - Данные поста
   * @returns {Object} Созданный пост
   */
  create(data) {
    const newPost = {
      id: ++lastId,
      title: data.title,
      content: data.content,
      img: data.img,
      authorId: data.authorId,
      publishDate: new Date(),
      views: Math.floor(Math.random() * 1000),
      likes: Math.floor(Math.random() * 1000),
    }
    posts.push(newPost)
    savePostsToFile(); // Сохраняем изменения в JSON
    return newPost
  },

  /**
   * Обновить существующий пост
   * @param {number} id - Идентификатор поста
   * @param {Object} updates - Новые данные
   * @returns {Object|null} Обновленный пост или null
   */
  update(id, updates) {
    const post = this.getById(id)
    if (!post) return null

    Object.assign(post, updates)
    savePostsToFile(); // Сохраняем изменения в JSON
    return post
  },

  /**
   * Удалить пост
   * @param {number} id - Идентификатор поста
   * @returns {boolean} Успех операции
   */
  delete(id) {
    const initialLength = posts.length
    posts = posts.filter((post) => post.id !== id)
    savePostsToFile(); // Сохраняем изменения в JSON
    return posts.length !== initialLength
  },
}
