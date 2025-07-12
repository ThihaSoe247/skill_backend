const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const skillRoutes = require("./routes/skills");

dotenv.config();
const app = express();
app.use(express.json());
app.use(
  cors({
    //Cookies allow
    origin: "http://localhost:5173",
    credentials: true,
  })
);
// app.use(morgen("dev"));

app.get("/", (req, res) => {
  res.send("SkillSwap API is running");
});

const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => console.error("MongoDB connection error:", error));

app.use("/api/auth", authRoutes);
app.use("/api/skills", skillRoutes);
