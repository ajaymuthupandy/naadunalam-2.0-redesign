// Content taken verbatim from https://naadunalam.fastfilings.in (Nov 2026)

export type Product = { name: string; price: string; size: string; img: string; href: string };

export const shopProducts: Product[] = [
  { name: "Aathur Kichadi Samba Aval (ஆத்தூர் கிச்சடி சம்பா அவல்)", price: "₹160.00", size: "500 g", img: "/2026/09/Kichadi-Samba-Aval-300x300.webp", href: "/product/aathur-kichadi-samba-aval/" },
  { name: "Aathur Kichadi Samba Rice (ஆத்தூர் கிச்சடி சம்பா அரிசி)", price: "₹205.00", size: "1 kg", img: "/2026/09/Mappillai-Samba-Rice-300x300.webp", href: "/product/aathur-kichadi-samba-rice/" },
  { name: "All-Age Nutrition Malt Mix (அனைத்து வயதினருக்கான ஊட்டச்சத்து மாவுக் கலவை)", price: "₹245.00", size: "500 g", img: "/2026/08/Oottachathu-Paanam-300x300.webp", href: "/product/oottachathu-paanam/" },
  { name: "Arubathaam Kuruvai Aval (அறுபதாம் குறுவை அவல்)", price: "₹150.00", size: "500 g", img: "/2026/09/Kichadi-Samba-Aval-300x300.webp", href: "/product/arubathaam-kuruvai-aval/" },
  { name: "Arubathaam Kuruvai Rice (அறுபதாம் குறுவை அரிசி)", price: "₹185.00", size: "1 kg", img: "/2026/09/Arubatham-Kuruvai-Rice-300x300.webp", href: "/product/arubathaam-kuruvai-rice/" },
  { name: "Bamboo Aval (மூங்கில் அவல்)", price: "₹195.00", size: "500 g", img: "/2026/09/MungilBambooAval-300x300.jpg", href: "/product/bamboo-aval/" },
  { name: "Bamboo Rice (மூங்கில் அரிசி)", price: "₹385.00", size: "500 g", img: "/2026/08/Moongil-Arisi-300x300.webp", href: "/product/moongil-arisi/" },
  { name: "Barley Rice (பார்லி அரிசி / வாற்கோதுமை)", price: "₹115.00", size: "500 g", img: "/2026/09/Barley-Rice-300x300.jpg", href: "/product/barley-rice/" },
  { name: "Barnyard Millet (குதிரைவாலி)", price: "₹135.00", size: "500 g", img: "/2026/08/Kuthiraivali-Arisi-300x300.webp", href: "/product/barnyard-millet-kuthiraivali/" },
  { name: "Bengal Gram Dal (கடலைப் பருப்பு)", price: "₹128.00", size: "500 g", img: "/2026/08/Kadalai-Paruppu-300x300.webp", href: "/product/kadalai-paruppu/" },
  { name: "Black Chickpeas (கருப்பு கொண்டைக்கடலை)", price: "₹122.00", size: "500 g", img: "/2026/08/Karuppu-Kondakadalai-300x300.webp", href: "/product/karuppu-kondakadalai/" },
  { name: "Black Urad Dal (கருப்பு உளுந்து)", price: "₹168.00", size: "500 g", img: "/2026/08/Karuppu-Ulundhu-300x300.webp", href: "/product/karuppu-ulundhu/" },
];

export const shopFilters = {
  categories: [
    { name: "Aval / Flakes (அவல் வகைகள்)", count: 17 },
    { name: "Ghee & Oil (நெய் & எண்ணெய் வகைகள்)", count: 5 },
    { name: "Health Mixes (ஆரோக்கிய மாவுகள்)", count: 9 },
    { name: "Millets (சிறுதானியங்கள்)", count: 7 },
    { name: "Natural Sweeteners (இயற்கை இனிப்புகள்)", count: 5 },
    { name: "Personal Care (உடல் பராமரிப்பு)", count: 2 },
    { name: "Traditional Rice (பாரம்பரிய அரிசி வகைகள்)", count: 17 },
  ],
  packs: [
    { name: "100 g", count: 1 },
    { name: "250 g", count: 9 },
    { name: "1 kg", count: 18 },
    { name: "500 g", count: 50 },
    { name: "500 ml", count: 5 },
  ],
  sale: ["On Sale", "Regular"],
  sorting: ["Default sorting", "Sort by popularity", "Sort by average rating", "Sort by latest", "Sort by price: low to high", "Sort by price: high to low"],
};

export const blogPosts = [
  { slug: "many-sellers-one-basket", title: "Many Sellers, One Basket: How Buying Direct Works Here", date: "August 12, 2026", excerpt: "Naadu Nalam is a marketplace, not a warehouse. Here is what that means for the basket you check out with.", img: "/2026/07/23-product-leafy-greens-768x768.webp", alt: "Green leafy vegetables" },
  { slug: "cold-pressed-vs-refined-oils", title: "Cold-Pressed vs Refined: Why Our Oils Taste Like the Seed", date: "August 4, 2026", excerpt: "Cold-pressed sesame and groundnut oil carry flavour and colour that refining strips out. Here is the difference.", img: "/2026/07/cold-pressed-sesame-oil-photo-768x1066.jpg", alt: "Cold Pressed Sesame Oil" },
  { slug: "choosing-your-honey", title: "Forest Multi-Floral or Tulsi Infused: Picking Your Honey", date: "July 26, 2026", excerpt: "Two honeys, two very different jobs in the kitchen. A short guide to telling them apart and using them well.", img: "/2026/08/Thean-768x768.webp", alt: "Then (traditional honey)" },
  { slug: "red-rice-or-sona-masoori", title: "Red Rice or Sona Masoori: Matching the Grain to the Meal", date: "July 15, 2026", excerpt: "Both are everyday rice, but they behave differently in the pot. When to choose which, and how to cook each one.", img: "/2026/07/red-rice-photo-768x512.jpg", alt: "Red Rice" },
  { slug: "ragi-flour-millet-kitchens", title: "Ragi Flour: The Millet Tamil Kitchens Never Gave Up", date: "July 2, 2026", excerpt: "Finger millet stayed on the table long after other grains fell out of fashion. Here is what to do with it.", img: "/2026/07/Ragi-Flour-768x512.jpg", alt: "Close-up of uncooked long-grain white rice grains filling the frame" },
  { slug: "cooking-country-vegetables", title: "Drumstick, Snake Gourd and Cluster Beans, Cooked Simply", date: "June 20, 2026", excerpt: "Three country vegetables that reward restraint. Minimal handling, short cooking, and very little in the pan.", img: "/2026/07/snake-gourd-match-768x512.jpg", alt: "Snake Gourd" },
];

export const blogCategories = [
  { name: "Kitchen Notes", count: 3 },
  { name: "Seasonal Picks", count: 1 },
  { name: "Sourcing & Sellers", count: 1 },
  { name: "Wellness", count: 3 },
];
export const blogTags = ["Cold Pressed", "Country Vegetables", "Honey", "Local Sourcing", "Millets", "Multi-Vendor", "Rice", "Spices"];

export const wishlistSuggestions: Product[] = [
  { name: "Kallundai Samba Aval (கல்லுண்டை சம்பா அவல்)", price: "₹165.00", size: "500 g", img: "/2026/09/Karudan-Samba-Aval-300x300.webp", href: "/product/kallundai-samba-aval/" },
  { name: "Kalanamak Aval (காலா நமக் அவல்)", price: "₹195.00", size: "500 g", img: "/2026/09/Kudavaazhai-Aval-300x300.webp", href: "/product/kalanamak-aval/" },
  { name: "Aathur Kichadi Samba Aval (ஆத்தூர் கிச்சடி சம்பா அவல்)", price: "₹160.00", size: "500 g", img: "/2026/09/Kichadi-Samba-Aval-300x300.webp", href: "/product/aathur-kichadi-samba-aval/" },
  { name: "Arubathaam Kuruvai Aval (அறுபதாம் குறுவை அவல்)", price: "₹150.00", size: "500 g", img: "/2026/09/Kichadi-Samba-Aval-300x300.webp", href: "/product/arubathaam-kuruvai-aval/" },
];

export const homePicks: Product[] = [
  { name: "Kalanamak Aval (காலா நமக் அவல்)", price: "₹195.00", size: "500 g", img: "/2026/09/Kudavaazhai-Aval-300x300.webp", href: "/product/kalanamak-aval/" },
  { name: "Iluppai Poo Samba Aval (இலுப்பைப் பூ சம்பா அவல்)", price: "₹175.00", size: "500 g", img: "/2026/09/Karudan-Samba-Aval-300x300.webp", href: "/product/iluppai-poo-samba-aval/" },
  { name: "Kudavaazhai Aval (குடவாழை அவல்)", price: "₹155.00", size: "500 g", img: "/2026/09/Kudavaazhai-Aval-300x300.webp", href: "/product/kudavaazhai-aval/" },
  { name: "Karudan Samba Aval (கருடன் சம்பா அவல்)", price: "₹155.00", size: "500 g", img: "/2026/09/Karudan-Samba-Aval-300x300.webp", href: "/product/karudan-samba-aval/" },
  { name: "Kichadi Samba Aval (கிச்சடி சம்பா அவல்)", price: "₹145.00", size: "500 g", img: "/2026/09/Kichadi-Samba-Aval-300x300.webp", href: "/product/kichadi-samba-aval/" },
];
export const allProducts: Product[] = [...shopProducts, ...wishlistSuggestions, ...homePicks].filter((p, i, a) => a.findIndex((q) => q.href === p.href) === i);

export const categories: Record<string, { title: string; match: RegExp }> = {
  "rice-grains": { title: "Traditional Rice (பாரம்பரிய அரிசி வகைகள்)", match: /Rice/ },
  "aval-flakes": { title: "Aval / Flakes (அவல் வகைகள்)", match: /Aval/ },
  siruthaniyam: { title: "Millets (சிறுதானியங்கள்)", match: /Millet/ },
  "natural-sweeteners": { title: "Natural Sweeteners (இயற்கை இனிப்புகள்)", match: /Vellam|Jaggery|Honey/ },
  "oil-vinegers": { title: "Ghee & Oil (நெய் & எண்ணெய் வகைகள்)", match: /Oil|Nei|Ghee/ },
  "health-mixes": { title: "Health Mixes (ஆரோக்கிய மாவுகள்)", match: /Mix|Maavu/ },
  "personal-care": { title: "Personal Care (உடல் பராமரிப்பு)", match: /Podi|Shikakai/ },
  "paruppu-pulses": { title: "Paruppu & Pulses", match: /Dal|Chickpea|Gram/ },
  "other-rice": { title: "Other Rice (மற்ற அரிசி வகைகள்)", match: /Barley|Ponni|Basmati/ },
  "masala-podi": { title: "Masala & Powders", match: /Podi/ },
  spices: { title: "Whole Spices", match: /Spice/ },
};

/** "₹1,245.00" → 1245 */
export const priceNum = (p: string) => parseFloat(p.replace(/[^\d.]/g, "")) || 0;
export const inr = (n: number) => `₹${n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
