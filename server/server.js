// server.js
import express from "express";
import cors from "cors";
import records from "./routes/record.js";
import path from "path";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from "./routes/auth.js";
import { fileURLToPath } from "url";
import axios from 'axios'; // Use axios for API requests

// Get __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
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
// Serve the static files from the dist directory
app.use(express.static(path.join(__dirname, "../client/dist")));

// Define your routes here
app.use("/record", records);

// Updated Route: /api/foodoptions - Fetch restaurant data from Yelp using axios
app.get("/api/foodoptions", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.yelp.com/v3/businesses/search?term=restaurants&location=Gainesville,FL&limit=10`,
      {
        headers: {
          Authorization: `Bearer ${process.env.YELP_API_KEY}`, // Use Yelp API key from environment variables
        },
      }
    );

    // axios automatically parses JSON, so we can access response data directly
    res.json(response.data.businesses); // Send only the restaurant data to the frontend
  } catch (error) {
    console.error('Error fetching data from Yelp API:', error);
    res.status(500).json({ message: 'Internal Server Error' });
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
