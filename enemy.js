let enemyImg = document.querySelector('#enemy');

const lookright = 30;
const lookleft = 0;

/* const walkcycle = [2, 3, 4]; */
let currentWalkFrame = 30;
let framecount = 0;

/* const standing = 0;
const jumping = 120; */
const hurt = 150;

export function spawnEnemy(game) {
  let side = Math.random() < 0.5;
  let y = 20;

  let enemy = {
    x: side ? 100 : 760,
    y,
    velocity: {
      x: 0,
      y: 1,
    },
    width: 30,
    height: 30,
    velX: side ? 200 : -200,
    state: {
      lookleft: side ? false : true,
      lookright: side ? true : false,
      airtime: false,
      hurt: false,
      currentWalkFrame: 30,
      framecount: 0,
    },
  };

  game.enemies.push(enemy);
}
export function drawEnemies(ctx, game) {
  for (let enemy of game.enemies) {
    ctx.imageSmoothingEnabled = false;
    if (enemy.state.hurt === true) {
      drawImage(
        enemyImg,
        hurt,
        lookleft,
        enemy.width,
        enemy.height,
        enemy.x,
        enemy.y,
        enemy.width,
        enemy.height
      );
    }
    if (enemy.state.lookleft === true) {
      ctx.drawImage(
        enemyImg,
        currentWalkFrame,
        lookleft,

        enemy.width,
        enemy.height,
        enemy.x,
        enemy.y,
        enemy.width,
        enemy.height
      );
      framecount++;
      if (framecount >= 20) {
        framecount = 0;
        currentWalkFrame += 30;
        if (currentWalkFrame > 120) {
          currentWalkFrame = 30;
        }
      }
    } else if (enemy.state.lookright === true) {
      ctx.drawImage(
        enemyImg,
        currentWalkFrame,
        lookright,

        enemy.width,
        enemy.height,
        enemy.x,
        enemy.y,
        enemy.width,
        enemy.height
      );
      framecount++;
      if (framecount >= 20) {
        framecount = 0;
        currentWalkFrame += 30;
        if (currentWalkFrame > 120) {
          currentWalkFrame = 30;
        }
      }
    }
  }
}

export function updateEnemy(game) {
  for (let i = 0; i < game.enemies.length; i++) {
    let enemy = game.enemies[i];

    enemy.x += enemy.velX * game.deltaTime;

    if (
      enemy.x < -enemy.width * 3 ||
      enemy.x + enemy.width > game.gameWidth + enemy.width * 3
    ) {
      game.enemies.splice(i--, 1);
    }
    enemy.y += enemy.velocity.y;
    enemy.velocity.y += 50 * game.deltaTime;
  }
}

export function tickEnemySpawn(game) {
  game.enemySpawnTimer -= game.deltaTime;
  if (game.enemySpawnTimer <= 0) {
    spawnEnemy(game);
    game.enemySpawnTimer = Math.random() * 2 + 1;
  }
}
