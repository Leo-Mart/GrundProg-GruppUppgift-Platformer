let portalImg = document.querySelector('#portal');

export function drawPlatforms(ctx, game) {
  game.goal.forEach((goal) => {
    ctx.fillStyle = 'purple';
    ctx.fillRect(goal.x, goal.y, goal.width, goal.height);
  });
  game.platforms.forEach((platform) => {
    ctx.fillStyle = 'green';
    ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
  });
  game.ground.forEach((ground) => {
    ctx.fillStyle = 'brown';
    ctx.fillRect(ground.x, ground.y, ground.width, ground.height);
  });

  game.walls.forEach((wall) => {
    ctx.fillStyle = 'brown';
    ctx.fillRect(wall.x, wall.y, wall.width, wall.height);
  });
  game.spawnHoles.forEach((spawnHole) => {
    ctx.fillStyle = 'purple';
    ctx.fillRect(spawnHole.x, spawnHole.y, spawnHole.width, spawnHole.height);
    // ctx.drawImage(
    //   portalImg,
    //   spawnHole.x,
    //   spawnHole.y,
    //   spawnHole.width,
    //   spawnHole.height
    // );
  });
}
