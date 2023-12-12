let powerupImg = document.querySelector('#powerup');

export function spawnPowerups(game) {
  let powerup = {
    x: 500,
    y: 40,
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
  //   game.powerups.powerup.y += game.powerups.powerup.velocity.y;
  //   game.powerups.velocity.y += 30 * game.deltaTime;

  for (let i = 0; i < game.powerups.length; i++) {
    let powerup = game.powerups[i];
    if (
      powerup.x < -powerup.width * 3 ||
      powerup.x + powerup.width > game.gameWidth + powerup.width * 3
    ) {
      game.powerups.splice(i--, 1);
    }

    powerup.y += powerup.velocity.y;
    powerup.velocity.y += 100 * game.deltaTime;
  }
}

export function tickPowerupSpawn(game) {
  game.powerupSpawnTimer -= game.deltaTime;
  if (game.powerupSpawnTimer <= 0) {
    spawnPowerups(game);
    game.powerupSpawnTimer = Math.random() * 10 + 1;
  }
}
