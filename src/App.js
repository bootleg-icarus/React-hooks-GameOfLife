import React, { useState, useCallback, useRef } from 'react';
import { produce } from 'immer';
import Button from './components/buttons'
import Grid from './components/grid'
import './App.css';

const numRows = 25;
const numCols = 45;

const operations = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
  [1, -1],
  [1, 1],
  [-1, 1],
  [-1, -1]
]

const generateEmptyGrid = () => {
  const rows = [];
  for (let i = 0; i < numRows; i++) {
    rows.push(Array(numCols).fill(0));
  }
  return rows;
}


function App() {
  const [grid, setGrid] = useState(() => {
    return generateEmptyGrid()
  });

  const [running, setRunning] = useState(false);
  const [generation, setGeneration] = useState(0);
  const genRef = useRef(generation);
  genRef.current = generation;
  const runningRef = useRef(running);
  runningRef.current = running;

  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    }

    setGrid((g) => {
      setGeneration(genRef.current + 1);
      return produce(g, (gridCopy) => {
        for (let i = 0; i < numRows; i++) {
          for (let k = 0; k < numCols; k++) {
            let neighbors = 0;
            operations.forEach(([x, y]) => {
              const newI = i + x;
              const newK = k + y;
              if (newI >= 0 && newI < numRows && newK >= 0 && newK < numCols) {
                neighbors += g[newI][newK]
              }
            })
            if (neighbors < 2 || neighbors > 3) {
              gridCopy[i][k] = 0;
            } else if (g[i][k] === 0 && neighbors === 3) {
              gridCopy[i][k] = 1;
            }
          }
        }
      })
    })

    setTimeout(runSimulation, 100);
  }, [])

  const startFunc = () => {
    setRunning(!running)
    runningRef.current = true;
    runSimulation()
  }
  const randomFunc = () => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(
        Array.from(Array(numCols), () => (Math.random() > 0.9 ? 1 : 0))
      );
    }
    setGrid(rows);
  }

  return (
    <>
      <div style={{ display: "flex", justifyContent: 'start' }}>
        Generation : {generation}
      </div>

      <div style={{ display: "flex", justifyContent: 'center' }}>
        <Button func={startFunc} text={!running ? 'Start' : 'Stop'} />
        <Button func={() => {
          setGrid(generateEmptyGrid())
          setGeneration(0);
        }} text='Clear' />
        <Button func={randomFunc} text={"Random"} />
      </div>

      <div style={{ display: "flex", justifyContent: 'center' }}>
        <Grid grid={grid} setGrid={setGrid} numCols={numCols} />
      </div>
    </>
  );
}

export default App;
