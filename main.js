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
  collisionEntityPlatform,
} from './collision.js';
import { timecount, pointcounter, powererdupStatus } from './points&time.js';
import { drawPowerUps, updatePowerUps, spawnPowerups } from './powerups.js';
import {
  drawLasers,
  updateLasers,
  shootLaserRight,
  shootLaserLeft,
} from './laser.js';

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let backgroundImg = document.getElementById('background');

canvas.width = 1000;
canvas.height = 500;

let game = initGame(canvas.width, canvas.height);

function initGame(gameWidth, gameHeight) {
  requestAnimationFrame(() => tick(ctx, game));

  return {
    player: {
      x: 400,
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
    powerupSpawnTimer: 10,
    points: 0,
    gameTimer: 0.1,
    lasers: [],
    spawnHoles: [
      {
        x: 100,
        y: 20,
        width: 50,
        height: 50,
        velocity: 0,
      },
      {
        x: 900,
        y: 20,
        width: 50,
        height: 50,
        velocity: 0,
      },
    ],
    walls: [
      {
        x: 0,
        y: 0,
        width: 20,
        height: 500,
        velocity: 0,
      },
      {
        x: 1650,
        y: 420,
        width: 20,
        height: 80,
        velocity: 0,
      },
    ],
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
    ground: [
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
    ],
    platforms: [
      // platformar
      {
        x: 800,
        y: 250,
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
        y: 250,
        width: 200,
        height: 10,
        velocity: 0,
      },
      {
        x: 270,
        y: 250,
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
// lyssnar efter event på w/a/s/d och space för att röra spelaren och skjuta, när denne har en powerup
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
  } else if (event.key === 's' && game.player.y <= 350) {
    game.player.velocity.y += 40 * game.deltaTime;
    game.player.state.airtime = true;
  }

  if (event.key === 'a' && game) {
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
  if (event.key === ' ' && game.player.powererdup === true) {
    if (game.player.state.right === true) {
      shootLaserRight(game, game.player, true);
    } else if (game.player.state.left === true) {
      shootLaserLeft(game, game.player, true);
    }
  }
});

// ritar ut spelet och sköter logiken
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

  // kollision mellan spelare och platformar
  collisionPlayerplatform(game.player, game.platforms);
  // kollision mellan spelare och marken
  collisionPlayerplatform(game.player, game.ground);
  // kollision mellan fiender och platformar
  collisionEntityPlatform(game.enemies, game.platforms);
  // kollision mellan fiender och marken
  collisionEntityPlatform(game.enemies, game.ground);

  // kollision mellan powerups och platform
  collisionEntityPlatform(game.powerups, game.platforms);
  //kollision mellan powerups och marken
  collisionEntityPlatform(game.powerups, game.ground);

  // kollision med vänsterväg och hög platform, funkar typ
  for (let i = 0; i < game.walls.length; i++) {
    let wall = game.walls[i];
    if (game.player.keys.left && isColliding(game.player, wall)) {
      game.player.keys.left = false;
      game.player.x += 5;
    } else if (game.player.keys.right && isColliding(game.player, wall)) {
      game.player.keys.right = false;
      game.player.x -= 5;
    }
  }
  // kollar kollision mellan fiender och spelaren

  for (let i = 0; i < game.enemies.length; i++) {
    let enemy = game.enemies[i];
    // Om spelaren landar uppepå fieneden
    if (isColliding(game.player, enemy)) {
      game.points -= 1;
      game.enemies.splice(i, 1);
      game.player.velocity.y = -500 * game.deltaTime;
      game.player.state.airtime = true;
    }

    // tar väck fiender om de hamnar utanför canvas
    if (enemy.y >= canvas.height) {
      game.enemies.splice(i, 1);
    }
  }

  // kollision mellan mål och spelare
  for (let i = 0; i < game.goal.length; i++) {
    let goal = game.goal[i];
    if (isColliding(game.player, goal)) {
      alert('you win!');
      resetGame(game, canvas.width, canvas.height);
    }
  }

  // kollision mellan spelare och powerup
  for (let i = 0; i < game.powerups.length; i++) {
    let powerup = game.powerups[i];
    if (isColliding(game.player, powerup)) {
      game.player.powererdup = true;
      game.powerups.splice(i, 1);
    }
  }

  // om spelaren trillar genom hålen förlorar den
  if (game.player.y >= canvas.height) {
    alert('oh no, you lost!');
    resetGame(game, canvas.width, canvas.height);
  }
  // scrollar spelet så länge spelare håller ner antigen a eller d
  if (game.player.keys.right) {
    game.platforms.forEach((platform) => {
      platform.x -= 300 * game.deltaTime;
    });

    game.goal.forEach((goal) => {
      goal.x -= 300 * game.deltaTime;
    });
    game.ground.forEach((ground) => {
      ground.x -= 300 * game.deltaTime;
    });
    game.powerups.forEach((powerup) => {
      powerup.x -= 300 * game.deltaTime;
    });
    game.enemies.forEach((enemy) => {
      enemy.x -= 300 * game.deltaTime;
    });
    game.walls.forEach((wall) => {
      wall.x -= 300 * game.deltaTime;
    });
  } else if (game.player.keys.left) {
    game.platforms.forEach((platform) => {
      platform.x += 300 * game.deltaTime;
    });

    game.goal.forEach((goal) => {
      goal.x += 300 * game.deltaTime;
    });
    game.ground.forEach((ground) => {
      ground.x += 300 * game.deltaTime;
    });
    game.powerups.forEach((powerup) => {
      powerup.x += 300 * game.deltaTime;
    });
    game.enemies.forEach((enemy) => {
      enemy.x += 300 * game.deltaTime;
    });
    game.walls.forEach((wall) => {
      wall.x += 300 * game.deltaTime;
    });
  }

  // ritar ut skott
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
  drawPowerUps(ctx, game);
  updatePowerUps(game);

  // timer, poäng och powerup visare
  timecount(ctx, game);
  pointcounter(ctx, game.points);
  powererdupStatus(ctx, game.player);

  requestAnimationFrame(() => tick(ctx, game));
}
spawnPowerups(game);
// ************ TODO ******************
// collision.
// eventuellt lite design
// eventuellt highscore och sånt, kanske spara i localstorage
// rensa ut koden

// denna funktion ställer om allt till standardvärden, används när vi vill återställa/starta om spelet.
function resetGame(game, gameWidth, gameHeight) {
  spawnPowerups(game);

  game.player.x = 400;
  game.player.y = gameHeight - 100;
  game.player.width = 25;
  game.player.height = 35;
  game.player.velocity.x = 0;
  game.player.velocity.y = 0;

  game.player.keys.left = false;
  game.player.keys.right = false;
  game.player.keys.jump = false;

  game.player.state.airtime = false;
  game.player.state.left = false;
  game.player.state.right = true;

  game.player.powererdup = false;

  game.powerups = [];
  game.enemies = [];
  game.enemySpawnTimer = 1;
  game.powerupSpawnTimer = 10;
  game.points = 0;
  game.gameTim = 0.1;

  game.lasers = [];
  game.walls = [
    {
      x: 0,
      y: 0,
      width: 20,
      height: 500,
      velocity: 0,
    },
    {
      x: 1650,
      y: 420,
      width: 20,
      height: 80,
      velocity: 0,
    },
  ];
  game.goal = [
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
  ];
  game.ground = [
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
  ];
  game.platforms = [
    // vänstervägen
    {
      x: 0,
      y: 0,
      width: 20,
      height: 500,
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
  ];

  game.gameWidth = gameWidth;
  game.gameHeight = gameHeight;

  game.lastTime = Date.now();
  game.deltaTime = 0;
  game.gameTimer = 0;
}
