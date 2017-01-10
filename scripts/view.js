var view = {

  endTurnListener: function(newTurn) {
    $('button').on('click', function(e) {
      newTurn();
    });
  },

  selectionListener: function(currentPlayer, prepareAttack) {
    $('#board').on('click', '.column', function(e){
      var $target = $(e.target);
      if ($target.hasClass(currentPlayer.color)) {
        $target.toggleClass('attacking');
        $('#board').off();
        prepareAttack($target);
      }
    });
  },

  differentPlayer: function($target, currentPlayer) {
    return !($target.hasClass(currentPlayer.color));
  },

  adjacentSquare: function() {
    return true;
  },

  attackListener: function(currentPlayer, attackingSquare, resolveAttack) {

    var rowID = 'row' + attackingSquare[1];
    var colID = 'col' + attackingSquare[0];
    var attacker = $('#board').find('#' + rowID + ' ' + '#' + colID);

    $('#board').on('click', attacker, function(e){
      var $target = $(e.target);
      $target.toggleClass('attacking');
      $('#board').off();
      resolveAttack();
    });

    $('#board').on('click', '.column', function(e) {
      var $target = $(e.target);
      if (view.differentPlayer($target, currentPlayer) && view.adjacentSquare()) {
        $('#board').off();
        resolveAttack($target);
      }
    });
  },

  renderBoard: function(board) {

    $('#board').html('');

    for (var row = 0; row < board.length; row++) {
      var $row = $('<div class="row">')
            .attr('id', 'row' + row);
      for (var column = 0; column < board[row].length; column++) {
        var $column = $('<div class="column">')
              .attr('id', 'column' + column);
        $row.append($column);
      }
      $('#board').append($row);
    }

  },

  renderPlayers: function(board, players) {

    players.forEach(function(player) {
      player.squares.forEach(function(square) {
        var x = square.coords[0];
        var y = square.coords[1];
        var $cell = $('.row:nth-child(' + y + ')').find('.column:nth-child(' + x + ')');
        $cell.addClass(player.color);
        $span = $('<span>');
        $span.text(square.numDice).addClass('num-dice');
        $cell.append($span);
      });
    });

  },

};