//game board array - module
const gameBoard = (function () {
  const board = [null, null, null, null, null, null, null, null, null]

  return {
    board,
  }
})()

// controls the view
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
      } else if (item === 'X') {
        let imageOne = document.createElement('img')
        imageOne.src = 'images/owls/owl-four.png'
        imageOne.setAttribute('alt', 'owl image')
        imageOne.classList.add('images')
        box.appendChild(imageOne)
      } else if (item === 'O') {
        let imageComputer = document.createElement('img')
        imageComputer.src = './images/owls/owl-computer.png'
        imageComputer.setAttribute('alt', 'owl image')
        imageComputer.classList.add('images')
        box.appendChild(imageComputer)
      }

      container.appendChild(box)
    })
  }

  // add images
  let divWithImages = document.querySelector('.chooseYourOwl')
  let owlOne = document.createElement('img')
  owlOne.src = './images/owls/owl-one.png'
  owlOne.classList.add('divOwlImage')
  divWithImages.appendChild(owlOne)

  let owlTwo = document.createElement('img')
  owlTwo.src = './images/owls/owl-two.png'
  owlTwo.classList.add('divOwlImage')
  divWithImages.appendChild(owlTwo)

  let owlThree = document.createElement('img')
  owlThree.src = './images/owls/owl-three.png'
  owlThree.classList.add('divOwlImage')
  divWithImages.appendChild(owlThree)

  let owlFour = document.createElement('img')
  owlFour.src = './images/owls/owl-four.png'
  owlFour.classList.add('divOwlImage')
  divWithImages.appendChild(owlFour)

  // clear the board
  function clearTheBoard() {
    container.textContent = ''
  }

  // declare the winner
  let winnerDiv = document.getElementById('winner')

  function userWon() {
    winnerDiv.textContent = 'Congratulations you win!'
  }

  function computerWon() {
    winnerDiv.textContent = 'Computer won this round'
  }

  return {
    container,
    renderBoard,
    winnerDiv,
    userWon,
    computerWon,
  }
})()

displayController.renderBoard(gameBoard.board)

// game flow
const userController = (function () {
  let boardContainer = document.querySelector('.board-boxes')

  // add icons to board
  function addIconsToBoard(e) {
    if (e.target.textContent === '') {
      gameBoard.board[e.target.id] = 'X'
      displayController.renderBoard(gameBoard.board)
      if (checkForWin(gameBoard.board, 'X')) return

      setTimeout(() => {
        computerChoice()
        displayController.renderBoard(gameBoard.board)
        checkForWin(gameBoard.board, 'O')
      }, 1000)
      noMoreMoves()
    }
  }

  boardContainer.addEventListener('click', addIconsToBoard)

  // computer choice
  function computerChoice() {
    let emptySpaces = []

    for (let i = 0; i < gameBoard.board.length; i++) {
      if (gameBoard.board[i] === null) {
        emptySpaces.push(i)
      }
    }

    let computer = emptySpaces[Math.floor(Math.random() * emptySpaces.length)]
    gameBoard.board[computer] = 'O'
  }

  // winner
  function checkForWin(arr, icon) {
    if (
      (arr[0] === icon && arr[1] === icon && arr[2] === icon) ||
      (arr[3] === icon && arr[4] === icon && arr[5] === icon) ||
      (arr[6] === icon && arr[7] === icon && arr[8] === icon) ||
      (arr[0] === icon && arr[3] === icon && arr[6] === icon) ||
      (arr[1] === icon && arr[4] === icon && arr[7] === icon) ||
      (arr[2] === icon && arr[5] === icon && arr[8] === icon) ||
      (arr[0] === icon && arr[4] === icon && arr[8] === icon) ||
      (arr[2] === icon && arr[4] === icon && arr[6] === icon)
    ) {
      if (icon === 'X') {
        displayController.userWon()
        boardContainer.removeEventListener('click', addIconsToBoard)
        return true
      } else {
        displayController.computerWon()
        boardContainer.removeEventListener('click', addIconsToBoard)
        return true
      }
    }
  }

  // add a draw note
  function noMoreMoves() {
    if (!gameBoard.board.includes(null)) {
      console.log('draw')
    }
  }

  // button to reset
  let resetButton = document.getElementById('resetTheGame')
  resetButton.addEventListener('click', function () {
    gameBoard.board = [null, null, null, null, null, null, null, null, null]
    displayController.renderBoard(gameBoard.board)
    displayController.winnerDiv.textContent = ''
  })
})()
