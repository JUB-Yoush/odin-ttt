/*

*/

const game = (() => {
  const gameBoard = (() => ([[], [], []],
  [[], [], []],
  [[], [], []]))();

  const playerFactory = (name, id) => ({ name, id });

  const player1 = playerFactory('among', '1');
  const player2 = playerFactory('us', '2');

  const gameState = (() => {
    const states = ['P1-TURN', 'P2-TURN', 'P1-WIN', 'P2-WIN', 'DRAW'];
    const state = states[0];
  });
  /*
  based on state, let player 1 or player 2 place mark in tile
  check the gameboard state at the end of every move for a win
  */

  updateGameState(){
    switch(gameState.currentState){
        case states[0]: // p1 turn
            //check if win else
            gameState.state = states[1]    
            break
        case states[1]:
            //check if win else
            gameState.state = states[2]
            break
    }
  }

})();
