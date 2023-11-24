export function drawPlatforms(ctx, game) {
  // "marken"
  ctx.fillStyle = "brown";  
  ctx.fillRect(0, 470, 800, 30);

  // höger platformar
  ctx.fillStyle = "green";
  ctx.fillRect(800, 200, -300, 10);
  ctx.fillRect(800, 350, -300, 10);
  ctx.fillRect(800, 100, -300, 10);

  //vänster platformar
  ctx.fillRect(0, 200, 200, 10);
  ctx.fillRect(0, 400, 300, 10);
  ctx.fillRect(0, 100, 300, 10);

  //mitten
  ctx.fillRect(270, 200, 150, 10)

  //skapa platformar dynamiskt
  
}

export function createPlatforms(game) {

  let side = Math.random() < 0.5;

  let platform = {
    x: side ? 0 : 800,
    y: 0,
    width: 200,
    height: 10
  }

  game.platforms.push(platform);  
}
