// Code your JavaScript / jQuery solution here
// $(document).ready(function() {
  var turn = 0
  var currentGame = 0
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

  // function updateState(square) {
  //   square.innerHTML = player()
  // }

  function updateState(square) {
  var token = player();
  $(square).text(token);
}

  function setMessage(string) {
    document.querySelector("#message").innerHTML = string
    // $("#message").html(string)
  }

  function checkWinner() {
    var board = []
    let winner = false

    // $('td').text((index, square) => board.push(index))
    tds = document.querySelectorAll("td")
    tds.forEach((td) => board.push(td.innerHTML))

    WINNING_COMBOS.forEach(function(combo) {
      if (board[combo[0]] !== "" && board[combo[0]] === board[combo[1]] && board[combo[1]] === board[combo[2]]) {
        setMessage(`Player ${board[combo[0]]} Won!`)
        winner = true
      }
    })
    return winner
  }

//   function checkWinner() {
//   var board = {};
//   var winner = false;
//
//   $('td').text((index, square) => board[index] = square);
//
//   WINNING_COMBOS.some(function(combo) {
//     if (board[combo[0]] !== "" && board[combo[0]] === board[combo[1]] && board[combo[1]] === board[combo[2]]) {
//       setMessage(`Player ${board[combo[0]]} Won!`);
//       return winner = true;
//     }
//   });
//
//   return winner;
// }

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
  saveGame()
  showPreviousGame()
}

function saveGame() {
  var state = [];
  var gameData;

  $('td').text((index, square) => {
   state.push(square);
  });

  gameData = { state: state };

  if (currentGame) {
   $.ajax({
     type: 'PATCH',
     url: `/games/${currentGame}`,
     data: gameData
   });
  } else {
   $.post('/games', gameData, function(game) {
     currentGame = game.data.id;
     $('#games').append(`<button id="gameid-${game.data.id}">${game.data.id}</button><br>`);
   });
  }
}

function grabState() {

}

function showPreviousGame() {
  $("#previous").on('click', function() {
    $.get("/games")
    .done(function(json) {
      json["data"].forEach(function(game) {
        if ($("#games").text().includes(game.id) == false)
          $("#games").append(`<button id="btn-${game.id}">${game.id}</button>`)
      })
    })
  })
}

$(document).ready(function() {
  attachListeners()
})
