let powerupImg = document.querySelector('#powerup');

export function spawnPowerups(game) {
  let powerup = {
    x: 1300,
    y: 50,
    velocity: {
      x: 0,
      y: 0,
    },
    width: 15,
    height: 15,
  };

  game.powerups.push(powerup);
}

export function drawPowerUps(ctx, game) {
  game.powerups.forEach((powerup) => {
    ctx.fillStyle = 'yellow';
    ctx.fillRect(powerup.x, powerup.y, powerup.width, powerup.height);
  });
}

export function updatePowerUps(game) {
  for (let i = 0; i < game.powerups.length; i++) {
    let powerup = game.powerups[i];

    powerup.y += powerup.velocity.y;
    powerup.velocity.y += 30 * game.deltaTime;
  }
}
