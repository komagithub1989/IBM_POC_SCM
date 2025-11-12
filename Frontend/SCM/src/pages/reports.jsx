import React, { useEffect, useState } from "react";
import InventoryTable from "../components/inventorytable";
import AggregatedReport from "../components/aggregatedreporttable";
import { getInventory, getInventorySummary } from "../services/api";

function Reports() {
  const [inventory, setInventory] = useState([]);
   const [inventorySummary, setInventorySummary] = useState([]);

  useEffect(() => {
    getInventory()
      .then((res) => {
        setInventory(res);
      })
      .catch((err) => console.error("Error loading inventory:", err));


  }, []);

  useEffect(() =>{
     getInventorySummary().then((res)=>{
      setInventorySummary(res)
     }).catch((err) => console.error("Error loading inventory:", err));
  },[]);

  return (
    <div>
      <h3>Warehouse-Level Report</h3>
      <InventoryTable inventory={inventory} />
      <h3>Aggregated Stock Summary</h3>
      <AggregatedReport summary = {inventorySummary}></AggregatedReport>
    </div>
    
  );
}

export default Reports;
