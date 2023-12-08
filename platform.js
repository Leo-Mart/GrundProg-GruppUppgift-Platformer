export function drawPlatforms(ctx, game) {
  game.goal.forEach((goal) => {
    ctx.fillStyle = "purple";
    ctx.fillRect(goal.x, goal.y, goal.width, goal.height)
  })
  game.platforms.forEach((platform) => {
    ctx.fillStyle = 'green';
    ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
  });
}

export function tickPlatformSpawn(game) {
  game.platformSpawnTimer -= game.deltaTime;
  if (game.platformSpawnTimer <= 0) {
    console.log('runs');
    spawnPlatform(game);
    game.platformSpawnTimer = Math.random() * 2 + 1;
  }
}

export function spawnPlatform(game) {
  // https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
  let x = Math.floor(Math.random() * (500 - 300 + 1)) + 300;
  let y = Math.floor(Math.random() * (450 - 50 + 1)) + 150;
  let platform = {
    x,
    y,
    width: 200,
    height: 10,
    velocity: 0,
  };

  game.platforms.push(platform);
}
