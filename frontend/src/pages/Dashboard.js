import { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";


function Dashboard() {
  const [produk, setProduk] = useState([]);
  const [form, setForm] = useState({
    nama: "",
    harga: "",
    stok: "",
    kategori: "",
    deskripsi: ""
  });
  const [editId, setEditId] = useState(null);

  const getData = () => {
    axios.get("http://localhost:3000/produk")
      .then(res => setProduk(res.data));
  };

  useEffect(() => {
    getData();
  }, []);

  const simpan = () => {
    if (editId) {
      axios.put(`http://localhost:3000/produk/${editId}`, form)
        .then(() => {
          getData();
          resetForm();
        });
    } else {
      axios.post("http://localhost:3000/produk", form)
        .then(() => {
          getData();
          resetForm();
        });
    }
  };

  const resetForm = () => {
    setForm({
      nama: "",
      harga: "",
      stok: "",
      kategori: "",
      deskripsi: ""
    });
    setEditId(null);
  };

  const edit = (p) => {
    setForm(p);
    setEditId(p.id);
  };

  const hapus = (id) => {
    if (window.confirm("Yakin ingin menghapus produk ini?")) {
      axios.delete(`http://localhost:3000/produk/${id}`)
        .then(() => getData());
    }
  };

  return (
    <div className="dash-container">
      <h1>📦 Dashboard Produk</h1>

      {/* FORM */}
      <div className="card">
        <div className="form">
          <input placeholder="Nama"
            value={form.nama}
            onChange={(e)=>setForm({...form,nama:e.target.value})}/>

          <input placeholder="Harga"
            value={form.harga}
            onChange={(e)=>setForm({...form,harga:e.target.value})}/>

          <input placeholder="Stok"
            value={form.stok}
            onChange={(e)=>setForm({...form,stok:e.target.value})}/>

          <input placeholder="Kategori"
            value={form.kategori}
            onChange={(e)=>setForm({...form,kategori:e.target.value})}/>

          <input placeholder="Deskripsi"
            value={form.deskripsi}
            onChange={(e)=>setForm({...form,deskripsi:e.target.value})}/>

          <button onClick={simpan}>
            {editId ? "Update Produk" : "+ Tambah Produk"}
          </button>

          {editId && (
            <button className="cancel" onClick={resetForm}>
              Batal Edit
            </button>
          )}
        </div>
      </div>

      {/* TABLE */}
      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>Nama</th>
              <th>Harga</th>
              <th>Stok</th>
              <th>Kategori</th>
              <th>Deskripsi</th>
              <th>Aksi</th>
            </tr>
          </thead>

          <tbody>
            {produk.map((p) => (
              <tr key={p.id}>
                <td>{p.nama}</td>
                <td>Rp {p.harga}</td>
                <td>{p.stok}</td>
                <td>{p.kategori}</td>
                <td>{p.deskripsi}</td>
                <td>
                  <button className="edit" onClick={()=>edit(p)}>
                    Edit
                  </button>
                  <button className="delete" onClick={()=>hapus(p.id)}>
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;