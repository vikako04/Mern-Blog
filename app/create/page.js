"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (image) formData.append("image", image);

    await fetch("http://localhost:3033/posts", {
      method: "POST",
      body: formData,
    });

    router.push("/");
  };

  return (
    <main className="p-6 flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl"
      >
        <h2 className="text-2xl font-bold mb-4">Создать пост</h2>

        <label className="block mb-2 text-gray-700">Заголовок</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded-lg p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <label className="block mb-2 text-gray-700">Содержание</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border rounded-lg p-2 h-32 resize-none mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        ></textarea>

        <label className="block mb-2 text-gray-700">Изображение</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full border rounded-lg p-2 mb-4"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-md transition"
        >
          Создать
        </button>
      </form>
    </main>
  );
}
