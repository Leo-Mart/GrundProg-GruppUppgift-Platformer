const portalImg = new Image();
portalImg.src = './images/portal.png';

const groundImg = new Image();
groundImg.src = './images/brick2.png';

const goalImg = new Image();
goalImg.src = './images/flag.png';

const platformImg = new Image();
platformImg.src = './images/ground2.png';

export function drawPlatforms(ctx, game) {
  const pattern = ctx.createPattern(groundImg, 'repeat');
  const platformPattern = ctx.createPattern(platformImg, 'repeat');
  game.goal.forEach((goal) => {
    ctx.drawImage(goalImg, goal.x, goal.y);
  });

  game.platforms.forEach((platform) => {
    ctx.save();
    ctx.translate(platform.x, platform.y);
    ctx.fillStyle = platformPattern;
    ctx.fillRect(0, 0, platform.width, platform.height);
    ctx.restore();
  });
  game.ground.forEach((ground) => {
    ctx.save();
    ctx.translate(ground.x, ground.y);
    ctx.fillStyle = pattern;
    ctx.fillRect(0, 0, ground.width, ground.height);
    ctx.restore();
  });

  game.walls.forEach((wall) => {
    ctx.save();
    ctx.translate(wall.x, wall.y);
    ctx.fillStyle = pattern;
    ctx.fillRect(0, 0, wall.width, wall.height);
    ctx.restore();
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
