import React, { useState } from "react";
import "./App.scss";
import { checkGameWon, generateBoard } from "../../utils";
import { cell, CellState } from "../../types";
import Cell from "../Cell/Cell";

const App: React.FC = () => {
  const [cells, setCells] = useState<cell[][]>(generateBoard());
  const [playerTurn, setPlayerTurn] = useState<string>("player1");
  const [winningCells, setWinningCells] = useState<
    { row: number; column: number }[]
  >([]);

  const resetBoard = (): void => {
    setPlayerTurn("player1");
    setWinningCells([]);
    setCells(generateBoard());
  };

  const handleDropPiece =
    (rowIndex: number, columnIndex: number, playerTurn: string) => (): void => {
      const newCells = cells.slice();
      let piecePlacedLocation: number[] = [];

      for (let index = 6; index <= cells[rowIndex].length; index--) {
        if (index === 0) return;

        if (
          newCells[index][columnIndex].state === CellState.empty &&
          playerTurn === "player1"
        ) {
          newCells[index][columnIndex].state = CellState.player1;
          piecePlacedLocation = [index, columnIndex];
          setCells(newCells);
          setPlayerTurn("player2");
          setWinningCells(checkGameWon(cells, piecePlacedLocation));

          return;
        }
        if (
          newCells[index][columnIndex].state === CellState.empty &&
          playerTurn === "player2"
        ) {
          newCells[index][columnIndex].state = CellState.player2;
          piecePlacedLocation = [index, columnIndex];
          setCells(newCells);
          setPlayerTurn("player1");
          setWinningCells(checkGameWon(cells, piecePlacedLocation));
          return;
        }
      }
    };

  const renderCells = (): React.ReactNode => {
    return cells.map((row, rowIndex) =>
      row.map((cell, columnIndex) => (
        <Cell
          key={`${rowIndex}-${columnIndex}`}
          onClick={handleDropPiece}
          rowIndex={rowIndex}
          columnIndex={columnIndex}
          cell={cell}
          playerTurn={playerTurn}
          winningCells={winningCells}
        ></Cell>
      ))
    );
  };

  return (
    <div className="App">
      <div className="board">
        <button className="reset" onClick={resetBoard}>
          RESET
        </button>
        <div className="cells">{renderCells()}</div>
      </div>
    </div>
  );
};

export default App;
