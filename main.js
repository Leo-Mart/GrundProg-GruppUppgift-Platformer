import { drawPlayer, updatePlayer } from './player.js';
import { createPlatforms, drawPlatforms } from './platform.js';
import {
  drawEnemies,
  updateEnemy,
  tickEnemySpawn,
  spawnEnemy,
} from './enemy.js';
import { isColliding } from './collision.js';
import { timecount } from './points&time.js';

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 500;

let game = initGame(canvas.width, canvas.height);

function initGame(gameWidth, gameHeight) {
  requestAnimationFrame(() => tick(ctx, game));

  return {
    player: {
      x: gameWidth / 2 - 25,
      y: gameHeight - 100,
      width: 25,
      height: 35,
      speed: 300,
      velocity: {
        x: 0,
        y: 0,
      },
      keys: {
        left: false,
        right: false,
        jump: false,
      },
    },

    enemies: [],
    enemySpawnTimer: 1,
    points: 0,

    platforms: [],

    gameWidth,
    gameHeight,

    lastTime: Date.now(),
    deltaTime: 0,
  };
}
window.addEventListener('keydown', (event) => {
  if (event.key === 'w') {
    if (
      game.player.y + game.player.height <= canvas.height &&
      game.player.velocity.y === 0
    ) {
      game.player.keys.jump = true;
      game.player.velocity.y = -8;
    }
  } else if (event.key === 's') {
    if (game.player.y != canvas.height + 490) {
      game.player.velocity.y += 0.2;
    }
  }

  if (event.key === 'a') {
    game.player.keys.left = true;
  } else if (event.key === 'd') {
    game.player.keys.right = true;
  }
});

window.addEventListener('keyup', (event) => {
  if (event.key === 'a') {
    game.player.keys.left = false;
  }

  if (event.key === 'd') {
    game.player.keys.right = false;
  }
});

function tick(ctx, game) {
  let now = Date.now();
  game.deltaTime = (now - game.lastTime) / 1000;
  game.lastTime = now;

  ctx.clearRect(0, 0, game.gameWidth, game.gameHeight);

  drawPlayer(ctx, game.player);
  updatePlayer(game);
  // isColliding(game.player, canvas.height);
  if (
    game.player.y + game.player.height + game.player.velocity.y >=
    canvas.height - 30
  ) {
    game.player.velocity.y = 0;
  }
  // kollision mellan spelare och en av platformarna. Skall försöka skapa platformar dynamiskt så borde det gå att använda detta för alla platformar
  if (
    game.player.y + game.player.height <= 400 &&
    game.player.y + game.player.height + game.player.velocity.y >= 400 &&
    game.player.x + game.player.width >= 0 &&
    game.player.x <= 0 + 300
  ) {
    game.player.velocity.y = 0;
  }
  if (
    game.player.y + game.player.height <= 350 &&
    game.player.y + game.player.height + game.player.velocity.y >= 350 &&
    game.player.x + game.player.width >= 500 &&
    game.player.x <= 800 + 300
  ) {
    game.player.velocity.y = 0;
  }

  game.platforms.length = 5;
  // createPlatforms(game);
  // console.log(game.platforms);
  drawPlatforms(ctx, game);

  drawEnemies(ctx, game);
  updateEnemy(game);
  tickEnemySpawn(game);

  timecount(ctx, game);

  requestAnimationFrame(() => tick(ctx, game));
}

// ************ TODO ******************
// X lägg in gravitation på spelare/fiender så de ramlar ner på platformar
// rita in platformar mer dynamisk, dock skall väl platformana vara fasta så vi kanske bara hårdkodar in dessa?
// eventuellt skapa en constructor/class för att dynamiskt skapa platformar, borde göra det enklare att fixa med kollision också
// lägga skapade platformar direkt i array och komma åt dem? Kanske typ göra platform = ctx.fillrect(x,y,w,h) och pusha den till en array som vi sedan kan kalla på för att fixa med kollision osv.
// kollision på platformar
// kollision på fiender
// X bygg vidare på hoppfunktionen så man inte kan spamma för mycket.
// timer och poäng system
// powerups
// scrolla banan uppåt, tänk på fiendespawn när banan scrollar uppåt
