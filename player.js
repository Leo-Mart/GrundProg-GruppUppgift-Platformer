let playerImg = document.querySelector('#player');

/* const lookright = player.height * 1;
const lookleft = player.height * 2;

const walkcycle = [3, 4, 5];
let currentWalkFrame = player.width * 3;

const standing = player.width * 1;
const jumping = player.width * 2;
const hurt = player.width * 6; */

const lookright = 0
const lookleft = 35;

const walkcycle = [3, 4, 5];
let currentWalkFrame = 50;

const standing = 0;
const jumping = 25;
const hurt = 125;

export function drawFrame (frameX, frameY, canvasX, canvasY) {
  ctx.drawImage(img,
    frameX * width, frameY * height, width, height,
    canvasX, canvasY, scaledWidth, scaledHeight);
}

// (img, sx, sy ,swidth, sheight, dx, dy, dwidth, dheight)

//ctx.drawFrame(walkcycle[currentWalkFrame],lookleft ,player.x, player.y)

/* ctx.drawImage(playerImg, 
  jumping, lookright, player.width, player.height, 
  player.x, player.y, player.width, player.height) */


// Funktioner som ritar ut spelaren
export function drawPlayer(ctx, player) {
  //console.log(player);
  //ctx.fillStyle = 'blue';
  // ctx.fillRect(player.x, player.y, player.width, player.height);
  ctx.imageSmoothingEnabled = false;
  if (player.state.airtime === true) { // om player i luften
    console.log(player.width);
    console.log(standing);
    console.log(jumping);
    console.log(hurt);
    if (player.state.left === true) { // om player i luften ÅT vänster
    } else if (player.state.right === true) { // om player i luften ÅT höger
      ctx.drawImage(playerImg, jumping, lookright, player.width, player.height, player.x, player.y, player.width, player.height)
    }
  } else if (player.keys.left === true) {
    ctx.drawFrame(walkcycle[currentWalkFrame],lookleft ,player.x, player.y)
  } else if (player.keys.right === true) {
    ctx.drawImage(playerImg, currentWalkFrame, lookright, player.width, player.height, player.x, player.y, player.width, player.height);
  } else {
    if (player.state.left === true) {
      ctx.drawImage(playerImg, 0, 35, player.width, player.height, player.x, player.y, player.width, player.height);
    } else if (player.state.right == true){
      ctx.drawImage(playerImg, 0, 0, player.width, player.height, player.x, player.y, player.width, player.height);
    }
    
  }
}


// Funktion som hanterar rörelselogik hos spelaren
export function updatePlayer(game) {
  const player = game.player;

  if (player.keys.left && player.x > 0) {
    player.x -= player.velocity.x + 300 * game.deltaTime;
  } else if (player.keys.right && player.x + player.width < game.gameWidth) {
    player.x += player.velocity.x + 300 * game.deltaTime;
  }
  // "gravitation" på spelaren, så den faller nedåt så länge den inte hoppar
  player.y += player.velocity.y;
  player.velocity.y += 30 * game.deltaTime;
  //player.velocity.y += 0.2;
}

/* // Funktioner som ritar ut spelaren
export function drawPlayer(ctx, player) {
  console.log(player);
  //ctx.fillStyle = 'blue';
  // ctx.fillRect(player.x, player.y, player.width, player.height);
  ctx.imageSmoothingEnabled = false;
  if (player.state.airtime === true) { // om player i luften
    console.log(player.width);
    console.log(standing);
    console.log(jumping);
    console.log(hurt);
    if (player.state.left === true) { // om player i luften ÅT vänster
      ctx.drawImage(playerImg, jumping, lookleft, player.width, player.height, player.x, player.y, player.width, player.height)
    } else if (player.state.right === true) { // om player i luften ÅT höger
      ctx.drawImage(playerImg, jumping, lookright, player.width, player.height, player.x, player.y, player.width, player.height)
    }
  } else if (player.keys.left === true) {
    ctx.drawImage(playerImg, currentWalkFrame, lookleft, player.width, player.height, player.x, player.y, player.width, player.height);    
  } else if (player.keys.right === true) {
    ctx.drawImage(playerImg, currentWalkFrame, lookright, player.width, player.height, player.x, player.y, player.width, player.height);
  } else {
    if (player.state.left === true) {
      ctx.drawImage(playerImg, 0, 35, player.width, player.height, player.x, player.y, player.width, player.height);
    } else if (player.state.right == true){
      ctx.drawImage(playerImg, 0, 0, player.width, player.height, player.x, player.y, player.width, player.height);
    }
    
  }
} */