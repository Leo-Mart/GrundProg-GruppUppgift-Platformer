let powerupImg = new Image();
powerupImg.src = './images/powerup.png';

export function drawPowerUps(ctx, game) {
  game.powerups.forEach((powerup) => {
    ctx.drawImage(powerupImg, powerup.x, powerup.y);
  });
}

export function updatePowerUps(game) {
  for (let i = 0; i < game.powerups.length; i++) {
    let powerup = game.powerups[i];

    powerup.y += powerup.velocity.y;
    powerup.velocity.y += 30 * game.deltaTime;
  }
}
