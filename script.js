//game board array - module
const gameBoard = (function () {
  const board = ["null","null","null","null","null","null","null","null","null"]

  
  return {
    board,
  }
})()


// // controls the view
const displayController = (function(){
    let container = document.querySelector(".board-boxes")
    
     function renderBoard(gameBoard) {
      clearTheBoard()
          gameBoard.forEach(function(item, index) {
            let box = document.createElement("div")
            box.classList.add("box")
            if(item === "null"){
              box.textContent = ""
              box.id = index
            } else {
              box.textContent = item
            }
              container.appendChild(box)
          });
     }

     function clearTheBoard() {
      container.textContent = ""
     }


     return{
      container,
      renderBoard
     }
})()

displayController.renderBoard(gameBoard.board)


// game flow
const userController = (function(){
  let boardContainer = document.querySelector(".board-boxes")

  boardContainer.addEventListener("click",function(e){
    if(e.target.textContent === ""){
      gameBoard.board[e.target.id] = "X"
      displayController.renderBoard(gameBoard.board) 
    }

  })


})()


