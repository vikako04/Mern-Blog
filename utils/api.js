const API_URL = "http://localhost:3033/posts";

// Получить все посты
export async function getPosts() {
  const res = await fetch(API_URL);
  return res.json();
}

// Получить один пост
export async function getPostById(id) {
  const res = await fetch(`${API_URL}/${id}`);
  return res.json();
}

// Создать пост
export async function createPost(formData) {
  const res = await fetch(API_URL, {
    method: "POST",
    body: formData, // Отправляем как FormData
  });

  return res.json();
}

// Удалить пост
export async function deletePost(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
}

// Обновить пост
export async function updatePost(id, updatedData) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  });

  return res.json();
}
