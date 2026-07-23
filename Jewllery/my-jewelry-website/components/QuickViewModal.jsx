"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function QuickViewModal({ product, onClose, onAddToCart }) {
  const [activeImg, setActiveImg] = useState("");

  useEffect(() => {
    if (product) {
      setActiveImg(product.images[0]);
    }
  }, [product]);

  if (!product) return null;

  return (
    <div className="modal-backdrop show" id="quick-view-backdrop">
      <div className="modal-container">
        <button className="modal-close" onClick={onClose} id="quick-view-close" aria-label="Close Modal">
          <X size={20} />
        </button>
        <div className="modal-body-grid" id="quick-view-content">
          {/* Gallery */}
          <div className="product-gallery" style={{ gap: "0.5rem" }}>
            <div className="product-gallery-main" style={{ height: "350px" }}>
              <img src={activeImg} alt={product.name} id="qv-main-img" />
            </div>
            <div className="gallery-thumbnails" style={{ justifyContent: "center" }}>
              {product.images.map((img, idx) => (
                <div
                  key={idx}
                  className={`thumbnail-item qv-thumb ${activeImg === img ? "active" : ""}`}
                  onClick={() => setActiveImg(img)}
                  style={{ width: "60px", height: "60px" }}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} />
                </div>
              ))}
            </div>
          </div>
          
          {/* Info panel */}
          <div className="details-info" style={{ justifyContent: "center", padding: "1rem" }}>
            <span className="product-category" style={{ marginBottom: "0.5rem" }}>{product.purity}</span>
            <h3 style={{ fontSize: "1.8rem", marginBottom: "0.5rem", lineHeight: "1.2" }}>{product.name}</h3>
            
            <div className="details-price" style={{ fontSize: "1.4rem", marginBottom: "1rem" }}>
              ${product.price.toLocaleString()}
            </div>

            <p className="details-description" style={{ fontSize: "0.85rem", marginBottom: "1.5rem", lineHeight: "1.5" }}>
              {product.description.slice(0, 160)}...
            </p>

            <div className="purchase-controls" style={{ marginBottom: "1.5rem" }}>
              <button
                className="btn btn-primary"
                onClick={() => {
                  onAddToCart(product.id, 1, "gold");
                  onClose();
                }}
                id="qv-add-to-bag"
                style={{ padding: "0.7rem 1.5rem", fontSize: "0.75rem" }}
              >
                Add to Bag
              </button>
              <a
                href={`#product-details?id=${product.id}`}
                className="btn btn-outline"
                onClick={onClose}
                style={{ padding: "0.7rem 1.5rem", fontSize: "0.75rem" }}
              >
                View Full Details
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
