const express = require("express");
const router = express.Router();
const db = require("../config/db");
const bcrypt = require("bcrypt");

// ================= REGISTER =================
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  // ✅ VALIDASI WAJIB ISI
  if (!username || !password) {
    return res.status(400).json({
      message: "Username dan password wajib diisi"
    });
  }

  // ✅ TRIM (hindari spasi doang)
  const userTrim = username.trim();
  const passTrim = password.trim();

  if (userTrim.length < 3) {
    return res.status(400).json({
      message: "Username minimal 3 karakter"
    });
  }

  if (passTrim.length < 5) {
    return res.status(400).json({
      message: "Password minimal 5 karakter"
    });
  }

  // ✅ CEK USER SUDAH ADA
  db.query(
    "SELECT * FROM users WHERE username = ?",
    [userTrim],
    (err, result) => {
      if (err) {
        console.log("ERROR SELECT:", err);
        return res.status(500).json({ message: "Database error" });
      }

      if (result.length > 0) {
        return res.status(400).json({
          message: "Username sudah digunakan"
        });
      }

      // 🔥 HASH PASSWORD (dipindah ke dalam callback biar aman)
      bcrypt.hash(passTrim, 10, (err, hash) => {
        if (err) {
          console.log("ERROR HASH:", err);
          return res.status(500).json({ message: "Gagal hash password" });
        }

        // ✅ INSERT KE DB
        db.query(
          "INSERT INTO users (username, password) VALUES (?, ?)",
          [userTrim, hash],
          (err, result) => {
            if (err) {
              console.log("ERROR INSERT:", err); // 🔥 WAJIB
              return res.status(500).json({
                message: "Gagal register"
              });
            }

            console.log("INSERT SUCCESS:", result); // 🔥 DEBUG
            console.log("DATA MASUK:", req.body);
            console.log("ERROR INSERT:", err);
console.log("RESULT INSERT:", result);

            return res.status(201).json({
              message: "Register berhasil"
            });
          }
        );
      });
    }
  );
});

// ================= LOGIN =================
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  // ✅ VALIDASI
  if (!username || !password) {
    return res.status(400).json({
      message: "Username dan password wajib diisi"
    });
  }

  db.query(
    "SELECT * FROM users WHERE username = ?",
    [username.trim()],
    (err, result) => {
      if (err) {
        console.log("ERROR SELECT:", err);
        return res.status(500).json({
          message: "Database error"
        });
      }

      if (result.length === 0) {
        return res.status(401).json({
          message: "User tidak ditemukan"
        });
      }

      const user = result[0];

      // 🔥 CEK PASSWORD
      bcrypt.compare(password.trim(), user.password, (err, valid) => {
        if (err) {
          console.log("ERROR COMPARE:", err);
          return res.status(500).json({
            message: "Error validasi password"
          });
        }

        if (!valid) {
          return res.status(401).json({
            message: "Password salah"
          });
        }

        // ✅ LOGIN BERHASIL
        return res.status(200).json({
          message: "Login berhasil",
          user: {
            id: user.id,
            username: user.username
          }
        });
      });
    }
  );
});

module.exports = router;