// Kollision om spelaren landar uppe på fienderna
/* export function isColliding(player, enemy) {
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
 */
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
      player.state.airtime = false;
    }
    if (
      player.y + player.height <= platform.y &&
      player.y + player.height + player.velocity.y >= platform.y &&
      // kollar spelarens sidor emot platformarna för att hitta när denne har trillat av en platform
      // flippad kontra ovan då dessa platformar är på högersida, de ovan är på vänster.
      // Verkar också som om dessa if-satser tar mitten platformarna också.
      player.x <= platform.x &&
      player.x + player.width >= platform.x + platform.width
    ) {
      player.velocity.y = 0;
      player.state.airtime = false;
    }
  });
}

// hanterar kollsion mellan fiender och platformar
export function collisionEntityPlatform(entitys, platform) {
  platform.forEach((platform) => {
    for (let entity of entitys) {
      if (
        entity.y + entity.height <= platform.y &&
        entity.y + entity.height + entity.velocity.y >= platform.y &&
        entity.x + entity.width >= platform.x &&
        entity.x <= platform.x + platform.width
      ) {
        entity.velocity.y = 0;
      }
      if (
        entity.y + entity.height <= platform.y &&
        entity.y + entity.height + entity.velocity.y >= platform.y &&
        // kollar spelarens sidor emot platformarna för att hitta när denne har trillat av en platform
        // flippad kontra ovan då dessa platformar är på högersida, de ovan är på vänster.
        // Verkar också som om dessa if-satser tar mitten platformarna också.
        entity.x <= platform.x &&
        entity.x + entity.width >= platform.x + platform.width
      ) {
        entity.velocity.y = 0;
      }
    }
  });
}

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

/* export function isCollidingTop(player, enemy) {
  // Om spelaren landar uppe på fienden
  if (
    player.x + player.height === enemy.x &&
    player.y + player.width / 2 === enemy.y + enemy.width
  ) {
    return true;
  } else {
    return false;
  }
}

export function isCollidingSide(player, enemy) {
  // Om spelaren rör vid fieneden på sidan
  if (enemy.x) {
    return true;
  } else {
    return false;
  }
} */

export function isCollidingTop(player, enemy) {
  if (
    player.y + player.height === enemy.y + enemy.width &&
    player.x + player.height === enemy.x + enemy.width
  ) {
    return true;
  } else {
    return false;
  }
}

export function isCollidingSidesBottom(player, enemy) {
  if (
    player.x + player.width >= enemy.x &&
    player.y <= enemy.y + enemy.height &&
    player.x <= enemy.x + enemy.width &&
    player.y + player.height >= enemy.y
  ) {
    return true;
  } else {
    return false;
  }
}
