//game board array - module
const gameBoard = (function () {
  const board = [null, null, null, null, null, null, null, null, null]

  return {
    board,
  }
})()

// // controls the view
const displayController = (function () {
  let container = document.querySelector('.board-boxes')

  function renderBoard(gameBoard) {
    clearTheBoard()
    gameBoard.forEach(function (item, index) {
      let box = document.createElement('div')
      box.classList.add('box')
      if (item === null) {
        box.textContent = ''
        box.id = index
      } else {
        box.textContent = item
      }
      container.appendChild(box)
    })
  }

  function clearTheBoard() {
    container.textContent = ''
  }

  return {
    container,
    renderBoard,
  }
})()

displayController.renderBoard(gameBoard.board)

// game flow
const userController = (function () {
  let boardContainer = document.querySelector('.board-boxes')

  boardContainer.addEventListener('click', function (e) {
    if (e.target.textContent === '') {
      gameBoard.board[e.target.id] = 'X'
      displayController.renderBoard(gameBoard.board)
      setTimeout(() => {
        computerChoice()
        displayController.renderBoard(gameBoard.board)
      }, 1000)
    } else {
      return
    }
  })

  function computerChoice() {
    let emptySpaces = []

    for (let i = 0; i < gameBoard.board.length; i++) {
      if (gameBoard.board[i] === null) {
        emptySpaces.push(i)
      }
    }

    let computer = emptySpaces[Math.floor(Math.random() * emptySpaces.length)]
    gameBoard.board[computer] = 'o'
  }
})()
