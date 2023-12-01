import { drawPlayer, updatePlayer } from './player.js';
import { drawPlatforms } from './platform.js';
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

    camerabox: {
      position: {
        x: gameWidth / 2 - 25,
        y: gameHeight - 100,
      },
      width: 200,
      height: 250,
    },

    enemies: [],
    enemySpawnTimer: 1,
    points: 0,
    gameTimer: 0.1,

    // eventuellt kunna ge platformar random x/y värden så de spawna in på ett random ställe.
    platforms: [
      // {
      //   //marken
      //   x: 0,
      //   y: 470,
      //   width: 800,
      //   height: 30,
      //   velocity: 0,
      // },
      {
        x: 800,
        y: 200,
        width: -300,
        height: 10,
        velocity: 0,
      },
      {
        x: 800,
        y: 350,
        width: -300,
        height: 10,
        velocity: 0,
      },
      {
        x: 800,
        y: 100,
        width: -300,
        height: 10,
        velocity: 0,
      },
      {
        x: 0,
        y: 200,
        width: 200,
        height: 10,
        velocity: 0,
      },
      {
        x: 0,
        y: 400,
        width: 300,
        height: 10,
        velocity: 0,
      },
      {
        x: 0,
        y: 250,
        width: 300,
        height: 10,
        velocity: 0,
      },
      {
        x: 270,
        y: 200,
        width: 150,
        height: 10,
        velocity: 0,
      },
      {
        x: 270,
        y: 350,
        width: 150,
        height: 10,
        velocity: 0,
      },
      // platformar över
      {
        x: 800,
        y: -100,
        width: -800,
        height: 10,
        velocity: 0,
      },
      {
        x: 800,
        y: -150,
        width: -800,
        height: 10,
        velocity: 0,
      },
      {
        x: 800,
        y: -350,
        width: -800,
        height: 10,
        velocity: 0,
      },
      {
        x: 800,
        y: -400,
        width: -800,
        height: 10,
        velocity: 0,
      },
      // platformar under
      {
        x: 800,
        y: 800,
        width: -800,
        height: 10,
        velocity: 0,
      },
    ],

    gameWidth,
    gameHeight,

    lastTime: Date.now(),
    deltaTime: 0,
  };
}
window.addEventListener('keydown', (event) => {
  if (event.key === 'w') {
    // låter spelaren hoppa endast när den inte redan hoppar.
    if (
      game.player.y + game.player.height <= canvas.height &&
      game.player.velocity.y === 0
    ) {
      game.player.keys.jump = true;
      game.player.velocity.y = -800 * game.deltaTime;
    }
    // låter spelaren falla genom platformar
  } else if (event.key === 's') {
    game.player.velocity.y += 200 * game.deltaTime;
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

function updateCameraBox() {
  game.camerabox = {
    position: {
      x: game.player.x - 137.5,
      y: game.player.y - 165,
    },
    width: 300,
    height: 250,
  };
}

function tick(ctx, game) {
  let now = Date.now();
  game.deltaTime = (now - game.lastTime) / 1000;
  game.lastTime = now;
  // rensar ut canvas för att sedan rita över det igen
  ctx.clearRect(0, 0, game.gameWidth, game.gameHeight);

  // ritar ut spelaren
  drawPlayer(ctx, game.player);
  // hanterar spelarens rörelser och "gravitation"
  updatePlayer(game);

  // kollision mellan spelare och botten av canvas
  if (
    game.player.y + game.player.height + game.player.velocity.y >=
    canvas.height - 30
  ) {
    game.player.velocity.y = 0;
  }
  // hanterar kollision mellan spelare och platformar, första satsen hanterar vänstersidan, andra högersidan.
  game.platforms.forEach((platform) => {
    if (
      game.player.y + game.player.height <= platform.y &&
      game.player.y + game.player.height + game.player.velocity.y >=
        platform.y &&
      game.player.x + game.player.width >= platform.x &&
      game.player.x <= platform.x + platform.width
    ) {
      game.player.velocity.y = 0;
      console.log('körs 1');
    }
    if (
      game.player.y + game.player.height <= platform.y &&
      game.player.y + game.player.height + game.player.velocity.y >=
        platform.y &&
      // kollar spelarens sidor emot platformarna för att hitta när denne har trillat av en platform
      // flippad kontra ovan då dessa platformar är på högersida, de ovan är på vänster.
      // Verkar också som om dessa if-satser tar mitten platformarna också.
      game.player.x <= platform.x &&
      game.player.x + game.player.width >= platform.x + platform.width
    ) {
      game.player.velocity.y = 0;
      console.log('körs 2');
    }
  });

  updateCameraBox();
  ctx.fillStyle = 'rgba(0, 0, 255, 0.3)';
  ctx.fillRect(
    game.camerabox.position.x,
    game.camerabox.position.y,
    game.camerabox.width,
    game.camerabox.height
  );

  // kollar kollision mellan fiender och spelaren
  for (let i = 0; i < game.enemies.length; i++) {
    let enemy = game.enemies[i];
    if (isColliding(game.player, enemy)) {
      console.log('här blev det krock!');
    }
  }
  // hanterar kollision mellan platformar och fiender
  game.platforms.forEach((platform) => {
    for (let enemy of game.enemies) {
      if (
        enemy.y + enemy.height <= platform.y &&
        enemy.y + enemy.height + enemy.velocity.y >= platform.y &&
        enemy.x + enemy.width >= platform.x &&
        enemy.x <= platform.x + platform.width
      ) {
        enemy.velocity.y = 0;
      }
      if (
        enemy.y + enemy.height <= platform.y &&
        enemy.y + enemy.height + enemy.velocity.y >= platform.y &&
        // kollar spelarens sidor emot platformarna för att hitta när denne har trillat av en platform
        // flippad kontra ovan då dessa platformar är på högersida, de ovan är på vänster.
        // Verkar också som om dessa if-satser tar mitten platformarna också.
        enemy.x <= platform.x &&
        enemy.x + enemy.width >= platform.x + platform.width
      ) {
        enemy.velocity.y = 0;
      }
    }
  });

  // "scrollar" uppåt efterhand som spelaren rör sig uppåt
  if (game.player.keys.jump && game.player.y < game.gameHeight - 450) {
    game.platforms.forEach((platform) => {
      platform.y += 200 * game.deltaTime;
    });
  } else if (game.player.y + game.player.height > game.gameHeight - 30) {
    game.platforms.forEach((platform) => {
      platform.y -= 400 * game.deltaTime;
      game.player.velocity.y = 0;
    });
  }

  // denna funktion hämtar info från platforms arrayn och loopar igenom och ritar ut varje platform. Ritar också ut "marken"
  drawPlatforms(ctx, game);
  // denna funktion loopar igenom enemies arrayn och ritar ut fiender
  drawEnemies(ctx, game);
  // hanterar hur fienderna rör på sig, och tar bort fiende-object från array om de hamnar utanför canvas
  updateEnemy(game);
  // skapar ett enemy object och pushar detta till enemies array på en slumpad tid, denna array används sedan för att spawna in dem
  tickEnemySpawn(game);

  timecount(ctx, game);

  requestAnimationFrame(() => tick(ctx, game));
}

// ctx.scale(1.5, 1.5);
// ************ TODO ******************
// X lägg in gravitation på spelare/fiender så de ramlar ner på platformar
// X rita in platformar mer dynamisk, dock skall väl platformana vara fasta så vi kanske bara hårdkodar in dessa?
// X lägga skapade platformar direkt i array och komma åt dem? Kanske typ göra platform = ctx.fillrect(x,y,w,h) och pusha den till en array som vi sedan kan kalla på för att fixa med kollision osv.
// X kollision på platformar
// eventuellt skapa en constructor/class för att dynamiskt skapa platformar
// X kollision på fiender och platformar
// X bygg vidare på hoppfunktionen så man inte kan spamma för mycket.
// lägga in art, få det att funka med "broken state"
// fiender byter håll när de träffar kanten
// kollision mellan fiender och spelare
// timer och poäng system
// powerups
// scrolla banan uppåt, tänk på fiendespawn när banan scrollar uppåt
