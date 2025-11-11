import React, { useEffect, useState } from "react";
import InventoryTable from "../components/inventorytable";
import AggregatedReport from "../components/aggregatedreporttable";
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
      <h3>Warehouse-level report</h3>
      <InventoryTable inventory={inventory} />
      <h3>Aggregated(Summary) Report</h3>
      <AggregatedReport></AggregatedReport>
    </div>
    
  );
}

export default Reports;
