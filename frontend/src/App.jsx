import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const fetchItems = async () => {
    const res = await axios.get(`${API_URL}/api/items`);
    setItems(res.data);
  };

  const addItem = async () => {
    if (!name) return alert("Item name required");

    await axios.post(`${API_URL}/api/items`, {
      name,
      description,
    });

    setName("");
    setDescription("");
    fetchItems();
  };

  const deleteItem = async (id) => {
    await axios.delete(`${API_URL}/api/items/${id}`);
    fetchItems();
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="container">
      <h1>Demo App</h1>
      <p>Full-stack app with automated CI/CD pipeline</p>

      <input
        type="text"
        placeholder="Item name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button onClick={addItem}>Add Item</button>

      <h1>ITEM LIST</h1>
     

      {items.map((item) => (
        <div className="card" key={item._id}>
          <h3>{item.name}</h3>
          <p>{item.description}</p>
          <button onClick={() => deleteItem(item._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;