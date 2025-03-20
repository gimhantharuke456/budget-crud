const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const budgetRoutes = require("./routes/budgetRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/budgets", budgetRoutes);

// MongoDB connection
mongoose
  .connect(
    "mongodb+srv://lukysam95:AQeqBaC28MZSn6hs@cluster.vdra4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

// Start the server
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
