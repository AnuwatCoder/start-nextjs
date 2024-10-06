"use client";

import { useEffect, useState } from "react";
import Loading from "../components/Loading";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const limit = 30; // Number of posts per page

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://dummyjson.com/posts?limit=${limit}&skip=${(page - 1) * limit}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPosts(data.posts);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [page]);

  if (loading) return <Loading />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Paginated Posts</h1>
      <ul className="mt-4">
        {posts.map((post) => (
          <li key={post.id} className="border-b py-2">
              <h2 className="font-semibold">
                {post.id}) {post.title}
              </h2>
            <p>{post.body}</p>
            <p className="text-sm text-gray-500">
              Tags: {post.tags.join(", ")}
            </p>
            <p className="text-sm text-gray-500">
              Likes: {post.reactions.likes} | Dislikes:{" "}
              {post.reactions.dislikes}
            </p>
            <p className="text-sm text-gray-500">Views: {post.views}</p>
          </li>
        ))}
      </ul>
      <div className="flex justify-between mt-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Posts;
