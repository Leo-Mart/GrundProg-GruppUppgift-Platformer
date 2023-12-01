export function drawPlatforms(ctx, game) {
  //'marken';
  ctx.fillStyle = 'brown';
  ctx.fillRect(0, 470, 800, 30);

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
