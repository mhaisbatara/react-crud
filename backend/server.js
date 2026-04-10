const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/auth");
const produkRoutes = require("./routes/produk");

app.use("/auth", authRoutes);
app.use("/produk", produkRoutes);

app.listen(3000, () => {
  console.log("Server jalan di http://localhost:3000");
});