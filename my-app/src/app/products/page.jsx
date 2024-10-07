"use client";

import React, { useEffect, useState, useRef } from "react";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      const res = await fetch(
        `https://dummyjson.com/products?limit=10&skip=${(page - 1) * 10}`
      );
      const data = await res.json();

      setProducts((prev) => [...prev, ...data.products]);
      setHasMore(data.products.length > 0);
      setLoading(false);
    };

    loadProducts();
  }, [page]);

  const lastProductRef = useRef();
  const lastProductObserver = (node) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((prev) => prev + 1);
      }
    });
    if (node) observer.current.observe(node);
  };

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((product, index) => (
          <li
            key={product.id}
            ref={index === products.length - 1 ? lastProductRef : null}
          >
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price.toFixed(2)}</p>
            <p>Rating: {product.rating}</p>
            <p>Category: {product.category}</p>
            <p>Stock: {product.stock}</p>
            <img src={product.thumbnail} alt={product.title} />
          </li>
        ))}
      </ul>
      {loading && <p>Loading more products...</p>}
      {!hasMore && <p>No more products to load.</p>}
    </div>
  );
};

export default Products;
