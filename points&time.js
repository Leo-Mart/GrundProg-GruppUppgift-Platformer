// funktion som räknar tiden sen spelet startades, en tidsräknare

export function timecount(ctx, game) {
  let now = Date.now();
  game.deltaTime = (now - game.lastTime) / 1000;
  game.lastTime = now;
  game.timer = game.lastTime;

  ctx.font = '20px Arial';
  ctx.fillStyle = 'black';
  ctx.fillText('Time: ' + game.timer.toFixed(1), 10, 490);
  //console.log(game.deltaTime);
}
