import React from 'react'
import { produce } from 'immer';

const Grid = ({ grid, setGrid, numCols }) => {
    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${numCols}, 20px)`
        }}>
            {grid.map((rows, i) =>
                rows.map((col, k) => (
                    <div key={`${i}=${k}`}
                        style={{
                            width: 20, height: 20,
                            backgroundColor: grid[i][k] ? 'pink' : undefined,
                            border: "1px solid black"
                        }}
                        onClick={() => {
                            const newGrid = produce(grid, gridCopy => {
                                gridCopy[i][k] = gridCopy[i][k] ? 0 : 1;
                            })
                            setGrid(newGrid);
                        }}
                    ></div>
                ))
            )}

        </div>
    )
}
export default Grid;