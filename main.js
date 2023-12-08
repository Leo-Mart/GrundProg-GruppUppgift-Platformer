import { drawPlayer, updatePlayer } from './player.js';
import { drawPlatforms } from './platform.js';
import {
  drawEnemies,
  updateEnemy,
  tickEnemySpawn,
  spawnEnemy,
} from './enemy.js';
import {
  isColliding,
  collisionPlayerplatform,
  collisionEnemiesPlatform,
} from './collision.js';
import { timecount, pointcounter } from './points&time.js';
import {
  drawPowerUps,
  updatePowerUps,
  spawnPowerups,
  tickPowerupSpawn,
} from './powerups.js';
import { drawLasers, updateLasers, shootLaser } from './laser.js';

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = 500;

let game = initGame(canvas.width, canvas.height);

function initGame(gameWidth, gameHeight) {
  requestAnimationFrame(() => tick(ctx, game));

  return {
    player: {
      x: 150,
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
      state: {
        airtime: false,
        left: false,
        right: true,
      },
      powererdup: false,
    },

    powerups: [],
    enemies: [],
    enemySpawnTimer: 1,
    platformSpawnTimer: 3,
    powerupSpawnTimer: 10,
    points: 0,
    gameTimer: 0.1,
    lasers: [],

    // eventuellt kunna ge platformar random x/y värden så de spawna in på ett random ställe.
    goal: [
      {
        x: 4150,
        y: 280,
        width: 10,
        height: 150,
        velocity: 0,
      },
      {
        x: 4150,
        y: 250,
        width: 50,
        height: 35,
        velocity: 0,
      },
    ],

    platforms: [
      // vänstervägen
      {
        x: 0,
        y: 0,
        width: 20,
        height: 500,
        velocity: 0,
      },
      //marken
      {
        x: 0,
        y: 470,
        width: 500,
        height: 30,
        velocity: 0,
      },
      {
        x: 550,
        y: 470,
        width: 500,
        height: 30,
        velocity: 0,
      },
      {
        x: 1150,
        y: 470,
        width: 500,
        height: 30,
        velocity: 0,
      },
      {
        x: 1650,
        y: 420,
        width: 500,
        height: 80,
        velocity: 0,
      },
      {
        x: 2450,
        y: 420,
        width: 500,
        height: 80,
        velocity: 0,
      },
      {
        x: 3700,
        y: 420,
        width: 500,
        height: 80,
        velocity: 0,
      },
      // platformar
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
        x: 0,
        y: 200,
        width: 200,
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
      {
        x: 1200,
        y: 350,
        width: 150,
        height: 10,
        velocity: 0,
      },
      {
        x: 1200,
        y: 200,
        width: 150,
        height: 10,
        velocity: 0,
      },
      {
        x: 1800,
        y: 100,
        width: 150,
        height: 10,
        velocity: 0,
      },
      {
        x: 2200,
        y: 350,
        width: 150,
        height: 10,
        velocity: 0,
      },
      {
        x: 3000,
        y: 350,
        width: 150,
        height: 10,
        velocity: 0,
      },
      {
        x: 3300,
        y: 350,
        width: 150,
        height: 10,
        velocity: 0,
      },
      {
        x: 3500,
        y: 350,
        width: 150,
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
      game.player.velocity.y = -1200 * game.deltaTime;
      game.player.state.airtime = true;
    }
    // låter spelaren falla genom platformar
  } else if (event.key === 's') {
    game.player.velocity.y += 200 * game.deltaTime;
    game.player.state.airtime = true;
  }

  if (event.key === 'a') {
    game.player.keys.left = true;
    game.player.state.left = true;
    game.player.state.right = false;
  } else if (event.key === 'd') {
    game.player.keys.right = true;
    game.player.state.left = false;
    game.player.state.right = true;
  }
});

window.addEventListener('keyup', (event) => {
  if (event.key === 'a') {
    game.player.keys.left = false;
  }

  if (event.key === 'd') {
    game.player.keys.right = false;
  }
  if (event.key === ' ') {
    shootLaser(game, game.player, true);
  }
});

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

  // kollision mellan spelare och platformar och fiender och platformar
  collisionPlayerplatform(game.player, game.platforms);
  collisionEnemiesPlatform(game.enemies, game.platforms);
  collisionEnemiesPlatform(game.powerups, game.platforms);

  // kollar kollision mellan fiender och spelaren
  for (let i = 0; i < game.enemies.length; i++) {
    let enemy = game.enemies[i];
    if (isColliding(game.player, enemy)) {
      game.enemies.splice(i, 1);
      game.player.velocity.y = -1000 * game.deltaTime;
      game.player.state.airtime = true;
    }
  }

  // kollision mellan mål och spelare
  for (let i = 0; i < game.goal.length; i++) {
    let goal = game.goal[i];
    if (isColliding(game.player, goal)) {
      alert('you win!');
      // starta om spelet här
    }
  }

  // om spelaren trillar genom hålen förlorar den
  if (game.player.y >= canvas.height) {
    alert('oh no, you lost!');
    // starta om spelet här
  }

  // scrollar vänster/höger
  // if (game.player.x + game.player.width > game.gameWidth - 600) {
  //   game.platforms.forEach((platform) => {
  //     if (game.player.keys.right) {
  //       platform.x -= 300 * game.deltaTime;
  //       game.player.velocity.x = 0;
  //     }
  //   });
  // } else if (game.player.x < game.gameWidth - window.innerWidth + 200) {
  //   game.platforms.forEach((platform) => {
  //     if (game.player.keys.left) {
  //       platform.x += 300 * game.deltaTime;
  //       game.player.velocity.x = 0;
  //     }
  //   });
  // }

  if (game.player.keys.right) {
    // scrollar hela tiden
    game.platforms.forEach((platform) => {
      platform.x -= 150 * game.deltaTime;
    });

    game.goal.forEach((goal) => {
      goal.x -= 150 * game.deltaTime;
    });
  } else if (game.player.keys.left) {
    game.platforms.forEach((platform) => {
      platform.x += 150 * game.deltaTime;
    });

    game.goal.forEach((goal) => {
      goal.x += 150 * game.deltaTime;
    });
  }

  drawLasers(ctx, game);
  updateLasers(game);

  // denna funktion hämtar info från platforms arrayn och loopar igenom och ritar ut varje platform. Ritar också ut "marken"
  drawPlatforms(ctx, game);
  // denna funktion loopar igenom enemies arrayn och ritar ut fiender
  drawEnemies(ctx, game);
  // hanterar hur fienderna rör på sig, och tar bort fiende-object från array om de hamnar utanför canvas
  updateEnemy(game);
  // skapar ett enemy object och pushar detta till enemies array på en slumpad tid, denna array används sedan för att spawna in dem
  tickEnemySpawn(game);
  // ritar ut spelaren, flyttat ner den hit för att den skall ritas framför platformar
  drawPlayer(ctx, game.player);

  // ritar ut powerups
  tickPowerupSpawn(game);
  drawPowerUps(ctx, game);
  updatePowerUps(game);

  timecount(ctx, game);
  pointcounter(ctx);
  requestAnimationFrame(() => tick(ctx, game));
}
// ************ TODO ******************
// X lägg in gravitation på spelare/fiender så de ramlar ner på platformar
// X rita in platformar mer dynamisk, dock skall väl platformana vara fasta så vi kanske bara hårdkodar in dessa?
// X lägga skapade platformar direkt i array och komma åt dem? Kanske typ göra platform = ctx.fillrect(x,y,w,h) och pusha den till en array som vi sedan kan kalla på för att fixa med kollision osv.
// X kollision på platformar
// X eventuellt skapa en constructor/class för att dynamiskt skapa platformar, har gjort detta men är nog snyggare att hårdkoda in plattformar.
// X kollision på fiender och platformar
// X bygg vidare på hoppfunktionen så man inte kan spamma för mycket.
// X kollision mellan fiender och spelare, gör inte mycket just nu dock
// x bygg en bana, med mål, finns en bana men målet vill inte ritas ut.
// x lägga in art, få det att funka med "broken state"
// x eventuellt death pits och liknande hinder
// fixa rörelser/collision.
// collision för att förlora/dö
// powerups, spawnar in och har kollision med platformar, fixa kollision med spelaren och att den ger sin powerup
// spelet starta om när man träffar mål eller dör
// eventuellt lite design
// eventuellt highscore och sånt, kanske spara i localstorage
// rensa ut koden

// powerups och ett mål så är vi ok för g
