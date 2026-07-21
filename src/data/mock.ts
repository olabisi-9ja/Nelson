import type {
  Collection,
  Commission,
  Course,
  Customer,
  Film,
  JournalPost,
  Order,
  Product,
  Testimonial,
} from "@/types";

export const collections: Collection[] = [
  {
    id: "c1",
    slug: "oxford",
    name: "Oxford",
    subtitle: "The language of power",
    description:
      "Closed-lacing elegance for boardrooms, ballrooms, and moments that define legacies.",
    history:
      "Born in the 19th-century halls of Oxford University, the Oxford became the definitive formal shoe. Nelson reinterprets it with Nigerian precision.",
    craftStory:
      "Each Oxford requires over 200 hand-sewn stitches, a single piece of full-grain calf, and three days of burnishing.",
    image: "/images/oxford-shoe.jpg",
    banner: "/images/oxford-shoe.jpg",
    products: ["p1", "p5"],
  },
  {
    id: "c2",
    slug: "chelsea",
    name: "Chelsea",
    subtitle: "Effortless sophistication",
    description:
      "An ankle-hugging silhouette that moves from atelier to avenue with quiet confidence.",
    history:
      "A Victorian riding boot reborn for the modern maverick. Elasticated panels, clean lines, no compromise.",
    craftStory:
      "We cut the elastic by hand and fit it into a hand-burnished counter for flexibility that lasts decades.",
    image: "/images/chelsea-boot.jpg",
    banner: "/images/chelsea-boot.jpg",
    products: ["p2"],
  },
  {
    id: "c3",
    slug: "loafers",
    name: "Loafers",
    subtitle: "Relaxed refinement",
    description:
      "The shoe that slips on and elevates everything. Crafted for comfort, designed for distinction.",
    history:
      "From Norwegian farmers to Hollywood royalty, the loafer is a global icon of leisure.",
    craftStory:
      "Our loafer lasts are sculpted for barefoot comfort, lined with supple kid leather.",
    image: "/images/loafer.jpg",
    banner: "/images/loafer.jpg",
    products: ["p3"],
  },
  {
    id: "c4",
    slug: "boots",
    name: "Boots",
    subtitle: "Built for legacy",
    description:
      "Commanding silhouettes in heavyweight leather, constructed to outlast seasons.",
    history: "Boots have carried kings, soldiers, and pioneers. Ours carry the future.",
    craftStory:
      "Hand-lasted uppers, stacked leather heels, and storm welts for weatherproof elegance.",
    image: "/images/chelsea-boot.jpg",
    banner: "/images/chelsea-boot.jpg",
    products: ["p4"],
  },
  {
    id: "c5",
    slug: "formal",
    name: "Formal",
    subtitle: "Black tie, elevated",
    description:
      "Patent, wholecut, and opera pumps for occasions where only perfection will do.",
    history: "The pinnacle of men's dress footwear, reimagined with Nigerian soul.",
    craftStory:
      "Wholecut formal shoes are crafted from a single flawless skin, zero visible seams.",
    image: "/images/product-hero.jpg",
    banner: "/images/product-hero.jpg",
    products: ["p5"],
  },
  {
    id: "c6",
    slug: "limited-editions",
    name: "Limited Editions",
    subtitle: "Rare by design",
    description:
      "Small batches, experimental materials, and collaborations reserved for collectors.",
    history: "Each release tells a singular story and will never be reproduced.",
    craftStory:
      "We prototype for months, source rare skins ethically, and number every pair.",
    image: "/images/hero-workshop.jpg",
    banner: "/images/hero-workshop.jpg",
    products: ["p6"],
  },
];

export const products: Product[] = [
  {
    id: "p1",
    slug: "regent-oxford",
    name: "The Regent Oxford",
    collection: "Oxford",
    price: 125000,
    image: "/images/oxford-shoe.jpg",
    images: ["/images/oxford-shoe.jpg", "/images/product-hero.jpg"],
    description:
      "A wholecut Oxford cut from a single piece of black box calf. Sleek, uncompromising, eternal.",
    craftStory:
      "Patterned from a single skin, hand-lasted for 72 hours, and finished with museum patina.",
    materials: [
      "Full-grain Italian box calf",
      "Full leather lining",
      "Cork footbed",
      "Hand-stitched outsole",
    ],
    construction: [
      "Hand-lasted on a refined chisel last",
      "Blake-rapid stitched construction",
      "Hand-burnished toe and heel",
      "Waxed cotton laces",
    ],
    specifications: {
      Fit: "True to size",
      Width: "E / Standard",
      Last: "Chisel",
      Sole: "Leather with rubber injection",
      Weight: "380g per shoe",
    },
    reviews: [
      { id: "r1", author: "O. Adewale", rating: 5, text: "Worth every naira. Fit like a glove.", date: "2026-01-12" },
      { id: "r2", author: "J. Okonkwo", rating: 5, text: "True bespoke craft. The patina is art.", date: "2026-02-04" },
    ],
  },
  {
    id: "p2",
    slug: "duke-chelsea",
    name: "The Duke Chelsea",
    collection: "Chelsea",
    price: 135000,
    image: "/images/chelsea-boot.jpg",
    images: ["/images/chelsea-boot.jpg", "/images/chelsea-boot.jpg"],
    description:
      "A sleek Chelsea boot with a tapered toe and elastic panels in deep espresso calf.",
    craftStory:
      "Built on a soft-square last with full leather lining and stacked heel construction.",
    materials: ["Waxed espresso calf", "Elasticated gusset", "Calfskin lining", "Leather heel stack"],
    construction: [
      "Hand-lasted soft-square last",
      "Elastic cut and sewn by hand",
      "Goodyear welted",
      "Hand-burnished toe",
    ],
    specifications: {
      Fit: "Snug ankle, true to size",
      Width: "E / Standard",
      Last: "Soft square",
      Sole: "Leather with commando insert",
      Weight: "460g per boot",
    },
    reviews: [
      { id: "r3", author: "T. Bello", rating: 5, text: "My daily boot. Luxurious and durable.", date: "2026-01-30" },
    ],
  },
  {
    id: "p3",
    slug: "patrician-loafer",
    name: "The Patrician Loafer",
    collection: "Loafers",
    price: 115000,
    image: "/images/loafer.jpg",
    images: ["/images/loafer.jpg", "/images/loafer.jpg"],
    description:
      "A burgundy loafer with hand-stitched apron and gold bit detail.",
    craftStory:
      "Moccasin construction wraps the leather underfoot for glove-like comfort.",
    materials: ["Burgundy calf", "Brass hardware", "Kidskin lining", "Leather sole"],
    construction: [
      "Hand-sewn apron",
      "Moccasin bottom construction",
      "Padded insole",
      "Hand-finished edges",
    ],
    specifications: {
      Fit: "True to size, slips on snug",
      Width: "E / Standard",
      Last: "Rounded soft square",
      Sole: "Leather",
      Weight: "320g per shoe",
    },
    reviews: [],
  },
  {
    id: "p4",
    slug: "sentinel-boot",
    name: "The Sentinel Boot",
    collection: "Boots",
    price: 155000,
    image: "/images/chelsea-boot.jpg",
    images: ["/images/chelsea-boot.jpg"],
    description: "A commando-soled lace-up boot for men who walk with purpose.",
    craftStory:
      "Storm-welted for the elements, hand-burnished for the boardroom.",
    materials: ["Waxed commando calf", "Wool lining option", "Dainite sole", "Brass eyelets"],
    construction: [
      "Storm welt construction",
      "Reinforced heel counter",
      "Padded collar",
      "Hand-stitched outsole",
    ],
    specifications: {
      Fit: "True to size",
      Width: "E / Standard",
      Last: "Robust round",
      Sole: "Dainite rubber",
      Weight: "520g per boot",
    },
    reviews: [],
  },
  {
    id: "p5",
    slug: "sovereign-formal",
    name: "The Sovereign Formal",
    collection: "Formal",
    price: 165000,
    image: "/images/product-hero.jpg",
    images: ["/images/product-hero.jpg", "/images/oxford-shoe.jpg"],
    description: "Patent leather opera pump for the most solemn occasions.",
    craftStory:
      "Cut from one piece of mirror-black patent calf, hand-lasted and polished to a piano finish.",
    materials: ["Patent box calf", "Silk lining", "Leather sole", "Grosgrain bow"],
    construction: [
      "Wholecut construction",
      "Hand-polished patent finish",
      "Leather board heel",
      "Waxed laces",
    ],
    specifications: {
      Fit: "True to size",
      Width: "E / Standard",
      Last: "Elegant chisel",
      Sole: "Leather",
      Weight: "340g per shoe",
    },
    reviews: [],
  },
  {
    id: "p6",
    slug: "edition-i",
    name: "Edition I — Akwaaba",
    collection: "Limited Editions",
    price: 250000,
    image: "/images/hero-workshop.jpg",
    images: ["/images/hero-workshop.jpg"],
    description:
      "A numbered limited release featuring hand-tooled Adinkra motifs on supple kudu leather.",
    craftStory:
      "One of twenty pairs. Tooled by hand, numbered, and delivered in a wooden presentation box.",
    materials: ["Ethically sourced kudu leather", "Gold tooling foil", "Calf lining", "Leather sole"],
    construction: [
      "Hand-tooled Adinkra symbols",
      "Numbered edition plaque",
      "Hand-lasted on chisel last",
      "Waxed laces",
    ],
    specifications: {
      Fit: "True to size",
      Width: "E / Standard",
      Last: "Chisel",
      Sole: "Leather",
      Weight: "360g per shoe",
    },
    reviews: [],
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Emmanuel Durojaiye",
    role: "Private Client",
    text: "Nelson does not make shoes. He builds heirlooms. The fit, the smell of the leather, the way the light catches the toe — it is art.",
  },
  {
    id: "t2",
    name: "Amara Okafor",
    role: "Collector",
    text: "I have commissioned footwear in London and Milan. Nelson stands shoulder to shoulder with the great houses.",
  },
  {
    id: "t3",
    name: "Kolade Bakare",
    role: "Creative Director",
    text: "Every pair tells a story. Every stitch has intent. This is what luxury should feel like.",
  },
];

export const journalPosts: JournalPost[] = [
  {
    id: "j1",
    slug: "anatomy-of-patina",
    title: "The Anatomy of Patina",
    excerpt: "Why hand-burnished leather ages more beautifully than anything machine-made.",
    category: "Craftsmanship",
    image: "/images/craft-hands.jpg",
    date: "2026-02-10",
    tags: ["patina", "leather", "craft"],
    content:
      "Patina is the living record of a shoe's journey. At Nelson, we build the foundation for patina by selecting aniline-dyed calfskins and burnishing every pair by hand...",
  },
  {
    id: "j2",
    slug: "lasts-and-lines",
    title: "Lasts & Lines",
    excerpt: "How a wooden last determines the silhouette, comfort, and character of every pair.",
    category: "Craftsmanship",
    image: "/images/about-workshop.jpg",
    date: "2026-01-28",
    tags: ["lasts", "design", "fit"],
    content:
      "The last is the soul of the shoe. Our lasts are carved from beech wood, refined over dozens of prototypes, and named after the streets of Lagos...",
  },
  {
    id: "j3",
    slug: "care-guide",
    title: "The Care Ritual",
    excerpt: "A few minutes a week will keep your bespoke shoes alive for decades.",
    category: "Care",
    image: "/images/oxford-shoe.jpg",
    date: "2026-01-15",
    tags: ["care", "longevity", "polish"],
    content:
      "After each wear, insert cedar shoe trees. Brush with a horsehair brush. Condition every month. Polish only when needed...",
  },
];

export const films: Film[] = [
  {
    id: "f1",
    title: "The Last Artisan",
    category: "Documentary",
    thumbnail: "/images/film-thumbnail.jpg",
    duration: "12:34",
    description: "A cinematic portrait of Nelson's founder and his lifelong obsession with footwear.",
  },
  {
    id: "f2",
    title: "From Last to Legacy",
    category: "Workshop",
    thumbnail: "/images/craft-hands.jpg",
    duration: "08:12",
    description: "Step inside the atelier and witness a pair being born from raw leather.",
  },
  {
    id: "f3",
    title: "A Client's Story",
    category: "Clients",
    thumbnail: "/images/oxford-shoe.jpg",
    duration: "05:45",
    description: "A private client shares the experience of commissioning his first pair.",
  },
  {
    id: "f4",
    title: "Autumn Campaign",
    category: "Campaigns",
    thumbnail: "/images/chelsea-boot.jpg",
    duration: "02:30",
    description: "The mood, the light, the movement — our latest campaign in motion.",
  },
];

export const courses: Course[] = [
  {
    id: "course1",
    title: "The Art of Shoemaking",
    instructor: "Nelson & Master Artisans",
    thumbnail: "/images/craft-hands.jpg",
    duration: "6h 20m",
    lessons: 24,
    price: 75000,
    level: "Beginner to Intermediate",
  },
  {
    id: "course2",
    title: "Leather Selection Mastery",
    instructor: "Adeyemi Ogunlesi",
    thumbnail: "/images/about-workshop.jpg",
    duration: "3h 45m",
    lessons: 14,
    price: 45000,
    level: "Intermediate",
  },
  {
    id: "course3",
    title: "Patina & Finishing",
    instructor: "Nelson",
    thumbnail: "/images/oxford-shoe.jpg",
    duration: "4h 10m",
    lessons: 18,
    price: 55000,
    level: "Advanced",
  },
];

export const commissions: Commission[] = [
  {
    id: "CM-1001",
    customerId: "u2",
    customerName: "Demo Client",
    productName: "The Regent Oxford",
    status: "in-production",
    stages: [
      { name: "Leather Selected", completed: true, estimated: "2026-02-01" },
      { name: "Cutting", completed: true, estimated: "2026-02-05" },
      { name: "Stitching", completed: false, estimated: "2026-02-12" },
      { name: "Burnishing", completed: false, estimated: "2026-02-18" },
      { name: "Polishing", completed: false, estimated: "2026-02-22" },
      { name: "Packaging", completed: false, estimated: "2026-02-24" },
      { name: "Shipping", completed: false, estimated: "2026-02-26" },
    ],
    deposit: 62500,
    total: 125000,
    createdAt: "2026-01-20",
    estimatedCompletion: "2026-02-26",
    notes: "Client requested discreet initials inside counter.",
    customization: { leather: "Black box calf", sole: "Leather", initials: "E.D." },
  },
];

export const orders: Order[] = [
  {
    id: "ORD-2026-001",
    customerId: "u2",
    customerName: "Demo Client",
    items: [{ name: "The Regent Oxford", price: 125000 }],
    total: 125000,
    status: "In Production",
    date: "2026-01-20",
  },
];

export const customers: Customer[] = [
  {
    id: "u2",
    name: "Demo Client",
    email: "client@nelson.com",
    segment: "standard",
    lifetimeValue: 125000,
    lastOrder: "2026-01-20",
  },
  {
    id: "u3",
    name: "Adaobi Nnamdi",
    email: "adaobi@example.com",
    segment: "vip",
    lifetimeValue: 980000,
    lastOrder: "2026-02-01",
  },
];

export const formatNaira = (n: number) =>
  `₦${n.toLocaleString("en-NG")}`;
