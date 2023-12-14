let playerImg = document.querySelector('#player');

/* const lookright = player.height * 1;
const lookleft = player.height * 2;

const walkcycle = [3, 4, 5];
let currentWalkFrame = player.width * 3;

const standing = player.width * 1;
const jumping = player.width * 2;
const hurt = player.width * 6; */

const lookright = 0;
const lookleft = 36;

const walkcycle = [3, 4, 5, 6];
let currentWalkFrame = 50;
let framecount = 0;

const standing = 0;
const jumping = 25;
const hurt = 125;

// Funktion som hanterar rörelselogik hos spelaren
export function updatePlayer(game) {
  const player = game.player;

  if (player.keys.left && player.x > 0) {
    player.x -= player.velocity.x * game.deltaTime;
  } else if (player.keys.right && player.x + player.width < game.gameWidth) {
    player.x += player.velocity.x * game.deltaTime;
  }
  // "gravitation" på spelaren, så den faller nedåt så länge den inte hoppar
  player.y += player.velocity.y;
  player.velocity.y += 30 * game.deltaTime;
  //player.velocity.y += 0.2;
}

// Funktioner som ritar ut spelaren
export function drawPlayer(ctx, player) {
  ctx.imageSmoothingEnabled = false;
  if (player.state.airtime === true) {
    // om player i luften
    if (player.state.left === true) {
      // om player i luften ÅT vänster
      ctx.drawImage(
        playerImg,
        jumping,
        lookleft,
        player.width,
        player.height,
        player.x,
        player.y,
        player.width,
        player.height
      );
    } else if (player.state.right === true) {
      // om player i luften ÅT höger
      ctx.drawImage(
        playerImg,
        jumping,
        lookright,
        player.width,
        player.height,
        player.x,
        player.y,
        player.width,
        player.height
      );
    }
  } else if (player.keys.left === true) {
    ctx.drawImage(
      playerImg,
      currentWalkFrame,
      lookleft,
      player.width,
      player.height,
      player.x,
      player.y,
      player.width,
      player.height
    );
    framecount++;
    if (framecount >= 10) {
      framecount = 0;
      currentWalkFrame += 25;
      if (currentWalkFrame > 125) {
        currentWalkFrame = 50;
      }
    }
  } else if (player.keys.right === true) {
    ctx.drawImage(
      playerImg,
      currentWalkFrame,
      lookright,
      player.width,
      player.height,
      player.x,
      player.y,
      player.width,
      player.height
    );
    framecount++;
    if (framecount >= 10) {
      framecount = 0;
      currentWalkFrame += 25;
      if (currentWalkFrame > 125) {
        currentWalkFrame = 50;
      }
    }
  } else {
    if (player.state.left === true) {
      ctx.drawImage(
        playerImg,
        0,
        35,
        player.width,
        player.height,
        player.x,
        player.y,
        player.width,
        player.height
      );
    } else if (player.state.right == true) {
      ctx.drawImage(
        playerImg,
        0,
        0,
        player.width,
        player.height,
        player.x,
        player.y,
        player.width,
        player.height
      );
    }
  }
}
