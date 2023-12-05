export function drawPlatforms(ctx, game) {
  // //'marken';
  // ctx.fillStyle = 'brown';
  // ctx.fillRect(0, 470, window.innerWidth, 30);

  game.platforms.forEach((platform) => {
    ctx.fillStyle = 'green';
    ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
  });
}

// får platformen att röra sig uppåt men fastnar på toppen, antar jag måste hitta rätt värden men min hjärna verkar vara alldeles för trög idag.
// export function movePlatforms(ctx, game) {
//   let platform = game.platforms[7];
//   console.log(platform);
//   if (platform.y < 400 && platform.y > 100) {
//     platform.velocity = 1;
//     platform.y -= platform.velocity;
//     console.log('kör uppåt');
//   } else if (game.platforms[7].y > 100) {
//     platform.velocity = 1;
//     platform.y += platform.velocity;
//     console.log('kör nedåt');
//   } else {
//     platform.velocity = 0;
//   }
// }
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
