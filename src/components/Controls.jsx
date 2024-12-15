import { useRef } from "react";
const Control = ({ startBtn, stopBtn, resetGame, speedControl }) => {
  // Reference object to store the selected value
  const selectedSpeed = useRef("");

  // Function to handle the dropdown item click
  const handleSpeedSelect = (speed) => {
    selectedSpeed.current = speed;
    speedControl(speed); // Call the speedControl function if provided
  };
  return (
    <center className="control-panel">
      <button className="btn btn-lg" onClick={startBtn}>
        Start
      </button>
      <button className="btn btn-lg" onClick={stopBtn}>
        Stop
      </button>
      <button className="btn btn-lg" onClick={resetGame}>
        Reset
      </button>
      <span className="dropend">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Speed Control
        </button>
        <ul className="dropdown-menu">
          <li>
            <a
              className="dropdown-item"
              href="#"
              onClick={() => handleSpeedSelect("1")}
            >
              1x
            </a>
          </li>
          <li>
            <a
              className="dropdown-item"
              href="#"
              onClick={() => handleSpeedSelect("2")}
            >
              2x
            </a>
          </li>
          <li>
            <a
              className="dropdown-item"
              href="#"
              onClick={() => handleSpeedSelect("3")}
            >
              3x
            </a>
          </li>
          <li>
            <a
              className="dropdown-item"
              href="#"
              onClick={() => handleSpeedSelect("4")}
            >
              4x
            </a>
          </li>
        </ul>
      </span>
    </center>
  );
};
export default Control;
