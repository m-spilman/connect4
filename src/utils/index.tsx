import { cell } from "../types";
import { CellState } from "../types";

export const generateBoard = (): cell[][] => {
  const cells: cell[][] = [];

  for (let rowIndex = 0; rowIndex < 7; rowIndex++) {
    cells.push([]);
    for (let columnIndex = 0; columnIndex < 7; columnIndex++) {
      cells[rowIndex].push({
        value: { rowIndex: rowIndex, columnIndex: columnIndex },
        state: CellState.empty,
      });
    }
  }

  return cells;
};

export const checkGameWon = (
  cells: cell[][],
  piecePlacedLocation: number[]
): { row: number; column: number }[] => {
  const justPlacedRow: number = piecePlacedLocation[0];
  const justPlacedColumn: number = piecePlacedLocation[1];
  const winningNumberInARow: number = 4;

  const checkBelow = (): { row: number; column: number }[] => {
    const winningCells: { row: number; column: number }[] = [];
    winningCells.push({ row: justPlacedRow, column: justPlacedColumn });
    for (let rowIndex = justPlacedRow + 1; rowIndex < 7; rowIndex++) {
      if (
        cells[rowIndex][justPlacedColumn].state !==
        cells[justPlacedRow][justPlacedColumn].state
      ) {
        break;
      }
      if (
        cells[rowIndex][justPlacedColumn].state ===
        cells[justPlacedRow][justPlacedColumn].state
      ) {
        winningCells.push({ row: rowIndex, column: justPlacedColumn });
      }
    }

    return winningCells;
  };
  const checkLeftAndRight = (): { row: number; column: number }[] => {
    const winningCells: { row: number; column: number }[] = [];
    winningCells.push({ row: justPlacedRow, column: justPlacedColumn });
    const checkRight = (): void => {
      for (
        let columnIndex = justPlacedColumn + 1;
        columnIndex < 7;
        columnIndex++
      ) {
        if (
          cells[justPlacedRow][columnIndex].state !==
          cells[justPlacedRow][justPlacedColumn].state
        ) {
          break;
        }
        if (
          cells[justPlacedRow][columnIndex].state ===
          cells[justPlacedRow][justPlacedColumn].state
        ) {
          winningCells.push({ row: justPlacedRow, column: columnIndex });
        }
      }
    };
    const checkLeft = (): void => {
      for (
        let columnIndex = justPlacedColumn - 1;
        columnIndex > -1;
        columnIndex--
      ) {
        if (
          cells[justPlacedRow][columnIndex].state !==
          cells[justPlacedRow][justPlacedColumn].state
        ) {
          break;
        }
        if (
          cells[justPlacedRow][columnIndex].state ===
          cells[justPlacedRow][justPlacedColumn].state
        ) {
          winningCells.push({ row: justPlacedRow, column: columnIndex });
        }
      }
    };
    if (justPlacedColumn + 1 < 7) checkRight();
    if (justPlacedColumn - 1 > -1) checkLeft();
    return winningCells;
  };

  const checkDiagonalsUpAndDownRight = (): {
    row: number;
    column: number;
  }[] => {
    let rowDown = justPlacedRow;
    let columnDown = justPlacedColumn;
    let rowUp = justPlacedRow;
    let columnUp = justPlacedColumn;
    const winningCells: { row: number; column: number }[] = [];
    winningCells.push({ row: justPlacedRow, column: justPlacedColumn });

    while (
      !(rowDown > 6) &&
      !(rowDown + 1 > 6) &&
      !(columnDown < 0) &&
      !(columnDown - 1 < 0)
    ) {
      if (
        cells[justPlacedRow][justPlacedColumn].state !==
        cells[rowDown + 1][columnDown - 1].state
      ) {
        break;
      }

      if (
        cells[justPlacedRow][justPlacedColumn].state ===
        cells[rowDown + 1][columnDown - 1].state
      ) {
        winningCells.push({ row: rowDown + 1, column: columnDown - 1 });
      }
      rowDown++;
      columnDown--;
    }

    while (
      !(rowUp < 0) &&
      !(rowUp - 1 < 0) &&
      !(columnUp > 6) &&
      !(columnUp + 1 > 6)
    ) {
      if (
        cells[justPlacedRow][justPlacedColumn].state !==
        cells[rowUp - 1][columnUp + 1].state
      ) {
        break;
      }

      if (
        cells[justPlacedRow][justPlacedColumn].state ===
        cells[rowUp - 1][columnUp + 1].state
      ) {
        winningCells.push({ row: rowUp - 1, column: columnUp + 1 });
      }
      rowUp--;
      columnUp++;
    }

    return winningCells;
  };

  const checkDiagonalsUpAndDownLeft = (): { row: number; column: number }[] => {
    let rowDown = justPlacedRow;
    let columnDown = justPlacedColumn;
    let rowUp = justPlacedRow;
    let columnUp = justPlacedColumn;
    const winningCells: { row: number; column: number }[] = [];
    winningCells.push({ row: justPlacedRow, column: justPlacedColumn });

    while (
      !(rowDown > 6) &&
      !(rowDown + 1 > 6) &&
      !(columnDown > 6) &&
      !(columnDown + 1 > 6)
    ) {
      if (
        cells[justPlacedRow][justPlacedColumn].state !==
        cells[rowDown + 1][columnDown + 1].state
      ) {
        break;
      }

      if (
        cells[justPlacedRow][justPlacedColumn].state ===
        cells[rowDown + 1][columnDown + 1].state
      ) {
        winningCells.push({ row: rowDown + 1, column: columnDown + 1 });
      }
      rowDown++;
      columnDown++;
    }
    while (
      !(rowUp < 0) &&
      !(rowUp - 1 < 0) &&
      !(columnUp < 0) &&
      !(columnUp - 1 < 0)
    ) {
      if (
        cells[justPlacedRow][justPlacedColumn].state !==
        cells[rowUp - 1][columnUp - 1].state
      ) {
        break;
      }

      if (
        cells[justPlacedRow][justPlacedColumn].state ===
        cells[rowUp - 1][columnUp - 1].state
      ) {
        winningCells.push({ row: rowUp - 1, column: columnUp - 1 });
      }
      rowUp--;
      columnUp--;
    }
    return winningCells;
  };

  const checkBelowIndexes: { row: number; column: number }[] = checkBelow();
  const checkLeftAndRightIndexes: { row: number; column: number }[] =
    checkLeftAndRight();
  const checkDiagonalIndexesRight: { row: number; column: number }[] =
    checkDiagonalsUpAndDownRight();
  const checkDiagonalIndexesLeft: { row: number; column: number }[] =
    checkDiagonalsUpAndDownLeft();

  if (checkBelowIndexes.length === winningNumberInARow)
    return checkBelowIndexes;
  if (checkLeftAndRightIndexes.length === winningNumberInARow)
    return checkLeftAndRightIndexes;
  if (checkDiagonalIndexesRight.length === winningNumberInARow)
    return checkDiagonalIndexesRight;
  if (checkDiagonalIndexesLeft.length === winningNumberInARow)
    return checkDiagonalIndexesLeft;
  else return [];
};
