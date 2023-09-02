const TTT = require('./ttt.js');

class ComputerPlayer {
  static getValidMoves(grid) {
    // Your code here
    let validMoves = [];
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[0].length; j++) {
        let val = grid[i][j];
        if (val === ' ') {
          validMoves.push({ row: i, col: j });
        }
      }
    }
    return validMoves;
  }

  static checkWin(grid) {
    // Return 'X' if player X wins
    // Return 'O' if player O wins
    for (let row of grid) {
      let valInRow = [];
      for (let val of row) {
        if (!valInRow.includes(val)) {
          valInRow.push(val);
        }
      }
      if (valInRow.length === 1 && valInRow[0] !== ' ') {
        // console.log(valInDiag);
        return valInRow[0];
      }
    }
    // checking columns
    for (let col = 0; col < grid[0].length; col++) {
      let valInCol = [];
      for (let row of grid) {
        let val = row[col];
        if (!valInCol.includes(val)) {
          valInCol.push(val);
        }
      }
      if (valInCol.length === 1 && valInCol[0] !== ' ') {
        // console.log(valInCol);
        return valInCol[0];
      }
    }
    // diag 1
    let valInDiag = [];
    for (let i = 0; i < grid.length; i++) {
      let val = grid[i][i];
      if (!valInDiag.includes(val)) {
        valInDiag.push(val);
      }
    }
    if (valInDiag.length === 1 && valInDiag[0] !== ' ') {
      // console.log(valInDiag);
      return valInDiag[0];
    }
    // diag 2
    valInDiag = [];
    for (let i = 0; i < grid.length; i++) {
      let val = grid[i][grid.length - i - 1];
      if (!valInDiag.includes(val)) {
        valInDiag.push(val);
      }
    }
    if (valInDiag.length === 1 && valInDiag[0] !== ' ') {
      // console.log(valInDiag);
      return valInDiag[0];
    }

    // Return 'T' if the game is a tie
    let spaces = 0;
    for (let row of grid) {
      for (let val of row) {
        if (val == ' ') {
          spaces++;
        }
      }
    }
    if (spaces == 0) {
      return 'T';
    }
    // Return false if the game has not ended
    return false;
  }

  static randomMove(grid) {
    // Your code here

    let validMoves = ComputerPlayer.getValidMoves(grid);
    let randomIndex = Math.floor(Math.random() * validMoves.length);
    return validMoves[randomIndex];
  }

  // static cloneGrid(grid) {
  //   let clonedGrid = [];
  //   for (let row of grid) {
  //     let temp = [];
  //     for (let val of row) {
  //       temp.push(val);
  //     }
  //     clonedGrid.push(temp);
  //   }
  //   return clonedGrid;
  // }

  static getWinningMoves(grid, symbol) {
    // Your code here
    let validMoves = ComputerPlayer.getValidMoves(grid);
    // let clonedGrid = ComputerPlayer.cloneGrid(grid);
    let winningMoves = [];
    for (let move of validMoves) {
      let { row, col } = move;
      grid[row][col] = symbol;
      let winner = ComputerPlayer.checkWin(grid);
      if (winner === symbol) {
        winningMoves.push(move);
      }
      grid[row][col] = ' ';
    }
    // console.log(winningMoves);
    return winningMoves;
  }

  static getSmartMove(grid, symbol) {
    // Your code here
    let winningMoves = ComputerPlayer.getWinningMoves(grid, symbol);
    if (winningMoves.length >= 1) {
      let randomIndex = Math.floor(Math.random() * winningMoves.length);
      return winningMoves[randomIndex];
    } else {
      let otherSymbol = symbol === 'X' ? 'O' : 'X';
      let opponentWinningMoves = ComputerPlayer.getWinningMoves(
        grid,
        otherSymbol
      );
      if (opponentWinningMoves.length >= 1) {
        let randomIndex = Math.floor(
          Math.random() * opponentWinningMoves.length
        );
        return opponentWinningMoves[randomIndex];
      }

      return ComputerPlayer.randomMove(grid);
    }
  }
}

module.exports = ComputerPlayer;
