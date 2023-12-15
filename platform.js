const portalImg = new Image();
portalImg.src = './images/portal.png';

const groundImg = new Image();
groundImg.src = './images/ground2.png';

const goalImg = new Image();
goalImg.src = './images/flag.png';

export function drawPlatforms(ctx, game) {
  const pattern = ctx.createPattern(groundImg, 'repeat');
  game.goal.forEach((goal) => {
    ctx.drawImage(goalImg, goal.x, goal.y);
  });
  game.platforms.forEach((platform) => {
    // ctx.drawImage(groundImg, platform.x, platform.y);
    ctx.fillStyle = pattern;
    ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
    // ctx.fillStyle = 'gray';
    // ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
  });
  game.ground.forEach((ground) => {
    ctx.fillStyle = pattern;
    ctx.fillRect(ground.x, ground.y, ground.width, ground.height);

    // for (let w = 0; w < ground.width; w += groundImg.width) {
    //   for (let h = 0; h < ground.height; h += groundImg.height) {
    //     ctx.drawImage(groundImg, ground.x, ground.y, w, h);
    //   }
    // }
  });

  game.walls.forEach((wall) => {
    ctx.fillStyle = pattern;
    ctx.fillRect(wall.x, wall.y, wall.width, wall.height);
  });
  game.spawnHoles.forEach((spawnHole) => {
    ctx.drawImage(
      portalImg,
      spawnHole.x,
      spawnHole.y,
      spawnHole.width,
      spawnHole.height
    );
  });
}
