const sampleListings = [
  {
    title: "Samsung Smart TV",
    description: "Experience cinematic visuals with this 55-inch 4K UHD Smart TV.",
    image: {
      filename: "productimage",
      url: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 50000,
    location: "Mumbai",
    country: "India",
    geometry: { type: 'Point', coordinates: [79.297815, 19.949901] },
  },
  {
    title: "Whirlpool Double Door Fridge",
    description: "Keep your food fresh with this energy-efficient double-door fridge.",
    image: {
      filename: "productimage",
      url: "https://unsplash.com/photos/tea-bag-lemon-and-sugar-hanging-on-the-rope-over-splashing-tea-in-the-cup-on-blue-background-creative-still-life-cFDr7NOtjNU",
    },
    price: 32000,
    location: "Delhi",
    country: "India",
    geometry: { type: 'Point', coordinates: [79.297815, 19.949901] },
  },
  {
    title: "Nike Running Shoes",
    description: "Run with comfort and style in these lightweight Nike shoes.",
    image: {
      filename: "productimage",
      url: "https://unsplash.com/photos/tea-bag-lemon-and-sugar-hanging-on-the-rope-over-splashing-tea-in-the-cup-on-blue-background-creative-still-life-cFDr7NOtjNU",
    },
    price: 4000,
    location: "Pune",
    country: "India",
    geometry: { type: 'Point', coordinates: [79.297815, 19.949901] },
  },
  {
    title: "Raymond Formal Shirt",
    description: "Classic white formal shirt, perfect for office and events.",
    image: {
      filename: "productimage",
      url: "https://unsplash.com/photos/tea-bag-lemon-and-sugar-hanging-on-the-rope-over-splashing-tea-in-the-cup-on-blue-background-creative-still-life-cFDr7NOtjNU",
    },
    price: 1200,
    location: "Chennai",
    country: "India",
    geometry: { type: 'Point', coordinates: [79.297815, 19.949901] },
  },
  {
    title: "Philips Air Purifier",
    description: "Breathe fresh air with this advanced HEPA-filter air purifier.",
    image: {
      filename: "productimage",
      url: "https://unsplash.com/photos/tea-bag-lemon-and-sugar-hanging-on-the-rope-over-splashing-tea-in-the-cup-on-blue-background-creative-still-life-cFDr7NOtjNU",
    },
    price: 8000,
    location: "Hyderabad",
    country: "India",
    geometry: { type: 'Point', coordinates: [79.297815, 19.949901] },
  },
  {
    title: "iPhone 14 Pro",
    description: "Latest Apple iPhone with advanced camera and A16 Bionic chip.",
    image: {
      filename: "productimage",
      url: "https://unsplash.com/photos/tea-bag-lemon-and-sugar-hanging-on-the-rope-over-splashing-tea-in-the-cup-on-blue-background-creative-still-life-cFDr7NOtjNU",
    },
    price: 125000,
    location: "Bangalore",
    country: "India",
    geometry: { type: 'Point', coordinates: [79.297815, 19.949901] },
  },
  {
    title: "Samsung Microwave Oven",
    description: "Cook meals quickly with this efficient microwave oven.",
    image: {
      filename: "productimage",
      url: "https://unsplash.com/photos/tea-bag-lemon-and-sugar-hanging-on-the-rope-over-splashing-tea-in-the-cup-on-blue-background-creative-still-life-cFDr7NOtjNU",
    },
    price: 15000,
    location: "Kolkata",
    country: "India",
    geometry: { type: 'Point', coordinates: [79.297815, 19.949901] },
  },
  {
    title: "Adidas Sports T-shirt",
    description: "Lightweight sports T-shirt for daily workouts and runs.",
    image: {
      filename: "productimage",
      url: "https://unsplash.com/photos/tea-bag-lemon-and-sugar-hanging-on-the-rope-over-splashing-tea-in-the-cup-on-blue-background-creative-still-life-cFDr7NOtjNU",
    },
    price: 900,
    location: "Ahmedabad",
    country: "India",
    geometry: { type: 'Point', coordinates: [79.297815, 19.949901] },
  },
  {
    title: "Sony Bluetooth Speaker",
    description: "Portable Bluetooth speaker with deep bass and long battery life.",
    image: {
      filename: "productimage",
      url: "https://unsplash.com/photos/tea-bag-lemon-and-sugar-hanging-on-the-rope-over-splashing-tea-in-the-cup-on-blue-background-creative-still-life-cFDr7NOtjNU",
    },
    price: 3000,
    location: "Jaipur",
    country: "India",
    geometry: { type: 'Point', coordinates: [79.297815, 19.949901] },
  },
  {
    title: "Dell Inspiron Laptop",
    description: "Powerful laptop for work and gaming with 16GB RAM.",
    image: {
      filename: "productimage",
      url: "https://unsplash.com/photos/tea-bag-lemon-and-sugar-hanging-on-the-rope-over-splashing-tea-in-the-cup-on-blue-background-creative-still-life-cFDr7NOtjNU",
    },
    price: 8500,
    location: "Lucknow",
    country: "India",
    geometry: { type: 'Point', coordinates: [79.297815, 19.949901] },
  },
];

module.exports = { data: sampleListings };