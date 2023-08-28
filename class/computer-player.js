const TTT = require('./ttt');

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
      let winner = TTT.checkWin(grid);
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
