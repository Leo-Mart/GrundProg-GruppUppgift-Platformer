// funktion som räknar tiden sen spelet startades, en tidsräknare

export function timecount(ctx, game) {
  //let gameTimer = 0;
  game.gameTimer += game.deltaTime;
  //console.log(game.gameTimer);

  /* let now = Date.now();
  game.deltaTime = (now - game.lastTime) / 1000;
  game.lastTime = now;
  game.timer = game.lastTime; */

  ctx.font = '20px Arial';
  ctx.fillStyle = 'black';
  ctx.fillText('Time (sec): ' + game.gameTimer.toFixed(1), 350, 20);
  //console.log(game.deltaTime);
}

export function pointcounter(ctx, points) {
  ctx.font = '20px Arial';
  ctx.fillStyle = 'black';
  ctx.fillText('Points: ' + points, 550, 20);
}

/* export function livescounter(ctx) {
  ctx.font = '20px Arial';
  ctx.fillStyle = 'black';
  ctx.fillText('Lives: ' + lives, 550, 20);
} */

export function powererdupStatus(ctx, player) {
  if (player.powererdup === true) {
    ctx.font = '20px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText('Powererd Up!', 750, 20);
    ctx.fillText('Press Spacebar to shoot!', 700, 45);
  }
}
