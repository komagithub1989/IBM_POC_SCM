function ProductTable({ productList }) {
  if (!productList || productList.length === 0) {
    return <p>No Producta data available.</p>;
  }

 // console.log(productList);

  return (
    <>
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>Id</th>
            <th>Product Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
             {productList.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.price}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </>
  );
}

export default ProductTable;
