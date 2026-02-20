import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  X,
  Printer,
  LayoutGrid
} from 'lucide-react';

// --- DATA: PRODUCT LIST ---
const products = [
  {
    id: 1,
    name: "24Six Player",
    price: 685,
    category: "Electronics",
    description: "The ultimate music player without the distractions.",
    image: "https://shop.24six.app/cdn/shop/files/sixcolormp3.jpg?v=1768246260&width=990" 
  },
  {
    id: 2,
    name: "Electric Scooter",
    price: 600,
    category: "Outdoor",
    description: "Zip around town with this high-speed electric scooter.",
    image: "https://gyroorboard.com/cdn/shop/files/GyroorH40ElectricScooterForKidsandTeensAges8-14blue.jpg?v=1763199052"
  },
  {
    id: 3,
    name: "Amazon Gift Card ($150)",
    price: 600,
    category: "Gift Cards",
    description: "Buy whatever you want on Amazon!",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Amazon_icon.png/1024px-Amazon_icon.png"
  },
  {
    id: 4,
    name: "Amazon Gift Card ($75)",
    price: 450,
    category: "Gift Cards",
    description: "A great treat for yourself or a friend.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Amazon_icon.png/1024px-Amazon_icon.png"
  },
  {
    id: 5,
    name: "Monopoly Jerusalem",
    price: 400,
    category: "Games",
    description: "The classic trading game with a Jerusalem twist!",
    image: "https://www.eichlers.com/pub/media/catalog/product/G/M/GM_MONOPOLY_2_jpg_1.jpg"
  },
  {
    id: 6,
    name: "Nerf Gun",
    price: 350,
    category: "Toys",
    description: "Long-range blasting power for epic battles.",
    image: "https://m.media-amazon.com/images/I/71wpgb6olsL._AC_SY300_SX300_QL70_FMwebp_.jpg"
  },
  {
    id: 7,
    name: "Walkie Talkie Set",
    price: 250,
    category: "Electronics",
    description: "Stay in touch on your adventures. Long range!",
    image: "https://m.media-amazon.com/images/I/51vH8kFZ8PL._AC_UF894,1000_QL80_.jpg"
  },
  {
    id: 8,
    name: "Football",
    price: 180,
    category: "Sports",
    description: "Pro-grip football for the perfect spiral.",
    image: "https://images-na.ssl-images-amazon.com/images/I/71Q5-A+RnSL._AC_UL375_SR375,375_.jpg"
  },
  {
    id: 9,
    name: "Basketball",
    price: 180,
    category: "Sports",
    description: "Indoor/Outdoor basketball for the court.",
    image: "https://images-na.ssl-images-amazon.com/images/I/91HvbaeBsrL._AC_UL375_SR375,375_.jpg"
  },
  {
    id: 10,
    name: "$25 Seasons Gift Card",
    price: 250,
    category: "Gift Cards",
    description: "Delicious food and groceries from Seasons.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK0dxzKboBpEEToJhss0bsx9qLgnckPBhj0w&s"
  },
  {
    id: 11,
    name: "$40 Hava Java Gift Card",
    price: 380,
    category: "Coffee", // Corrected category
    description: "Treat yourself to a delicious coffee or pastry at Hava Java.",
    image: "https://play-lh.googleusercontent.com/wZsT1yyXUT0guNt8Sk5ajMCeKK_d60RzPagfpm0Cuahf6xwQ0n8KTRPbqX2VOSESM0c"
  },
  {
    id: 12,
    name: "$55 TYH Merch",
    price: 550,
    category: "Gift Cards",
    description: "Wear some Inspiration with Thank You Hashem merch.",
    image: "https://tyhnation.com/cdn/shop/files/tradmarked_360x.png?v=1613773215"
  },
  {
    id: 13,
    name: "$50 Torah Treasures Card",
    price: 500,
    category: "Gift Cards",
    description: "Expand your mind with a new book from Torah Treasures.",
    image: "https://cdn9.localdatacdn.com/ny/monsey/3231742/original/Y3AQwUqCX3.jpg"
  },
  {
    id: 14,
    name: "Crystal Kiddush Cup",
    price: 350,
    category: "Judaica",
    description: "A beautiful, shimmering Kiddush cup for your Shabbos table.",
    image: "https://09mzt5yu.cdn.imgeng.in/media/catalog/product/cache/8c21336c324bea9444a78baa74c6e65c/A/R/ART81185_jpg.jpg"
  },
  {
    id: 15,
    name: "Esrog Bag",
    price: 400,
    category: "Judaica",
    description: "Keep your Esrog safe and beautiful for Sukkos.",
    image: "https://09mzt5yu.cdn.imgeng.in/media/catalog/product/cache/a0dc54a46c9033fb8562ca6c21e62edc/A/R/ART67715_jpg.jpg"
  },
  {
    id: 16,
    name: "Name-Engraved Siddur",
    price: 350,
    category: "Judaica",
    description: "Your very own Siddur with your name beautifully engraved on the cover.",
    image: "https://09mzt5yu.cdn.imgeng.in/media/catalog/product/cache/8c21336c324bea9444a78baa74c6e65c/S/I/SIM20_1_jpg.jpg"
  }
];

const GOOGLE_FORM_URL = "https://docs.google.com/forms/";

export default function App() {
  const [viewMode, setViewMode] = useState("interactive"); 
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [wishlist, setWishlist] = useState([]);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [copyStatus, setCopyStatus] = useState("idle"); 

  const categories = ["All", ...new Set(products.map(p => p.category))];

  const toggleWishlist = (product) => {
    if (wishlist.find(item => item.id === product.id)) {
      setWishlist(wishlist.filter(item => item.id !== product.id));
    } else {
      setWishlist([...wishlist, product]);
    }
  };

  const filteredProducts = products.filter(product => {
    if (viewMode === 'flyer') return true; 
    const matchesCategory = activeCategory === "All" || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalWishlistCost = wishlist.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = () => {
    const listText = wishlist
      .map(item => `- ${item.name} (${item.price} Avos)`)
      .join('\n');
    const fullText = `My Avos Order:\n${listText}\n\nTotal: ${totalWishlistCost} Avos`;

    navigator.clipboard.writeText(fullText).then(() => {
      setCopyStatus("copied");
      setTimeout(() => setCopyStatus("idle"), 3000);
      window.open(GOOGLE_FORM_URL, '_blank');
    });
  };

  if (viewMode === 'flyer') {
    return (
      <div className="min-h-screen bg-white p-8 font-sans">
        <div className="fixed top-4 right-4 print:hidden flex gap-2 z-50">
          <button onClick={() => window.print()} className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-bold shadow-lg hover:bg-indigo-700 flex items-center gap-2">
            <Printer className="w-4 h-4" /> Print / Save PDF
          </button>
          <button onClick={() => setViewMode('interactive')} className="bg-slate-200 text-slate-700 px-4 py-2 rounded-lg font-bold hover:bg-slate-300 flex items-center gap-2">
            <X className="w-4 h-4" /> Close
          </button>
        </div>

        <div className="max-w-5xl mx-auto border-4 border-indigo-900 p-8 rounded-3xl bg-slate-50 relative">
          <div className="absolute top-5 right-6 text-sm text-slate-500 font-serif">בס"ד</div>
          <div className="text-center mb-10">
            <h1 className="text-5xl font-black text-indigo-900 mb-2 uppercase tracking-tight">Avos Ubanim</h1>
            <div className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-full text-xl font-bold uppercase tracking-widest shadow-md">
              Official Prize Catalogue
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white border-2 border-slate-200 rounded-xl p-4 flex flex-col items-center text-center shadow-sm">
                <div className="w-32 h-32 bg-white rounded-lg flex items-center justify-center mb-3 overflow-hidden">
                   <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 leading-tight mb-1">{product.name}</h3>
                <p className="text-xs text-slate-500 mb-3 line-clamp-2 px-2">{product.description}</p>
                <div className="mt-auto bg-indigo-50 px-4 py-1 rounded-full border border-indigo-100">
                  <span className="text-lg font-black text-indigo-700">{product.price} Avos</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center border-t-2 border-slate-200 pt-6">
            <p className="text-slate-500 font-medium italic mb-2">Keep learning, keep earning! See you at the next session.</p>
            <p className="text-xs text-slate-400">* The exact gifts may differ from the images in the catalogue.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg">AU</div>
              <div>
                <h1 className="text-xl font-bold text-slate-900 leading-tight">Avos Ubanim</h1>
                <p className="text-xs text-slate-500 font-medium tracking-wide">OFFICIAL CATALOGUE</p>
              </div>
            </div>

            <div className="hidden md:flex flex-1 max-w-md mx-8 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-full leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                placeholder="Search prizes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2">
              <button onClick={() => setViewMode('flyer')} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 hover:text-indigo-600 hover:bg-slate-100 rounded-full transition-colors">
                <LayoutGrid className="w-4 h-4" /> View Flyer
              </button>
              <button onClick={() => setIsWishlistOpen(true)} className="relative p-2 rounded-full hover:bg-slate-100 transition-colors group">
                <ShoppingBag className="w-6 h-6 text-slate-600 group-hover:text-indigo-600" />
                {wishlist.length > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-500 rounded-full">
                    {wishlist.length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex overflow-x-auto pb-6 gap-2 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === cat ? "bg-indigo-600 text-white shadow-md" : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const inWishlist = wishlist.some(item => item.id === product.id);
            return (
              <div key={product.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col">
                <div className="h-48 bg-white flex items-center justify-center relative p-4 group-hover:scale-105 transition-transform duration-500">
                  <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
                  <div className="absolute top-3 right-3">
                      <span className="bg-slate-100/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold text-slate-600 shadow-sm uppercase tracking-wider">
                          {product.category}
                      </span>
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-slate-900 leading-snug">{product.name}</h3>
                  <p className="text-sm text-slate-500 mb-4 line-clamp-2 flex-1">{product.description}</p>
                  <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-xs text-slate-400 font-medium uppercase">Price</span>
                      <span className="text-xl font-bold text-indigo-700 font-mono">{product.price} Avos</span>
                    </div>
                    <button onClick={() => toggleWishlist(product)} className={`p-3 rounded-full transition-all ${inWishlist ? "bg-red-50 text-red-500" : "bg-slate-100 text-slate-400 hover:text-indigo-600"}`}>
                      <Heart className={`w-5 h-5 ${inWishlist ? "fill-current" : ""}`} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-12 text-center text-xs text-slate-400 pb-8">* The exact gifts may differ from the images in the catalogue.</div>
      </main>

      {isWishlistOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm" onClick={() => setIsWishlistOpen(false)} />
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-indigo-600 text-white">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-6 h-6" />
                <h2 className="text-xl font-bold">My Wishlist</h2>
              </div>
              <button onClick={() => setIsWishlistOpen(false)} className="p-2 hover:bg-white/20 rounded-full"><X className="w-5 h-5" /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              {wishlist.length === 0 ? (
                <div className="text-center py-10"><Heart className="w-16 h-16 text-slate-200 mx-auto mb-4" /><p className="text-slate-500 font-medium">Your wishlist is empty.</p></div>
              ) : (
                <div className="space-y-4">
                  {wishlist.map((item) => (
                    <div key={item.id} className="flex gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50">
                      <div className="w-16 h-16 bg-white border border-slate-200 rounded-lg flex items-center justify-center shrink-0 overflow-hidden">
                        <img src={item.image} alt={item.name} className="w-full h-full object-contain p-1" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-slate-900 truncate">{item.name}</h4>
                        <p className="text-indigo-600 font-mono text-sm mt-1">{item.price} Avos</p>
                      </div>
                      <button onClick={() => toggleWishlist(item)} className="text-slate-400 hover:text-red-500 p-2"><X className="w-5 h-5" /></button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="p-6 bg-slate-50 border-t border-slate-200">
               <div className="flex justify-between items-center mb-6">
                <span className="text-slate-600 font-medium">Total Goal</span>
                <span className="text-2xl font-bold text-indigo-700 font-mono">{totalWishlistCost} Avos</span>
              </div>
               <button onClick={handleCheckout} className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-lg hover:bg-indigo-700 transition-all">
                {copyStatus === "copied" ? "Order Copied! Opening Form..." : "Copy Order & Go to Form"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}