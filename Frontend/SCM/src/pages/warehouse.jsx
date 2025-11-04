import { useEffect, useState } from "react";
import WareHouseTable from "../components/warehousetable";
import { getWarehouse } from "../services/api";

function WareHouse(){
const [warehouse, setWareHouse] = useState([]);

useEffect(()=>{
  getWarehouse().then((result) =>{
    setWareHouse(result);
  }).catch((error)=>{ console.log("Error loading inventory:", error); });
},[]);

  return(
    <>
    <h3>Warehouse list</h3>
    <WareHouseTable warehouseList = {warehouse}></WareHouseTable>
    </>
  );
}

export default WareHouse;