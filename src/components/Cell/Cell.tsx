import { cell, CellState } from "../../types";

interface cellProps {
  columnIndex: number;
  rowIndex: number;
  onClick(
    rowIndex: number,
    columnIndex: number,
    playerTurn: string
  ): (...ard: any[]) => void;
  cell: cell;
  playerTurn: string;
  winningCells: { row: number; column: number }[];
}

const Cell: React.FC<cellProps> = ({
  playerTurn,
  cell,
  rowIndex,
  columnIndex,
  winningCells,
  onClick,
}) => {
  if (rowIndex === 0) {
    return (
      <div
        className={`${
          playerTurn === "player1" ? "dropZone-player1" : "dropZone-player2"
        } ${winningCells.length === 4 ? "gameOver" : ""}`}
        onClick={onClick(rowIndex, columnIndex, playerTurn)}
      ></div>
    );
  }

  if (cell.state === CellState.player1) {
    return (
      <div
        className={`cell player1 ${
          winningCells.some(
            (object) => object.row === rowIndex && object.column === columnIndex
          )
            ? "won"
            : ""
        } `}
      ></div>
    );
  }
  if (cell.state === CellState.player2) {
    return (
      <div
        className={`cell player2 ${
          winningCells.some(
            (object) => object.row === rowIndex && object.column === columnIndex
          )
            ? "won"
            : ""
        } `}
      ></div>
    );
  } else {
    return <div className="cell"></div>;
  }
};

export default Cell;
