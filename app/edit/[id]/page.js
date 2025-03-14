"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

export default function EditPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3033/posts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTitle(data.title);
        setContent(data.content);
      })
      .catch((err) => console.error("Ошибка загрузки поста:", err));
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (image) formData.append("image", image);

    await fetch(`http://localhost:3033/posts/${id}`, {
      method: "PUT",
      body: formData,
    });

    router.push(`/posts/${id}`);
  };

  return (
    <main className="p-6 flex justify-center">
  <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
    <h1 className="text-2xl font-bold mb-4">Редактировать пост</h1>
    <form onSubmit={handleUpdate} className="flex flex-col gap-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="border p-2 rounded"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
        className="border p-2 rounded h-32 resize-none"
      ></textarea>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        className="border p-2 rounded"
      />
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Сохранить
      </button>
    </form>
  </div>
</main>

  );
}
