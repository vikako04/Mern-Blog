/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:3033/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("Ошибка загрузки постов:", err));
  }, []);

  return (
    <main className="p-6 max-w-5xl mx-auto">
      <button
        onClick={() => router.push("/create")}
        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg mb-6 shadow-md transition"
      >
        Создать новый пост
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 cursor-pointer"
            onClick={() => router.push(`/posts/${post.id}`)}
          >
            <img
              src={`http://localhost:3033/${post.img}`}
              alt={post.title}
              className="w-full h-52 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800">{post.title}</h2>
              <p className="text-gray-500 text-sm">{new Date(post.publishDate).toLocaleDateString()}</p>
              <p className="text-gray-600 mt-2 text-sm">
                Просмотры: {post.views} | Лайки: {post.likes}
              </p>
            </div>
          </div>
        ))}
      </div>
    </main>

  );
}
