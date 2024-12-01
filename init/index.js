const mongoose = require("mongoose");
const Listing = require("../models/listing.js"); // Adjust the path as needed

const MONGO_URL = "mongodb+srv://Samayk:Samyak454@cluster0.fpzxt.mongodb.net/Ecommerce?retryWrites=true&w=majority&appName=Cluster0";

main()
  .then(() => {
    console.log("Connected to MongoDB");
    fetchListings(); // Fetch listings from the database
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB:", err);
  });

async function main() {
  await mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
}

// Function to fetch data from MongoDB Atlas
const fetchListings = async () => {
  try {
    const listings = await Listing.find({}); // Fetch all listings
    if (listings.length === 0) {
      console.log("No listings found in the database.");
    } else {
      console.log("Fetched listings:", listings);
    }
  } catch (error) {
    console.error("Error fetching listings:", error);
  }
};
