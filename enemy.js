export function drawEnemies(ctx, game){
    for(let enemy of game.enemies) {
        ctx.fillStyle = "red";
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
    }
}

export function updateEnemy(game){
    for (let i = 0; i < game.enemies.length; i++) {
        let enemy = game.enemies[i];

        enemy.x += enemy.velX * game.deltaTime;

        if (enemy.x < -enemy.width * 3 || enemy.x + enemy.width > game.gameWidth + enemy.width * 3) {
            game.enemies.splice(i--, 1);
        }

        if (enemy.y + enemy.height + enemy.velocity.y >= canvas.height - 30) {
            enemy.velocity.y = 0;
        }
        enemy.y += enemy.velocity.y
        enemy.velocity.y += 0.1;
    }
    
}

export function tickEnemySpawn(game) {
    game.enemySpawnTimer -= game.deltaTime;
    if (game.enemySpawnTimer <= 0) {
        spawnEnemy(game);
        game.enemySpawnTimer = Math.random() * 2 + 1;

    }



}



export function spawnEnemy(game) {
    let side = Math.random() < 0.5;
    let y = 20;

    let enemy = {
        x: side ? 20 : 760,
        y,
        velocity: {
            x: 0,
            y: 1,
          },
        width: 30,
        height: 30,
        velX: side ? 100 : -100
    }

    game.enemies.push(enemy);
}
