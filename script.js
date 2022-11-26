//game board array - module
const gameBoard = (function () {
  const board = [null, null, null, null, null, null, null, null, null]

  const humanPlayer = "X"
  const computerPlayer = "O"

  return {
    board,
    humanPlayer,
    computerPlayer
  }
})()

// controls the view
const displayController = (function () {
  let container = document.querySelector('.board-boxes')
  let storedImage

  function setStoredImage(source) {
    storedImage = source
  }

  function renderBoard(gameBoard) {
    clearTheBoard()
    gameBoard.forEach(function (item, index) {
      let box = document.createElement('div')
      box.classList.add('box')
      if (item === null) {
        box.textContent = ''
        box.id = index
      } else if (item === 'X') {
        if (storedImage === undefined) {
          let imageForBox = document.createElement('img')
          imageForBox.classList.add('images')
          imageForBox.src = './images/owls/owl-four.png'
          box.appendChild(imageForBox)
        } else {
          let imageForBox = document.createElement('img')
          imageForBox.classList.add('images')
          imageForBox.src = storedImage
          box.appendChild(imageForBox)
        }
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

  let pickAnImage = (() => {
    let chooseAnImage = document.querySelectorAll('.divOwlImage')
    chooseAnImage.forEach(function (image) {
      image.addEventListener('click', getStoredImage)
    })
    function getStoredImage(e) {
      setStoredImage(e.target.src)

    }
  })()

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

  function draw() {
    winnerDiv.textContent = "It's a draw, play again"
  }

  return {
    container,
    renderBoard,
    winnerDiv,
    userWon,
    draw,
    computerWon,
    pickAnImage,
  }
})()

displayController.renderBoard(gameBoard.board)

// game flow
const userController = (function () {
  let boardContainer = document.querySelector('.board-boxes')
  let isGamePlaying = true

  // add icons to board
  function addIconsToBoard(e) {
    if (!e.target.classList.contains("images")) {
      disableImages()
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
    return true
  }

  boardContainer.addEventListener('click', addIconsToBoard)

  // disable images to be clicked after the game is already playing
  function disableImages() {
    let imagesDisable = document.querySelectorAll('.divOwlImage')
    imagesDisable.forEach(function (image) {
      if (isGamePlaying) {
        image.classList.add('disable-btn-click')
      } else {
        image.classList.remove('disable-btn-click')
      }
    })
  }

  // computer choice

  function emptySpacesAvailable(emptySpaces) {
    for (let i = 0; i < gameBoard.board.length; i++) {
      if (gameBoard.board[i] === null) {
        emptySpaces.push(i)
      }
    }
  }

  function computerChoice() {
    let emptySpaces = []
    
    emptySpacesAvailable(emptySpaces)
    
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
      displayController.draw()
    }
  }

  // button to reset
  let resetButton = document.getElementById('resetTheGame')
  resetButton.addEventListener('click', function () {
    gameBoard.board = [null, null, null, null, null, null, null, null, null]
    displayController.renderBoard(gameBoard.board)
    displayController.winnerDiv.textContent = ''
    boardContainer.addEventListener('click', addIconsToBoard)
    isGamePlaying = false
    disableImages()
  })


  function bestSpot(){
    return minimax(emptySpaces, "O").index
  }

  function minimax(emptySpaces, icon) {
    let availableSpots = emptySpacesAvailable(emptySpaces)

    if(checkForWin(emptySpaces, icon)){
      return {score: -10}
    } else if(checkForWin(emptySpaces, "O")) {
      return {score: 10}
    } else if( availableSpots.length === 0) {
      return {score: 0}
    }

    let moves = []

    for(let i = 0; i < availableSpots.length; i++) {
      let move = {}
      move.index = emptySpaces[availableSpots[i]]
      emptySpaces[availableSpots[i]] = player

    }
  }
})()
