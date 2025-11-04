function WareHouseTable({ warehouseList }) {
  if (!warehouseList || warehouseList.length === 0) {
    return <p>No Warehouse data available.</p>;
  }

  //console.log(warehouseList);

  return (
    <>
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>Id</th>
            <th>Warehouse Name</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
             {warehouseList.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.location}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </>
  );
}

export default WareHouseTable;
