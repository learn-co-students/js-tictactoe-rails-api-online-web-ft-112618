// Code your JavaScript / jQuery solution here
var turn = 0

const WINNING_COMBOS = [[0,1,2], [3,4,5], [6,7,8], [0,3,6],
                        [1,4,7], [2,5,8], [0,4,8], [2,4,6]];


function isEven(n) {
   return n % 2 == 0;
}

function isOdd(n) {
   return Math.abs(n % 2) == 1;
}

function player() {
  if (isEven(turn)) {
    return "X"
  } else if (isOdd(turn)) {
    return "O"
  }
}

function updateState(square) {
  square.innerHTML = player()
}

function setMessage(string) {
  // document.querySelector("#message").innerHTML = string
  $("#message").html(string)
}

function checkWinner() {
  var board = []
  let winner = false

  $('td').text((index, square) => board.push(square))

  WINNING_COMBOS.forEach(function(combo) {
    if (board[combo[0]] != "" && board[combo[0]] === board[combo[1]] && board[combo[1]] === board[combo[2]]) {
      setMessage(`Player ${board[combo[0]]} Won!`)
      winner = true
    }
  })
  return winner
}

function doTurn(square) {
  updateState(square)
  turn += 1

  if (checkWinner()) {
    $('td').html("")
    turn = 0
  } else if (turn === 9) {
    $('td').html("")
    turn = 0
    return setMessage("Tie game.")  
  }
}

function attachListeners() {
  $('td').on('click', function() {
    if (!$.text(this) && !checkWinner()) {
      doTurn(this);
    }
  });

}

attachListeners()
