//game board array - module
const gameBoard = (function () {
  const board = []

  
  return {
    board,
  }
})()


// // controls the view
const displayController = (function(){
    let container = document.querySelector(".board-boxes")

     function renderBoard(gameBoard) {
      clearTheBoard()
          gameBoard.forEach(function(item) {
            let box = document.createElement("div")
            box.classList.add("box")
            if(item === "null"){
              box.textContent = ""
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

displayController.renderBoard(["null", "null", "null", "null", "null", "null", "null", "null", "null"])





