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
  collisionEnemyPlatform,
  collisionObjectPlatform,
} from './collision.js';
import { timecount, pointcounter, powererdupStatus } from './points&time.js';
import { drawPowerUps, updatePowerUps } from './powerups.js';
import {
  drawLasers,
  updateLasers,
  shootLaserRight,
  shootLaserLeft,
} from './laser.js';

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let backgroundImg = new Image();
backgroundImg.src = './images/bg_platform.png';
let jumpSound = new Audio('./sounds/jump.mp3');
let pewSound = new Audio('./sounds/pewpew.mp3');
let powerupSound = new Audio('./sounds/powerup.mp3');
let winSound = new Audio('./sounds/youwin.mp3');
let loseSound = new Audio('./sounds/youlose.mp3');

jumpSound.volume = 0.2;
pewSound.volume = 0.2;
powerupSound.volume = 0.5;
winSound.volume = 0.5;

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
        down: false,
      },
      state: {
        airtime: false,
        left: false,
        right: true,
      },
      powererdup: false,
    },

    powerups: [
      {
        x: 1300,
        y: 50,
        velocity: {
          x: 0,
          y: 0,
        },
        width: 15,
        height: 15,
      },
    ],
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
      },
      {
        x: 900,
        y: 20,
        width: 50,
        height: 50,
      },
    ],
    walls: [
      {
        x: 0,
        y: 0,
        width: 20,
        height: 500,
      },
      {
        x: 1650,
        y: 420,
        width: 20,
        height: 80,
      },
    ],
    goal: [
      {
        x: 4150,
        y: 270,
        width: 50,
        height: 150,
      },
    ],
    ground: [
      {
        x: 0,
        y: 470,
        width: 500,
        height: 30,
      },
      {
        x: 600,
        y: 470,
        width: 500,
        height: 30,
      },
      {
        x: 1200,
        y: 470,
        width: 500,
        height: 30,
      },
      {
        x: 1650,
        y: 420,
        width: 500,
        height: 80,
      },
      {
        x: 2450,
        y: 420,
        width: 500,
        height: 80,
      },
      {
        x: 3700,
        y: 420,
        width: 500,
        height: 80,
      },
    ],
    platforms: [
      // platformar
      {
        x: 800,
        y: 250,
        width: 300,
        height: 10,
      },
      {
        x: 800,
        y: 350,
        width: 300,
        height: 10,
      },
      {
        x: 0,
        y: 250,
        width: 200,
        height: 10,
      },
      {
        x: 270,
        y: 250,
        width: 150,
        height: 10,
      },
      {
        x: 270,
        y: 350,
        width: 150,
        height: 10,
      },
      {
        x: 1200,
        y: 350,
        width: 150,
        height: 10,
      },
      {
        x: 1200,
        y: 200,
        width: 150,
        height: 10,
      },
      {
        x: 1800,
        y: 100,
        width: 150,
        height: 10,
      },
      {
        x: 2200,
        y: 350,
        width: 150,
        height: 10,
      },
      {
        x: 3000,
        y: 350,
        width: 150,
        height: 10,
      },
      {
        x: 3300,
        y: 350,
        width: 150,
        height: 10,
      },
      {
        x: 3500,
        y: 350,
        width: 150,
        height: 10,
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
      jumpSound.load();
      jumpSound.play();
      game.player.keys.jump = true;
      game.player.velocity.y = -500;
      game.player.state.airtime = true;
    }
    // låter spelaren falla genom platformar
  } else if (event.key === 's' && game.player.y <= 350) {
    game.player.state.airtime = true;
    game.player.keys.down = true;
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
      pewSound.load();
      pewSound.play();
    } else if (game.player.state.left === true) {
      shootLaserLeft(game, game.player, true);
      pewSound.load();
      pewSound.play();
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

  // hanterar spelarens rörelser och "gravitation"
  updatePlayer(game);
  // ritar ut spelaren
  drawPlayer(ctx, game.player);

  // kollision mellan spelare och platformar
  collisionPlayerplatform(game.player, game.platforms, game);
  // kollision mellan spelare och marken
  collisionPlayerplatform(game.player, game.ground, game);
  // kollision mellan fiender och platformar
  for (let i = 0; i < game.enemies.length; i++) {
    let enemy = game.enemies[i];
    collisionEnemyPlatform(enemy, game.platforms, game);
    collisionEnemyPlatform(enemy, game.ground, game);
    for (let j = 0; j < game.walls.length; j++) {
      let wall = game.walls[j];
      if (isColliding(enemy, wall)) {
        if (enemy.velX < 0) {
          enemy.velX = 200;
          enemy.x += enemy.velX * game.deltaTime;
          enemy.state.lookright = true;
          enemy.state.lookleft = false;
        } else if (enemy.velX > 0) {
          enemy.velX = -200;
          enemy.x += enemy.velX * game.deltaTime;
          enemy.state.lookright = false;
          enemy.state.lookleft = true;
        }
      }
    }
  }
  // kollision mellan powerups och platform
  for (let i = 0; i < game.powerups.length; i++) {
    let powerup = game.powerups[i];
    collisionObjectPlatform(powerup, game.platforms, game);
  }

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
    if (isColliding(game.player, enemy)) {
      loseSound.play();
      resetGame(game, canvas.width, canvas.height);
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
      winSound.play();
      resetGame(game, canvas.width, canvas.height);
    }
  }

  // kollision mellan spelare och powerup
  for (let i = 0; i < game.powerups.length; i++) {
    let powerup = game.powerups[i];
    if (isColliding(game.player, powerup)) {
      powerupSound.play();
      game.player.powererdup = true;
      game.powerups.splice(i, 1);
    }
  }

  // om spelaren trillar genom hålen förlorar den
  if (game.player.y >= canvas.height) {
    loseSound.play();
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
  //rita ut bakgrund
  ctx.drawImage(backgroundImg, 0, 0);

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

// denna funktion ställer om allt till standardvärden, används när vi vill återställa/starta om spelet.
function resetGame(game, gameWidth, gameHeight) {
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

  game.powerups = [
    {
      x: 1300,
      y: 50,
      velocity: {
        x: 0,
        y: 0,
      },
      width: 15,
      height: 15,
    },
  ];
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
    },
    {
      x: 1650,
      y: 420,
      width: 20,
      height: 80,
    },
  ];
  game.goal = [
    {
      x: 4150,
      y: 270,
      width: 50,
      height: 150,
    },
  ];
  game.ground = [
    {
      x: 0,
      y: 470,
      width: 500,
      height: 30,
    },
    {
      x: 600,
      y: 470,
      width: 500,
      height: 30,
    },
    {
      x: 1200,
      y: 470,
      width: 500,
      height: 30,
    },
    {
      x: 1650,
      y: 420,
      width: 500,
      height: 80,
    },
    {
      x: 2450,
      y: 420,
      width: 500,
      height: 80,
    },
    {
      x: 3700,
      y: 420,
      width: 500,
      height: 80,
    },
  ];
  game.platforms = [
    // platformar
    {
      x: 800,
      y: 250,
      width: 300,
      height: 10,
    },
    {
      x: 800,
      y: 350,
      width: 300,
      height: 10,
    },
    {
      x: 0,
      y: 250,
      width: 200,
      height: 10,
    },
    {
      x: 270,
      y: 250,
      width: 150,
      height: 10,
    },
    {
      x: 270,
      y: 350,
      width: 150,
      height: 10,
    },
    {
      x: 1200,
      y: 350,
      width: 150,
      height: 10,
    },
    {
      x: 1200,
      y: 200,
      width: 150,
      height: 10,
    },
    {
      x: 1800,
      y: 100,
      width: 150,
      height: 10,
    },
    {
      x: 2200,
      y: 350,
      width: 150,
      height: 10,
    },
    {
      x: 3000,
      y: 350,
      width: 150,
      height: 10,
    },
    {
      x: 3300,
      y: 350,
      width: 150,
      height: 10,
    },
    {
      x: 3500,
      y: 350,
      width: 150,
      height: 10,
    },
  ];

  game.gameWidth = gameWidth;
  game.gameHeight = gameHeight;

  game.lastTime = Date.now();
  game.deltaTime = 0;
  game.gameTimer = 0;
}
