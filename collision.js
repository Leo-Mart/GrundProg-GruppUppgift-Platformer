export function isColliding(player, platforms, ctx) {
  if (
    player.x < ctx.x + ctx.width &&
    player.x + player.width > ctx.x &&
    player.y < ctx.y + ctx.height &&
    player.y + player.height > ctx.y
  )
    if (
      enemy.x < platforms.platform.x + platforms.platform.width &&
      enemy.x + enemy.width > platforms.platform.x &&
      enemy.y < platforms.platform.y + platforms.platform.height &&
      enemy.y + enemy.height > platforms.platform.y
    ) {
      return true;
    } else {
      return false;
    }
}
