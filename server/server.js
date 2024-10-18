import express from "express";
import cors from "cors";
import records from "./routes/record.js";
import path from "path";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from "./routes/auth.js";
import { fileURLToPath } from "url";

// Get __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, 'config.env') }); // Ensure correct path to config.env

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

// Catch-all route for serving the React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
