let playerImg = document.querySelector('#player');
// Funktioner som ritar ut spelaren
export function drawPlayer(ctx, player) {
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(playerImg, player.x, player.y, player.width, player.height);
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
