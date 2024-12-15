import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Grid from "./components/Grid";
import Control from "./components/Controls";
import Header from "./components/Header";
import { useState } from "react";
import { useEffect } from "react";

function App() {
  const [generation, setGeneration] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(1);

  const startBtn = () => {
    setIsRunning(true);
  };
  const stopBtn = () => {
    setIsRunning(false);
  };
  // Reset the grid
  const resetGame = () => {
    setIsRunning(false);
    setGrid(createGrid(22, 60));
    setGeneration(0);
  };

  const createGrid = (rows, cols) =>
    Array.from({ length: rows }, () => Array.from({ length: cols }, () => 0));

  const [grid, setGrid] = useState(createGrid(22, 60));

  const toggleCellState = (row, col) => {
    const newGrid = grid.map((r, i) =>
      r.map((cell, j) => (i === row && j === col ? +!cell : cell))
    );
    setGrid(newGrid);
  };

  const getNextGeneration = (grid) => {
    const rows = grid.length;
    const cols = grid[0].length;
    const newGrid = createGrid(rows, cols);

    const countNeighbors = (grid, x, y) => {
      let count = 0;
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (i === 0 && j === 0) continue;
          const nx = x + i,
            ny = y + j;
          if (nx >= 0 && ny >= 0 && nx < rows && ny < cols) {
            count += grid[nx][ny];
          }
        }
      }
      return count;
    };
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const neighbors = countNeighbors(grid, i, j);
        if (grid[i][j] === 1 && (neighbors === 2 || neighbors === 3)) {
          newGrid[i][j] = 1;
        } else if (grid[i][j] === 0 && neighbors === 3) {
          newGrid[i][j] = 1;
        } else {
          newGrid[i][j] = 0;
        }
      }
    }
    return newGrid;
  };

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setGrid((prevGrid) => getNextGeneration(prevGrid));
    }, 1000 / speed);
    return () => clearInterval(interval);
  }, [isRunning, speed]);

  // Update speed from Control component
  const speedControl = (newSpeed) => {
    setSpeed(newSpeed);
  };

  return (
    <>
      <Header></Header>
      <Grid grid={grid} toggleCellState={toggleCellState}></Grid>
      {/* <p>Generation: {generation}</p> */}
      <Control
        startBtn={startBtn}
        stopBtn={stopBtn}
        resetGame={resetGame}
        speedControl={speedControl}
      ></Control>
    </>
  );
}

export default App;
