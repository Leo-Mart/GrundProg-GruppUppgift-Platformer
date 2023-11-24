export function isColliding(player, ctx) {
  if (
    player.x < ctx.x + ctx.width &&
    player.x + player.width > ctx.x &&
    player.y < ctx.y + ctx.height &&
    player.y + player.height > ctx.y
  ) {
    return true;
  } else {
    return false;
  }
}
