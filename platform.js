export function drawPlatforms(ctx, game) {
  /* for (let platforms of game.platforms) {
  let indexX = platforms.platform.x[Math.floor(Math.random() * platforms.platform.x.length)]
  let indexY = platforms.platform.y[Math.floor(Math.random() * platforms.platform.y.length)]

  ctx.fillStyle = "green"
  ctx.fillRect(platforms.platform.x[indexX], platforms.platform.y[indexY], platforms.platform.width, platforms.platform.height )
}
*/

  // "marken"
  ctx.fillStyle = 'brown';
  ctx.fillRect(0, 470, 800, 30);

  // höger platformar
  ctx.fillStyle = 'green';
  ctx.fillRect(800, 200, -300, 10);
  ctx.fillRect(800, 350, -300, 10);
  ctx.fillRect(800, 100, -300, 10);

  //vänster platformar
  ctx.fillRect(0, 200, 200, 10);
  ctx.fillRect(0, 400, 300, 10);
  ctx.fillRect(0, 100, 300, 10);

  //mitten
  ctx.fillRect(270, 200, 150, 10);
}

export function createPlatforms(game) {
  let platform = {
    x: [0, 400, 800],
    y: [100, 200, 300, 400],
    width: 200,
    height: 10,
  };

  game.platforms.push(platform);
}
