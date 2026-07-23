"use client";

import React from "react";
import { Heart, Star } from "lucide-react";

export default function ProductCard({ product, isWishlisted, onToggleWishlist, onQuickView, onAddToCart }) {
  const p = product;
  const discountedPrice = p.originalPrice > 0;
  
  return (
    <div className="product-card" data-id={p.id}>
      {p.badge && <div className="product-badge">{p.badge}</div>}
      <div className="product-image-container">
        <a href={`#product-details?id=${p.id}`}>
          <img src={p.images[0]} alt={p.name} />
        </a>
        <button
          className={`product-wishlist-toggle wishlist-toggle-btn ${isWishlisted ? "active" : ""}`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onToggleWishlist(p.id);
          }}
          aria-label="Toggle Wishlist"
        >
          <Heart fill={isWishlisted ? "currentColor" : "none"} />
        </button>
        <div className="product-card-actions">
          <button
            className="product-action-btn quick-view-trigger"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onQuickView(p.id);
            }}
          >
            Quick View
          </button>
          <button
            className="product-action-btn add-to-cart-quick"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onAddToCart(p.id);
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
      <div className="product-info">
        <div className="product-category">{p.purity} | {p.category}</div>
        <h3 className="product-title">
          <a href={`#product-details?id=${p.id}`}>{p.name}</a>
        </h3>
        <div className="product-rating">
          <Star size={12} fill="currentColor" style={{ display: "inline-block", verticalAlign: "middle" }} />
          <span> {p.rating} ({p.reviewsCount})</span>
        </div>
        <div className="product-price-flex">
          {discountedPrice ? (
            <>
              <span className="product-price discounted-price">${p.price.toLocaleString()}</span>{" "}
              <span className="product-price original-price">${p.originalPrice.toLocaleString()}</span>
            </>
          ) : (
            <span className="product-price">${p.price.toLocaleString()}</span>
          )}
        </div>
      </div>
    </div>
  );
}
