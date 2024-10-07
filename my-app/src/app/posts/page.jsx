"use client";

import { useEffect, useState, useRef } from "react";
import Loading from "../components/Loading";
import Link from "next/link";

const PostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const limit = 15; // Number of posts per page
  const loadMoreRef = useRef(null);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://dummyjson.com/posts?limit=${limit}&skip=${(page - 1) * limit}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setPosts((prevPosts) => [...prevPosts, ...data.posts]);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && posts.length >= limit) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [loading, posts]);

  if (loading && page === 1) return <Loading />;
  if (error)
    return (
      <div className="text-center mt-4">
        <p className="text-red-500">Error: {error}</p>
        <button
          onClick={() => {
            setPosts([]);
            setPage(1);
            fetchPosts();
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
        >
          Retry
        </button>
      </div>
    );

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Blog Posts</h1>
      <p className="mb-4">Explore our latest posts below:</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105"
          >
            <div className="p-4">
              <h2 className="font-semibold text-lg">{post.title}</h2>
              <p className="text-gray-700 mt-2">
                {post.body.substring(0, 100)}...
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Tags: {post.tags.join(", ")}
              </p>
              <p className="text-sm text-gray-500">
                Likes: {post.reactions.likes} | Dislikes:{" "}
                {post.reactions.dislikes}
              </p>
              <p className="text-sm text-gray-500">Views: {post.views}</p>
              <Link href={`/posts/${post.id}`}>Show Detail</Link>
            </div>
          </div>
        ))}
      </div>
      {loading && <Loading />}
      <div ref={loadMoreRef} className="h-10" />
    </div>
  );
};

export default PostsPage;
