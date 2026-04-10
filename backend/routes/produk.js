const express = require("express");
const router = express.Router();
const db = require("../config/db");

// CREATE
router.post("/", (req, res) => {
  const { nama, harga, stok, kategori, deskripsi } = req.body;

  db.query(
    "INSERT INTO produk (nama, harga, stok, kategori, deskripsi) VALUES (?, ?, ?, ?, ?)",
    [nama, harga, stok, kategori, deskripsi],
    () => res.send("Produk ditambahkan")
  );
});

// READ
router.get("/", (req, res) => {
  db.query("SELECT * FROM produk", (err, result) => {
    res.json(result);
  });
});

// UPDATE
router.put("/:id", (req, res) => {
  const { nama, harga, stok, kategori, deskripsi } = req.body;

  db.query(
    "UPDATE produk SET nama=?, harga=?, stok=?, kategori=?, deskripsi=? WHERE id=?",
    [nama, harga, stok, kategori, deskripsi, req.params.id],
    () => res.send("Produk diupdate")
  );
});

// DELETE
router.delete("/:id", (req, res) => {
  db.query("DELETE FROM produk WHERE id=?", [req.params.id], () =>
    res.send("Produk dihapus")
  );
});

module.exports = router;