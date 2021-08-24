export enum CellState {
    'player1',
    'player2',
    'empty',
  }
  

  export type cell = { value: {rowIndex:number, columnIndex:number}; state: CellState };
  