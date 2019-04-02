// Code your JavaScript / jQuery solution here
var turn = 0
var winningIndices = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 7], [2, 4, 6]
]

var player = function() {
  return (turn % 2 == 0 ? "X" : "O")
}

var updateState = function(tdEl) {
  $(tdEl).text(player())
}

var setMessage = function(string) {
  $('#message').text(string)
}

var checkWinner = function() {
  let squares = $('td')
  
}
