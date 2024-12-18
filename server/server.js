import express from "express";
import cors from "cors";
import records from "./routes/record.js";
import path from "path";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from "./routes/auth.js";
import { fileURLToPath } from "url";
import axios from 'axios';

// Set __filename and __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from config.env
dotenv.config({ path: path.join(__dirname, 'config.env') });

// Connect to MongoDB Atlas
mongoose.connect(process.env.ATLAS_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB Atlas successfully'))
.catch((error) => console.error('Error connecting to MongoDB Atlas:', error));

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/record", records);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "../client/dist")));

// Yelp API Route: /api/foodoptions
app.get("/api/foodoptions", async (req, res) => {
  const { location, radius } = req.query;

  // Set default values if parameters are missing
  const searchLocation = location || "Gainesville, FL"; // Default to Gainesville, FL if no location is provided
  const searchRadius = Math.min(Number(radius) || 4023, 40000); // Default radius of 2.5 miles (4023m), max 40,000m for Yelp API

  try {
    console.log("Location:", searchLocation); // Debug: Log location
    console.log("Radius in meters:", searchRadius); // Debug: Log radius

    const response = await axios.get(
      `https://api.yelp.com/v3/businesses/search`,
      {
        headers: {
          Authorization: `Bearer ${process.env.YELP_API_KEY}`,
        },
        params: {
          term: "restaurants",
          location: searchLocation,
          radius: searchRadius,
          limit: 50, // Limit to maximum 50 results per Yelp API
        },
      }
    );

    res.json(response.data.businesses); // Send only the business data
  } catch (error) {
    console.error("Error fetching data from Yelp API:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Catch-all route for serving the React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
