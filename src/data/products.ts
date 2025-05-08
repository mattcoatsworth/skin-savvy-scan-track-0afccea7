
// Product interface
export interface Product {
  id: string;
  name: string;
  brand: string;
  rating: number;
  impact: "Positive" | "Neutral" | "Negative";
  description: string;
  image?: string;
  benefits?: string[];
  concerns?: string[];
}

// Food items data
export const foodItems: Product[] = [
  { 
    id: "avocado", 
    name: "Avocado", 
    brand: "Organic Produce",
    rating: 90, 
    impact: "Positive", 
    description: "High in healthy fats that improve skin elasticity",
    benefits: [
      "Rich in vitamin E that helps protect skin from oxidative damage",
      "Contains healthy fats that support skin barrier function",
      "Promotes collagen production for firmer skin"
    ]
  },
  { 
    id: "blueberries", 
    name: "Blueberries", 
    brand: "Fresh Farmers",
    rating: 85, 
    impact: "Positive", 
    description: "Antioxidants reduce inflammation",
    benefits: [
      "High in antioxidants that fight free radical damage",
      "Vitamin C content supports collagen synthesis",
      "Anti-inflammatory properties help reduce redness and swelling"
    ]
  },
  { 
    id: "dairy", 
    name: "Dairy", 
    brand: "Various",
    rating: 40, 
    impact: "Negative", 
    description: "Associated with breakouts along chin",
    concerns: [
      "Contains hormones that may trigger acne flare-ups",
      "Can increase inflammation in acne-prone skin",
      "May cause digestive issues that manifest on skin"
    ]
  },
  { 
    id: "sugary-drinks", 
    name: "Sugary Drinks", 
    brand: "Various",
    rating: 20, 
    impact: "Negative", 
    description: "Lead to increased redness and inflammation",
    concerns: [
      "High glycemic impact can trigger insulin response linked to acne",
      "Sugar promotes inflammation throughout the body, including skin",
      "Can accelerate aging by damaging collagen and elastin"
    ]
  }
];

// Skincare product items data
export const productItems: Product[] = [
  { 
    id: "hyaluronic-acid-serum", 
    name: "Hyaluronic Acid Serum", 
    brand: "SkinCeuticals",
    rating: 80, 
    impact: "Positive", 
    description: "Improved hydration levels",
    benefits: [
      "Attracts and retains moisture in the skin",
      "Plumps fine lines and wrinkles",
      "Improves skin barrier function"
    ]
  },
  { 
    id: "vitamin-c-moisturizer", 
    name: "Vitamin C Moisturizer", 
    brand: "Clinique",
    rating: 75, 
    impact: "Positive", 
    description: "Brighter complexion after 3 weeks",
    benefits: [
      "Brightens skin tone and reduces hyperpigmentation",
      "Protects against environmental damage",
      "Stimulates collagen production for firmer skin"
    ]
  },
  { 
    id: "charcoal-mask", 
    name: "Charcoal Mask", 
    brand: "Origins",
    rating: 65, 
    impact: "Neutral", 
    description: "Temporary pore reduction",
    benefits: [
      "Absorbs excess oil and impurities",
      "Helps clear congested pores"
    ],
    concerns: [
      "May be drying if used too frequently",
      "Benefits are mostly temporary"
    ]
  },
  { 
    id: "retinol-cream", 
    name: "Retinol Cream", 
    brand: "La Roche-Posay",
    rating: 85, 
    impact: "Positive", 
    description: "Reduced fine lines and improved texture",
    benefits: [
      "Accelerates cell turnover for renewed skin",
      "Helps fade dark spots and hyperpigmentation",
      "Improves skin texture over time",
      "Reduces appearance of fine lines and wrinkles"
    ],
    concerns: [
      "Can cause irritation and dryness when first starting",
      "Makes skin more sensitive to sun exposure"
    ]
  }
];
