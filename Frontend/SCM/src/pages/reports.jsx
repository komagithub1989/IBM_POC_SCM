import React, { useEffect, useState } from "react";
import InventoryTable from "../components/inventorytable";
import { getInventory } from "../services/api";

function Reports() {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    getInventory()
      .then((res) => {
        setInventory(res);
      })
      .catch((err) => console.error("Error loading inventory:", err));
  }, []);

  return (
    <div>
      <h3>Inventory Report</h3>
      <InventoryTable inventory={inventory} />
    </div>
  );
}

export default Reports;
