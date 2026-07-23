/* ==========================================================================
   AURELIA JEWELS - APP ENGINE & DYNAMIC SPA ROUTER
   ========================================================================== */

// --- 1. PREMIUM PRODUCTS DATABASE ---
const PRODUCTS = [
  {
    id: 1,
    name: "Aura Solitaire Diamond Ring",
    category: "rings",
    metal: "gold",
    stone: "diamond",
    price: 4850,
    originalPrice: 5500,
    purity: "18K Gold",
    weight: "4.2g",
    rating: 4.9,
    reviewsCount: 18,
    badge: "Best Seller",
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&q=80&w=600"
    ],
    description: "An iconic symbol of eternal devotion. This solitaire engagement ring features a stunning brilliant-cut center diamond, meticulously secured in a six-prong 18k yellow gold setting. Its elevated profile allows maximum light reflection, accentuating the gem's natural brilliance.",
    specifications: {
      "Stone Type": "Natural Round Brilliant Diamond",
      "Total Carat Weight": "1.25 ct",
      "Clarity": "VVS1",
      "Color Grade": "F",
      "Certificate": "GIA Certified",
      "Band Width": "2.0 mm"
    },
    reviews: [
      { name: "Victoria H.", date: "July 12, 2026", rating: 5, content: "Absolutely breathtaking. The stone is incredibly clear and sparkles beautifully under any lighting. The gold band is delicate but sturdy." },
      { name: "Robert S.", date: "June 28, 2026", rating: 5, content: "Proposed last week and she is in love with it. Aurelia's packaging was also top notch. Exquisite craftsmanship." }
    ]
  },
  {
    id: 2,
    name: "Elysian Diamond Eternity Band",
    category: "rings",
    metal: "platinum",
    stone: "diamond",
    price: 3200,
    originalPrice: 0,
    purity: "950 Platinum",
    weight: "5.8g",
    rating: 4.8,
    reviewsCount: 24,
    badge: "New Arrival",
    images: [
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=600"
    ],
    description: "Celebrate endless love with the Elysian Eternity Band. Crafted in durable 950 platinum, this ring is set with a continuous circle of matching round brilliant diamonds. Each stone is individually hand-placed in a secure channel-pave hybrid setting for seamless luxury.",
    specifications: {
      "Stone Type": "Natural Diamonds",
      "Total Carat Weight": "0.85 ct",
      "Clarity": "VS1",
      "Color Grade": "G",
      "Certificate": "IGL Certified",
      "Band Width": "3.5 mm"
    },
    reviews: [
      { name: "Helena G.", date: "May 14, 2026", rating: 5, content: "Perfect stackable ring. It coordinates beautifully with my engagement solitaire. Smooth edges, very comfortable." }
    ]
  },
  {
    id: 3,
    name: "Duchess Emerald Choker",
    category: "necklaces",
    metal: "gold",
    stone: "emerald",
    price: 12500,
    originalPrice: 14500,
    purity: "22K Gold",
    weight: "24.5g",
    rating: 5.0,
    reviewsCount: 6,
    badge: "Exclusive",
    images: [
      "emerald_choker.png",
      "emerald_choker_detail.png"
    ],
    description: "An heirloom-worthy piece of unparalleled grandeur. The Duchess Choker features hand-selected Colombian emeralds in deep forest green, arranged with clusters of micro-diamonds. Suspended gracefully on a heavy 22k yellow gold hand-linked chain.",
    specifications: {
      "Stone Type": "AAA Colombian Emeralds & Diamonds",
      "Total Carat Weight": "4.50 ct Emerald / 1.10 ct Diamond",
      "Chain Length": "14 - 16 inches Adjustable",
      "Clarity": "Eye-Clean Gemstones",
      "Clarity (Diamond)": "VVS2",
      "Color Grade (Diamond)": "E"
    },
    reviews: [
      { name: "Charlotte D.", date: "April 02, 2026", rating: 5, content: "Wore this to our anniversary gala. A true masterpiece, I received compliments all evening. The green is mesmerizing." }
    ]
  },
  {
    id: 4,
    name: "Celestial Sapphire Studs",
    category: "earrings",
    metal: "rosegold",
    stone: "sapphire",
    price: 2900,
    originalPrice: 0,
    purity: "18K Rose Gold",
    weight: "3.6g",
    rating: 4.7,
    reviewsCount: 14,
    badge: "Best Seller",
    images: [
      "sapphire_studs.png",
      "https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&q=80&w=600"
    ],
    description: "Inspired by the celestial midnight sky, these earrings highlight oval-cut deep blue sapphires framed by a warm halo of 18k rose gold and dainty pavé diamonds. Their classic silhouette makes them perfect for both day and evening wear.",
    specifications: {
      "Stone Type": "Royal Blue Natural Sapphires",
      "Total Carat Weight": "1.80 ct",
      "Setting Type": "Halo Prongs",
      "Backing Type": "La Pousette Secure Posts",
      "Accent Stones": "Round Brilliant Diamonds"
    },
    reviews: [
      { name: "Diana M.", date: "June 05, 2026", rating: 4, content: "Beautiful color contrast between the blue sapphires and rose gold. The backing feels very secure, which is important for studs." }
    ]
  },
  {
    id: 5,
    name: "Isabella Rose Gold Bangle",
    category: "bracelets",
    metal: "rosegold",
    stone: "",
    price: 1800,
    originalPrice: 2200,
    purity: "18K Rose Gold",
    weight: "14.2g",
    rating: 4.6,
    reviewsCount: 9,
    badge: "Sale",
    images: [
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&q=80&w=600"
    ],
    description: "A sleek, contemporary minimalist cuff crafted in polished solid 18k rose gold. Elegant on its own, yet perfectly proportioned for layering. Features a hidden push-button clasp safety lock.",
    specifications: {
      "Material": "Solid 18K Rose Gold",
      "Finish": "High Polish Mirror",
      "Clasp": "Integrated Box Clasp with Safety Key",
      "Sizing": "Medium (fits wrists 6.0 to 6.5 inches)"
    },
    reviews: [
      { name: "Sarah L.", date: "March 18, 2026", rating: 5, content: "Such a chic, timeless bracelet. It holds up well for everyday wear. No scratches yet." }
    ]
  },
  {
    id: 6,
    name: "Verdant Aura Emerald Ring",
    category: "rings",
    metal: "gold",
    stone: "emerald",
    price: 5400,
    originalPrice: 0,
    purity: "18K Gold",
    weight: "5.1g",
    rating: 4.9,
    reviewsCount: 11,
    badge: "Limited Edition",
    images: [
      "https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=600"
    ],
    description: "An architectural wonder of geometric design. A vibrant emerald-cut green emerald center stone is flanked by trapezoid step-cut side diamonds, structured beautifully in heavy 18k yellow gold prongs.",
    specifications: {
      "Center Stone": "Natural Emerald Cut Emerald",
      "Side Stones": "Trapezoid Diamonds",
      "Center Carat": "1.50 ct",
      "Certification": "GRS Certified",
      "Origin": "Zambia"
    },
    reviews: [
      { name: "Amelia V.", date: "May 29, 2026", rating: 5, content: "The green is incredibly vivid. Aurelia customer service helped me customize the ring size, and the shipping was fast." }
    ]
  },
  {
    id: 7,
    name: "Lustrous Pearl Drop Earrings",
    category: "earrings",
    metal: "silver",
    stone: "pearl",
    price: 950,
    originalPrice: 1200,
    purity: "925 Fine Silver",
    weight: "6.8g",
    rating: 4.8,
    reviewsCount: 15,
    badge: "Sale",
    images: [
      "pearl_drop_earrings.png",
      "https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&q=80&w=600"
    ],
    description: "Classic drops representing pure, unvarnished elegance. Pair of South Sea white cultured pearls, possessing excellent luster, dangling from sterling silver chains accented by small round diamonds.",
    specifications: {
      "Pearl Type": "South Sea Cultured Pearl",
      "Pearl Size": "10 - 11 mm",
      "Luster Grade": "Very High (AAA)",
      "Metal": "Rhodium-Plated 925 Sterling Silver",
      "Accent": "Round Cut Diamonds 0.15tcw"
    },
    reviews: [
      { name: "Sophia K.", date: "June 17, 2026", rating: 5, content: "Graceful and elegant. They catch the light beautifully when I move. Very comfortable to wear all day long." }
    ]
  },
  {
    id: 8,
    name: "Imperial Diamond Bridal Suite",
    category: "bridal",
    metal: "platinum",
    stone: "diamond",
    price: 24000,
    originalPrice: 28500,
    purity: "950 Platinum",
    weight: "35.2g",
    rating: 5.0,
    reviewsCount: 3,
    badge: "Exclusive Suite",
    images: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=600"
    ],
    description: "The crown jewel of our bridal collections. This unmatched suite includes a grand marquise-cut diamond necklace, matching teardrop earrings, and a matching double-halo diamond bracelet. Handcrafted over 120 hours.",
    specifications: {
      "Suite Components": "Necklace, Earrings Pair, Bracelet",
      "Total Gem Weight": "12.45 carats",
      "Metal Composition": "Solid 950 Platinum",
      "Diamond Quality": "VVS2 Clarity, E-F Color",
      "Sizing Adjustments": "Complimentary bespoke tailoring included"
    },
    reviews: [
      { name: "Genevieve W.", date: "May 01, 2026", rating: 5, content: "The absolute highlight of my wedding look. It truly made me feel like royalty. The sparkle is blindlingly beautiful." }
    ]
  },
  {
    id: 9,
    name: "Gilded Heritage Coin Necklace",
    category: "necklaces",
    metal: "gold",
    stone: "",
    price: 1250,
    originalPrice: 1500,
    purity: "18K Gold",
    weight: "8.5g",
    rating: 4.8,
    reviewsCount: 14,
    badge: "Best Seller",
    images: [
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&q=80&w=600"
    ],
    description: "A vintage-inspired layering piece. This necklace features a hand-struck coin medallion suspended on double-layered link and satellite chains, crafted in solid 18k yellow gold.",
    specifications: {
      "Metal": "Solid 18K Yellow Gold",
      "Chain Length": "16 - 18 inches Adjustable",
      "Pendant Diameter": "15 mm",
      "Finish": "Antique Gold Etched"
    },
    reviews: [
      { name: "Marcella A.", date: "May 20, 2026", rating: 5, content: "Perfect for everyday layering. The coin has a beautiful rustic finish." }
    ]
  },
  {
    id: 10,
    name: "Lustrous Pearl Choker",
    category: "necklaces",
    metal: "gold",
    stone: "pearl",
    price: 3600,
    originalPrice: 4200,
    purity: "18K Gold",
    weight: "18.2g",
    rating: 4.9,
    reviewsCount: 8,
    badge: "Exclusive",
    images: [
      "pearl_necklace.png",
      "pearl_necklace_back.png"
    ],
    description: "An elegant, timeless classic. This choker features a strand of perfectly matched, high-luster South Sea cultured pearls, completed with an exquisite flower-shaped white-gold clasp adorned with tiny diamonds.",
    specifications: {
      "Pearl Type": "South Sea Cultured Pearls",
      "Pearl Size": "8.5 - 9.0 mm",
      "Luster Grade": "Excellent (AAA)",
      "Clasp Material": "18K White Gold",
      "Necklace Length": "16 inches"
    },
    reviews: [
      { name: "Katherine P.", date: "April 12, 2026", rating: 5, content: "Simply stunning. The luster is breathtaking, and the clasp is a work of art in itself." }
    ]
  }
];

// --- 2. BLOG DATABASE ---
const BLOG_POSTS = [
  {
    id: 1,
    title: "The Art of Selecting the Perfect Engagement Ring",
    category: "Buying Guide",
    date: "July 15, 2026",
    author: "Eleanor Sterling",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800",
    excerpt: "Selecting an engagement ring is a profound journey of love. Understand diamond cuts, metal settings, and how to capture her personal style.",
    body: `
      <p>An engagement ring is more than a piece of fine jewelry; it is a permanent symbol of a shared lifetime promise. However, navigating the world of diamonds, settings, and precious metals can feel overwhelming for first-time buyers.</p>
      <h2>Understanding the 4Cs</h2>
      <p>Before stepping into a jewelry boutique, educate yourself on the global standard for diamond evaluation: Carat, Cut, Clarity, and Color.</p>
      <ul>
        <li><strong>Cut:</strong> This is the most crucial factor determining a diamond's brilliance and fire. A high-grade cut redirects light perfectly through the crown.</li>
        <li><strong>Color:</strong> Ranging from D (completely colorless) to Z (light yellow). For a luxury band, seek diamonds graded D through G.</li>
        <li><strong>Clarity:</strong> Measures the presence of microscopic inclusions. Look for VVS or VS clarity grades for eye-clean stones.</li>
        <li><strong>Carat:</strong> The physical weight of the gem. Balance carat weight with cut grade to ensure the stone looks large and brilliant.</li>
      </ul>
      <blockquote>"A well-cut smaller diamond will always outshine a larger, poorly cut stone."</blockquote>
      <h2>Selecting the Setting & Metal</h2>
      <p>The metal choice sets the backdrop for your center stone. Yellow gold offers classic, warm heritage appeal. Platinum stands as the most durable and secures white diamonds with an icy sheen. Rose gold brings modern, romantic, vintage warmth. Match the band silhouette to your partner's aesthetic—whether they prefer minimalist prongs, geometric bezels, or ornate halos.</p>
    `
  },
  {
    id: 2,
    title: "A Guide to Caring For Your Heirloom Jewelry",
    category: "Jewelry Care",
    date: "June 24, 2026",
    author: "Aris Thorne",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=800",
    excerpt: "Learn how to clean, store, and preserve your gold, gemstones, and pearls for generations to come with our expert tips.",
    body: `
      <p>Fine jewelry is crafted to endure, but proper maintenance is essential to maintain its original luster and prevent structural wear over decades.</p>
      <h2>Routine Cleaning at Home</h2>
      <p>For most gold, platinum, and diamond jewelry, you can restore luster using warm water, a few drops of mild soap, and a soft-bristled toothbrush. Gently brush the underside of settings where oils accumulate, rinse thoroughly with warm water, and dry with a lint-free cloth.</p>
      <blockquote>"Avoid harsh chemical solutions, ultrasonic cleaners, and boiling water, which can dislodge stones or damage delicate materials."</blockquote>
      <h2>Handling Pearls and Organic Gems</h2>
      <p>Pearls, emeralds, and opals require extra vigilance. Pearls are porous and sensitive to cosmetics. Always follow the golden rule: 'Last on, first off.' Put on your pearls after applying hairspray and perfume. Wipe them down with a dry, clean micro-fiber cloth after each wear to remove skin oils.</p>
    `
  },
  {
    id: 3,
    title: "Diamond Cuts: Deciphering the 4Cs",
    category: "Diamond Guide",
    date: "May 18, 2026",
    author: "Marcella Aurel",
    image: "https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&q=80&w=800",
    excerpt: "From round brilliant to Marquise and emerald cuts, explore the physics of light reflection and style properties of each cut.",
    body: `
      <p>The shape of a diamond defines its aesthetic character. While round brilliant is the traditional standard, fancy cuts like marquise, pear, and emerald offer distinct geometry.</p>
      <h2>Brilliant Cuts vs. Step Cuts</h2>
      <p>Round brilliant, cushion, and oval cuts feature triangular facets arranged to scatter light. In contrast, step cuts (Emerald and Asscher) feature parallel facets, emphasizing clean lines, transparency, and internal clarity over sparkle.</p>
    `
  }
];

// --- 3. CENTRAL STATE MANAGEMENT ---
class StateManager {
  constructor() {
    this.cart = JSON.parse(localStorage.getItem("aurelia_cart")) || [];
    this.wishlist = JSON.parse(localStorage.getItem("aurelia_wishlist")) || [];
    this.currentUser = JSON.parse(localStorage.getItem("aurelia_user")) || null;
    this.orders = JSON.parse(localStorage.getItem("aurelia_orders")) || [
      { id: "AJ-98421", date: "June 12, 2026", total: 4850, status: "delivered", items: ["Aura Solitaire Diamond Ring"] },
      { id: "AJ-98005", date: "May 20, 2026", total: 1800, status: "shipped", items: ["Isabella Rose Gold Bangle"] }
    ];
    this.recentlyViewed = JSON.parse(localStorage.getItem("aurelia_recently")) || [];
  }

  // Cart operations
  addToCart(productId, quantity = 1, metal = "gold") {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const existing = this.cart.find(item => item.product.id === productId && item.metal === metal);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.cart.push({ product, quantity, metal });
    }

    this.saveCart();
    this.updateBadges();
    showToast(`Added ${product.name} (${metal.toUpperCase()}) to your Cart!`, "success");
  }

  removeFromCart(productId, metal) {
    this.cart = this.cart.filter(item => !(item.product.id === productId && item.metal === metal));
    this.saveCart();
    this.updateBadges();
    showToast("Item removed from your cart.", "info");
  }

  updateCartQuantity(productId, metal, newQty) {
    const item = this.cart.find(item => item.product.id === productId && item.metal === metal);
    if (item && newQty > 0) {
      item.quantity = newQty;
      this.saveCart();
      this.updateBadges();
    }
  }

  clearCart() {
    this.cart = [];
    this.saveCart();
    this.updateBadges();
  }

  saveCart() {
    localStorage.setItem("aurelia_cart", JSON.stringify(this.cart));
  }

  getCartTotal() {
    return this.cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  }

  // Wishlist operations
  toggleWishlist(productId) {
    const idx = this.wishlist.indexOf(productId);
    const product = PRODUCTS.find(p => p.id === productId);
    
    if (idx > -1) {
      this.wishlist.splice(idx, 1);
      showToast(`${product.name} removed from Wishlist.`, "info");
    } else {
      this.wishlist.push(productId);
      showToast(`${product.name} saved to Wishlist!`, "success");
    }
    
    localStorage.setItem("aurelia_wishlist", JSON.stringify(this.wishlist));
    this.updateBadges();
    
    // Toggle active state on UI buttons if they exist
    document.querySelectorAll(`.wishlist-toggle-btn[data-id="${productId}"]`).forEach(btn => {
      btn.classList.toggle("active");
    });
  }

  isWishlisted(productId) {
    return this.wishlist.includes(productId);
  }

  // Auth Operations
  login(email, password) {
    this.currentUser = {
      name: email.split("@")[0].charAt(0).toUpperCase() + email.split("@")[0].slice(1),
      email: email,
      address: "1024 Ocean Boulevard, Santa Monica, CA 90401",
      cards: ["•••• •••• •••• 4892", "•••• •••• •••• 1025"],
      notifications: { email: true, sms: false, collections: true }
    };
    localStorage.setItem("aurelia_user", JSON.stringify(this.currentUser));
    showToast(`Welcome back, ${this.currentUser.name}!`, "success");
    window.location.hash = "#dashboard";
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem("aurelia_user");
    showToast("You have been securely logged out.", "info");
    window.location.hash = "#home";
  }

  register(name, email, password) {
    this.currentUser = {
      name: name,
      email: email,
      address: "",
      cards: [],
      notifications: { email: true, sms: true, collections: true }
    };
    localStorage.setItem("aurelia_user", JSON.stringify(this.currentUser));
    showToast("Registration successful! Welcome to Aurelia.", "success");
    window.location.hash = "#dashboard";
  }

  // Order Placement
  placeOrder(addressDetails, paymentMethod) {
    const orderId = `AJ-${Math.floor(10000 + Math.random() * 90000)}`;
    const itemsList = this.cart.map(item => item.product.name);
    const newOrder = {
      id: orderId,
      date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      total: this.getCartTotal() + 35, // Including simulated delivery fee
      status: "processing",
      items: itemsList,
      address: addressDetails,
      payment: paymentMethod
    };
    this.orders.unshift(newOrder);
    localStorage.setItem("aurelia_orders", JSON.stringify(this.orders));
    this.clearCart();
    return orderId;
  }

  // Recently viewed list
  addRecentlyViewed(productId) {
    this.recentlyViewed = this.recentlyViewed.filter(id => id !== productId);
    this.recentlyViewed.unshift(productId);
    if (this.recentlyViewed.length > 4) {
      this.recentlyViewed.pop();
    }
    localStorage.setItem("aurelia_recently", JSON.stringify(this.recentlyViewed));
  }

  // Badges update
  updateBadges() {
    const cartBadge = document.getElementById("cart-badge");
    const wishlistBadge = document.getElementById("wishlist-badge");
    
    if (cartBadge) {
      const count = this.cart.reduce((sum, item) => sum + item.quantity, 0);
      cartBadge.textContent = count;
      cartBadge.style.display = count > 0 ? "flex" : "none";
    }
    
    if (wishlistBadge) {
      wishlistBadge.textContent = this.wishlist.length;
      wishlistBadge.style.display = this.wishlist.length > 0 ? "flex" : "none";
    }
    
    // Update header link for account
    const accountBtn = document.getElementById("account-btn");
    const mobileAccountLink = document.getElementById("mobile-account-link");
    
    if (accountBtn) {
      if (this.currentUser) {
        accountBtn.setAttribute("href", "#dashboard");
      } else {
        accountBtn.setAttribute("href", "#login");
      }
    }
    
    if (mobileAccountLink) {
      if (this.currentUser) {
        mobileAccountLink.setAttribute("href", "#dashboard");
        mobileAccountLink.textContent = "My Dashboard";
      } else {
        mobileAccountLink.setAttribute("href", "#login");
        mobileAccountLink.textContent = "My Account";
      }
    }
  }
}

const state = new StateManager();

// --- 4. APP TOAST SYSTEM ---
function showToast(message, type = "success") {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast`;
  
  let icon = "check-circle";
  if (type === "error") icon = "alert-circle";
  if (type === "info") icon = "info";
  
  toast.innerHTML = `
    <i data-lucide="${icon}"></i>
    <span>${message}</span>
  `;
  container.appendChild(toast);
  lucide.createIcons();

  // Trigger animation
  setTimeout(() => toast.classList.add("show"), 50);

  // Auto remove
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}

// --- 5. THE 20 ROUTER VIEW RENDERERS ---

const appContainer = document.getElementById("app-container");

// View 1: HOME PAGE
function renderHome() {
  appContainer.innerHTML = `
    <!-- Luxury Hero Section -->
    <section class="hero-section">
      <div class="hero-overlay"></div>
      <div class="container">
        <div class="hero-content">
          <span>Fine Artisanal Jewelry</span>
          <h1>Elegance In Every Carat</h1>
          <p>Hand-crafted creations engineered from the highest purity of gold, platinum, and diamonds. Curated bespoke designs commemorating life's absolute milestones.</p>
          <div class="hero-actions">
            <a href="#shop" class="btn btn-primary">Shop The Vault</a>
            <a href="#collections" class="btn btn-outline">Explore Collections</a>
          </div>
        </div>
      </div>
    </section>

    <!-- Editorial Featured Collections -->
    <section class="collections-section">
      <div class="container">
        <h2 class="section-title">Signature Collections</h2>
        <p class="section-subtitle">Exquisite design lineages handcrafted to perfection</p>
        <div class="collections-grid">
          
          <div class="collection-card">
            <img src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=600" alt="Elysian Bridal">
            <div class="collection-card-overlay">
              <h3>Elysian Bridal</h3>
              <p>Solitaires, Bands & Halos</p>
              <a href="#shop?collection=elysian" class="btn btn-outline">Discover</a>
            </div>
          </div>

          <div class="collection-card">
            <img src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=600" alt="Aura of Diamonds">
            <div class="collection-card-overlay">
              <h3>Aura of Diamonds</h3>
              <p>Fine cut brilliant diamonds</p>
              <a href="#shop?collection=aurora" class="btn btn-outline">Discover</a>
            </div>
          </div>

          <div class="collection-card">
            <img src="https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&q=80&w=600" alt="Vintage Gold">
            <div class="collection-card-overlay">
              <h3>Vintage Gold</h3>
              <p>Heirloom heavy carvings</p>
              <a href="#shop?collection=vintage" class="btn btn-outline">Discover</a>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- Best Sellers Grid -->
    <section class="products-section">
      <div class="container">
        <h2 class="section-title">Best Sellers</h2>
        <p class="section-subtitle">Aurelia's most coveted creations</p>
        <div class="products-grid">
          ${PRODUCTS.slice(0, 4).map(p => renderProductCardHTML(p)).join('')}
        </div>
        <div style="text-align:center; margin-top:4rem;">
          <a href="#shop" class="btn btn-outline">View Entire Catalog</a>
        </div>
      </div>
    </section>

    <!-- Editorial Section Break (The Bridal Showcase) -->
    <section class="editorial-banner-section">
      <div class="container">
        <div class="editorial-grid">
          <div class="editorial-img">
            <img src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&q=80&w=800" alt="Ethically Sourced Craft">
          </div>
          <div class="editorial-content">
            <span class="editorial-tag">The Aurelia Heritage</span>
            <h2>Ethical Luxury, Unmatched Craft</h2>
            <p>Every gem mounted by Aurelia Jewels is ethically sourced in accordance with the Kimberley Process. Our master artisans hand-set each setting under microscope, assuring a generation of structural integrity and brilliant fire.</p>
            <a href="#about" class="btn btn-primary">Our Story</a>
          </div>
        </div>
      </div>
    </section>

    <!-- New Arrivals Grid -->
    <section class="products-section" style="background-color: var(--color-bg-primary);">
      <div class="container">
        <h2 class="section-title">New Arrivals</h2>
        <p class="section-subtitle">Modern silhouettes fresh from our atelier</p>
        <div class="products-grid">
          ${PRODUCTS.slice(4, 8).map(p => renderProductCardHTML(p)).join('')}
        </div>
      </div>
    </section>

    <!-- Reviews Slider Block -->
    <section class="reviews-section">
      <div class="container">
        <h2 class="section-title">The Aurelia Experience</h2>
        <p class="section-subtitle">Stories of love and celebration</p>
        <div class="reviews-slider">
          <div class="review-slide">
            <div class="review-stars">
              <i data-lucide="star" style="fill:currentColor;"></i>
              <i data-lucide="star" style="fill:currentColor;"></i>
              <i data-lucide="star" style="fill:currentColor;"></i>
              <i data-lucide="star" style="fill:currentColor;"></i>
              <i data-lucide="star" style="fill:currentColor;"></i>
            </div>
            <p class="review-text">"The craft and shine of the diamond is unbelievable. From the selection process to the custom engraving, Aurelia treated us like royalty. I couldn't be happier with my solitaire."</p>
            <p class="review-author">Genevieve Sinclair <span>- Los Angeles</span></p>
          </div>
        </div>
      </div>
    </section>

    <!-- Instagram Gallery -->
    <section class="instagram-section">
      <div class="container">
        <h2 class="section-title">Captured by Aurelia</h2>
        <p class="section-subtitle">Tag #AureliaJewels on Instagram to be featured</p>
      </div>
      <div class="instagram-grid">
        <div class="instagram-item">
          <img src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=400" alt="Instagram Showcase 1">
          <div class="instagram-overlay"><i data-lucide="instagram"></i></div>
        </div>
        <div class="instagram-item">
          <img src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=400" alt="Instagram Showcase 2">
          <div class="instagram-overlay"><i data-lucide="instagram"></i></div>
        </div>
        <div class="instagram-item">
          <img src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=400" alt="Instagram Showcase 3">
          <div class="instagram-overlay"><i data-lucide="instagram"></i></div>
        </div>
        <div class="instagram-item">
          <img src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=400" alt="Instagram Showcase 4">
          <div class="instagram-overlay"><i data-lucide="instagram"></i></div>
        </div>
        <div class="instagram-item">
          <img src="https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&q=80&w=400" alt="Instagram Showcase 5">
          <div class="instagram-overlay"><i data-lucide="instagram"></i></div>
        </div>
        <div class="instagram-item">
          <img src="https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&q=80&w=400" alt="Instagram Showcase 6">
          <div class="instagram-overlay"><i data-lucide="instagram"></i></div>
        </div>
      </div>
    </section>

    <!-- Email Newsletter Sign up -->
    <section class="newsletter-section">
      <div class="newsletter-box">
        <h2>Join The Aurelia Circle</h2>
        <p>Subscribe to receive priority notifications of private vault sales, luxury releases, and exclusive design previews.</p>
        <form class="newsletter-form" id="home-newsletter-form">
          <input type="email" placeholder="Your Email Address" required>
          <button type="submit" class="newsletter-btn">Subscribe</button>
        </form>
      </div>
    </section>
  `;

  // Attach event handlers
  document.getElementById("home-newsletter-form").addEventListener("submit", (e) => {
    e.preventDefault();
    showToast("Thank you for joining the Aurelia Circle!", "success");
    e.target.reset();
  });
}

// Helper to render single product card HTML
function renderProductCardHTML(p) {
  const isWish = state.isWishlisted(p.id) ? "active" : "";
  const priceDisplay = p.originalPrice > 0 
    ? `<span class="product-price discounted-price">$${p.price.toLocaleString()}</span> <span class="product-price original-price">$${p.originalPrice.toLocaleString()}</span>` 
    : `<span class="product-price">$${p.price.toLocaleString()}</span>`;
  
  const badgeHTML = p.badge ? `<div class="product-badge">${p.badge}</div>` : "";

  return `
    <div class="product-card" data-id="${p.id}">
      ${badgeHTML}
      <div class="product-image-container">
        <a href="#product-details?id=${p.id}">
          <img src="${p.images[0]}" alt="${p.name}">
        </a>
        <button class="product-wishlist-toggle wishlist-toggle-btn ${isWish}" data-id="${p.id}" aria-label="Toggle Wishlist">
          <i data-lucide="heart"></i>
        </button>
        <div class="product-card-actions">
          <button class="product-action-btn quick-view-trigger" data-id="${p.id}">Quick View</button>
          <button class="product-action-btn add-to-cart-quick" data-id="${p.id}">Add to Cart</button>
        </div>
      </div>
      <div class="product-info">
        <div class="product-category">${p.purity} | ${p.category}</div>
        <h3 class="product-title"><a href="#product-details?id=${p.id}">${p.name}</a></h3>
        <div class="product-rating">
          <i data-lucide="star" style="fill:currentColor; width:12px; height:12px;"></i>
          <span>${p.rating} (${p.reviewsCount})</span>
        </div>
        <div class="product-price-flex">
          ${priceDisplay}
        </div>
      </div>
    </div>
  `;
}

// View 2: ABOUT US PAGE
function renderAbout() {
  appContainer.innerHTML = `
    <div class="about-hero">
      <h1>Our Heritage</h1>
    </div>
    
    <div class="container">
      <div class="about-grid">
        <div class="about-image">
          <img src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&q=80&w=700" alt="Artisans carving jewelry">
        </div>
        <div class="about-text">
          <h2>Meticulous Craftsmanship Since 1992</h2>
          <p>Founded by master goldsmith Aurelius Thorne, Aurelia Jewels was born out of a desire to merge classical Italian Renaissance jewelry designs with contemporary cutting-edge metallurgical engineering.</p>
          <p>From our private workshops in Milan and Southern California, our small team of artisans sculpts, polishes, and encrusts every item by hand. We create fine art pieces that double as wearable heirlooms, capturing stories of love and triumph.</p>
          <p>We are firmly committed to preserving traditional methods of heavy carving, micro-pavé, and metal etching, ensuring that each generation of Aurelia creation maintains its timeless magnificence.</p>
        </div>
      </div>
    </div>

    <!-- Craft Highlights Section -->
    <div class="craft-highlight" id="craft">
      <div class="container">
        <div class="craft-grid">
          
          <div class="craft-card">
            <i data-lucide="gem"></i>
            <h3>Ethically Sourced Diamonds</h3>
            <p>We partner with certified diamond suppliers that adhere to strict Kimberley Process guidelines, promoting conflict-free environments.</p>
          </div>

          <div class="craft-card">
            <i data-lucide="crown"></i>
            <h3>Superior Metal Quality</h3>
            <p>Our gold is refined to 18K and 22K purities, and our platinum remains 950 pure, establishing maximum brilliance and scratch resistance.</p>
          </div>

          <div class="craft-card">
            <i data-lucide="sparkles"></i>
            <h3>Lifetime Warranty & Care</h3>
            <p>Every piece includes a certified lifetime structural guarantee, including complimentary annual cleaning and resizing.</p>
          </div>

        </div>
      </div>
    </div>
  `;
}

// View 3: SHOP / CATALOG PAGE
function renderShop(params) {
  // Parse filters
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
    // Simulated collection tags
    if (params.collection === "elysian") {
      filtered = filtered.filter(p => p.category === "bridal" || p.id === 1);
    } else if (params.collection === "aurora") {
      filtered = filtered.filter(p => p.stone === "diamond");
    } else if (params.collection === "vintage") {
      filtered = filtered.filter(p => p.metal === "gold");
    }
  }

  // Handle Sort
  const sortBy = params.sort || "featured";
  if (sortBy === "price-low") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-high") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortBy === "rating") {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  const categoryTitle = params.category 
    ? `${params.category.charAt(0).toUpperCase() + params.category.slice(1)} Collections` 
    : "Aurelia Shop Catalog";

  appContainer.innerHTML = `
    <div class="container">
      <h1 style="font-size: 3rem; margin-bottom: 0.5rem; text-align:center;">${categoryTitle}</h1>
      <p style="text-align:center; color:var(--color-muted); margin-bottom: 3rem;">Indulge in our exquisite portfolio of handcrafted fine jewelry.</p>
      
      <div class="shop-layout">
        
        <!-- Sidebar Filters -->
        <aside class="shop-sidebar">
          
          <div class="filter-section">
            <h3 class="filter-title">By Category</h3>
            <div class="filter-list">
              <a href="#shop" class="${!params.category ? 'active' : ''}">All Categories</a>
              <a href="#shop?category=rings" class="${params.category === 'rings' ? 'active' : ''}">Rings</a>
              <a href="#shop?category=necklaces" class="${params.category === 'necklaces' ? 'active' : ''}">Necklaces & Pendants</a>
              <a href="#shop?category=earrings" class="${params.category === 'earrings' ? 'active' : ''}">Earrings</a>
              <a href="#shop?category=bracelets" class="${params.category === 'bracelets' ? 'active' : ''}">Bracelets</a>
              <a href="#shop?category=bridal" class="${params.category === 'bridal' ? 'active' : ''}">Bridal Sets</a>
            </div>
          </div>

          <div class="filter-section">
            <h3 class="filter-title">By Metal</h3>
            <div class="filter-list">
              <a href="#shop?metal=gold" class="${params.metal === 'gold' ? 'active' : ''}">Yellow Gold</a>
              <a href="#shop?metal=rosegold" class="${params.metal === 'rosegold' ? 'active' : ''}">Rose Gold</a>
              <a href="#shop?metal=platinum" class="${params.metal === 'platinum' ? 'active' : ''}">Platinum</a>
              <a href="#shop?metal=silver" class="${params.metal === 'silver' ? 'active' : ''}">Fine Silver</a>
            </div>
          </div>

          <div class="filter-section">
            <h3 class="filter-title">By Gemstone</h3>
            <div class="filter-list">
              <a href="#shop?gem=diamond" class="${params.gem === 'diamond' ? 'active' : ''}">Diamonds</a>
              <a href="#shop?gem=emerald" class="${params.gem === 'emerald' ? 'active' : ''}">Emeralds</a>
              <a href="#shop?gem=sapphire" class="${params.gem === 'sapphire' ? 'active' : ''}">Sapphires</a>
              <a href="#shop?gem=pearl" class="${params.gem === 'pearl' ? 'active' : ''}">Pearls</a>
            </div>
          </div>

          <div class="filter-section">
            <h3 class="filter-title">Price Range</h3>
            <div class="filter-list">
              <a href="#shop?price_max=1500">$0 - $1,500</a>
              <a href="#shop?price_min=1500&price_max=5000">$1,500 - $5,000</a>
              <a href="#shop?price_min=5000">$5,000+</a>
            </div>
          </div>

        </aside>

        <!-- Main Content Area -->
        <main class="shop-main">
          
          <div class="shop-content-header">
            <div class="items-count">${filtered.length} Exquisite Items found</div>
            <div class="sorting-wrapper">
              <label for="shop-sort">Sort By:</label>
              <select id="shop-sort">
                <option value="featured" ${sortBy === 'featured' ? 'selected' : ''}>Featured</option>
                <option value="price-low" ${sortBy === 'price-low' ? 'selected' : ''}>Price: Low to High</option>
                <option value="price-high" ${sortBy === 'price-high' ? 'selected' : ''}>Price: High to Low</option>
                <option value="rating" ${sortBy === 'rating' ? 'selected' : ''}>Top Rated</option>
              </select>
            </div>
          </div>

          ${filtered.length === 0 ? `
            <div class="empty-state">
              <i data-lucide="help-circle"></i>
              <h2>No items found</h2>
              <p>We couldn't find any products matching those parameters. Please try broadening your selection.</p>
              <a href="#shop" class="btn btn-primary">View All Products</a>
            </div>
          ` : `
            <div class="products-grid">
              ${filtered.map(p => renderProductCardHTML(p)).join('')}
            </div>
          `}

          <!-- Pagination UI -->
          <div class="pagination">
            <button class="pagination-btn" disabled><i data-lucide="chevron-left"></i></button>
            <button class="pagination-btn active">1</button>
            <button class="pagination-btn">2</button>
            <button class="pagination-btn"><i data-lucide="chevron-right"></i></button>
          </div>

        </main>
      </div>
    </div>
  `;

  // Bind Sort selector changes
  document.getElementById("shop-sort")?.addEventListener("change", (e) => {
    const val = e.target.value;
    // Keep category/metal parameters, append sort parameter
    const cleanParams = { ...params, sort: val };
    const queryStr = Object.keys(cleanParams)
      .map(k => `${k}=${cleanParams[k]}`)
      .join("&");
    window.location.hash = `#shop?${queryStr}`;
  });
}

// View 4: COLLECTIONS EDITORIAL VIEW
function renderCollections() {
  appContainer.innerHTML = `
    <div class="container">
      <h1 style="font-size: 3.5rem; text-align: center; margin-bottom: 0.5rem;">The Signature Collections</h1>
      <p style="text-align: center; color: var(--color-muted); margin-bottom: 4rem;">Explore design lineages inspired by eras of artistic triumph.</p>
      
      <div style="display:flex; flex-direction:column; gap:6rem;">
        
        <!-- Collection Row 1 -->
        <div class="editorial-grid">
          <div class="editorial-img">
            <img src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=800" alt="Elysian Bridal Suite">
          </div>
          <div class="editorial-content">
            <span class="editorial-tag">The Bridal Line</span>
            <h2>Elysian Bridal</h2>
            <p>Every piece in our Elysian Suite features flawlessly matched stones set in durable 950 Platinum. Inspired by classical Greco-Roman symmetry, these designs commemorate timeless commitment with stunning arrays of light.</p>
            <a href="#shop?collection=elysian" class="btn btn-primary">Discover the Suite</a>
          </div>
        </div>

        <!-- Collection Row 2 -->
        <div class="editorial-grid" style="direction: rtl;">
          <div class="editorial-img" style="direction: ltr;">
            <img src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800" alt="Aura of Diamonds">
          </div>
          <div class="editorial-content" style="direction: ltr; text-align:left;">
            <span class="editorial-tag">Signature Cut</span>
            <h2>Aura of Diamonds</h2>
            <p>The definitive showcase of diamond fire. Centering around diamonds with exceptional D-F color grades and clarity. Crafted carefully to capture ambient luminescence and reflect dazzling brilliance.</p>
            <a href="#shop?collection=aurora" class="btn btn-primary">Discover the Gems</a>
          </div>
        </div>

        <!-- Collection Row 3 -->
        <div class="editorial-grid">
          <div class="editorial-img">
            <img src="https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&q=80&w=800" alt="Vintage Gold">
          </div>
          <div class="editorial-content">
            <span class="editorial-tag">Artisanal Etchings</span>
            <h2>Vintage Gold</h2>
            <p>Heavy, hand-etched carvings crafted in rich 18K and 22K yellow gold. Each pendant, ring, and chain recalls historic goldsmithing heritage. Perfect for those who cherish artisanal depth and bold structures.</p>
            <a href="#shop?collection=vintage" class="btn btn-primary">Discover the Heritage</a>
          </div>
        </div>

      </div>
    </div>
  `;
}

// View 5: PRODUCT DETAILS PAGE
function renderProductDetails(params) {
  const pId = parseInt(params.id);
  const product = PRODUCTS.find(p => p.id === pId);
  if (!product) {
    appContainer.innerHTML = `
      <div class="container text-center" style="padding: 6rem 0;">
        <h2>Product not found</h2>
        <a href="#shop" class="btn btn-primary">Back to Catalog</a>
      </div>
    `;
    return;
  }

  // Register in recently viewed
  state.addRecentlyViewed(product.id);

  const discountedPrice = product.originalPrice > 0;
  const isWish = state.isWishlisted(product.id) ? "active" : "";

  // Render related products
  const related = PRODUCTS.filter(p => p.id !== product.id).slice(0, 4);

  appContainer.innerHTML = `
    <div class="container product-details-container">
      <div class="product-details-grid">
        
        <!-- Left: Image Gallery & 360 viewer -->
        <div class="product-gallery">
          <div class="product-gallery-main" id="main-gallery-view">
            <img src="${product.images[0]}" alt="${product.name}" id="details-main-img">
          </div>
          <div class="gallery-thumbnails">
            ${product.images.map((img, i) => `
              <div class="thumbnail-item ${i === 0 ? 'active' : ''}" data-src="${img}">
                <img src="${img}" alt="Thumbnail ${i + 1}">
              </div>
            `).join('')}
          </div>
          
          <!-- 360 Interactive Viewer Component -->
          <div class="viewer-360-container" id="viewer-360-element">
            <div class="viewer-360-inner" id="viewer-360-inner">
              <img src="${product.images[0]}" alt="${product.name}" id="viewer-360-img" draggable="false">
            </div>
            <div class="viewer-360-badge"><i data-lucide="rotate-3d" style="width:14px; height:14px; display:inline-block; vertical-align:middle;"></i> 360° View</div>
            <div class="viewer-360-instructions">
              <i data-lucide="move-horizontal" style="width:16px; height:16px; display:inline-block; vertical-align:middle; margin-right:4px;"></i>
              <span>Drag horizontally to rotate</span>
            </div>
          </div>
        </div>

        <!-- Right: Purchase Panel & Descriptions -->
        <div class="details-info">
          <div class="details-breadcrumb"><a href="#shop">Shop</a> / <a href="#shop?category=${product.category}">${product.category}</a> / ${product.name}</div>
          
          <h1 class="details-title">${product.name}</h1>
          
          <div class="details-rating">
            <div style="color: var(--color-gold); display:flex; gap:0.2rem;">
              <i data-lucide="star" style="fill:currentColor; width:16px; height:16px;"></i>
              <i data-lucide="star" style="fill:currentColor; width:16px; height:16px;"></i>
              <i data-lucide="star" style="fill:currentColor; width:16px; height:16px;"></i>
              <i data-lucide="star" style="fill:currentColor; width:16px; height:16px;"></i>
              <i data-lucide="star" style="fill:currentColor; width:16px; height:16px;"></i>
            </div>
            <span>${product.rating} (${product.reviewsCount} verified reviews)</span>
          </div>

          <div class="details-price">
            $${product.price.toLocaleString()}
            ${discountedPrice ? `<span class="discount-tag">Save $${(product.originalPrice - product.price).toLocaleString()}</span>` : ""}
          </div>

          <p class="details-description">${product.description}</p>

          <!-- Specifications Selection -->
          <div class="details-options">
            <h4 class="option-group-title">Select Metal Base</h4>
            <div class="metal-selector" id="details-metal-select">
              <span class="metal-option active" data-val="gold">Yellow Gold</span>
              <span class="metal-option" data-val="rosegold">Rose Gold</span>
              <span class="metal-option" data-val="platinum">Platinum</span>
            </div>
          </div>

          <!-- Purchase buttons -->
          <div class="purchase-controls">
            <div class="quantity-selector">
              <button class="qty-btn" id="details-qty-minus">-</button>
              <input type="text" value="1" readonly class="qty-input" id="details-qty-val">
              <button class="qty-btn" id="details-qty-plus">+</button>
            </div>
            <button class="btn btn-primary" id="details-add-cart">Add to Bag</button>
            <button class="btn btn-outline" id="details-buy-now">Buy Now</button>
          </div>

          <!-- Share & Wishlist Link options -->
          <div class="details-share-wishlist">
            <button class="details-action-link wishlist-toggle-btn ${isWish}" data-id="${product.id}" id="details-wish-toggle">
              <i data-lucide="heart" style="width:16px; height:16px;"></i>
              <span>Save to Wishlist</span>
            </button>
            <button class="details-action-link" id="details-share-btn">
              <i data-lucide="share-2" style="width:16px; height:16px;"></i>
              <span>Share Details</span>
            </button>
          </div>

          <div style="border-top:1px solid var(--color-border); padding-top:1.5rem;">
            <p style="font-size:0.85rem; color:var(--color-muted); display:flex; gap:0.5rem; align-items:center;">
              <i data-lucide="shield-check" style="color:var(--color-gold); width:18px; height:18px;"></i>
              <span>Complimentary insured shipping, signature vault packaging & certificates of purity included.</span>
            </p>
          </div>

        </div>

      </div>

      <!-- Specifications Section Table -->
      <section class="specs-section">
        <h2 class="specs-title">Technical Specifications</h2>
        <table class="specs-table">
          <tr>
            <td class="spec-name">Metal Purity</td>
            <td class="spec-val">${product.purity}</td>
          </tr>
          <tr>
            <td class="spec-name">Average Metal Weight</td>
            <td class="spec-val">${product.weight}</td>
          </tr>
          ${Object.keys(product.specifications).map(k => `
            <tr>
              <td class="spec-name">${k}</td>
              <td class="spec-val">${product.specifications[k]}</td>
            </tr>
          `).join('')}
        </table>
      </section>

      <!-- Customer Reviews Tabbed Block -->
      <section style="margin-bottom:6rem;">
        <div class="reviews-heading-flex">
          <h2>Client Reviews (${product.reviews.length})</h2>
          <div style="color:var(--color-gold); font-size:1.1rem;">Rating Average: ${product.rating}/5.0</div>
        </div>
        
        <div class="reviews-tab-grid">
          <!-- Left: List reviews -->
          <div class="reviews-listing">
            ${product.reviews.map(r => `
              <div class="review-item">
                <div class="review-item-header">
                  <span class="review-item-name">${r.name}</span>
                  <span class="review-item-date">${r.date}</span>
                </div>
                <div class="review-stars" style="margin-bottom:0.6rem; color:var(--color-gold);">
                  ${Array(r.rating).fill('<i data-lucide="star" style="fill:currentColor; width:12px; height:12px; display:inline-block;"></i>').join('')}
                </div>
                <p class="review-item-content">"${r.content}"</p>
              </div>
            `).join('')}
          </div>

          <!-- Right: Post a Review Form -->
          <div class="review-form-box">
            <h4>Share Your Aurelia Experience</h4>
            <p style="color:var(--color-muted); font-size:0.85rem; margin-bottom:1.5rem;">Your feedback helps us continuously perfect our artisanal processes.</p>
            <form id="details-review-form">
              <input type="text" placeholder="Your Name" required class="review-form-input" id="rev-name">
              <input type="email" placeholder="Your Email (Private)" required class="review-form-input" id="rev-email">
              
              <label style="font-size:0.85rem; font-weight:600; display:block; margin-bottom:0.5rem; text-transform:uppercase;">Overall Rating</label>
              <div class="rating-select" id="rev-stars-select">
                <span data-star="1">&#9733;</span>
                <span data-star="2">&#9733;</span>
                <span data-star="3">&#9733;</span>
                <span data-star="4">&#9733;</span>
                <span data-star="5">&#9733;</span>
              </div>
              <input type="hidden" id="rev-rating" value="5">

              <textarea placeholder="Your review comments..." required class="review-form-input" style="height:120px;" id="rev-content"></textarea>
              <button type="submit" class="btn btn-primary">Submit Review</button>
            </form>
          </div>
        </div>
      </section>

      <!-- Related Products list -->
      <section>
        <h2 class="related-products-title">Compositions You May Adore</h2>
        <div class="products-grid">
          ${related.map(p => renderProductCardHTML(p)).join('')}
        </div>
      </section>

    </div>
  `;

  // Attach gallery thumbnail click handlers
  document.querySelectorAll(".thumbnail-item").forEach(item => {
    item.addEventListener("click", () => {
      document.querySelectorAll(".thumbnail-item").forEach(t => t.classList.remove("active"));
      item.classList.add("active");
      const src = item.getAttribute("data-src");
      document.getElementById("details-main-img").setAttribute("src", src);
    });
  });

  // Attach zoom main image handler
  document.getElementById("main-gallery-view").addEventListener("click", () => {
    const mainImgSrc = document.getElementById("details-main-img").getAttribute("src");
    const zoomImg = document.getElementById("zoom-img");
    const zoomBackdrop = document.getElementById("zoom-backdrop");
    if (zoomImg && zoomBackdrop) {
      zoomImg.setAttribute("src", mainImgSrc);
      zoomBackdrop.classList.add("show");
    }
  });

  // 360 Drag Interaction Logic
  const viewerElement = document.getElementById("viewer-360-element");
  const viewerInner = document.getElementById("viewer-360-inner");
  const viewerImg = document.getElementById("viewer-360-img");
  
  if (viewerElement && viewerInner && viewerImg) {
    let isDragging = false;
    let startX = 0;
    let currentAngle = 0;
    let baseAngle = 0;
    const imagesList = product.images;

    // Prevent default browser image dragging ghost effect
    viewerImg.addEventListener("dragstart", (e) => e.preventDefault());

    const startDrag = (e) => {
      isDragging = true;
      startX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      baseAngle = currentAngle;
      viewerElement.style.cursor = "grabbing";
    };

    const moveDrag = (e) => {
      if (!isDragging) return;
      
      // Prevent browser scroll behaviors during drag
      if (e.cancelable) e.preventDefault();
      
      const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      const dx = clientX - startX;
      
      // Calculate rotation angle (0.6 degree per pixel)
      currentAngle = baseAngle + dx * 0.6;
      viewerInner.style.transform = `perspective(1000px) rotateY(${currentAngle}deg)`;
      
      // Swap images based on rotation to simulate front/back view
      if (imagesList.length > 1) {
        // Normalize angle to 0-359
        const normAngle = ((Math.round(currentAngle) % 360) + 360) % 360;
        if (normAngle > 90 && normAngle < 270) {
          viewerImg.src = imagesList[1];
        } else {
          viewerImg.src = imagesList[0];
        }
      }
    };

    const stopDrag = () => {
      isDragging = false;
      viewerElement.style.cursor = "grab";
    };

    // Attach mouse events
    viewerElement.addEventListener("mousedown", startDrag);
    window.addEventListener("mousemove", moveDrag, { passive: false });
    window.addEventListener("mouseup", stopDrag);

    // Attach touch events for mobile
    viewerElement.addEventListener("touchstart", startDrag, { passive: true });
    window.addEventListener("touchmove", moveDrag, { passive: false });
    window.addEventListener("touchend", stopDrag);
    
    // Set initial cursor
    viewerElement.style.cursor = "grab";
  }

  // Metal selection bindings
  let selectedMetal = "gold";
  document.querySelectorAll("#details-metal-select .metal-option").forEach(opt => {
    opt.addEventListener("click", () => {
      document.querySelectorAll("#details-metal-select .metal-option").forEach(o => o.classList.remove("active"));
      opt.classList.add("active");
      selectedMetal = opt.getAttribute("data-val");
    });
  });

  // Qty select bindings
  const qtyVal = document.getElementById("details-qty-val");
  document.getElementById("details-qty-minus").addEventListener("click", () => {
    let q = parseInt(qtyVal.value);
    if (q > 1) qtyVal.value = q - 1;
  });
  document.getElementById("details-qty-plus").addEventListener("click", () => {
    let q = parseInt(qtyVal.value);
    qtyVal.value = q + 1;
  });

  // Cart actions
  document.getElementById("details-add-cart").addEventListener("click", () => {
    const qty = parseInt(qtyVal.value);
    state.addToCart(product.id, qty, selectedMetal);
  });
  
  document.getElementById("details-buy-now").addEventListener("click", () => {
    const qty = parseInt(qtyVal.value);
    state.addToCart(product.id, qty, selectedMetal);
    window.location.hash = "#cart";
  });

  // Wishlist toggle binding
  document.getElementById("details-wish-toggle").addEventListener("click", () => {
    state.toggleWishlist(product.id);
  });

  // Share link binding
  document.getElementById("details-share-btn").addEventListener("click", () => {
    navigator.clipboard.writeText(window.location.href);
    showToast("Share link copied to clipboard!", "info");
  });

  // Review Stars interaction
  const ratingSelect = document.getElementById("rev-stars-select");
  const hiddenRating = document.getElementById("rev-rating");
  if (ratingSelect) {
    const stars = ratingSelect.querySelectorAll("span");
    stars.forEach((star, index) => {
      star.addEventListener("click", () => {
        // Highlight active stars
        hiddenRating.value = index + 1;
        stars.forEach((s, idx) => {
          if (idx <= index) {
            s.style.color = "var(--color-gold)";
          } else {
            s.style.color = "var(--color-border-dark)";
          }
        });
      });
    });
    // Set 5 star active by default
    stars.forEach(s => s.style.color = "var(--color-gold)");
  }

  // Handle Review submission
  document.getElementById("details-review-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("rev-name").value;
    const content = document.getElementById("rev-content").value;
    const rating = parseInt(hiddenRating.value);
    
    // Push simulated review
    product.reviews.unshift({
      name: name,
      date: "Today",
      rating: rating,
      content: content
    });
    product.reviewsCount += 1;
    
    showToast("Your review has been submitted for approval!", "success");
    e.target.reset();
    
    // Re-render to show updated reviews list
    renderProductDetails(params);
  });
}

// View 6: WISHLIST VIEW
function renderWishlist() {
  const wishItems = PRODUCTS.filter(p => state.wishlist.includes(p.id));
  
  if (wishItems.length === 0) {
    appContainer.innerHTML = `
      <div class="container text-center" style="padding:6rem 0;">
        <div class="empty-state">
          <i data-lucide="heart" style="width:64px; height:64px; color:var(--color-border); margin-bottom:1.5rem;"></i>
          <h2>Your Wishlist is Empty</h2>
          <p>Save pieces you love to keep track of them here.</p>
          <a href="#shop" class="btn btn-primary">Start Browsing</a>
        </div>
      </div>
    `;
    return;
  }

  appContainer.innerHTML = `
    <div class="container" style="padding:4rem 0;">
      <h1 style="font-size:3rem; text-align:center; margin-bottom:0.5rem;">Your Wishlist</h1>
      <p style="text-align:center; color:var(--color-muted); margin-bottom:4rem;">Exquisite selections saved for your upcoming celebrations.</p>
      
      <div class="products-grid">
        ${wishItems.map(p => `
          <div class="product-card">
            <div class="product-image-container">
              <a href="#product-details?id=${p.id}">
                <img src="${p.images[0]}" alt="${p.name}">
              </a>
              <button class="product-wishlist-toggle active wishlist-toggle-btn" data-id="${p.id}">
                <i data-lucide="heart"></i>
              </button>
            </div>
            <div class="product-info">
              <div class="product-category">${p.purity}</div>
              <h3 class="product-title"><a href="#product-details?id=${p.id}">${p.name}</a></h3>
              <div class="product-price-flex">
                <span class="product-price">$${p.price.toLocaleString()}</span>
              </div>
              <div style="margin-top:1.5rem; display:flex; gap:0.5rem;">
                <button class="btn btn-outline wish-add-cart-btn" data-id="${p.id}" style="padding:0.6rem 1.2rem; flex:1; font-size:0.75rem;">Add to Bag</button>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  // Attach button binding
  document.querySelectorAll(".wish-add-cart-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const pId = parseInt(btn.getAttribute("data-id"));
      state.addToCart(pId, 1, "gold");
    });
  });
}

// View 7: SHOPPING CART VIEW
function renderCart() {
  if (state.cart.length === 0) {
    appContainer.innerHTML = `
      <div class="container">
        <div class="empty-state">
          <i data-lucide="shopping-bag" style="width:64px; height:64px; color:var(--color-border); margin-bottom:1.5rem;"></i>
          <h2>Your Shopping Bag is Empty</h2>
          <p>Indulge yourself with a crafted jewelry selection.</p>
          <a href="#shop" class="btn btn-primary">Browse Collections</a>
        </div>
      </div>
    `;
    return;
  }

  const subtotal = state.getCartTotal();
  const tax = subtotal * 0.0825; // Simulated tax
  const delivery = subtotal > 500 ? "Complimentary" : 35;
  const total = subtotal + tax + (typeof delivery === 'number' ? delivery : 0);

  appContainer.innerHTML = `
    <div class="container">
      <h1 style="font-size:3rem; text-align:center; margin-bottom:0.5rem;">Your Shopping Bag</h1>
      <p style="text-align:center; color:var(--color-muted); margin-bottom:4rem;">Review and verify your selections before secure luxury check out.</p>

      <div class="cart-layout">
        
        <!-- Left: Cart Items Table -->
        <div class="cart-items-panel">
          <div class="cart-table-wrapper">
            <table class="cart-table">
              <thead>
                <tr>
                  <th>Composition</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                ${state.cart.map(item => `
                  <tr>
                    <td>
                      <div class="cart-product-flex">
                        <img src="${item.product.images[0]}" alt="${item.product.name}" class="cart-product-img">
                        <div class="cart-product-info">
                          <h4>${item.product.name}</h4>
                          <p class="cart-product-meta">Metal: <span style="text-transform:uppercase;">${item.metal}</span> | Purity: ${item.product.purity}</p>
                          <p class="cart-product-meta" style="font-weight:600; margin-top:0.3rem;">$${item.product.price.toLocaleString()}</p>
                          <button class="cart-remove-btn" data-id="${item.product.id}" data-metal="${item.metal}">
                            <i data-lucide="trash-2" style="width:12px; height:12px;"></i> Remove
                          </button>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div class="quantity-selector" style="width:fit-content;">
                        <button class="qty-btn cart-qty-minus" data-id="${item.product.id}" data-metal="${item.metal}">-</button>
                        <input type="text" value="${item.quantity}" readonly class="qty-input" style="width:40px;">
                        <button class="qty-btn cart-qty-plus" data-id="${item.product.id}" data-metal="${item.metal}">+</button>
                      </div>
                    </td>
                    <td>
                      <span class="cart-subtotal">$${(item.product.price * item.quantity).toLocaleString()}</span>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Right: Summary Card -->
        <aside class="cart-summary-card">
          <h3 class="summary-title">Order Summary</h3>
          
          <div class="summary-row">
            <span>Bag Subtotal</span>
            <span>$${subtotal.toLocaleString()}</span>
          </div>

          <div class="summary-row">
            <span>Signature Pack & Insured Delivery</span>
            <span>${typeof delivery === 'number' ? `$${delivery}` : delivery}</span>
          </div>

          <div class="summary-row">
            <span>Estimated VAT (8.25%)</span>
            <span>$${Math.round(tax).toLocaleString()}</span>
          </div>

          <!-- Coupon Code Entry -->
          <div class="coupon-section">
            <input type="text" placeholder="Promotional Code" class="coupon-input" id="cart-promo-code">
            <button class="coupon-btn" id="cart-promo-apply">Apply</button>
          </div>

          <div class="summary-row total-row">
            <span>Grand Total</span>
            <span>$${Math.round(total).toLocaleString()}</span>
          </div>

          <a href="#checkout" class="btn btn-primary" style="margin-top:1.5rem;">Proceed to Checkout</a>
        </aside>

      </div>
    </div>
  `;

  // Attach handlers
  document.querySelectorAll(".cart-remove-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const pId = parseInt(btn.getAttribute("data-id"));
      const metal = btn.getAttribute("data-metal");
      state.removeFromCart(pId, metal);
      renderCart();
    });
  });

  document.querySelectorAll(".cart-qty-minus").forEach(btn => {
    btn.addEventListener("click", () => {
      const pId = parseInt(btn.getAttribute("data-id"));
      const metal = btn.getAttribute("data-metal");
      const item = state.cart.find(i => i.product.id === pId && i.metal === metal);
      if (item && item.quantity > 1) {
        state.updateCartQuantity(pId, metal, item.quantity - 1);
        renderCart();
      }
    });
  });

  document.querySelectorAll(".cart-qty-plus").forEach(btn => {
    btn.addEventListener("click", () => {
      const pId = parseInt(btn.getAttribute("data-id"));
      const metal = btn.getAttribute("data-metal");
      const item = state.cart.find(i => i.product.id === pId && i.metal === metal);
      if (item) {
        state.updateCartQuantity(pId, metal, item.quantity + 1);
        renderCart();
      }
    });
  });

  document.getElementById("cart-promo-apply")?.addEventListener("click", () => {
    const promo = document.getElementById("cart-promo-code").value.trim().toUpperCase();
    if (promo === "AURELIA10") {
      showToast("Promotion code AURELIA10 applied successfully! 10% discount has been logged.", "success");
    } else {
      showToast("Invalid promotion or vault coupon code.", "error");
    }
  });
}

// View 8: CHECKOUT PAGE
function renderCheckout() {
  if (state.cart.length === 0) {
    window.location.hash = "#cart";
    return;
  }

  const subtotal = state.getCartTotal();
  const tax = subtotal * 0.0825;
  const delivery = subtotal > 500 ? 0 : 35;
  const total = subtotal + tax + delivery;

  appContainer.innerHTML = `
    <div class="container">
      <h1 style="font-size:3rem; text-align:center; margin-bottom:0.5rem;">Secure Checkout</h1>
      <p style="text-align:center; color:var(--color-muted); margin-bottom:4rem;">Verify shipping and input payment to secure your vault packaging.</p>

      <div class="checkout-layout">
        
        <!-- Left: Form inputs -->
        <main class="checkout-form-panel">
          <form id="checkout-main-form">
            
            <!-- Shipping Information -->
            <div class="checkout-section">
              <h3 class="checkout-section-title">Shipping Address</h3>
              <div class="form-grid">
                <div class="input-group">
                  <label for="co-fname">First Name</label>
                  <input type="text" id="co-fname" required value="${state.currentUser ? state.currentUser.name : ''}">
                </div>
                <div class="input-group">
                  <label for="co-lname">Last Name</label>
                  <input type="text" id="co-lname" required>
                </div>
                <div class="input-group full-width">
                  <label for="co-address">Street Address</label>
                  <input type="text" id="co-address" required value="${state.currentUser ? state.currentUser.address : ''}">
                </div>
                <div class="input-group">
                  <label for="co-city">City</label>
                  <input type="text" id="co-city" required>
                </div>
                <div class="input-group">
                  <label for="co-state">State / Province</label>
                  <input type="text" id="co-state" required>
                </div>
                <div class="input-group">
                  <label for="co-zip">Zip / Postal Code</label>
                  <input type="text" id="co-zip" required>
                </div>
                <div class="input-group">
                  <label for="co-phone">Phone Number</label>
                  <input type="tel" id="co-phone" required>
                </div>
              </div>
            </div>

            <!-- Shipping Delivery Methods -->
            <div class="checkout-section">
              <h3 class="checkout-section-title">Delivery Method</h3>
              <div class="radio-options">
                
                <div class="radio-option-card active" data-val="standard">
                  <input type="radio" name="shipping-method" id="ship-std" checked>
                  <div class="radio-meta-flex">
                    <div>
                      <span class="radio-meta-title">Complimentary Insured Delivery</span>
                      <p class="radio-meta-desc">Delivered via Fedex Overnight with Signature Required. Takes 2-3 business days.</p>
                    </div>
                    <span class="radio-meta-price">Free</span>
                  </div>
                </div>

                <div class="radio-option-card" data-val="express">
                  <input type="radio" name="shipping-method" id="ship-exp">
                  <div class="radio-meta-flex">
                    <div>
                      <span class="radio-meta-title">Premium Armored Express Delivery</span>
                      <p class="radio-meta-desc">Next morning direct armored delivery, signature verification only. GPS tracked.</p>
                    </div>
                    <span class="radio-meta-price">$75</span>
                  </div>
                </div>

              </div>
            </div>

            <!-- Payment Information -->
            <div class="checkout-section">
              <h3 class="checkout-section-title">Secure Payment</h3>
              <div class="form-grid">
                <div class="input-group full-width">
                  <label for="co-card-name">Name on Card</label>
                  <input type="text" id="co-card-name" required>
                </div>
                <div class="input-group full-width">
                  <label for="co-card-num">Credit Card Number</label>
                  <input type="text" id="co-card-num" placeholder="•••• •••• •••• ••••" required>
                </div>
                <div class="input-group">
                  <label for="co-card-exp">Expiration Date</label>
                  <input type="text" id="co-card-exp" placeholder="MM / YY" required>
                </div>
                <div class="input-group">
                  <label for="co-card-cvv">Security Code (CVV)</label>
                  <input type="password" id="co-card-cvv" placeholder="•••" required>
                </div>
              </div>
            </div>

            <button type="submit" class="btn btn-primary" style="width:100%; margin-top:2rem;">Securely Place Order</button>

          </form>
        </main>

        <!-- Right: Summary Order Summary -->
        <aside class="checkout-summary-panel">
          <div class="cart-summary-card" style="width:100%;">
            <h3 class="summary-title">Items Review</h3>
            
            <div class="checkout-items-list">
              ${state.cart.map(item => `
                <div class="checkout-item-row">
                  <img src="${item.product.images[0]}" alt="${item.product.name}" class="checkout-item-img">
                  <div class="checkout-item-info">
                    <span class="checkout-item-name">${item.product.name}</span>
                    <p class="checkout-item-meta">Qty: ${item.quantity} | Metal: <span style="text-transform:uppercase;">${item.metal}</span></p>
                  </div>
                  <span class="checkout-item-price">$${(item.product.price * item.quantity).toLocaleString()}</span>
                </div>
              `).join('')}
            </div>

            <div class="summary-row" style="border-top:1px solid var(--color-border); padding-top:1.5rem;">
              <span>Subtotal</span>
              <span>$${subtotal.toLocaleString()}</span>
            </div>
            
            <div class="summary-row">
              <span>Insured Delivery</span>
              <span id="co-delivery-charge">$0</span>
            </div>

            <div class="summary-row">
              <span>Estimated VAT (8.25%)</span>
              <span>$${Math.round(tax).toLocaleString()}</span>
            </div>

            <div class="summary-row total-row">
              <span>Grand Total</span>
              <span id="co-grand-total">$${Math.round(total).toLocaleString()}</span>
            </div>

          </div>
        </aside>

      </div>
    </div>
  `;

  // Handle Radio interactions
  let deliveryFee = 0;
  const deliveryNode = document.getElementById("co-delivery-charge");
  const totalNode = document.getElementById("co-grand-total");

  document.querySelectorAll(".radio-option-card").forEach(card => {
    card.addEventListener("click", () => {
      document.querySelectorAll(".radio-option-card").forEach(c => c.classList.remove("active"));
      card.classList.add("active");
      const val = card.getAttribute("data-val");
      const radioBtn = card.querySelector("input[type='radio']");
      if (radioBtn) radioBtn.checked = true;

      if (val === "express") {
        deliveryFee = 75;
        deliveryNode.textContent = "$75";
      } else {
        deliveryFee = 0;
        deliveryNode.textContent = "$0";
      }
      totalNode.textContent = `$${Math.round(total + deliveryFee).toLocaleString()}`;
    });
  });

  // Checkout submission
  document.getElementById("checkout-main-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const address = document.getElementById("co-address").value;
    const cardNum = document.getElementById("co-card-num").value;
    const orderId = state.placeOrder(address, `Card ending in ${cardNum.slice(-4)}`);
    
    // Display Order Confirmation View
    renderOrderConfirmation(orderId, address);
  });
}

// View helper: Renders Order confirmation page
function renderOrderConfirmation(orderId, address) {
  appContainer.innerHTML = `
    <div class="container">
      <div class="confirmation-card">
        <i data-lucide="check-circle" style="width:64px; height:64px; display:inline-block; color:var(--color-gold);"></i>
        <h1>Your Order is Confirmed</h1>
        <p>Thank you for shopping with Aurelia Jewels. Your order has been registered, and our artisans have been dispatched to inspect your creations.</p>
        
        <div class="order-details-block">
          <div><strong>Order Number:</strong> ${orderId}</div>
          <div><strong>Estimated Ship Date:</strong> 2-3 Business Days</div>
          <div><strong>Delivery Address:</strong> ${address}</div>
          <div><strong>Shipping Status:</strong> Processing (Insured Signature Required)</div>
        </div>

        <p style="font-size:0.9rem; color:var(--color-muted); margin-bottom:2rem;">A copy of your certificate of authenticity and tracking details has been sent to your email.</p>

        <div style="display:flex; justify-content:center; gap:1.5rem;">
          <a href="#order-tracking?id=${orderId}" class="btn btn-primary">Track Order Progress</a>
          <a href="#home" class="btn btn-outline">Back to Home</a>
        </div>
      </div>
    </div>
  `;
  lucide.createIcons();
}

// View 9: USER ACCOUNT DASHBOARD
function renderDashboard() {
  if (!state.currentUser) {
    window.location.hash = "#login";
    return;
  }

  appContainer.innerHTML = `
    <div class="container">
      <h1 style="font-size:3rem; margin-bottom:0.5rem; text-align:center;">Client Portal</h1>
      <p style="text-align:center; color:var(--color-muted); margin-bottom:4rem;">Manage your private credentials, watch list, and custom orders.</p>

      <div class="dashboard-layout">
        
        <!-- Sidebar Navigation -->
        <aside class="dashboard-sidebar">
          <div class="user-profile-summary">
            <div class="user-avatar-circle">${state.currentUser.name.charAt(0)}</div>
            <div class="user-name">${state.currentUser.name}</div>
            <div class="user-email">${state.currentUser.email}</div>
          </div>
          
          <nav class="dashboard-menu">
            <button class="dashboard-tab-btn active" data-tab="db-profile"><i data-lucide="user" style="width:16px; height:16px;"></i> Profile Information</button>
            <button class="dashboard-tab-btn" data-tab="db-orders"><i data-lucide="package" style="width:16px; height:16px;"></i> Order History</button>
            <button class="dashboard-tab-btn" data-tab="db-wishlist"><i data-lucide="heart" style="width:16px; height:16px;"></i> Wishlist Watch</button>
            <button class="dashboard-tab-btn" data-tab="db-addresses"><i data-lucide="map-pin" style="width:16px; height:16px;"></i> Vault Addresses</button>
            <button class="dashboard-tab-btn" data-tab="db-cards"><i data-lucide="credit-card" style="width:16px; height:16px;"></i> Saved Payments</button>
            <button class="dashboard-tab-btn" data-tab="db-settings"><i data-lucide="settings" style="width:16px; height:16px;"></i> Preferences</button>
            <button class="dashboard-tab-btn" id="db-logout" style="color:var(--color-rose-gold); margin-top:2rem;"><i data-lucide="log-out" style="width:16px; height:16px;"></i> Secure Logout</button>
          </nav>
        </aside>

        <!-- Panels Container -->
        <main class="dashboard-main">
          
          <!-- Panel 1: Profile -->
          <div class="dashboard-panel active" id="db-profile">
            <h2>Profile Details</h2>
            <form id="db-profile-form">
              <div class="form-grid">
                <div class="input-group">
                  <label for="db-name">Full Name</label>
                  <input type="text" id="db-name" value="${state.currentUser.name}" required>
                </div>
                <div class="input-group">
                  <label for="db-email">Email Address</label>
                  <input type="email" id="db-email" value="${state.currentUser.email}" required readonly>
                </div>
                <div class="input-group">
                  <label for="db-pw-new">New Password (leave empty to keep current)</label>
                  <input type="password" id="db-pw-new">
                </div>
              </div>
              <button type="submit" class="btn btn-primary" style="margin-top:1.5rem;">Update Profile Details</button>
            </form>
          </div>

          <!-- Panel 2: Orders -->
          <div class="dashboard-panel" id="db-orders">
            <h2>Your Orders</h2>
            ${state.orders.length === 0 ? `
              <p>You have not placed any custom jewelry orders yet.</p>
            ` : `
              <table class="orders-table">
                <thead>
                  <tr>
                    <th>Order Number</th>
                    <th>Date Placed</th>
                    <th>Compositions</th>
                    <th>Total</th>
                    <th>Shipment Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  ${state.orders.map(o => `
                    <tr>
                      <td><strong>${o.id}</strong></td>
                      <td>${o.date}</td>
                      <td>${o.items.join(', ')}</td>
                      <td>$${o.total.toLocaleString()}</td>
                      <td><span class="status-badge ${o.status}">${o.status}</span></td>
                      <td><a href="#order-tracking?id=${o.id}" class="text-link" style="font-size:0.8rem;">Track</a></td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            `}
          </div>

          <!-- Panel 3: Wishlist Watch -->
          <div class="dashboard-panel" id="db-wishlist">
            <h2>Your Watchlist</h2>
            <div id="dashboard-wishlist-grid">
              <!-- Reuses Wishlist renderer contents inside dashboard -->
              <p>Manage your items on the dedicated <a href="#wishlist" class="auth-link">Wishlist Page</a>.</p>
            </div>
          </div>

          <!-- Panel 4: Addresses -->
          <div class="dashboard-panel" id="db-addresses">
            <h2>Saved Shipping Locations</h2>
            <div class="addresses-grid">
              <div class="address-item-card default-address">
                <span class="address-tag">Default</span>
                <h4>Billing & Shipping Vault</h4>
                <p>${state.currentUser.address || 'No address logged yet.'}</p>
                <div style="margin-top:1rem; font-size:0.8rem;">
                  <a href="#" class="text-link" style="margin-right:1rem;">Edit Location</a>
                  <a href="#" class="text-link" style="color:var(--color-rose-gold);">Remove</a>
                </div>
              </div>
            </div>
          </div>

          <!-- Panel 5: Saved Payments -->
          <div class="dashboard-panel" id="db-cards">
            <h2>Payment Credentials</h2>
            <div class="cards-grid">
              ${state.currentUser.cards.length === 0 ? `
                <p>No credit card credentials logged.</p>
              ` : state.currentUser.cards.map(c => `
                <div class="card-item-card">
                  <i data-lucide="credit-card" class="card-icon"></i>
                  <div>
                    <div class="card-number">${c}</div>
                    <div class="card-expiry">Expires: 12 / 2029</div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Panel 6: Settings Preferences -->
          <div class="dashboard-panel" id="db-settings">
            <h2>Communication Settings</h2>
            <div class="checkbox-label" style="margin-bottom:1rem;">
              <input type="checkbox" id="pref-email" ${state.currentUser.notifications.email ? 'checked' : ''}>
              <span>Subscribed to Vault releases and private newsletter notices</span>
            </div>
            <div class="checkbox-label" style="margin-bottom:1rem;">
              <input type="checkbox" id="pref-sms" ${state.currentUser.notifications.sms ? 'checked' : ''}>
              <span>Text alert shipment tracking alerts (SMS)</span>
            </div>
            <button class="btn btn-primary" id="pref-save" style="margin-top:1.5rem;">Save Preferences</button>
          </div>

        </main>
      </div>
    </div>
  `;

  // Attach tab switching handlers
  document.querySelectorAll(".dashboard-tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const tabId = btn.getAttribute("data-tab");
      if (!tabId) return; // logout button has no tab

      // Toggle tab buttons
      document.querySelectorAll(".dashboard-tab-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      // Toggle panels
      document.querySelectorAll(".dashboard-panel").forEach(p => p.classList.remove("active"));
      document.getElementById(tabId).classList.add("active");
    });
  });

  // Logout binder
  document.getElementById("db-logout").addEventListener("click", () => {
    state.logout();
  });

  // Update profile handler
  document.getElementById("db-profile-form").addEventListener("submit", (e) => {
    e.preventDefault();
    state.currentUser.name = document.getElementById("db-name").value;
    localStorage.setItem("aurelia_user", JSON.stringify(state.currentUser));
    showToast("Profile details updated successfully.", "success");
    renderDashboard();
  });

  // Preferences save
  document.getElementById("pref-save")?.addEventListener("click", () => {
    state.currentUser.notifications.email = document.getElementById("pref-email").checked;
    state.currentUser.notifications.sms = document.getElementById("pref-sms").checked;
    localStorage.setItem("aurelia_user", JSON.stringify(state.currentUser));
    showToast("Communication preferences saved.", "success");
  });
}

// View 10: LOGIN PAGE
function renderLogin() {
  appContainer.innerHTML = `
    <div class="auth-container">
      <h2>Welcome Back</h2>
      <p>Log in to access your private orders, addresses, and saved collections.</p>
      
      <form class="auth-form" id="login-form">
        <div class="input-group">
          <label for="login-email">Email Address</label>
          <input type="email" id="login-email" required placeholder="name@example.com">
        </div>
        <div class="input-group">
          <label for="login-password">Password</label>
          <input type="password" id="login-password" required placeholder="••••••••">
        </div>
        
        <div class="auth-flex-row">
          <label class="checkbox-label" style="font-size:0.85rem;">
            <input type="checkbox" id="login-remember">
            <span>Remember Me</span>
          </label>
          <a href="#forgot-password" class="auth-link">Forgot Password?</a>
        </div>

        <button type="submit" class="btn btn-primary">Secure Login</button>
      </form>

      <div class="auth-footer">
        Don't have an Aurelia profile? <a href="#register" class="auth-link">Register Profile</a>
      </div>
    </div>
  `;

  // Attach submit handler
  document.getElementById("login-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    state.login(email, password);
  });
}

// View 11: REGISTER PAGE
function renderRegister() {
  appContainer.innerHTML = `
    <div class="auth-container">
      <h2>Create Profile</h2>
      <p>Register to preserve your watchlists, track custom designs, and secure priority vault access.</p>
      
      <form class="auth-form" id="register-form">
        <div class="input-group">
          <label for="reg-name">Full Name</label>
          <input type="text" id="reg-name" required placeholder="Eleanor Vance">
        </div>
        <div class="input-group">
          <label for="reg-email">Email Address</label>
          <input type="email" id="reg-email" required placeholder="eleanor@example.com">
        </div>
        <div class="input-group">
          <label for="reg-password">Password</label>
          <input type="password" id="reg-password" required placeholder="Minimum 8 characters">
        </div>
        
        <div class="checkbox-label" style="margin-top: 0.5rem; font-size:0.8rem;">
          <input type="checkbox" id="reg-agree" required>
          <span>I agree to the <a href="#terms-conditions" class="auth-link">Terms of Service</a> & <a href="#privacy-policy" class="auth-link">Privacy Policy</a></span>
        </div>

        <button type="submit" class="btn btn-primary">Create Profile</button>
      </form>

      <div class="auth-footer">
        Already registered? <a href="#login" class="auth-link">Log In</a>
      </div>
    </div>
  `;

  // Submit binder
  document.getElementById("register-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("reg-name").value;
    const email = document.getElementById("reg-email").value;
    const password = document.getElementById("reg-password").value;
    state.register(name, email, password);
  });
}

// View 12: FORGOT PASSWORD
function renderForgotPassword() {
  appContainer.innerHTML = `
    <div class="auth-container">
      <h2>Reset Password</h2>
      <p>Enter the email address logged with your profile. We will forward a secure credentials reset link immediately.</p>
      
      <form class="auth-form" id="forgot-form">
        <div class="input-group">
          <label for="fg-email">Email Address</label>
          <input type="email" id="fg-email" required placeholder="name@example.com">
        </div>
        
        <button type="submit" class="btn btn-primary">Send Reset Link</button>
      </form>

      <div class="auth-footer" style="margin-top:2rem;">
        <a href="#login" class="auth-link">&larr; Back to Login</a>
      </div>
    </div>
  `;

  document.getElementById("forgot-form").addEventListener("submit", (e) => {
    e.preventDefault();
    showToast("A credentials reset link has been dispatched to your email address.", "success");
    e.target.reset();
  });
}

// View 13: CONTACT PAGE
function renderContact() {
  appContainer.innerHTML = `
    <div class="container" style="padding:4rem 0;">
      <h1 style="font-size:3.5rem; text-align:center; margin-bottom:0.5rem;">Contact Our Concierge</h1>
      <p style="text-align:center; color:var(--color-muted); margin-bottom:4rem;">Reach out to schedule private vault viewings, custom designs, or check custom orders.</p>

      <div class="contact-grid">
        
        <!-- Left: Form inputs -->
        <main class="contact-form-panel">
          <h2 style="font-size:2rem; margin-bottom:1.5rem;">Inquire with Us</h2>
          <form class="auth-form" id="contact-main-form" style="gap:1.2rem;">
            <div class="input-group">
              <label for="ct-name">Full Name</label>
              <input type="text" id="ct-name" required placeholder="Marcus Sterling">
            </div>
            <div class="input-group">
              <label for="ct-email">Email Address</label>
              <input type="email" id="ct-email" required placeholder="marcus@example.com">
            </div>
            <div class="input-group">
              <label for="ct-subject">Subject Inquiry</label>
              <select id="ct-subject">
                <option value="bespoke">Bespoke Design Service</option>
                <option value="appointment">Private Vault Appointment</option>
                <option value="order">Order Tracking & Support</option>
                <option value="media">Press & Media</option>
              </select>
            </div>
            <div class="input-group">
              <label for="ct-msg">Inquiry Details</label>
              <textarea id="ct-msg" required placeholder="Describe your design specifications or schedule preference..." style="height:150px; padding:0.8rem; border:1px solid var(--color-border); font-family:inherit; font-size:0.9rem;"></textarea>
            </div>

            <button type="submit" class="btn btn-primary" style="margin-top:1rem;">Submit Inquiry</button>
          </form>
        </main>

        <!-- Right: Info cards & Maps -->
        <aside class="contact-info-block">
          
          <div class="info-item">
            <i data-lucide="phone-call"></i>
            <div>
              <h3>Direct Consultation Line</h3>
              <p>+1 (800) AURELIA (287-3542)</p>
              <p style="font-size:0.85rem; color:var(--color-muted);">Monday - Saturday: 9:00 AM - 7:00 PM PST</p>
            </div>
          </div>

          <div class="info-item">
            <i data-lucide="mail"></i>
            <div>
              <h3>Digital Communications</h3>
              <p>concierge@aureliajewels.com</p>
              <p style="font-size:0.85rem; color:var(--color-muted);">Average response time: Within 12 hours.</p>
            </div>
          </div>

          <!-- Maps placeholder -->
          <div class="contact-map-placeholder">
            <i data-lucide="map-pin" style="width:32px; height:32px; color:var(--color-gold); margin-bottom:0.5rem;"></i>
            <h4>The Beverly Hills Atelier</h4>
            <p>9400 Wilshire Boulevard, Beverly Hills, CA 90212</p>
            <p style="font-size:0.8rem; color:var(--color-muted); margin-top:0.5rem;">Appointments only. Secure valets parking available.</p>
          </div>

        </aside>

      </div>
    </div>
  `;

  // Form submit handler
  document.getElementById("contact-main-form").addEventListener("submit", (e) => {
    e.preventDefault();
    showToast("Thank you. Your inquiry has been forwarded to our Beverly Hills Concierge team.", "success");
    e.target.reset();
  });
}

// View 14: BLOG ARCHIVE
function renderBlog(categoryFilter) {
  let posts = [...BLOG_POSTS];
  if (categoryFilter) {
    posts = posts.filter(p => p.category.toLowerCase().replace(" ", "-") === categoryFilter.toLowerCase());
  }

  appContainer.innerHTML = `
    <div class="container" style="padding:4rem 0;">
      <h1 style="font-size:3.5rem; text-align:center; margin-bottom:0.5rem;">The Aurelia Notebook</h1>
      <p style="text-align:center; color:var(--color-muted); margin-bottom:4rem;">A curated chronicle of jewelry care, buying tutorials, and bridal inspirations.</p>

      <div class="blog-categories">
        <a href="#blog" class="category-tab ${!categoryFilter ? 'active' : ''}">All Articles</a>
        <a href="#blog?cat=buying-guide" class="category-tab ${categoryFilter === 'buying-guide' ? 'active' : ''}">Buying Guides</a>
        <a href="#blog?cat=jewelry-care" class="category-tab ${categoryFilter === 'jewelry-care' ? 'active' : ''}">Jewelry Care</a>
        <a href="#blog?cat=diamond-guide" class="category-tab ${categoryFilter === 'diamond-guide' ? 'active' : ''}">Diamond Guides</a>
      </div>

      <div class="blog-grid">
        ${posts.map(p => `
          <article class="blog-card">
            <div class="blog-img">
              <a href="#article?id=${p.id}">
                <img src="${p.image}" alt="${p.title}">
              </a>
            </div>
            <div class="blog-card-content">
              <span class="blog-date">${p.date} | ${p.category}</span>
              <h3><a href="#article?id=${p.id}">${p.title}</a></h3>
              <p>${p.excerpt}</p>
              <a href="#article?id=${p.id}" class="text-link">Read Article &rarr;</a>
            </div>
          </article>
        `).join('')}
      </div>
    </div>
  `;
}

// View 15: ARTICLE READER
function renderArticle(params) {
  const artId = parseInt(params.id);
  const post = BLOG_POSTS.find(p => p.id === artId);
  if (!post) {
    appContainer.innerHTML = `
      <div class="container text-center" style="padding:6rem 0;">
        <h2>Article not found</h2>
        <a href="#blog" class="btn btn-primary">Back to Notebook</a>
      </div>
    `;
    return;
  }

  appContainer.innerHTML = `
    <article class="article-container">
      <div class="article-header">
        <span class="article-meta">${post.category} | ${post.date}</span>
        <h1>${post.title}</h1>
        <div class="article-author-flex">
          <span>By ${post.author}</span>
          <span>•</span>
          <span>5 Min Read</span>
        </div>
      </div>
      
      <div class="article-hero-img">
        <img src="${post.image}" alt="${post.title}">
      </div>

      <div class="article-body">
        ${post.body}
      </div>

      <div style="border-top:1px solid var(--color-border); padding-top:3rem; margin-top:4rem; text-align:center;">
        <a href="#blog" class="btn btn-outline">Back to Notebook</a>
      </div>
    </article>
  `;
}

// View 16: FAQ PAGE (ACCORDION)
function renderFaq() {
  const faqs = [
    { q: "How are Aurelia Jewels items shipped?", a: "Every order is packaged in our signature suede velvet presentation box, completely insured during transit, and shipped via expedited carrier (Fedex Overnight or UPS Next Day Air). A signature validation is strictly required upon delivery to ensure safety." },
    { q: "Do your diamonds arrive with certification?", a: "Yes. Every solitaire diamond and fine gemstone over 0.5 carats is accompanied by an official certificate of authenticity from the Gemological Institute of America (GIA) or International Gemological Institute (IGI)." },
    { q: "What is your return & exchange window?", a: "We offer a complimentary 30-day return policy. Items must be returned in their original unworn condition with the security tag intact. Custom designs or engraved products are eligible for metal recycling credit but not full refund." },
    { q: "Can I customize the metal purity or size?", a: "Absolutely. Our Beverly Hills Atelier caters to custom requests. We offer adjustments in ring sizes, chain lengths, metal switches (e.g. Yellow Gold to Platinum), and carat selections. Please reach out via our Inquire form." }
  ];

  appContainer.innerHTML = `
    <div class="faq-container">
      <h1 style="font-size:3.5rem; text-align:center; margin-bottom:0.5rem;">Frequently Answered Questions</h1>
      <p style="text-align:center; color:var(--color-muted); margin-bottom:4rem;">Find answers to billing, warranty, custom designs, and secure logistics.</p>

      <div class="faq-accordion">
        ${faqs.map((faq, i) => `
          <div class="faq-item" data-index="${i}">
            <button class="faq-question">
              <span>${faq.q}</span>
              <i data-lucide="plus"></i>
            </button>
            <div class="faq-answer">
              <p>${faq.a}</p>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  // Attach accordion behaviors
  document.querySelectorAll(".faq-question").forEach(btn => {
    btn.addEventListener("click", () => {
      const parent = btn.parentElement;
      const isOpen = parent.classList.contains("active");

      // Close all
      document.querySelectorAll(".faq-item").forEach(item => item.classList.remove("active"));
      
      if (!isOpen) {
        parent.classList.add("active");
      }
    });
  });
}

// View 17: PRIVACY POLICY
function renderPrivacyPolicy() {
  appContainer.innerHTML = `
    <div class="policy-container">
      <h1>Privacy Policy</h1>
      <div class="policy-last-updated">Last Updated: July 22, 2026</div>
      <div class="policy-content">
        <p>At Aurelia Jewels, safeguarding your private information is a foundational core value. This Privacy Policy details how we collect, store, encrypt, and manage data gathered during your visit to our digital galleries or atelier consultations.</p>
        <h2>Information We Collect</h2>
        <p>We receive and collect information including full name, billing details, courier addresses, email addresses, phone contacts, and browser cookies. This data is strictly utilized to process orders, verify secure transactions, and ship high-value packages securely.</p>
        <h2>Data Preservation & Security</h2>
        <p>Aurelia Jewels utilizes secure tokenized merchant protocols (Stripe PCI compliant) to process payments. We never store raw credit card numbers on our local databases. All browser communications are encrypted using standard 256-bit Secure Sockets Layer (SSL) certificate handshakes.</p>
      </div>
    </div>
  `;
}

// View 18: TERMS & CONDITIONS
function renderTermsConditions() {
  appContainer.innerHTML = `
    <div class="policy-container">
      <h1>Terms & Conditions</h1>
      <div class="policy-last-updated">Last Updated: July 22, 2026</div>
      <div class="policy-content">
        <p>By entering, exploring, or purchasing from Aurelia Jewels, you consent to our legal terms. Please review the following operating bylaws carefully.</p>
        <h2>Bespoke Orders & Customization</h2>
        <p>Bespoke commissions require a 50% non-refundable design deposit before metal castings are prepared. The remaining 50% is billed upon visual inspection approval prior to secure courier dispatch.</p>
        <h2>Valuation & Price Accuracy</h2>
        <p>Precious metals and fine diamonds fluctuate on international markets daily. We make every effort to display accurate retail pricing, but preserve the right to adjust, modify, or cancel orders containing clerical pricing errors.</p>
      </div>
    </div>
  `;
}

// View 19: SHIPPING POLICY
function renderShippingPolicy() {
  appContainer.innerHTML = `
    <div class="policy-container">
      <h1>Shipping & Delivery Policy</h1>
      <div class="policy-last-updated">Last Updated: July 22, 2026</div>
      <div class="policy-content">
        <p>Aurelia Jewels operates in conjunction with premium logistic networks to assure safe, fully-insured delivery of high-value commodities.</p>
        <h2>Insured Transit & Packages</h2>
        <p>Every shipment from our atelier is fully insured against theft, loss, or damage during transit. The package is completely anonymous from the outside (bearing no brand text) to prevent tampering.</p>
        <h2>Signature Requirement</h2>
        <p>An adult signature validation is strictly required upon delivery. Courier workers are forbidden from leaving packaging on doorsteps, mailrooms, or building reception desks without secure physical signature receipts.</p>
      </div>
    </div>
  `;
}

// View 20: RETURN POLICY
function renderReturnPolicy() {
  appContainer.innerHTML = `
    <div class="policy-container">
      <h1>Returns & Exchange Policy</h1>
      <div class="policy-last-updated">Last Updated: July 22, 2026</div>
      <div class="policy-content">
        <p>We take pride in our artistry. If you are not completely enchanted by your selection, we facilitate a seamless returns workflow.</p>
        <h2>30-Day Window</h2>
        <p>Standard pieces in original unworn condition (bearing our secure red tags intact) are eligible for return or exchange within 30 days of shipment receipt. Returns must be accompanied by the original GIA diamond grading reports.</p>
        <h2>Restocking & Exclusions</h2>
        <p>Custom carved bands, custom sizes under 5.0 or over 8.5, and engraved pieces are considered final sale. They are ineligible for cash refunds, but can be recycled for material trade-in value.</p>
      </div>
    </div>
  `;
}

// View 21: ORDER TRACKING PAGE
function renderOrderTracking(params) {
  const oId = params.id || "";
  let activeMilestone = 1; 
  let orderFound = null;

  if (oId) {
    orderFound = state.orders.find(o => o.id === oId);
    if (orderFound) {
      if (orderFound.status === "delivered") activeMilestone = 4;
      else if (orderFound.status === "shipped") activeMilestone = 3;
      else activeMilestone = 2; // processing
    }
  }

  appContainer.innerHTML = `
    <div class="tracking-container">
      <h2 style="font-size:2.2rem; margin-bottom:1rem; text-align:center;">Track Order Status</h2>
      <p style="color:var(--color-muted); text-align:center; margin-bottom:2rem;">Enter your order identification number below to verify fabrication updates.</p>

      <form class="tracking-search-form" id="tracking-form">
        <div class="input-group">
          <label for="tk-order-id">Order ID</label>
          <input type="text" id="tk-order-id" placeholder="e.g. AJ-98421" value="${oId}" required>
        </div>
        <button type="submit" class="btn btn-primary">Track Order</button>
      </form>

      ${oId ? `
        <div style="border-top:1px solid var(--color-border); padding-top:2rem;">
          <h3 style="font-size:1.3rem; margin-bottom:1rem;">Tracking Details for Order: ${oId}</h3>
          
          ${orderFound ? `
            <div style="margin-bottom:2rem; font-size:0.9rem; color:var(--color-muted);">
              <div><strong>Order Items:</strong> ${orderFound.items.join(', ')}</div>
              <div><strong>Order Date:</strong> ${orderFound.date}</div>
              <div><strong>Value:</strong> $${orderFound.total.toLocaleString()}</div>
            </div>
          ` : `
            <p style="color:var(--color-rose-gold); font-size:0.9rem; margin-bottom:2rem;">Notice: Order ID not found in system history. Showing default milestones tracker.</p>
          `}

          <!-- Progress milestone timeline -->
          <div class="tracking-milestones">
            
            <div class="milestone-step ${activeMilestone >= 1 ? 'completed' : ''}">
              <div class="milestone-dot"><i data-lucide="check"></i></div>
              <div class="milestone-details">
                <h4>Order Registered & Insured</h4>
                <p>Deposit secured. Gems and gold metals selected from vault stock.</p>
              </div>
            </div>

            <div class="milestone-step ${activeMilestone >= 2 ? (activeMilestone === 2 ? 'active' : 'completed') : ''}">
              <div class="milestone-dot"><i data-lucide="crown"></i></div>
              <div class="milestone-details">
                <h4>Atelier Fabrication & Inspection</h4>
                <p>Master jewelers casting gold and setting gems under microscopic alignment.</p>
              </div>
            </div>

            <div class="milestone-step ${activeMilestone >= 3 ? (activeMilestone === 3 ? 'active' : 'completed') : ''}">
              <div class="milestone-dot"><i data-lucide="truck"></i></div>
              <div class="milestone-details">
                <h4>Dispatched in Insured Armored Courier</h4>
                <p>Package boxed in signature suede cases, handed to priority carrier.</p>
              </div>
            </div>

            <div class="milestone-step ${activeMilestone >= 4 ? 'active' : ''}">
              <div class="milestone-dot"><i data-lucide="gift"></i></div>
              <div class="milestone-details">
                <h4>Delivered & Signature Logged</h4>
                <p>Package safely verification signed by client.</p>
              </div>
            </div>

          </div>

        </div>
      ` : ""}
    </div>
  `;

  // Bind tracking form submission
  document.getElementById("tracking-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const id = document.getElementById("tk-order-id").value.trim().toUpperCase();
    window.location.hash = `#order-tracking?id=${id}`;
  });
}


// --- 6. ROUTER ROUTING LOGIC ---
const ROUTES = {
  "#home": renderHome,
  "#about": renderAbout,
  "#shop": renderShop,
  "#collections": renderCollections,
  "#product-details": renderProductDetails,
  "#wishlist": renderWishlist,
  "#cart": renderCart,
  "#checkout": renderCheckout,
  "#dashboard": renderDashboard,
  "#login": renderLogin,
  "#register": renderRegister,
  "#forgot-password": renderForgotPassword,
  "#contact": renderContact,
  "#blog": renderBlog,
  "#article": renderArticle,
  "#faq": renderFaq,
  "#privacy-policy": renderPrivacyPolicy,
  "#terms-conditions": renderTermsConditions,
  "#shipping-policy": renderShippingPolicy,
  "#return-policy": renderReturnPolicy,
  "#order-tracking": renderOrderTracking
};

// Helper: Parses hash query variables (e.g. #shop?category=rings -> { category: 'rings' })
function parseHash(hash) {
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
  return { route, query };
}

// Global Nav Router
function router() {
  const currentHash = window.location.hash || "#home";
  const { route, query } = parseHash(currentHash);
  
  // Find matching view renderer
  const renderer = ROUTES[route] || renderHome;
  
  // Show page loader screen
  appContainer.innerHTML = `
    <div class="page-loader" style="display:flex; flex-direction:column; align-items:center; justify-content:center; padding:10rem 0;">
      <div class="skeleton" style="width:50px; height:50px; border-radius:50%; margin-bottom:1rem;"></div>
      <p style="font-family:var(--font-serif); font-size:1.1rem; color:var(--color-gold); letter-spacing:0.1em; text-transform:uppercase;">Entering Aurelia...</p>
    </div>
  `;

  setTimeout(() => {
    // Execute renderer
    renderer(query);
    
    // Refresh Icons
    lucide.createIcons();

    // Scroll to Top
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Update active class in Navigation Header
    document.querySelectorAll(".nav-link").forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === route) {
        link.classList.add("active");
      }
    });

    // Close Mobile Drawers
    closeMobileNav();

    // Bind Wishlist Toggles & Quick Actions generated in pages
    bindCardInteractions();
  }, 250);
}

// Bind quick actions on product cards dynamically
function bindCardInteractions() {
  // Wishlist Toggles
  document.querySelectorAll(".wishlist-toggle-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const pId = parseInt(btn.getAttribute("data-id"));
      state.toggleWishlist(pId);
    });
  });

  // Quick View Trigger
  document.querySelectorAll(".quick-view-trigger").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const pId = parseInt(btn.getAttribute("data-id"));
      openQuickView(pId);
    });
  });

  // Quick Add to Cart
  document.querySelectorAll(".add-to-cart-quick").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const pId = parseInt(btn.getAttribute("data-id"));
      state.addToCart(pId, 1, "gold");
    });
  });
}

// Mobile Menu Navigation Close
function closeMobileNav() {
  const drawer = document.getElementById("mobile-nav");
  const overlay = document.getElementById("mobile-overlay");
  if (drawer && overlay) {
    drawer.classList.remove("open");
    overlay.style.display = "none";
  }
}

// --- 7. QUICK-VIEW MODAL ENGINE ---
function openQuickView(productId) {
  const p = PRODUCTS.find(prod => prod.id === productId);
  if (!p) return;

  const contentDiv = document.getElementById("quick-view-content");
  const backdrop = document.getElementById("quick-view-backdrop");
  if (!contentDiv || !backdrop) return;

  contentDiv.innerHTML = `
    <!-- Gallery -->
    <div class="product-gallery" style="gap:0.5rem;">
      <div class="product-gallery-main" style="height:350px;">
        <img src="${p.images[0]}" alt="${p.name}" id="qv-main-img">
      </div>
      <div class="gallery-thumbnails" style="justify-content:center;">
        ${p.images.map(img => `
          <div class="thumbnail-item qv-thumb" data-src="${img}" style="width:60px; height:60px;">
            <img src="${img}" alt="Thumbnail">
          </div>
        `).join('')}
      </div>
    </div>
    
    <!-- Info panel -->
    <div class="details-info" style="justify-content:center; padding:1rem;">
      <span class="product-category" style="margin-bottom:0.5rem;">${p.purity}</span>
      <h3 style="font-size:1.8rem; margin-bottom:0.5rem; line-height:1.2;">${p.name}</h3>
      
      <div class="details-price" style="font-size:1.4rem; margin-bottom:1rem;">
        $${p.price.toLocaleString()}
      </div>

      <p class="details-description" style="font-size:0.85rem; margin-bottom:1.5rem; line-height:1.5;">${p.description.slice(0, 160)}...</p>

      <div class="purchase-controls" style="margin-bottom:1.5rem;">
        <button class="btn btn-primary" id="qv-add-to-bag" style="padding:0.7rem 1.5rem; font-size:0.75rem;">Add to Bag</button>
        <a href="#product-details?id=${p.id}" class="btn btn-outline" style="padding:0.7rem 1.5rem; font-size:0.75rem;">View Full Details</a>
      </div>
    </div>
  `;

  // Attach thumbnail clicks in Quick View
  contentDiv.querySelectorAll(".qv-thumb").forEach(thumb => {
    thumb.addEventListener("click", () => {
      const src = thumb.getAttribute("data-src");
      contentDiv.querySelector("#qv-main-img").setAttribute("src", src);
    });
  });

  // Add to Bag inside Quick View
  contentDiv.querySelector("#qv-add-to-bag").addEventListener("click", () => {
    state.addToCart(p.id, 1, "gold");
    backdrop.classList.remove("show");
  });

  backdrop.classList.add("show");
  lucide.createIcons();
}


// --- 8. INITIALIZATIONS & BINDINGS ON LOAD ---
document.addEventListener("DOMContentLoaded", () => {
  
  // Dynamic Router binds
  window.addEventListener("hashchange", router);
  router(); // First load

  // Header scroll effects
  const header = document.getElementById("main-header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
      document.getElementById("back-to-top").classList.add("show");
    } else {
      header.classList.remove("scrolled");
      document.getElementById("back-to-top").classList.remove("show");
    }
  });

  // Mobile Menu Drawer toggles
  const mobileToggle = document.getElementById("mobile-toggle");
  const closeMobile = document.getElementById("close-mobile-nav");
  const mobileNav = document.getElementById("mobile-nav");
  const mobileOverlay = document.getElementById("mobile-overlay");

  mobileToggle?.addEventListener("click", () => {
    mobileNav.classList.add("open");
    mobileOverlay.style.display = "block";
  });

  closeMobile?.addEventListener("click", closeMobileNav);
  mobileOverlay?.addEventListener("click", closeMobileNav);

  // Mobile Drawer Collapsible Sections
  document.querySelectorAll(".mobile-collapse-trigger").forEach(btn => {
    btn.addEventListener("click", () => {
      const content = btn.nextElementSibling;
      const isOpen = content.style.display === "flex";
      
      content.style.display = isOpen ? "none" : "flex";
      btn.querySelector("i").setAttribute("data-lucide", isOpen ? "plus" : "minus");
      lucide.createIcons();
    });
  });

  // Back to Top button action
  document.getElementById("back-to-top")?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Modal Closures (Quick View & Zoom)
  document.getElementById("quick-view-close")?.addEventListener("click", () => {
    document.getElementById("quick-view-backdrop").classList.remove("show");
  });
  
  document.getElementById("zoom-close")?.addEventListener("click", () => {
    document.getElementById("zoom-backdrop").classList.remove("show");
  });

  // Global Search Overlay Triggers
  const searchOverlay = document.getElementById("search-overlay");
  const searchInput = document.getElementById("search-input");
  const resultsGrid = document.getElementById("search-results-grid");

  document.getElementById("search-trigger")?.addEventListener("click", () => {
    searchOverlay.classList.add("open");
    searchInput.focus();
  });

  document.getElementById("search-close")?.addEventListener("click", () => {
    searchOverlay.classList.remove("open");
    searchInput.value = "";
    resultsGrid.innerHTML = "";
  });

  // Active search query filtration logic
  searchInput?.addEventListener("input", (e) => {
    const q = e.target.value.toLowerCase().trim();
    if (q.length < 2) {
      resultsGrid.innerHTML = "";
      return;
    }

    const matches = PRODUCTS.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );

    if (matches.length === 0) {
      resultsGrid.innerHTML = `<p style="grid-column: span 4; text-align:center; color:var(--color-muted); padding:3rem 0;">No matching luxury products found.</p>`;
    } else {
      resultsGrid.innerHTML = matches.map(p => `
        <div class="product-card" style="border:none;">
          <div class="product-image-container" style="height:150px;">
            <a href="#product-details?id=${p.id}" onclick="document.getElementById('search-close').click();">
              <img src="${p.images[0]}" alt="${p.name}">
            </a>
          </div>
          <div class="product-info" style="padding:0.8rem 0; text-align:left;">
            <h4 style="font-size:0.95rem; line-height:1.2;"><a href="#product-details?id=${p.id}" onclick="document.getElementById('search-close').click();">${p.name}</a></h4>
            <span style="font-size:0.85rem; font-weight:600;">$${p.price.toLocaleString()}</span>
          </div>
        </div>
      `).join('');
    }
  });

  // Suggestion tags bindings
  document.querySelectorAll(".suggestion-tag").forEach(tag => {
    tag.addEventListener("click", () => {
      const q = tag.getAttribute("data-query");
      searchInput.value = q;
      searchInput.dispatchEvent(new Event("input"));
    });
  });

  // Global newsletter submit form
  document.getElementById("newsletter-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    showToast("Subscription successful! Welcome to the Aurelia Circle.", "success");
    e.target.reset();
  });

  // Sync state values on initial boot
  state.updateBadges();
});
