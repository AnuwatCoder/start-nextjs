"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";

function PostsSinglePage({ params }) {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(
          `https://dummyjson.com/posts/${params.id}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setPost(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [params.id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold">{post.title}</h1>
        <p>This is the home page.</p>

        <p>{post.body}</p>
        <div>
          <strong>Tags:</strong> {post.tags.join(", ")}
        </div>
        <div>
          <strong>Likes:</strong> {post.reactions.likes}
        </div>
        <div>
          <strong>Dislikes:</strong> {post.reactions.dislikes}
        </div>
        <div>
          <strong>Views:</strong> {post.views}
        </div>
        <br></br>
        <Link
          href="/posts"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Back
        </Link>
      </div>
    </div>
  );
}

export default PostsSinglePage;
