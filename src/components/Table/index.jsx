const Table = ({ tableColumns, data }) => {
  return (
    <>
      <table class="table">
        <thead>
          <tr>
            {tableColumns?.map((col) => (
              <th key={col.accessor}>{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.map((row, index) => (
            <>
              <tr>
                
                {tableColumns.map((col) => (
                  <td>
                    {Array.isArray(row[col.accessor])
                      ? row[col.accessor]?.join(", ")
                      : row[col.accessor]}
                  </td>
                ))}
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Table;
