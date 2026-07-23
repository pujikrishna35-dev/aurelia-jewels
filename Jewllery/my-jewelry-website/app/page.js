"use client";

import React, { useState, useEffect } from "react";
import { 
  Search, User, Heart, ShoppingBag, X, Star, ShieldCheck, 
  Trash2, Gem, Crown, Sparkles, ChevronLeft, ChevronRight,
  ArrowUp, Check, AlertCircle, Info, MoveHorizontal
} from "lucide-react";
import { PRODUCTS, BLOG_POSTS } from "./data";
import ProductCard from "../components/ProductCard";
import QuickViewModal from "../components/QuickViewModal";
import Viewer360 from "../components/Viewer360";

export default function HomeSPA() {
  // Navigation & Routing State
  const [currentHash, setCurrentHash] = useState("#home");
  const [routeParams, setRouteParams] = useState({});
  const [loading, setLoading] = useState(false);

  // E-Commerce Core State
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  // UI Interactive State
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileCollapseOpen, setMobileCollapseOpen] = useState({});
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [zoomImgSrc, setZoomImgSrc] = useState(null);
  const [toasts, setToasts] = useState([]);

  // Loading initial data from LocalStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      setCart(JSON.parse(localStorage.getItem("aurelia_cart")) || []);
      setWishlist(JSON.parse(localStorage.getItem("aurelia_wishlist")) || []);
      setCurrentUser(JSON.parse(localStorage.getItem("aurelia_user")) || null);
      setOrders(JSON.parse(localStorage.getItem("aurelia_orders")) || [
        { id: "AJ-98421", date: "June 12, 2026", total: 4850, status: "delivered", items: ["Aura Solitaire Diamond Ring"] },
        { id: "AJ-98005", date: "May 20, 2026", total: 1800, status: "shipped", items: ["Isabella Rose Gold Bangle"] }
      ]);
      setRecentlyViewed(JSON.parse(localStorage.getItem("aurelia_recently")) || []);

      // Hash Routing listener
      const handleHashChange = () => {
        const hash = window.location.hash || "#home";
        setCurrentHash(hash);
        
        // Parse parameters
        const parts = hash.split("?");
        const route = parts[0];
        const query = {};
        if (parts[1]) {
          const vars = parts[1].split("&");
          vars.forEach(v => {
            const pair = v.split("=");
            query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || "");
          });
        }
        
        setRouteParams(query);
        setLoading(true);
        setTimeout(() => setLoading(false), 200); // simulated luxury loader
        window.scrollTo({ top: 0, behavior: "smooth" });
      };

      window.addEventListener("hashchange", handleHashChange);
      handleHashChange(); // trigger initial route
      
      return () => window.removeEventListener("hashchange", handleHashChange);
    }
  }, []);

  // Save Cart state helper
  const saveCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem("aurelia_cart", JSON.stringify(newCart));
  };

  // Toast alert system helper
  const triggerToast = (message, type = "success") => {
    const id = Date.now() + Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  };

  // Wishlist toggle
  const handleToggleWishlist = (productId) => {
    const product = PRODUCTS.find(p => p.id === productId);
    let updated;
    if (wishlist.includes(productId)) {
      updated = wishlist.filter(id => id !== productId);
      triggerToast(`${product.name} removed from Wishlist.`, "info");
    } else {
      updated = [...wishlist, productId];
      triggerToast(`${product.name} saved to Wishlist!`, "success");
    }
    setWishlist(updated);
    localStorage.setItem("aurelia_wishlist", JSON.stringify(updated));
  };

  // Add to Cart
  const handleAddToCart = (productId, qty = 1, metal = "gold") => {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const newCart = [...cart];
    const existing = newCart.find(item => item.product.id === productId && item.metal === metal);
    if (existing) {
      existing.quantity += qty;
    } else {
      newCart.push({ product, quantity: qty, metal });
    }
    saveCart(newCart);
    triggerToast(`Added ${product.name} (${metal.toUpperCase()}) to Bag!`, "success");
  };

  // Remove from Cart
  const handleRemoveFromCart = (productId, metal) => {
    const newCart = cart.filter(item => !(item.product.id === productId && item.metal === metal));
    saveCart(newCart);
    triggerToast("Item removed from Bag.", "info");
  };

  // Update Cart Qty
  const handleUpdateQty = (productId, metal, delta) => {
    const newCart = [...cart];
    const item = newCart.find(item => item.product.id === productId && item.metal === metal);
    if (item) {
      item.quantity += delta;
      if (item.quantity <= 0) {
        handleRemoveFromCart(productId, metal);
        return;
      }
      saveCart(newCart);
    }
  };

  const getCartTotal = () => {
    return cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  };

  const getCartBadgeCount = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  // User auth simulated actions
  const handleLogin = (email) => {
    const name = email.split("@")[0].charAt(0).toUpperCase() + email.split("@")[0].slice(1);
    const userObj = {
      name,
      email,
      address: "1024 Ocean Boulevard, Santa Monica, CA 90401",
      cards: ["•••• •••• •••• 4892", "•••• •••• •••• 1025"],
      notifications: { email: true, sms: false, collections: true }
    };
    setCurrentUser(userObj);
    localStorage.setItem("aurelia_user", JSON.stringify(userObj));
    triggerToast(`Welcome back, ${name}!`, "success");
    window.location.hash = "#dashboard";
  };

  const handleRegister = (name, email) => {
    const userObj = {
      name,
      email,
      address: "",
      cards: [],
      notifications: { email: true, sms: true, collections: true }
    };
    setCurrentUser(userObj);
    localStorage.setItem("aurelia_user", JSON.stringify(userObj));
    triggerToast("Registration successful! Welcome to Aurelia.", "success");
    window.location.hash = "#dashboard";
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("aurelia_user");
    triggerToast("You have been securely logged out.", "info");
    window.location.hash = "#home";
  };

  // Place Order Action
  const handlePlaceOrder = (address, payment) => {
    const orderId = `AJ-${Math.floor(10000 + Math.random() * 90000)}`;
    const itemsList = cart.map(item => item.product.name);
    const newOrder = {
      id: orderId,
      date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      total: getCartTotal() + 35,
      status: "processing",
      items: itemsList,
      address,
      payment
    };
    
    const updatedOrders = [newOrder, ...orders];
    setOrders(updatedOrders);
    localStorage.setItem("aurelia_orders", JSON.stringify(updatedOrders));
    saveCart([]); // clear cart
    triggerToast(`Order ${orderId} successfully placed!`, "success");
    window.location.hash = `#order-confirmation?id=${orderId}`;
  };

  // Track product recently viewed
  const handleAddRecentlyViewed = (productId) => {
    let list = recentlyViewed.filter(id => id !== productId);
    list.unshift(productId);
    if (list.length > 4) list.pop();
    setRecentlyViewed(list);
    localStorage.setItem("aurelia_recently", JSON.stringify(list));
  };

  // Render correct page views based on current route
  const getPageRenderer = () => {
    const route = currentHash.split("?")[0];
    
    switch(route) {
      case "#about":
        return <AboutView />;
      case "#shop":
        return (
          <ShopView 
            params={routeParams}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            onQuickView={(pId) => setQuickViewProduct(PRODUCTS.find(p => p.id === pId))}
            onAddToCart={handleAddToCart}
          />
        );
      case "#collections":
        return <CollectionsView />;
      case "#product-details":
        return (
          <ProductDetailsView 
            params={routeParams}
            wishlist={wishlist}
            recentlyViewed={recentlyViewed}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={handleAddToCart}
            onAddRecently={handleAddRecentlyViewed}
            onZoom={setZoomImgSrc}
            triggerToast={triggerToast}
          />
        );
      case "#wishlist":
        return (
          <WishlistView 
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={handleAddToCart}
          />
        );
      case "#cart":
        return (
          <CartView 
            cart={cart}
            subtotal={getCartTotal()}
            onUpdateQty={handleUpdateQty}
            onRemove={handleRemoveFromCart}
            triggerToast={triggerToast}
          />
        );
      case "#checkout":
        return (
          <CheckoutView 
            cart={cart}
            subtotal={getCartTotal()}
            currentUser={currentUser}
            onPlaceOrder={handlePlaceOrder}
          />
        );
      case "#dashboard":
        return (
          <DashboardView 
            currentUser={currentUser}
            orders={orders}
            onLogout={handleLogout}
            triggerToast={triggerToast}
          />
        );
      case "#login":
        return <LoginView onLogin={handleLogin} />;
      case "#register":
        return <RegisterView onRegister={handleRegister} />;
      case "#forgot-password":
        return <ForgotPasswordView triggerToast={triggerToast} />;
      case "#contact":
        return <ContactView triggerToast={triggerToast} />;
      case "#blog":
        return <BlogView />;
      case "#article":
        return <ArticleView params={routeParams} />;
      case "#faq":
        return <FAQView />;
      case "#privacy-policy":
        return <StaticPolicyView title="Privacy Policy" />;
      case "#terms-conditions":
        return <StaticPolicyView title="Terms & Conditions" />;
      case "#shipping-policy":
        return <StaticPolicyView title="Insured Shipping Policy" />;
      case "#return-policy":
        return <StaticPolicyView title="Luxury Return Policy" />;
      case "#order-tracking":
        return <OrderTrackingView params={routeParams} orders={orders} />;
      case "#order-confirmation":
        return <OrderConfirmationView params={routeParams} orders={orders} />;
      case "#home":
      default:
        return (
          <HomeView 
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            onQuickView={(pId) => setQuickViewProduct(PRODUCTS.find(p => p.id === pId))}
            onAddToCart={handleAddToCart}
            triggerToast={triggerToast}
          />
        );
    }
  };

  return (
    <>
      {/* Announcement Bar */}
      <div className="announcement-bar">
        <p>Complimentary Insured Worldwide Delivery & Signature Packaging on Orders Over $500</p>
      </div>

      {/* Main Header */}
      <header className="main-header" id="main-header">
        <div className="header-container">
          {/* Mobile menu trigger */}
          <button className="mobile-menu-toggle" onClick={() => setMobileMenuOpen(true)}>
            <MoveHorizontal size={20} />
          </button>

          {/* Desktop links */}
          <nav className="nav-links desktop-only">
            <a href="#home" className={`nav-link ${currentHash.startsWith("#home") ? "active" : ""}`}>Home</a>
            
            <div className="nav-dropdown">
              <a href="#shop" className={`nav-link dropdown-trigger ${currentHash.startsWith("#shop") ? "active" : ""}`}>Shop</a>
              <div className="mega-menu">
                <div className="mega-menu-grid">
                  <div className="mega-column">
                    <h4>By Category</h4>
                    <a href="#shop?category=rings">Rings</a>
                    <a href="#shop?category=necklaces">Necklaces & Pendants</a>
                    <a href="#shop?category=earrings">Earrings</a>
                    <a href="#shop?category=bracelets">Bracelets</a>
                    <a href="#shop?category=bridal">Bridal Sets</a>
                  </div>
                  <div className="mega-column">
                    <h4>By Metal</h4>
                    <a href="#shop?metal=gold">Yellow Gold</a>
                    <a href="#shop?metal=rosegold">Rose Gold</a>
                    <a href="#shop?metal=platinum">Platinum</a>
                    <a href="#shop?metal=silver">Fine Silver</a>
                  </div>
                  <div className="mega-column">
                    <h4>By Gemstone</h4>
                    <a href="#shop?gem=diamond">Diamonds</a>
                    <a href="#shop?gem=emerald">Emeralds</a>
                    <a href="#shop?gem=sapphire">Sapphires</a>
                    <a href="#shop?gem=pearl">Pearls</a>
                  </div>
                  <div className="mega-column featured-mega">
                    <div className="mega-featured-img" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&q=80&w=600')" }}>
                      <div className="mega-featured-overlay">
                        <span className="mega-tag">Exclusive</span>
                        <h5>The Elysian Bridal Suite</h5>
                        <a href="#shop?collection=elysian" className="mega-link">Explore Collection</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="nav-dropdown">
              <a href="#collections" className={`nav-link dropdown-trigger ${currentHash.startsWith("#collections") ? "active" : ""}`}>Collections</a>
              <div className="mega-menu collection-mega">
                <div className="mega-menu-grid">
                  <div className="mega-column">
                    <h4>Signature Collections</h4>
                    <a href="#shop?collection=elysian">Elysian Bridal</a>
                    <a href="#shop?collection=aurora">Aura of Diamonds</a>
                    <a href="#shop?collection=vintage">Vintage Gold</a>
                  </div>
                  <div className="mega-column">
                    <h4>Curated Edits</h4>
                    <a href="#shop?tag=new-arrivals">New Arrivals</a>
                    <a href="#shop?tag=best-sellers">Best Sellers</a>
                  </div>
                  <div className="mega-column mega-about-column">
                    <h4>Our Heritage</h4>
                    <p>Meticulously hand-crafted creations celebrating love, elegance, and timeless beauty.</p>
                    <a href="#about" className="text-link">Our Craftsmanship &rarr;</a>
                  </div>
                </div>
              </div>
            </div>

            <a href="#about" className="nav-link">About Us</a>
            <a href="#blog" className="nav-link">Blog & Guides</a>
          </nav>

          {/* Logo */}
          <div className="header-logo">
            <a href="#home" className="logo-text">AURELIA JEWELS</a>
          </div>

          {/* Action icons */}
          <div className="header-actions">
            <button className="action-btn" onClick={() => setSearchOpen(true)}>
              <Search size={20} />
            </button>
            <a href={currentUser ? "#dashboard" : "#login"} className="action-btn desktop-only">
              <User size={20} />
            </a>
            <a href="#wishlist" className="action-btn wishlist-icon">
              <Heart size={20} />
              {wishlist.length > 0 && <span className="badge">{wishlist.length}</span>}
            </a>
            <a href="#cart" className="action-btn cart-icon">
              <ShoppingBag size={20} />
              {getCartBadgeCount() > 0 && <span className="badge">{getCartBadgeCount()}</span>}
            </a>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <div className={`mobile-nav ${mobileMenuOpen ? "open" : ""}`} id="mobile-nav">
          <div className="mobile-nav-header">
            <span className="logo-text">AURELIA</span>
            <button className="close-mobile-nav" onClick={() => setMobileMenuOpen(false)}>
              <X size={20} />
            </button>
          </div>
          <div className="mobile-nav-links">
            <a href="#home" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>Home</a>
            
            <div className="mobile-collapse">
              <button 
                className="mobile-collapse-trigger"
                onClick={() => setMobileCollapseOpen(prev => ({ ...prev, shop: !prev.shop }))}
              >
                Shop Categories <span style={{ float: "right" }}>{mobileCollapseOpen.shop ? "-" : "+"}</span>
              </button>
              {mobileCollapseOpen.shop && (
                <div className="mobile-collapse-content" style={{ display: "flex", flexDirection: "column" }}>
                  <a href="#shop?category=rings" onClick={() => setMobileMenuOpen(false)}>Rings</a>
                  <a href="#shop?category=necklaces" onClick={() => setMobileMenuOpen(false)}>Necklaces</a>
                  <a href="#shop?category=earrings" onClick={() => setMobileMenuOpen(false)}>Earrings</a>
                  <a href="#shop?category=bracelets" onClick={() => setMobileMenuOpen(false)}>Bracelets</a>
                  <a href="#shop?category=bridal" onClick={() => setMobileMenuOpen(false)}>Bridal Sets</a>
                </div>
              )}
            </div>

            <div className="mobile-collapse">
              <button 
                className="mobile-collapse-trigger"
                onClick={() => setMobileCollapseOpen(prev => ({ ...prev, coll: !prev.coll }))}
              >
                Collections <span style={{ float: "right" }}>{mobileCollapseOpen.coll ? "-" : "+"}</span>
              </button>
              {mobileCollapseOpen.coll && (
                <div className="mobile-collapse-content" style={{ display: "flex", flexDirection: "column" }}>
                  <a href="#shop?collection=elysian" onClick={() => setMobileMenuOpen(false)}>Elysian Bridal</a>
                  <a href="#shop?collection=aurora" onClick={() => setMobileMenuOpen(false)}>Aura of Diamonds</a>
                  <a href="#shop?collection=vintage" onClick={() => setMobileMenuOpen(false)}>Vintage Gold</a>
                </div>
              )}
            </div>

            <a href="#about" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>Our Story</a>
            <a href="#blog" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>Blog & Guides</a>
            <a href="#order-tracking" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>Track Order</a>
            <a href={currentUser ? "#dashboard" : "#login"} className="mobile-link" onClick={() => setMobileMenuOpen(false)}>
              {currentUser ? "My Dashboard" : "My Account"}
            </a>
          </div>
        </div>

        {/* Mobile menu overlay */}
        {mobileMenuOpen && (
          <div className="mobile-overlay" style={{ display: "block" }} onClick={() => setMobileMenuOpen(false)}></div>
        )}
      </header>

      {/* Main Page Area */}
      <main id="app-container">
        {loading ? (
          <div className="page-loader" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "10rem 0" }}>
            <div className="skeleton" style={{ width: "50px", height: "50px", borderRadius: "50%", marginBottom: "1rem" }}></div>
            <p style={{ fontFamily: "var(--font-serif)", fontSize: "1.1rem", color: "var(--color-gold)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Entering Aurelia...</p>
          </div>
        ) : (
          getPageRenderer()
        )}
      </main>

      {/* Footer */}
      <footer className="main-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col brand-col">
              <h2 className="footer-logo-text">Aurelia</h2>
              <p>Fine artisanal jewelry, engineered from the highest purity of metals and ethically sourced gemstones. Designed to commemorate life's absolute milestones.</p>
              <div className="footer-socials">
                <a href="#instagram" aria-label="Instagram">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline-block", verticalAlign: "middle" }}>
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
              </div>
            </div>
            <div className="footer-col">
              <h4>The Collections</h4>
              <a href="#shop?collection=elysian">Elysian Bridal</a>
              <a href="#shop?collection=aurora">Aura of Diamonds</a>
              <a href="#shop?collection=vintage">Vintage Gold</a>
            </div>
            <div className="footer-col">
              <h4>Services & Care</h4>
              <a href="#about#craft">Complimentary Resizing</a>
              <a href="#about#craft">Insured Shipping</a>
              <a href="#about#craft">Lifetime Warranty</a>
            </div>
            <div className="footer-col">
              <h4>Legal & Info</h4>
              <a href="#privacy-policy">Privacy Policy</a>
              <a href="#terms-conditions">Terms of Use</a>
              <a href="#shipping-policy">Shipping Policy</a>
              <a href="#return-policy">Returns & Exchange</a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 Aurelia Jewels. All Rights Reserved. Designed for elite celebration.</p>
          </div>
        </div>
      </footer>

      {/* Global Search Overlay */}
      <div className={`search-overlay ${searchOpen ? "open" : ""}`} id="search-overlay">
        <button className="search-close-btn" onClick={() => { setSearchOpen(false); setSearchQuery(""); }} id="search-close">
          <X size={24} />
        </button>
        <div className="search-input-box">
          <input 
            type="text" 
            placeholder="Search Aurelia Vault..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            id="search-input" 
          />
          <p style={{ color: "var(--color-muted)", fontSize: "0.85rem", marginTop: "1rem" }}>Type at least 2 characters to filter collections, rings, necklaces...</p>
        </div>
        <div className="search-results-container container">
          <div className="products-grid" id="search-results-grid">
            {searchQuery.trim().length >= 2 &&
              PRODUCTS.filter(p => 
                p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.category.toLowerCase().includes(searchQuery.toLowerCase())
              ).map(p => (
                <div key={p.id} className="product-card" style={{ border: "none" }}>
                  <div className="product-image-container" style={{ height: "150px" }}>
                    <a href={`#product-details?id=${p.id}`} onClick={() => { setSearchOpen(false); setSearchQuery(""); }}>
                      <img src={p.images[0]} alt={p.name} />
                    </a>
                  </div>
                  <div className="product-info" style={{ textAlign: "center" }}>
                    <h5 style={{ fontSize: "0.95rem" }}>
                      <a href={`#product-details?id=${p.id}`} onClick={() => { setSearchOpen(false); setSearchQuery(""); }}>{p.name}</a>
                    </h5>
                    <p style={{ color: "var(--color-gold)", fontWeight: "600", fontSize: "0.85rem", marginTop: "0.3rem" }}>${p.price.toLocaleString()}</p>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>

      {/* Global Zoom Backdrop Modal */}
      {zoomImgSrc && (
        <div className="zoom-backdrop show" id="zoom-backdrop" onClick={() => setZoomImgSrc(null)}>
          <button className="zoom-close" id="zoom-close"><X size={24} /></button>
          <img src={zoomImgSrc} alt="Zoomed Details" id="zoom-img" onClick={(e) => e.stopPropagation()} />
        </div>
      )}

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal 
          product={quickViewProduct} 
          onClose={() => setQuickViewProduct(null)} 
          onAddToCart={handleAddToCart}
        />
      )}

      {/* Dynamic Toasts Container */}
      <div className="toast-container" id="toast-container">
        {toasts.map(t => (
          <div key={t.id} className="toast show">
            {t.type === "success" && <Check size={18} style={{ color: "var(--color-gold)" }} />}
            {t.type === "error" && <AlertCircle size={18} style={{ color: "var(--color-rose-gold)" }} />}
            {t.type === "info" && <Info size={18} />}
            <span>{t.message}</span>
          </div>
        ))}
      </div>
    </>
  );
}

// ==========================================================================
// SUB-VIEWS RENDERING IMPLEMENTATIONS
// ==========================================================================

function HomeView({ wishlist, onToggleWishlist, onQuickView, onAddToCart, triggerToast }) {
  return (
    <>
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="container">
          <div className="hero-content">
            <span>Fine Artisanal Jewelry</span>
            <h1>Elegance In Every Carat</h1>
            <p>Hand-crafted creations engineered from the highest purity of gold, platinum, and diamonds. Curated bespoke designs commemorating life's absolute milestones.</p>
            <div className="hero-actions">
              <a href="#shop" className="btn btn-primary">Shop The Vault</a>
              <a href="#collections" className="btn btn-outline">Explore Collections</a>
            </div>
          </div>
        </div>
      </section>

      <section className="collections-section">
        <div className="container">
          <h2 className="section-title">Signature Collections</h2>
          <p className="section-subtitle">Exquisite design lineages handcrafted to perfection</p>
          <div className="collections-grid">
            <div className="collection-card">
              <img src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=600" alt="Elysian Bridal" />
              <div className="collection-card-overlay">
                <h3>Elysian Bridal</h3>
                <p>Solitaires, Bands & Halos</p>
                <a href="#shop?collection=elysian" className="btn btn-outline">Discover</a>
              </div>
            </div>
            <div className="collection-card">
              <img src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=600" alt="Aura of Diamonds" />
              <div className="collection-card-overlay">
                <h3>Aura of Diamonds</h3>
                <p>Fine cut brilliant diamonds</p>
                <a href="#shop?collection=aurora" className="btn btn-outline">Discover</a>
              </div>
            </div>
            <div className="collection-card">
              <img src="https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&q=80&w=600" alt="Vintage Gold" />
              <div className="collection-card-overlay">
                <h3>Vintage Gold</h3>
                <p>Heirloom heavy carvings</p>
                <a href="#shop?collection=vintage" className="btn btn-outline">Discover</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="products-section">
        <div className="container">
          <h2 className="section-title">Best Sellers</h2>
          <p className="section-subtitle">Aurelia's most coveted creations</p>
          <div className="products-grid">
            {PRODUCTS.slice(0, 4).map(p => (
              <ProductCard 
                key={p.id}
                product={p}
                isWishlisted={wishlist.includes(p.id)}
                onToggleWishlist={onToggleWishlist}
                onQuickView={onQuickView}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "4rem" }}>
            <a href="#shop" className="btn btn-outline">View Entire Catalog</a>
          </div>
        </div>
      </section>

      <section className="editorial-banner-section">
        <div className="container">
          <div className="editorial-grid">
            <div className="editorial-img">
              <img src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&q=80&w=800" alt="Ethically Sourced Craft" />
            </div>
            <div className="editorial-content">
              <span className="editorial-tag">The Aurelia Heritage</span>
              <h2>Ethical Luxury, Unmatched Craft</h2>
              <p>Every gem mounted by Aurelia Jewels is ethically sourced in accordance with the Kimberley Process. Our master artisans hand-set each setting under microscope, assuring a generation of structural integrity and brilliant fire.</p>
              <a href="#about" className="btn btn-primary">Our Story</a>
            </div>
          </div>
        </div>
      </section>

      <section className="products-section" style={{ backgroundColor: "var(--color-bg-primary)" }}>
        <div className="container">
          <h2 className="section-title">New Arrivals</h2>
          <p className="section-subtitle">Modern silhouettes fresh from our atelier</p>
          <div className="products-grid">
            {PRODUCTS.slice(4, 8).map(p => (
              <ProductCard 
                key={p.id}
                product={p}
                isWishlisted={wishlist.includes(p.id)}
                onToggleWishlist={onToggleWishlist}
                onQuickView={onQuickView}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="reviews-section">
        <div className="container">
          <h2 className="section-title">The Aurelia Experience</h2>
          <p className="section-subtitle">Stories of love and celebration</p>
          <div className="reviews-slider">
            <div className="review-slide">
              <div className="review-stars" style={{ color: "var(--color-gold)", marginBottom: "1rem" }}>
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" style={{ display: "inline-block" }} />)}
              </div>
              <p className="review-text">"The craft and shine of the diamond is unbelievable. From the selection process to the custom engraving, Aurelia treated us like royalty. I couldn't be happier with my solitaire."</p>
              <p className="review-author">Genevieve Sinclair <span>- Los Angeles</span></p>
            </div>
          </div>
        </div>
      </section>

      <section className="instagram-section">
        <div className="container">
          <h2 className="section-title">Captured by Aurelia</h2>
          <p className="section-subtitle">Tag #AureliaJewels on Instagram to be featured</p>
        </div>
        <div className="instagram-grid">
          <div className="instagram-item">
            <img src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=400" alt="Instagram 1" />
            <div className="instagram-overlay">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline-block" }}>
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </div>
          </div>
          <div className="instagram-item">
            <img src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=400" alt="Instagram 2" />
            <div className="instagram-overlay">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline-block" }}>
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </div>
          </div>
          <div className="instagram-item">
            <img src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=400" alt="Instagram 3" />
            <div className="instagram-overlay">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline-block" }}>
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </div>
          </div>
          <div className="instagram-item">
            <img src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=400" alt="Instagram 4" />
            <div className="instagram-overlay">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline-block" }}>
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </div>
          </div>
          <div className="instagram-item">
            <img src="https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&q=80&w=400" alt="Instagram 5" />
            <div className="instagram-overlay">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline-block" }}>
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </div>
          </div>
          <div className="instagram-item">
            <img src="https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&q=80&w=400" alt="Instagram 6" />
            <div className="instagram-overlay">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline-block" }}>
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </div>
          </div>
        </div>
      </section>

      <section className="newsletter-section">
        <div className="newsletter-box">
          <h2>Join The Aurelia Circle</h2>
          <p>Subscribe to receive priority notifications of private vault sales, luxury releases, and exclusive design previews.</p>
          <form 
            className="newsletter-form" 
            onSubmit={(e) => {
              e.preventDefault();
              triggerToast("Thank you for joining the Aurelia Circle!", "success");
              e.target.reset();
            }}
          >
            <input type="email" placeholder="Your Email Address" required />
            <button type="submit" className="newsletter-btn">Subscribe</button>
          </form>
        </div>
      </section>
    </>
  );
}

function AboutView() {
  return (
    <>
      <div className="about-hero" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=1200')" }}>
        <h1>Our Heritage</h1>
      </div>
      <div className="container">
        <div className="about-grid" style={{ margin: "6rem 0" }}>
          <div className="about-image">
            <img src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&q=80&w=700" alt="Artisans" />
          </div>
          <div className="about-text">
            <h2>Meticulous Craftsmanship Since 1992</h2>
            <p>Founded by master goldsmith Aurelius Thorne, Aurelia Jewels was born out of a desire to merge classical Italian Renaissance jewelry designs with contemporary cutting-edge metallurgical engineering.</p>
            <p>From our private workshops in Milan and Southern California, our small team of artisans sculpts, polishes, and encrusts every item by hand. We create fine art pieces that double as wearable heirlooms, capturing stories of love and triumph.</p>
            <p>We are firmly committed to preserving traditional methods of heavy carving, micro-pavé, and metal etching, ensuring that each generation of Aurelia creation maintains its timeless magnificence.</p>
          </div>
        </div>
      </div>

      <div className="craft-highlight" id="craft">
        <div className="container">
          <div className="craft-grid">
            <div className="craft-card">
              <Gem size={32} style={{ color: "var(--color-gold)", marginBottom: "1rem" }} />
              <h3>Ethically Sourced Diamonds</h3>
              <p>We partner with certified diamond suppliers that adhere to strict Kimberley Process guidelines, promoting conflict-free environments.</p>
            </div>
            <div className="craft-card">
              <Crown size={32} style={{ color: "var(--color-gold)", marginBottom: "1rem" }} />
              <h3>Superior Metal Quality</h3>
              <p>Our gold is refined to 18K and 22K purities, and our platinum remains 950 pure, establishing maximum brilliance and scratch resistance.</p>
            </div>
            <div className="craft-card">
              <Sparkles size={32} style={{ color: "var(--color-gold)", marginBottom: "1rem" }} />
              <h3>Lifetime Warranty & Care</h3>
              <p>Every piece includes a certified lifetime structural guarantee, including complimentary annual cleaning and resizing.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function ShopView({ params, wishlist, onToggleWishlist, onQuickView, onAddToCart }) {
  let filtered = [...PRODUCTS];

  if (params.category) {
    filtered = filtered.filter(p => p.category.toLowerCase() === params.category.toLowerCase());
  }
  if (params.metal) {
    filtered = filtered.filter(p => p.metal.toLowerCase() === params.metal.toLowerCase());
  }
  if (params.gem) {
    filtered = filtered.filter(p => p.stone.toLowerCase() === params.gem.toLowerCase());
  }
  if (params.tag) {
    if (params.tag === "new-arrivals") {
      filtered = filtered.filter(p => p.badge === "New Arrival" || p.badge === "Limited Edition");
    } else if (params.tag === "best-sellers") {
      filtered = filtered.filter(p => p.badge === "Best Seller");
    }
  }
  if (params.collection) {
    if (params.collection === "elysian") {
      filtered = filtered.filter(p => p.category === "bridal" || p.id === 1);
    } else if (params.collection === "aurora") {
      filtered = filtered.filter(p => p.stone === "diamond");
    } else if (params.collection === "vintage") {
      filtered = filtered.filter(p => p.metal === "gold");
    }
  }

  const sortBy = params.sort || "featured";
  if (sortBy === "price-low") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-high") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortBy === "rating") {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  const handleSortChange = (e) => {
    const val = e.target.value;
    const cleanParams = { ...params, sort: val };
    const queryStr = Object.keys(cleanParams)
      .map(k => `${k}=${cleanParams[k]}`)
      .join("&");
    window.location.hash = `#shop?${queryStr}`;
  };

  const categoryTitle = params.category 
    ? `${params.category.charAt(0).toUpperCase() + params.category.slice(1)} Collections` 
    : "Aurelia Shop Catalog";

  return (
    <div className="container" style={{ padding: "4rem 0" }}>
      <h1 style={{ fontSize: "3rem", marginBottom: "0.5rem", textAlign: "center" }}>{categoryTitle}</h1>
      <p style={{ textAlign: "center", color: "var(--color-muted)", marginBottom: "3rem" }}>Indulge in our exquisite portfolio of handcrafted fine jewelry.</p>
      
      <div className="shop-layout">
        <aside className="shop-sidebar">
          <div className="filter-section">
            <h3 className="filter-title">By Category</h3>
            <div className="filter-list">
              <a href="#shop" className={!params.category ? "active" : ""}>All Categories</a>
              <a href="#shop?category=rings" className={params.category === "rings" ? "active" : ""}>Rings</a>
              <a href="#shop?category=necklaces" className={params.category === "necklaces" ? "active" : ""}>Necklaces & Pendants</a>
              <a href="#shop?category=earrings" className={params.category === "earrings" ? "active" : ""}>Earrings</a>
              <a href="#shop?category=bracelets" className={params.category === "bracelets" ? "active" : ""}>Bracelets</a>
              <a href="#shop?category=bridal" className={params.category === "bridal" ? "active" : ""}>Bridal Sets</a>
            </div>
          </div>
          <div className="filter-section">
            <h3 className="filter-title">By Metal</h3>
            <div className="filter-list">
              <a href="#shop?metal=gold" className={params.metal === "gold" ? "active" : ""}>Yellow Gold</a>
              <a href="#shop?metal=rosegold" className={params.metal === "rosegold" ? "active" : ""}>Rose Gold</a>
              <a href="#shop?metal=platinum" className={params.metal === "platinum" ? "active" : ""}>Platinum</a>
              <a href="#shop?metal=silver" className={params.metal === "silver" ? "active" : ""}>Fine Silver</a>
            </div>
          </div>
          <div className="filter-section">
            <h3 className="filter-title">By Gemstone</h3>
            <div className="filter-list">
              <a href="#shop?gem=diamond" className={params.gem === "diamond" ? "active" : ""}>Diamonds</a>
              <a href="#shop?gem=emerald" className={params.gem === "emerald" ? "active" : ""}>Emeralds</a>
              <a href="#shop?gem=sapphire" className={params.gem === "sapphire" ? "active" : ""}>Sapphires</a>
              <a href="#shop?gem=pearl" className={params.gem === "pearl" ? "active" : ""}>Pearls</a>
            </div>
          </div>
        </aside>

        <main className="shop-main">
          <div className="shop-content-header">
            <div className="items-count">{filtered.length} Exquisite Items found</div>
            <div className="sorting-wrapper">
              <label htmlFor="shop-sort">Sort By:</label>
              <select id="shop-sort" value={sortBy} onChange={handleSortChange}>
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="empty-state">
              <h2>No items found</h2>
              <p>We couldn't find any products matching those parameters. Please try broadening your selection.</p>
              <a href="#shop" className="btn btn-primary">View All Products</a>
            </div>
          ) : (
            <div className="products-grid">
              {filtered.map(p => (
                <ProductCard 
                  key={p.id}
                  product={p}
                  isWishlisted={wishlist.includes(p.id)}
                  onToggleWishlist={onToggleWishlist}
                  onQuickView={onQuickView}
                  onAddToCart={onAddToCart}
                />
              ))}
            </div>
          )}

          <div className="pagination">
            <button className="pagination-btn" disabled><ChevronLeft size={16} /></button>
            <button className="pagination-btn active">1</button>
            <button className="pagination-btn">2</button>
            <button className="pagination-btn"><ChevronRight size={16} /></button>
          </div>
        </main>
      </div>
    </div>
  );
}

function CollectionsView() {
  return (
    <div className="container" style={{ padding: "4rem 0" }}>
      <h1 style={{ fontSize: "3.5rem", textAlign: "center", marginBottom: "0.5rem" }}>The Signature Collections</h1>
      <p style={{ textAlign: "center", color: "var(--color-muted)", marginBottom: "4rem" }}>Explore design lineages inspired by eras of artistic triumph.</p>
      
      <div style={{ display: "flex", flexDirection: "column", gap: "6rem" }}>
        <div className="editorial-grid">
          <div className="editorial-img">
            <img src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=800" alt="Elysian" />
          </div>
          <div className="editorial-content">
            <span className="editorial-tag">The Bridal Line</span>
            <h2>Elysian Bridal</h2>
            <p>Every piece in our Elysian Suite features flawlessly matched stones set in durable 950 Platinum. Inspired by classical Greco-Roman symmetry, these designs commemorate timeless commitment with stunning arrays of light.</p>
            <a href="#shop?collection=elysian" className="btn btn-primary">Discover the Suite</a>
          </div>
        </div>

        <div className="editorial-grid" style={{ direction: "rtl" }}>
          <div className="editorial-img" style={{ direction: "ltr" }}>
            <img src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800" alt="Aurora" />
          </div>
          <div className="editorial-content" style={{ direction: "ltr", textAlign: "left" }}>
            <span className="editorial-tag">Signature Cut</span>
            <h2>Aura of Diamonds</h2>
            <p>The definitive showcase of diamond fire. Centering around diamonds with exceptional D-F color grades and clarity. Crafted carefully to capture ambient luminescence and reflect dazzling brilliance.</p>
            <a href="#shop?collection=aurora" className="btn btn-primary">Discover the Gems</a>
          </div>
        </div>

        <div className="editorial-grid">
          <div className="editorial-img">
            <img src="https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&q=80&w=800" alt="Vintage" />
          </div>
          <div className="editorial-content">
            <span className="editorial-tag">Artisanal Etchings</span>
            <h2>Vintage Gold</h2>
            <p>Heavy, hand-etched carvings crafted in rich 18K and 22K yellow gold. Each pendant, ring, and chain recalls historic goldsmithing heritage. Perfect for those who cherish heritage depth and bold structures.</p>
            <a href="#shop?collection=vintage" className="btn btn-primary">Discover the Heritage</a>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductDetailsView({ params, wishlist, recentlyViewed, onToggleWishlist, onAddToCart, onAddRecently, onZoom, triggerToast }) {
  const pId = parseInt(params.id);
  const product = PRODUCTS.find(p => p.id === pId);
  const [activeImg, setActiveImg] = useState("");
  const [selectedMetal, setSelectedMetal] = useState("gold");
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (product) {
      setActiveImg(product.images[0]);
      onAddRecently(product.id);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="container text-center" style={{ padding: "6rem 0" }}>
        <h2>Product not found</h2>
        <a href="#shop" className="btn btn-primary">Back to Catalog</a>
      </div>
    );
  }

  const isWish = wishlist.includes(product.id);
  const related = PRODUCTS.filter(p => p.id !== product.id).slice(0, 4);

  return (
    <div className="container product-details-container">
      <div className="product-details-grid">
        
        {/* Left: Image Gallery & 360 viewer */}
        <div className="product-gallery">
          <div className="product-gallery-main" id="main-gallery-view" onClick={() => onZoom(activeImg)}>
            <img src={activeImg} alt={product.name} id="details-main-img" />
          </div>
          <div className="gallery-thumbnails">
            {product.images.map((img, i) => (
              <div 
                key={i}
                className={`thumbnail-item ${activeImg === img ? "active" : ""}`}
                onClick={() => setActiveImg(img)}
              >
                <img src={img} alt={`Thumbnail ${i + 1}`} />
              </div>
            ))}
          </div>
          
          {/* Interactive 360 Viewer */}
          <Viewer360 images={product.images} />
        </div>

        {/* Right: Purchase options */}
        <div className="details-info">
          <div className="details-breadcrumb">
            <a href="#shop">Shop</a> / <a href={`#shop?category=${product.category}`}>{product.category}</a> / {product.name}
          </div>
          <h1 className="details-title">{product.name}</h1>
          
          <div className="details-rating">
            <div style={{ color: "var(--color-gold)", display: "flex", gap: "0.2rem" }}>
              {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
            </div>
            <span>{product.rating} ({product.reviewsCount} verified reviews)</span>
          </div>

          <div className="details-price">
            ${product.price.toLocaleString()}
            {product.originalPrice > 0 && (
              <span className="discount-tag">Save ${(product.originalPrice - product.price).toLocaleString()}</span>
            )}
          </div>

          <p className="details-description">{product.description}</p>

          <div className="details-options">
            <h4 className="option-group-title">Select Metal Base</h4>
            <div className="metal-selector">
              {["gold", "rosegold", "platinum"].map(m => (
                <span 
                  key={m}
                  className={`metal-option ${selectedMetal === m ? "active" : ""}`}
                  onClick={() => setSelectedMetal(m)}
                >
                  {m === "gold" ? "Yellow Gold" : m === "rosegold" ? "Rose Gold" : "Platinum"}
                </span>
              ))}
            </div>
          </div>

          <div className="purchase-controls">
            <div className="quantity-selector">
              <button className="qty-btn" onClick={() => qty > 1 && setQty(qty - 1)}>-</button>
              <input type="text" value={qty} readOnly className="qty-input" />
              <button className="qty-btn" onClick={() => setQty(qty + 1)}>+</button>
            </div>
            <button className="btn btn-primary" onClick={() => onAddToCart(product.id, qty, selectedMetal)}>Add to Bag</button>
            <button 
              className="btn btn-outline"
              onClick={() => {
                onAddToCart(product.id, qty, selectedMetal);
                window.location.hash = "#cart";
              }}
            >
              Buy Now
            </button>
          </div>

          <div className="details-share-wishlist">
            <button 
              className={`details-action-link wishlist-toggle-btn ${isWish ? "active" : ""}`}
              onClick={() => onToggleWishlist(product.id)}
            >
              <Heart size={16} fill={isWish ? "currentColor" : "none"} />
              <span>Save to Wishlist</span>
            </button>
            <button 
              className="details-action-link"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                triggerToast("Share link copied to clipboard!", "info");
              }}
            >
              <span>Share Details</span>
            </button>
          </div>

          <div style={{ borderTop: "1px solid var(--color-border)", paddingTop: "1.5rem" }}>
            <p style={{ fontSize: "0.85rem", color: "var(--color-muted)", display: "flex", gap: "0.5rem", alignItems: "center" }}>
              <ShieldCheck size={18} style={{ color: "var(--color-gold)" }} />
              <span>Complimentary insured shipping, signature vault packaging & certificates of purity included.</span>
            </p>
          </div>
        </div>

      </div>

      {/* Technical Specifications */}
      <section className="specs-section">
        <h2 className="specs-title">Technical Specifications</h2>
        <table className="specs-table">
          <tbody>
            <tr>
              <td className="spec-name">Metal Purity</td>
              <td className="spec-val">{product.purity}</td>
            </tr>
            <tr>
              <td className="spec-name">Average Metal Weight</td>
              <td className="spec-val">{product.weight}</td>
            </tr>
            {Object.keys(product.specifications).map(k => (
              <tr key={k}>
                <td className="spec-name">{k}</td>
                <td className="spec-val">{product.specifications[k]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Customer Reviews */}
      <section style={{ marginBottom: "6rem" }}>
        <div className="reviews-heading-flex">
          <h2>Client Reviews ({product.reviews.length})</h2>
          <div style={{ color: "var(--color-gold)", fontSize: "1.1rem" }}>Rating Average: {product.rating}/5.0</div>
        </div>
        
        <div className="reviews-tab-grid">
          <div className="reviews-listing">
            {product.reviews.map((r, idx) => (
              <div key={idx} className="review-item">
                <div className="review-item-header">
                  <span className="review-item-name">{r.name}</span>
                  <span className="review-item-date">{r.date}</span>
                </div>
                <div className="review-stars" style={{ marginBottom: "0.6rem", color: "var(--color-gold)" }}>
                  {[...Array(r.rating)].map((_, i) => <Star key={i} size={12} fill="currentColor" style={{ display: "inline-block" }} />)}
                </div>
                <p className="review-item-content">"{r.content}"</p>
              </div>
            ))}
          </div>

          <div className="review-form-box">
            <h4>Share Your Aurelia Experience</h4>
            <p style={{ color: "var(--color-muted)", fontSize: "0.85rem", marginBottom: "1.5rem" }}>Your feedback helps us continuously perfect our processes.</p>
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                triggerToast("Your review has been submitted for approval!", "success");
                e.target.reset();
              }}
            >
              <input type="text" placeholder="Your Name" required className="review-form-input" />
              <input type="email" placeholder="Your Email (Private)" required className="review-form-input" />
              
              <label style={{ fontSize: "0.85rem", fontWeight: "600", display: "block", marginBottom: "0.5rem", textTransform: "uppercase" }}>Overall Rating</label>
              <div className="rating-select" style={{ color: "var(--color-gold)" }}>
                {[...Array(5)].map((_, i) => <span key={i}>&#9733;</span>)}
              </div>
              <textarea placeholder="Your review comments..." required className="review-form-input" style={{ height: "120px" }}></textarea>
              <button type="submit" className="btn btn-primary">Submit Review</button>
            </form>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section>
        <h2 className="related-products-title">Compositions You May Adore</h2>
        <div className="products-grid">
          {related.map(p => (
            <ProductCard 
              key={p.id}
              product={p}
              isWishlisted={wishlist.includes(p.id)}
              onToggleWishlist={onToggleWishlist}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

function WishlistView({ wishlist, onToggleWishlist, onAddToCart }) {
  const wishItems = PRODUCTS.filter(p => wishlist.includes(p.id));

  return (
    <div className="container" style={{ padding: "4rem 0" }}>
      <h1 style={{ fontSize: "3rem", textAlign: "center", marginBottom: "0.5rem" }}>Your Wishlist</h1>
      <p style={{ textAlign: "center", color: "var(--color-muted)", marginBottom: "4rem" }}>Exquisite selections saved for your upcoming celebrations.</p>
      
      {wishItems.length === 0 ? (
        <div className="empty-state">
          <h2>Your Wishlist is Empty</h2>
          <p>Save pieces you love to keep track of them here.</p>
          <a href="#shop" className="btn btn-primary">Start Browsing</a>
        </div>
      ) : (
        <div className="products-grid">
          {wishItems.map(p => (
            <div className="product-card" key={p.id}>
              <div className="product-image-container">
                <a href={`#product-details?id=${p.id}`}>
                  <img src={p.images[0]} alt={p.name} />
                </a>
                <button 
                  className="product-wishlist-toggle active wishlist-toggle-btn"
                  onClick={() => onToggleWishlist(p.id)}
                >
                  <Heart fill="currentColor" />
                </button>
              </div>
              <div className="product-info">
                <div className="product-category">{p.purity}</div>
                <h3 className="product-title">
                  <a href={`#product-details?id=${p.id}`}>{p.name}</a>
                </h3>
                <div className="product-price-flex">
                  <span className="product-price">${p.price.toLocaleString()}</span>
                </div>
                <div style={{ marginTop: "1.5rem", display: "flex", gap: "0.5rem" }}>
                  <button 
                    className="btn btn-outline wish-add-cart-btn" 
                    onClick={() => onAddToCart(p.id, 1, "gold")}
                    style={{ padding: "0.6rem 1.2rem", flex: 1, fontSize: "0.75rem" }}
                  >
                    Add to Bag
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function CartView({ cart, subtotal, onUpdateQty, onRemove, triggerToast }) {
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === "AURELIA10") {
      setDiscount(subtotal * 0.1);
      triggerToast("Promotional discount AURELIA10 (10%) applied!", "success");
    } else {
      triggerToast("Invalid promotional code.", "error");
    }
  };

  const tax = subtotal * 0.0825;
  const delivery = subtotal > 500 ? 0 : 35;
  const finalTotal = subtotal - discount + tax + delivery;

  if (cart.length === 0) {
    return (
      <div className="container" style={{ padding: "6rem 0" }}>
        <div className="empty-state">
          <h2>Your Shopping Bag is Empty</h2>
          <p>Indulge yourself with a crafted jewelry selection.</p>
          <a href="#shop" className="btn btn-primary">Browse Collections</a>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: "4rem 0" }}>
      <h1 style={{ fontSize: "3rem", textAlign: "center", marginBottom: "0.5rem" }}>Your Shopping Bag</h1>
      <p style={{ textAlign: "center", color: "var(--color-muted)", marginBottom: "4rem" }}>Review and verify your selections before secure luxury check out.</p>

      <div className="cart-layout">
        <div className="cart-items-panel">
          <div className="cart-table-wrapper">
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Composition</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, idx) => (
                  <tr key={idx}>
                    <td>
                      <div className="cart-product-flex">
                        <img src={item.product.images[0]} alt={item.product.name} className="cart-product-img" />
                        <div className="cart-product-info">
                          <h4>{item.product.name}</h4>
                          <p className="cart-product-meta">Metal: <span style={{ textTransform: "uppercase" }}>{item.metal}</span> | Purity: {item.product.purity}</p>
                          <p className="cart-product-meta" style={{ fontWeight: "600", marginTop: "0.3rem" }}>${item.product.price.toLocaleString()}</p>
                          <button className="cart-remove-btn" onClick={() => onRemove(item.product.id, item.metal)}>
                            <Trash2 size={12} /> Remove
                          </button>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="quantity-selector" style={{ width: "fit-content" }}>
                        <button className="qty-btn" onClick={() => onUpdateQty(item.product.id, item.metal, -1)}>-</button>
                        <input type="text" value={item.quantity} readOnly className="qty-input" style={{ width: "40px" }} />
                        <button className="qty-btn" onClick={() => onUpdateQty(item.product.id, item.metal, 1)}>+</button>
                      </div>
                    </td>
                    <td>
                      <span className="cart-subtotal">${(item.product.price * item.quantity).toLocaleString()}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <aside className="cart-summary-card">
          <h3 className="summary-title">Order Summary</h3>
          
          <div className="summary-row">
            <span>Bag Subtotal</span>
            <span>${subtotal.toLocaleString()}</span>
          </div>

          {discount > 0 && (
            <div className="summary-row" style={{ color: "var(--color-gold)" }}>
              <span>AURELIA10 Discount</span>
              <span>-${Math.round(discount).toLocaleString()}</span>
            </div>
          )}

          <div className="summary-row">
            <span>Signature Pack & Insured Delivery</span>
            <span>{delivery === 0 ? "Complimentary" : `$${delivery}`}</span>
          </div>

          <div className="summary-row">
            <span>Estimated VAT (8.25%)</span>
            <span>${Math.round(tax).toLocaleString()}</span>
          </div>

          <div className="coupon-section">
            <input 
              type="text" 
              placeholder="Promotional Code" 
              className="coupon-input" 
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
            />
            <button className="coupon-btn" onClick={handleApplyPromo}>Apply</button>
          </div>

          <div className="summary-row total-row">
            <span>Grand Total</span>
            <span>${Math.round(finalTotal).toLocaleString()}</span>
          </div>

          <a href="#checkout" className="btn btn-primary" style={{ marginTop: "1.5rem" }}>Proceed to Checkout</a>
        </aside>
      </div>
    </div>
  );
}

function CheckoutView({ cart, subtotal, currentUser, onPlaceOrder }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState(currentUser ? currentUser.address : "");
  const [city, setCity] = useState("Los Angeles");
  const [postal, setPostal] = useState("90001");
  const [payment, setPayment] = useState("card");

  const handleSubmit = (e) => {
    e.preventDefault();
    const addressDetails = `${address}, ${city}, CA ${postal}`;
    onPlaceOrder(addressDetails, payment);
  };

  return (
    <div className="container" style={{ padding: "4rem 0" }}>
      <h1 style={{ fontSize: "3rem", textAlign: "center", marginBottom: "3rem" }}>Luxury Checkout</h1>
      
      <form onSubmit={handleSubmit} className="checkout-grid-layout" style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "4rem" }}>
        <div className="checkout-form-panel">
          <h3 className="specs-title" style={{ fontSize: "1.4rem" }}>Insured Shipping Destination</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
            <input type="text" placeholder="First Name" required className="review-form-input" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            <input type="text" placeholder="Last Name" required className="review-form-input" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </div>
          <input type="text" placeholder="Street Address" required className="review-form-input" value={address} onChange={(e) => setAddress(e.target.value)} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "2rem" }}>
            <input type="text" placeholder="City" required className="review-form-input" value={city} onChange={(e) => setCity(e.target.value)} />
            <input type="text" placeholder="Postal Code" required className="review-form-input" value={postal} onChange={(e) => setPostal(e.target.value)} />
          </div>

          <h3 className="specs-title" style={{ fontSize: "1.4rem", marginTop: "2rem" }}>Vault Billing & Payment</h3>
          <div className="payment-options" style={{ display: "flex", gap: "2rem", marginBottom: "2rem" }}>
            <label className="checkbox-label" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <input type="radio" name="paymethod" checked={payment === "card"} onChange={() => setPayment("card")} /> Credit/Debit Card
            </label>
            <label className="checkbox-label" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <input type="radio" name="paymethod" checked={payment === "wire"} onChange={() => setPayment("wire")} /> Bank Wire Transfer (1% off)
            </label>
          </div>
        </div>

        <aside className="checkout-summary-panel" style={{ border: "1px solid var(--color-border)", padding: "2rem", backgroundColor: "var(--color-bg-white)" }}>
          <h3 className="summary-title">Vault Review</h3>
          {cart.map((item, idx) => (
            <div key={idx} className="summary-row" style={{ padding: "0.5rem 0", fontSize: "0.9rem" }}>
              <span>{item.product.name} (x{item.quantity})</span>
              <span>${(item.product.price * item.quantity).toLocaleString()}</span>
            </div>
          ))}
          <div className="summary-row total-row" style={{ borderTop: "1px solid var(--color-border)", marginTop: "1rem", paddingTop: "1rem" }}>
            <span>Order Total</span>
            <span>${(subtotal + 35).toLocaleString()}</span>
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: "2rem" }}>Authorize Insured Order</button>
        </aside>
      </form>
    </div>
  );
}

function DashboardView({ currentUser, orders, onLogout, triggerToast }) {
  if (!currentUser) return null;

  return (
    <div className="container" style={{ padding: "4rem 0" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "3rem" }}>
        <h1>Welcome, {currentUser.name}</h1>
        <button className="btn btn-outline" onClick={onLogout}>Logout</button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem" }}>
        <div>
          <h3>Account Information</h3>
          <p><strong>Name:</strong> {currentUser.name}</p>
          <p><strong>Email:</strong> {currentUser.email}</p>
          <p><strong>Address:</strong> {currentUser.address}</p>
        </div>
        <div>
          <h3>Order History</h3>
          {orders.map((o, idx) => (
            <div key={idx} style={{ border: "1px solid var(--color-border)", padding: "1.5rem", marginBottom: "1rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <strong>Order ID: {o.id}</strong>
                <span className="discount-tag" style={{ textTransform: "uppercase" }}>{o.status}</span>
              </div>
              <p>{o.date} | Total: ${o.total.toLocaleString()}</p>
              <p style={{ fontSize: "0.85rem", color: "var(--color-muted)" }}>{o.items.join(", ")}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LoginView({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email);
  };

  return (
    <div className="container" style={{ padding: "6rem 0", maxWidth: "400px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>Sign In to Aurelia</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email Address" required className="review-form-input" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" required className="review-form-input" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: "1rem" }}>Sign In</button>
      </form>
    </div>
  );
}

function RegisterView({ onRegister }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(name, email);
  };

  return (
    <div className="container" style={{ padding: "6rem 0", maxWidth: "400px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>Create Account</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Full Name" required className="review-form-input" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder="Email Address" required className="review-form-input" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" required className="review-form-input" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: "1rem" }}>Create Account</button>
      </form>
    </div>
  );
}

function ForgotPasswordView({ triggerToast }) {
  return (
    <div className="container" style={{ padding: "6rem 0", maxWidth: "400px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>Reset Password</h2>
      <form onSubmit={(e) => { e.preventDefault(); triggerToast("Password reset link sent to your email.", "info"); }}>
        <input type="email" placeholder="Email Address" required className="review-form-input" />
        <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: "1rem" }}>Send Reset Link</button>
      </form>
    </div>
  );
}

function ContactView({ triggerToast }) {
  return (
    <div className="container" style={{ padding: "6rem 0", maxWidth: "600px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>Contact the Vault</h2>
      <form onSubmit={(e) => { e.preventDefault(); triggerToast("Message securely routed to concierge staff.", "success"); e.target.reset(); }}>
        <input type="text" placeholder="Name" required className="review-form-input" />
        <input type="email" placeholder="Email Address" required className="review-form-input" />
        <textarea placeholder="Your Message..." required className="review-form-input" style={{ height: "150px" }}></textarea>
        <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>Send Message</button>
      </form>
    </div>
  );
}

function BlogView() {
  return (
    <div className="container" style={{ padding: "4rem 0" }}>
      <h1 style={{ fontSize: "3rem", textAlign: "center", marginBottom: "3rem" }}>Aurelia Editorial Journal</h1>
      <div className="products-grid">
        {BLOG_POSTS.map(p => (
          <div key={p.id} className="product-card">
            <div className="product-image-container" style={{ height: "250px" }}>
              <a href={`#article?id=${p.id}`}>
                <img src={p.image} alt={p.title} />
              </a>
            </div>
            <div className="product-info">
              <span className="product-category">{p.category} | {p.date}</span>
              <h3 className="product-title" style={{ fontSize: "1.3rem", marginTop: "0.5rem" }}>
                <a href={`#article?id=${p.id}`}>{p.title}</a>
              </h3>
              <p style={{ color: "var(--color-muted)", fontSize: "0.85rem", margin: "1rem 0" }}>{p.excerpt}</p>
              <a href={`#article?id=${p.id}`} className="text-link">Read Journal Entry &rarr;</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ArticleView({ params }) {
  const artId = parseInt(params.id);
  const post = BLOG_POSTS.find(b => b.id === artId);

  if (!post) return <div className="container">Post not found</div>;

  return (
    <div className="container" style={{ padding: "6rem 0", maxWidth: "800px" }}>
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <span className="product-category">{post.category} | {post.date}</span>
        <h1 style={{ fontSize: "3.2rem", margin: "1rem 0" }}>{post.title}</h1>
        <p>Written by <strong>{post.author}</strong></p>
      </div>
      <img src={post.image} alt={post.title} style={{ width: "100%", height: "450px", objectFit: "cover", marginBottom: "3rem" }} />
      <div className="details-description" dangerouslySetInnerHTML={{ __html: post.body }} style={{ fontSize: "1.1rem", lineHeight: "1.8", color: "var(--color-black)" }} />
      <div style={{ marginTop: "4rem", textAlign: "center" }}>
        <a href="#blog" className="btn btn-outline">Back to Editorial Journal</a>
      </div>
    </div>
  );
}

function FAQView() {
  return (
    <div className="container" style={{ padding: "6rem 0", maxWidth: "800px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "4rem" }}>Concierge Frequently Asked Questions</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        <div style={{ borderBottom: "1px solid var(--color-border)", paddingBottom: "1.5rem" }}>
          <h4>Do you offer custom designs?</h4>
          <p style={{ color: "var(--color-muted)", marginTop: "0.5rem" }}>Yes, Aurelia Concierge routes private commissions to our workshops in Milan and Southern California. Contact us to schedule a virtual design interview.</p>
        </div>
        <div style={{ borderBottom: "1px solid var(--color-border)", paddingBottom: "1.5rem" }}>
          <h4>Are your diamonds certified?</h4>
          <p style={{ color: "var(--color-muted)", marginTop: "0.5rem" }}>All diamonds above 0.50 carats mount with independent GIA or IGL grading certificates verifying color, clarity, cut, and weight parameters.</p>
        </div>
        <div style={{ borderBottom: "1px solid var(--color-border)", paddingBottom: "1.5rem" }}>
          <h4>What shipping carrier do you use?</h4>
          <p style={{ color: "var(--color-muted)", marginTop: "0.5rem" }}>All packages route via armored priority carrier under complete insurance value coverage, requiring a direct signature verification upon delivery.</p>
        </div>
      </div>
    </div>
  );
}

function StaticPolicyView({ title }) {
  return (
    <div className="container" style={{ padding: "6rem 0", maxWidth: "800px" }}>
      <h1 style={{ marginBottom: "2rem" }}>{title}</h1>
      <p style={{ lineHeight: "1.8", color: "var(--color-muted)" }}>This official policy defines Aurelia Jewels standards of luxury care. Our processes comply with standard regulatory guidelines to guarantee conflict-free, certified metal configurations and secure global packaging operations.</p>
      <p style={{ lineHeight: "1.8", color: "var(--color-muted)", marginTop: "1rem" }}>For details or queries, reach out to concierge customer operations.</p>
    </div>
  );
}

function OrderTrackingView({ params, orders }) {
  const orderId = params.id;
  const matched = orders.find(o => o.id === orderId);

  let activeMilestone = 1;
  if (matched) {
    if (matched.status === "processing") activeMilestone = 2;
    if (matched.status === "shipped") activeMilestone = 3;
    if (matched.status === "delivered") activeMilestone = 4;
  }

  return (
    <div className="container" style={{ padding: "6rem 0", maxWidth: "800px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "1rem" }}>Insured Shipment Tracking</h1>
      <p style={{ textAlign: "center", color: "var(--color-muted)", marginBottom: "4rem" }}>Type your Order Identification to retrieve real-time milestone checkpoints.</p>

      <div className="tracking-box" style={{ border: "1px solid var(--color-border)", padding: "3rem", backgroundColor: "var(--color-bg-white)", borderRadius: "4px" }}>
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            const val = e.target.elements.orderId.value.trim().toUpperCase();
            window.location.hash = `#order-tracking?id=${val}`;
          }}
          style={{ display: "flex", gap: "1rem", marginBottom: "3rem" }}
        >
          <input 
            type="text" 
            name="orderId"
            placeholder="Aurelia Order ID (e.g. AJ-98421)" 
            defaultValue={orderId || ""}
            required 
            className="review-form-input" 
            style={{ margin: 0, flex: 1 }} 
          />
          <button type="submit" className="btn btn-primary" style={{ padding: "0.8rem 2rem" }}>Track</button>
        </form>

        {orderId ? (
          matched ? (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "2rem" }}>
                <span>Order Status: <strong style={{ textTransform: "uppercase" }}>{matched.status}</strong></span>
                <span>Date Placed: {matched.date}</span>
              </div>
              <div className="milestones-container">
                <div className={`milestone-step ${activeMilestone >= 1 ? "completed" : ""}`}>
                  <div className="milestone-dot"><Check size={14} /></div>
                  <div className="milestone-details">
                    <h4>Order Registered & Insured</h4>
                    <p>Deposit secured. Gems and gold metals selected from vault stock.</p>
                  </div>
                </div>
                <div className={`milestone-step ${activeMilestone >= 2 ? (activeMilestone === 2 ? "active" : "completed") : ""}`}>
                  <div className="milestone-dot"><Crown size={14} /></div>
                  <div className="milestone-details">
                    <h4>Atelier Fabrication & Inspection</h4>
                    <p>Master jewelers casting gold and setting gems under microscopic alignment.</p>
                  </div>
                </div>
                <div className={`milestone-step ${activeMilestone >= 3 ? (activeMilestone === 3 ? "active" : "completed") : ""}`}>
                  <div className="milestone-dot"><Check size={14} /></div>
                  <div className="milestone-details">
                    <h4>Dispatched in Insured Armored Courier</h4>
                    <p>Package boxed in signature suede cases, handed to priority carrier.</p>
                  </div>
                </div>
                <div className={`milestone-step ${activeMilestone >= 4 ? "active" : ""}`}>
                  <div className="milestone-dot"><Sparkles size={14} /></div>
                  <div className="milestone-details">
                    <h4>Delivered & Signature Logged</h4>
                    <p>Package safely verification signed by client.</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p style={{ textAlign: "center", color: "var(--color-rose-gold)" }}>Order ID not found. Verify code format and retry.</p>
          )
        ) : null}
      </div>
    </div>
  );
}

function OrderConfirmationView({ params, orders }) {
  const orderId = params.id;
  const matched = orders.find(o => o.id === orderId);

  if (!matched) return <div className="container">Order not found</div>;

  return (
    <div className="container text-center" style={{ padding: "6rem 0", maxWidth: "600px" }}>
      <Crown size={64} style={{ color: "var(--color-gold)", marginBottom: "2rem" }} />
      <h2>Order Successfully Confirmed</h2>
      <p style={{ margin: "1rem 0" }}>Your order <strong>{orderId}</strong> has been secured and logged. A verification email and certificate list have been routed to your inbox.</p>
      <div style={{ border: "1px solid var(--color-border)", padding: "1.5rem", margin: "2rem 0", backgroundColor: "var(--color-bg-white)" }}>
        <p><strong>Grand Total Authorized:</strong> ${matched.total.toLocaleString()}</p>
        <p><strong>Insured Delivery Address:</strong> {matched.address}</p>
      </div>
      <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
        <a href={`#order-tracking?id=${orderId}`} className="btn btn-primary">Track Order Progress</a>
        <a href="#shop" className="btn btn-outline">Return to Vault</a>
      </div>
    </div>
  );
}
