/* eslint-disable no-param-reassign */
const game = (() => {
  const body = document.querySelector('body');
  const gameBoardDisplay = body.querySelector('.gameboard');
  const tiles = gameBoardDisplay.children;
  const gameText = body.querySelector('.game-text');
  const settings = body.querySelector('.settings');
  const gameBoard = (() => ([]))();
  let turns = 0;

  const playerFactory = (name, id, symbol, color) => ({
    name, id, symbol, color,
  });
  const tileFactory = (id, element, value) => ({ id, element });
  let player1;
  let player2;
  let currentplayer;
  const gameState = (() => {
    const statesList = ['GAME-START', 'P1-TURN', 'P2-TURN', 'P1-WIN', 'P2-WIN', 'DRAW'];
    const [gameStart, p1Turn, p2Turn, p1Win, p2Win, draw] = statesList;
    const state = gameStart;
    return {
      gameStart, p1Turn, p2Turn, p1Win, p2Win, draw, state,
    };
  })();
  /*
  give all the gameboard divs the click function that lets you place a symbol depending on who's
  turn it iu
  */

  function wonGame() {
    /*
     0 1 2
     3 4 5
     6 7 8

     0 3 6
     1 4 7
     2 5 8

     0 4 8
     2 4 6
      */

    // horizontal win check
    for (let i = 0; i < 9; i += 3) {
      if (gameBoard[i].value === gameBoard[i + 1].value && gameBoard[i].value === gameBoard[i + 2].value && gameBoard[i].value !== '') {
        console.log('i win lol');
        return true;
      }
    }
    // vertical win check
    for (let i = 0; i < 3; i += 1) {
      if (gameBoard[i].value === gameBoard[i + 3].value && gameBoard[i].value === gameBoard[i + 6].value && gameBoard[i].value !== '') {
        console.log('i win lol');
        return true;
      }
    }

    // diagonal checks
    if (gameBoard[0].value === gameBoard[4].value && gameBoard[0].value === gameBoard[8].value && gameBoard[0].value !== '') {
      console.log('i win lol');
      return true;
    }

    if (gameBoard[2].value === gameBoard[4].value && gameBoard[2].value === gameBoard[6].value && gameBoard[2].value !== '') {
      console.log('i win lol');
      return true;
    }
    return false;
  }

  function updateGameState() {
    if (turns > gameBoard.length) {
      // end game
    }

    switch (gameState.state) {
      case gameState.gameStart:
        gameState.state = gameState.p1Turn;
        currentplayer = player1;
        break;

      case gameState.p1Turn: // p1 turn
        // check if win else
        if (wonGame()) {
          gameState.state = gameState.p1Win;
          gameText.textContent = `${currentplayer.name} wins`;
        } else {
          gameState.state = gameState.p2Turn;
          currentplayer = player2;
          gameText.textContent = `${currentplayer.name} turn`;
        }
        break;

      case gameState.p2Turn:
        // check if win else
        if (wonGame()) {
          gameState.state = gameState.p2Win;
          gameText.textContent = `${currentplayer.name} wins`;
        } else {
          gameState.state = gameState.p1Turn;
          currentplayer = player1;
          gameText.textContent = `${currentplayer.name} turn`;
        }

        break;

      default:
        break;
    }
    console.log(gameState.state);
  }

  function startGame() {
    const p1Settings = settings.querySelector('.p1-settings > ul');
    const p2Settings = settings.querySelector('.p2-settings > ul');
    player1 = playerFactory(
      p1Settings.querySelector(':nth-child(1) > input').value,
      0,
      p1Settings.querySelector(':nth-child(2) > input').value,
      p1Settings.querySelector(':nth-child(3) > input').value,
    );
    player2 = playerFactory(
      p2Settings.querySelector(':nth-child(1) > input').value,
      1,
      p2Settings.querySelector(':nth-child(2) > input').value,
      p2Settings.querySelector(':nth-child(3) > input').value,
    );
    console.log(player1);
    console.log(player2);
    gameState.state = gameState.gameStart;

    // resetting

    gameBoard.forEach((tile) => {
      tile.element.textContent = '';
      tile.element.style.backgroundColor = 'transparent';
      tile.value = '';
    });

    updateGameState();
  }

  function playMove(tile) {
    console.log(gameBoard);
    // check if legal move
    if (gameState.state === gameState.p1Win || gameState.state === gameState.p2Win) { alert('game is over! start a new oone'); } else if (tile.value === '') {
      tile.element.textContent = currentplayer.symbol;
      tile.element.style.backgroundColor = currentplayer.color;
      tile.value = currentplayer.id;
      turns += 1;
      updateGameState();
    } else { alert('already played move in this spot'); }
  }

  Array.from(tiles).forEach((tileEl, i) => {
    const tile = tileFactory(i, tileEl);
    tileEl.addEventListener('click', () => {
      playMove(tile);
    });
    tile.value = '';
    gameBoard.push(tile);
  });

  settings.querySelector('button').addEventListener('click', () => { startGame(); });
  updateGameState();
})();
