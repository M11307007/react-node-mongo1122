// Home.js (顯示便當列表與刪除功能)
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [bentos, setBentos] = useState([]);

  useEffect(() => {
    const fetchBentos = async () => {
      const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/bento`);
      const data = await res.json();
      setBentos(data);
    };
    fetchBentos();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/bento/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setBentos(bentos.filter((bento) => bento._id !== id));
      }
    } catch (error) {
      console.error("Error deleting bento:", error);
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "auto" }}>
      <h1>便當店菜單</h1>
      <Link to="/add">
        <button className="btn btn-primary">新增便當</button>
      </Link>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginTop: "20px" }}>
        {bentos.map((bento) => (
          <div
            key={bento._id}
            style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "10px", width: "200px" }}
          >
            <img
              src={bento.image}
              alt={bento.name}
              style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "8px" }}
            />
            <h5>{bento.name}</h5>
            <p>價格: {bento.price} 元</p>
            <p>描述: {bento.description}</p>
            <button className="btn btn-danger" onClick={() => handleDelete(bento._id)}>
              刪除
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

// AddBento.js (新增便當功能)
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddBento = () => {
  const navigate = useNavigate();
  const [bento, setBento] = useState({ name: "", price: "", description: "", image: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBento({ ...bento, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/bento`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bento),
      });

      if (res.ok) {
        setBento({ name: "", price: "", description: "", image: "" });
        navigate("/");
      }
    } catch (error) {
      console.error("Error adding bento:", error);
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "auto" }}>
      <h1>新增便當</h1>
      <div className="mb-3">
        <input
          className="form-control"
          placeholder="便當名稱"
          name="name"
          value={bento.name}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <input
          className="form-control"
          placeholder="價格"
          name="price"
          value={bento.price}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <textarea
          className="form-control"
          placeholder="描述"
          name="description"
          value={bento.description}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <input
          className="form-control"
          placeholder="圖片連結"
          name="image"
          value={bento.image}
          onChange={handleChange}
        />
      </div>
      <button className="btn btn-primary" onClick={handleSubmit}>
        新增
      </button>
    </div>
  );
};
