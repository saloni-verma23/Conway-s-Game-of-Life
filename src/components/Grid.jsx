const Grid = ({ grid, toggleCellState }) => {
  return (
    <div className="outer-div">
      <div className="container grid-box">
        {grid.map((row, rowIndex) => (
          <div className="row" key={rowIndex}>
            {row.map((cell, colIndex) => (
              <div
                className="col p-0 cell cell-style"
                key={`${rowIndex}-${colIndex}`}
                onClick={() => toggleCellState(rowIndex, colIndex)}
                style={{
                  width: "20px",
                  height: "20px",
                  backgroundColor: cell ? "#0B0500" : "#00A878",
                  border: "1px solid #F3C178",
                }}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
export default Grid;
