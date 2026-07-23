export const PRODUCTS = [
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
    weight: "34.8g",
    rating: 5.0,
    reviewsCount: 4,
    badge: "Exclusive",
    images: [
      "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=600"
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

export const BLOG_POSTS = [
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
