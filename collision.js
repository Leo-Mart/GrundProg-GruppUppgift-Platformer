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

export function isColliding(player, object) {
  if (
    player.x < object.x + object.width &&
    player.x + player.width > object.x &&
    player.y < object.y + object.height &&
    player.y + player.height > object.y
  ) {
    return true;
  } else {
    return false;
  }
}

/* export function collision(r1, r2) {
  if (
    r1.x + r1.width >= r2.x &&
    r1.x <= r2.x + r2.width &&
    r1.y + r1.height >= r2.y &&
    r1.y <= r2.y + r2.heighta
  ) {
    const top_diff = r2.y + r2.height - r1.y;
    const bottom_diff = r1.y + r1.height - r2.y;
    const left_diff = r2.x + r2.width - r1.x;
    const right_diff = r1.x + r1.width - r2.x;

    const min = Math.min(bottom_diff, top_diff, left_diff, right_diff);

    return {
      bottom: bottom_diff == min,
      right: right_diff == min,
      left: left_diff == min,
      top: top_diff == min,
    };
  }
  return null;
}

export function isCollidingTop(player, enemy) {
  if (
    // Spelare vänster om fienden
    ((player.x <= enemy.x && // Spelarens vänstersida UTANFÖR fiendens vänstersida
      player.x + player.width > enemy.x) || // Spelarens högersida INNANFÖR fiendens vänstersida
      // Spelare höger om fienden
      (player.x >= enemy.x && // Spelarens högersida INNANFÖR fiendens högersida
        player.x < enemy.x + enemy.width)) && // Spelarens högersida
    // Spelaren uppepå fiendens hitbox
    player.y + player.height === enemy.y
  ) {
    console.log('test1');
    return true;
  } else {
    return false;
  }
}
 */
