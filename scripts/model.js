var model = {

  numPlayers: 4,
  totalSquares: 24,
  board: [],
  players: [],
  currentPlayer: 0,
  attackingSquare: [],
  defendingSquare: [],
  colors: ["red", "purple", "green", "blue"],
  gameNotOver: true,

  Square: function(row, column) {
    this.coords = [column, row];
    this.top = [column, row - 1];
    this.right = [column + 1, row];
    this.bottom = [column, row + 1];
    this.left = [column - 1, row];
    this.numDice = 2;
  },

  Player: function() {
    this.color = model.colors.pop();
    this.squares = [];
    readyToAttack = false;
  },

  newTurn: function() {
    model.currentPlayer++;
    if (model.currentPlayer === 4) {
      model.currentPlayer = 0;
    }
    controller.gameLoop();
  },

  adjacentSquares: function(square) {
    return [square.top, square.right, square.bottom, square.left];
  },

  getColumnCoords: function($target) {
    return Number($target.attr('id').slice(-1));
  },

  getRowCoords: function($target) {
    Number($target.closest('.row').attr('id').slice(-1));
  },

  prepareAttack: function($target) {
    var colID = getColumnCoords($target);
    var rowID = getRowCoords($target);
    model.attackingSquare = [colID, rowID];
    model.players[model.currentPlayer].readyToAttack = true;
    controller.gameLoop();
  },

  diceRoll: function() {
    return Math.ceil(Math.random * 6);
  },

  determineWinner: function($target) {
    var colID = getColumnCoords($target);
    var rowID = getRowCoords($target);
    model.defendingSquare = [colID, rowID];
    var attackingDice = model.attackingSquare.numDice;
    var defendingDice = model.defendingSquare.numDice;
    var attackingTotal = 0;
    var defendingTotal = 0;
    for (var i = 1; i <= attackingDice; i++) {
      attacking Total += model.diceRoll();
    }
  },

  resolveAttack: function($target) {
    if (arguments.length === 0) {
      model.attackingSquare = undefined;
      controller.gameLoop();
    } else {
      model.determineWinner($target);
    }
  },
  
  shuffle: function(squares) {
    var i = 0,
        j = 0,
        temp = null;

    for (i = squares.length - 1; i >= 0; i -= 1) {
      j = Math.floor(Math.random() * (i + 1));
      temp = squares[i];
      squares[i] = squares[j];
      squares[j] = temp;
    }
    return squares;
  },

  generateSquares: function() {
    for (var row = 1; row <= 4; row++) {
      var rowArr = [];
      for (var column = 1; column <= this.totalSquares/4; column++) {
        square = new this.Square(row, column);
        rowArr.push(square);
      }
      this.board.push(rowArr);
    }
  },

  assignSquares: function(player, shuffledSquares) {
    var numSquares = this.totalSquares / this.numPlayers;
    for (var s = 1; s <= numSquares; s++) {
      var square = shuffledSquares.pop();
      player.squares.push(square);
    }
  },

  createPlayers: function() {

    var squares = this.board.reduce(function(a, b) {
      return a.concat(b);
    }, []);
    var shuffledSquares = this.shuffle(squares);
    var numSquares = this.totalSquares / this.numPlayers;

    for (var p = 1; p <= this.numPlayers; p++) {
      var player = new this.Player();
      this.assignSquares(player, shuffledSquares);
      this.players.push(player);
    }
  },

  createBoard: function() {
    this.generateSquares();
    this.createPlayers();
  },

};