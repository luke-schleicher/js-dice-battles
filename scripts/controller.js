var controller = {

  init: function() {
    model.createBoard();
    view.renderBoard(model.board);
    view.renderPlayers(model.board, model.players);
    view.endTurnListener(model.newTurn);
    this.gameLoop();
  },

  gameLoop: function() {

      var currentPlayer = model.players[model.currentPlayer];

      if (currentPlayer.readyToAttack) {
        console.log(model.attackingSquare);
        view.attackListener(currentPlayer, model.attackingSquare, model.resolveAttack);
      } else {
        view.selectionListener(currentPlayer, model.prepareAttack);
      }

  },

};
