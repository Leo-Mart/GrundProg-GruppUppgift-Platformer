// hanterar kollision mellan spelare och platformar
// fick hjälp av william på denna lösning
export function collisionPlayerplatform(player, platform, game) {
  platform.forEach((platform) => {
    let playerDown = {
      x: player.x,
      y: player.y + player.velocity.y * game.deltaTime,
      width: player.width,
      height: player.height,
    };
    if (
      isColliding(playerDown, platform) &&
      player.velocity.y > 0 &&
      player.y + player.height <= platform.y + platform.height / 2 &&
      player.x + player.width >= platform.x &&
      player.x <= platform.x + platform.width
    )
      if (game.player.keys.down === true) {
        game.player.state.airtime = true;
        game.player.keys.down = false;
        game.player.velocity.y += 1000;
      } else {
        player.velocity.y = 0;
        player.y = platform.y - player.height;
        player.state.airtime = false;
      }
  });
}

export function collisionEnemyPlatform(player, platform, game) {
  platform.forEach((platform) => {
    let playerDown = {
      x: player.x,
      y: player.y + player.velocity.y * game.deltaTime,
      width: player.width,
      height: player.height,
    };
    if (
      isColliding(playerDown, platform) &&
      player.y + player.height <= platform.y + platform.height / 2 &&
      player.x + player.width >= platform.x &&
      player.x <= platform.x + platform.width
    ) {
      player.velocity.y = 0;
      player.y = platform.y - player.height; //- player.height;
      player.state.airtime = false;
    }
  });
}

export function collisionObjectPlatform(player, platform, game) {
  platform.forEach((platform) => {
    let playerDown = {
      x: player.x,
      y: player.y + player.velocity.y * game.deltaTime,
      width: player.width,
      height: player.height,
    };
    if (
      isColliding(playerDown, platform) &&
      player.y + player.height <= platform.y + platform.height / 2 &&
      player.x + player.width >= platform.x &&
      player.x <= platform.x + platform.width
    ) {
      player.velocity.y = 0;
      player.y = platform.y - player.height;
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

// vår gamla lösning
// hanterar kollision mellan spelare och platformar
// export function collisionPlayerplatform(player, platform) {
//   platform.forEach((platform) => {
//     if (
//       player.y + player.height <= platform.y &&
//       player.y + player.height + player.velocity.y >= platform.y &&
//       player.x + player.width >= platform.x &&
//       player.x <= platform.x + platform.width
//     ) {
//       player.velocity.y = 0;
//       player.state.airtime = false;
//     }
//     if (
//       player.y + player.height <= platform.y &&
//       player.y + player.height + player.velocity.y >= platform.y &&
//       // kollar spelarens sidor emot platformarna för att hitta när denne har trillat av en platform
//       // flippad kontra ovan då dessa platformar är på högersida, de ovan är på vänster.
//       // Verkar också som om dessa if-satser tar mitten platformarna också.
//       player.x <= platform.x &&
//       player.x + player.width >= platform.x + platform.width
//     ) {
//       player.velocity.y = 0;
//       player.state.airtime = false;
//     }
//   });
// }

// // hanterar kollsion mellan fiender och platformar
// export function collisionEntityPlatform(entitys, platform) {
//   platform.forEach((platform) => {
//     for (let entity of entitys) {
//       if (
//         entity.y + entity.height <= platform.y &&
//         entity.y + entity.height + entity.velocity.y >= platform.y &&
//         entity.x + entity.width >= platform.x &&
//         entity.x <= platform.x + platform.width
//       ) {
//         entity.velocity.y = 0;
//       }
//       if (
//         entity.y + entity.height <= platform.y &&
//         entity.y + entity.height + entity.velocity.y >= platform.y &&
//         // kollar spelarens sidor emot platformarna för att hitta när denne har trillat av en platform
//         // flippad kontra ovan då dessa platformar är på högersida, de ovan är på vänster.
//         // Verkar också som om dessa if-satser tar mitten platformarna också.
//         entity.x <= platform.x &&
//         entity.x + entity.width >= platform.x + platform.width
//       ) {
//         entity.velocity.y = 0;
//       }
//     }
//   });
// }

// export function isColliding(player, object) {
//   if (
//     player.x < object.x + object.width &&
//     player.x + player.width > object.x &&
//     player.y < object.y + object.height &&
//     player.y + player.height > object.y
//   ) {
//     return true;
//   } else {
//     return false;
//   }
// }
