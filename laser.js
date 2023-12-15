import { isColliding } from './collision.js';

export function drawLasers(ctx, game) {
  for (let laser of game.lasers) {
    ctx.fillStyle = 'yellow';
    ctx.fillRect(laser.x, laser.y, laser.width, laser.height);
  }
}

export function updateLasers(game) {
  main: for (let i = 0; i < game.lasers.length; i++) {
    let laser = game.lasers[i];

    laser.x += laser.velX * game.deltaTime;

    if (laser.playerOwned) {
      for (let l = 0; l < game.enemies.length; l++) {
        let enemy = game.enemies[l];

        if (isColliding(laser, enemy)) {
          game.lasers.splice(i--, 1);
          game.enemies.splice(l--, 1);
          game.points += 1;

          continue main;
        }
      }
    }
    //tar bort laser utanför skärmen
    if (laser.x < laser.width || laser.x > game.gameWidth) {
      game.lasers.splice(i--, 1);
    }
  }
}

export function shootLaserRight(game, entity, playerOwned) {
  let laser = {
    x: entity.x + entity.width / 2 - 2.5,
    y: entity.y + entity.height / 2 + 5,
    width: 15,
    height: 3,
    velX: playerOwned + 1500,
    playerOwned,
  };

  game.lasers.push(laser);
}

export function shootLaserLeft(game, entity, playerOwned) {
  let laser = {
    x: entity.x + entity.width / 2 - 2.5,
    y: entity.y + entity.height / 2 + 5,
    width: 15,
    height: 3,
    velX: playerOwned - 1500,
    playerOwned,
  };

  game.lasers.push(laser);
}
