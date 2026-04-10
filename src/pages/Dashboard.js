import { useState } from "react";

function Dashboard() {
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");

  const tambahData = () => {
    setData([...data, input]);
    setInput("");
  };

  const hapusData = (index) => {
    const newData = data.filter((_, i) => i !== index);
    setData(newData);
  };

  return (
    <div>
      <h2>Dashboard CRUD</h2>

      <input value={input} onChange={(e)=>setInput(e.target.value)} />
      <button onClick={tambahData}>Tambah</button>

      <ul>
        {data.map((item, index) => (
          <li key={index}>
            {item}
            <button onClick={()=>hapusData(index)}>Hapus</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;