// Funktioner som ritar ut spelaren
export function drawPlayer (ctx, player) {
    ctx.fillStyle = "blue";
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

// Funktion som hanterar rörelselogik hos spelaren
export function updatePlayer(game) {
    const player = game.player;
    if (player.keys.w && player.y > 0) {
        player.y -= player.speed * game.deltaTime;
    } else if (player.keys.down && player.y + player.height < game.gameHeight) {
        player.y += player.speed * game.deltaTime;
    }
    
    if (player.keys.left && player.x > 0) {
        player.x -= player.speed * game.deltaTime;
    } else if (player.keys.right && player.x + player.width < game.gameWidth) {
        player.x += player.speed * game.deltaTime;
    }
    
    player.y += player.velocity.y
    player.velocity.y += 0.1;

}

// if (spelar !rör vid platfrom) {faller neråt}

function jump(game) {
    player.velY = -120 + -jumpingDuration * 100;
    jumping = false;
    jumpingDuration = 0;
}
