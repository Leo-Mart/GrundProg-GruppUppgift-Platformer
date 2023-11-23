import { drawPlayer, updatePlayer } from "./player.js";
import { drawPlatforms } from "./platform.js";
import {
  drawEnemies,
  updateEnemy,
  tickEnemySpawn,
  spawnEnemy,
} from "./enemy.js";
//import platform from "platform";

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 500;

let game = initGame(canvas.width, canvas.height);

function initGame(gameWidth, gameHeight) {
  requestAnimationFrame(() => tick(ctx, game));

  return {
    player: {
      x: gameWidth / 2 - 25,
      y: gameHeight - 100,
      velY: 0,
      width: 25,
      height: 35,
      speed: 300,
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

window.addEventListener("keydown", (event) => {
  if (event.key === "w") {
    game.player.keys.jump = true;
    game.player.y -= 10;
  }

  if (event.key === "a") {
    game.player.keys.left = true;
  } else if (event.key === "d") {
    game.player.keys.right = true;
  }
});

window.addEventListener("keyup", (event) => {
  if (event.key === "a") {
    game.player.keys.left = false;
  }

  if (event.key === "d") {
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


  drawPlatforms(ctx, game.platforms);

  drawEnemies(ctx, game);
  updateEnemy(game);
  tickEnemySpawn(game);

  //   ctx.font = "25px serif";
  //   ctx.fillStyle = "black";
  //   ctx.fillText("Points: " + game.points, 500, 30);

  requestAnimationFrame(() => tick(ctx, game));
}
