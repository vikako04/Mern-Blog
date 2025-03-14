/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

export default function PostPage() {
  const [post, setPost] = useState(null);
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3033/posts/${id}`)
      .then((res) => res.json())
      .then((data) => setPost(data))
      .catch((err) => console.error("Ошибка загрузки поста:", err));
  }, [id]);

  const handleDelete = async () => {
    await fetch(`http://localhost:3033/posts/${id}`, { method: "DELETE" });
    router.push("/");
  };

  if (!post) return <p>Загрузка...</p>;

  return (
    <main className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <img
        src={`http://localhost:3033/${post.img}`}
        alt={post.title}
        className="w-full h-56 object-cover rounded-md mb-6"
      />
      <h1 className="text-3xl font-bold text-center">{post.title}</h1>
      <p className="text-gray-700 text-center mt-3 text-lg">{post.content}</p>
      <p className="text-gray-500 text-sm text-center mt-3">
        {new Date(post.publishDate).toLocaleDateString()}
      </p>
      <p className="text-center mt-3 text-gray-600">
        Просмотры: {post.views} | Лайки: {post.likes}
      </p>
      <div className="flex justify-center gap-6 mt-5">
        <button
          onClick={() => router.push(`/edit/${id}`)}
          className="bg-yellow-500 text-white px-5 py-2.5 rounded text-lg"
        >
          Редактировать
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-5 py-2.5 rounded text-lg"
        >
          Удалить
        </button>
      </div>
    </main>
  );
}
