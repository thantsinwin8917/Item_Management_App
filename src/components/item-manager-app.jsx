import "./item-manager-app.css";
import { useState, useRef } from "react";

import deleteLogo from "../assets/delete.svg";
import stationaryLogo from "../assets/ink_pen.svg";
import kitchenwareLogo from "../assets/flatware.svg";
import applianceLogo from "../assets/electrical_services.svg";

function ItemManager() {

  /* REQUIRED STATES */
  const [items, setItems] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  /* REQUIRED REF */
  const itemName = useRef(null);

  /* ADDITIONAL STATES */
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [nextId, setNextId] = useState(1);

  const categoryIcons = {
    Stationary: stationaryLogo,
    Kitchenware: kitchenwareLogo,
    Appliance: applianceLogo
  };

  const addItem = () => {
    const name = itemName.current.value.trim();

    if (!name) {
      setErrorMsg("Item name must not be empty");
      return;
    }

    const duplicate = items.some(
      (item) => item.name.toLowerCase() === name.toLowerCase()
    );
    if (duplicate) {
      setErrorMsg("Item must not be duplicated");
      return;
    }

    if (!category) {
      setErrorMsg("Please select a category");
      return;
    }

    if (price === "" || Number(price) < 0) {
      setErrorMsg("Price must not be less than 0");
      return;
    }

    const newItem = {
      id: nextId,
      name,
      category,
      price: Number(price).toFixed(2)
    };

    setItems([...items, newItem]);
    setNextId(nextId + 1);
    setErrorMsg("");

    itemName.current.value = "";
    setCategory("");
    setPrice("");
  };

  const deleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <>
      <div id="h1">Item Management</div>

      <div id="data-area">
        <table id="item-table" className="item-table">
          <thead>
            <tr>
              <th id="col-item-id">ID</th>
              <th id="col-item-name">Name</th>
              <th id="col-item-category">Category</th>
              <th id="col-item-price">Price</th>
              <th id="col-item-action">Action</th>
            </tr>
          </thead>

          <tbody>
            {/* ITEM ROWS */}
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>
                  <img
                    src={categoryIcons[item.category]}
                    alt={item.category}
                    width="24"
                  />
                </td>
                <td>{item.price}</td>
                <td>
                  <img
                    src={deleteLogo}
                    alt="delete"
                    width="20"
                    style={{ cursor: "pointer" }}
                    onClick={() => deleteItem(item.id)}
                  />
                </td>
              </tr>
            ))}

            {/* FORM ROW (LAST ROW) */}
            <tr>
              <td>-</td>
              <td>
                <input ref={itemName} />
              </td>
              <td>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="Stationary">Stationary</option>
                  <option value="Kitchenware">Kitchenware</option>
                  <option value="Appliance">Appliance</option>
                </select>
              </td>
              <td>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </td>
              <td>
                <button onClick={addItem}>Add Item</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div id="error-message">
        {errorMsg}
      </div>
    </>
  );
}

export default ItemManager;
