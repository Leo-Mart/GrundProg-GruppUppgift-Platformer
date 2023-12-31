let playerImg = document.querySelector('#player');

const lookright = 0;
const lookleft = 36;

let currentWalkFrame = 50;
let framecount = 0;

const jumping = 25;

// Funktion som hanterar rörelselogik hos spelaren
export function updatePlayer(game) {
  const player = game.player;

  if (player.keys.left && player.x > 0) {
    player.x -= player.velocity.x * game.deltaTime;
  } else if (player.keys.right && player.x + player.width < game.gameWidth) {
    player.x += player.velocity.x * game.deltaTime;
  }
  // "gravitation" på spelaren, så den faller nedåt så länge den inte hoppar
  player.velocity.y += 1000 * game.deltaTime;
  player.y += player.velocity.y * game.deltaTime;
  // console.log(player.x, player.y);
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
        36,
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
