//game board array
const gameBoard = (function () {
  const board = ['X', 'O', 'X', 'O']

  //display the array content
  const print = () => {
    const gameBoardDiv = document.getElementById('board')
    gameBoard.board.forEach(function (item) {
      let box = document.createElement('span')
      box.textContent = item
      gameBoardDiv.appendChild(box)
  })}
  return {
    board,
    print
  }
})()

//person
const person = (name) => {
  return { name }
}

gameBoard.print()


