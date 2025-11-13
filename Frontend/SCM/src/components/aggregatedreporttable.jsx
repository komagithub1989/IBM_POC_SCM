
function AggregatedReport({ summary }){
     return (
        <>
             <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Total Quantity</th>
          </tr>
        </thead>
        <tbody>
          {summary.map((item, index) => (
            <tr key={index}>
              <td>{item.product}</td>
              <td>{item.totalQuantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
        </>
    // <div>
    //   <h2>Aggregated Stock Summary</h2>
    //   <table border="1" cellPadding="8">
    //     <thead>
    //       <tr>
    //         <th>Product</th>
    //         <th>Total Quantity</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {summary.map((item) => (
    //         <tr key={item.product}>
    //           <td>{item.product}</td>
    //           <td>{item.totalQuantity}</td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    // </div>
  );
}

export default AggregatedReport;