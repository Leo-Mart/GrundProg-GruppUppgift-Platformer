export function isColliding(player, enemy) {
  if (
    player.x < enemy.x + enemy.width &&
    player.x + player.width > enemy.x &&
    player.y < enemy.y + enemy.height &&
    player.y + player.height > enemy.y
  ) {
    return true;
  } else {
    return false;
  }
}
// hanterar kollision mellan spelare och platformar
export function collisionPlayerplatform(player, platform) {
  platform.forEach((platform) => {
    if (
      player.y + player.height <= platform.y &&
      player.y + player.height + player.velocity.y >= platform.y &&
      player.x + player.width >= platform.x &&
      player.x <= platform.x + platform.width
    ) {
      player.velocity.y = 0;
    }
    // if (
    //   player.y + player.height <= platform.y &&
    //   player.y + player.height + player.velocity.y >= platform.y &&
    //   // kollar spelarens sidor emot platformarna för att hitta när denne har trillat av en platform
    //   // flippad kontra ovan då dessa platformar är på högersida, de ovan är på vänster.
    //   // Verkar också som om dessa if-satser tar mitten platformarna också.
    //   player.x <= platform.x &&
    //   player.x + player.width >= platform.x + platform.width
    // ) {
    //   player.velocity.y = 0;
    // }
  });
}

// hanterar kollsion mellan fiender och platformar
export function collisionEnemiesPlatform(enemies, platform) {
  platform.forEach((platform) => {
    for (let enemy of enemies) {
      if (
        enemy.y + enemy.height <= platform.y &&
        enemy.y + enemy.height + enemy.velocity.y >= platform.y &&
        enemy.x + enemy.width >= platform.x &&
        enemy.x <= platform.x + platform.width
      ) {
        enemy.velocity.y = 0;
      }
      // if (
      //   enemy.y + enemy.height <= platform.y &&
      //   enemy.y + enemy.height + enemy.velocity.y >= platform.y &&
      //   // kollar spelarens sidor emot platformarna för att hitta när denne har trillat av en platform
      //   // flippad kontra ovan då dessa platformar är på högersida, de ovan är på vänster.
      //   // Verkar också som om dessa if-satser tar mitten platformarna också.
      //   enemy.x <= platform.x &&
      //   enemy.x + enemy.width >= platform.x + platform.width
      // ) {
      //   enemy.velocity.y = 0;
      // }
    }
  });
}
