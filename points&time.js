// funktion som räknar tiden sen spelet startades, en tidsräknare

export function timecount(ctx, game) {
  game.gameTimer += game.deltaTime;

  ctx.font = '20px Arial';
  ctx.fillStyle = 'black';
  ctx.fillText('Time (sec): ' + game.gameTimer.toFixed(1), 250, 20);
}

export function pointcounter(ctx, points) {
  ctx.font = '20px Arial';
  ctx.fillStyle = 'black';
  ctx.fillText('Points: ' + points, 450, 20);
}

export function powererdupStatus(ctx, player) {
  if (player.powererdup === true) {
    ctx.font = '20px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText('Powererd Up!', 600, 20);
    ctx.fillText('Press Spacebar to shoot!', 550, 45);
  }
}
