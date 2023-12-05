import { drawPlayer, updatePlayer } from './player.js';
import { drawPlatforms, tickPlatformSpawn } from './platform.js';
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

canvas.width = window.innerWidth;
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
    platformSpawnTimer: 3,
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
      {
        x: 1200,
        y: 350,
        width: 150,
        height: 10,
        velocity: 0,
      },
      {
        x: 1200,
        y: 100,
        width: 150,
        height: 50,
        velocity: 0,
      },
      {
        x: 1500,
        y: 300,
        width: 10,
        height: 200,
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
    }
  });

  // kollar kollision mellan fiender och spelaren
  for (let i = 0; i < game.enemies.length; i++) {
    let enemy = game.enemies[i];
    if (isColliding(game.player, enemy)) {
      console.log('här blev det krock!');
      game.enemies.splice(i, 1);
      // game.player.velocity.y -= 1500 * game.deltaTime;
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

  // verkar inte funka riktigt men typ,
  // tanken är att denna bara ska köras när spelaren hoppar på/landar på en fiende
  // måste antagligen kolla efter x värdet också, annars försvinner fienden så fort spelarens y + höjd.y träffar samma y värde :D
  // vilket kanske är lite för lätt.
  // for (let i = 0; i < game.enemies.length; i++) {
  //   let enemy = game.enemies[i];
  //   if (game.player.y + game.player.height < enemy.y) {
  //     console.log('cronch');
  //     game.enemies.splice(i--, 1);
  //   }
  // }

  // function updateCameraBox() {
  //   game.camerabox = {
  //     position: {
  //       x: game.player.x - 137.5,
  //       y: game.player.y - 165,
  //     },
  //     width: 300,
  //     height: 250,
  //   };
  // }
  // updateCameraBox();
  // ctx.fillStyle = 'rgba(0, 0, 255, 0.3)';
  // ctx.fillRect(
  //   game.camerabox.position.x,
  //   game.camerabox.position.y,
  //   game.camerabox.width,
  //   game.camerabox.height
  // );

  // "scrollar" uppåt efterhand som spelaren rör sig uppåt
  // if (game.player.keys.jump && game.player.y < game.gameHeight - 450) {
  //   game.platforms.forEach((platform) => {
  //     platform.y += 200 * game.deltaTime;
  //   });
  // } else if (game.player.y + game.player.height > game.gameHeight - 30) {
  //   game.platforms.forEach((platform) => {
  //     platform.y -= 400 * game.deltaTime;
  //     game.player.velocity.y = 0;
  //   });
  // }

  // scrollar vänster/höger
  if (game.player.x + game.player.width > game.gameWidth - 150) {
    game.platforms.forEach((platform) => {
      scrollOffset += 10;
      platform.x -= 200 * game.deltaTime;
    });
  } else if (game.player.x < game.gameWidth - 800) {
    game.platforms.forEach((platform) => {
      scrollOffset -= 10;
      platform.x += 400 * game.deltaTime;
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

  // tickPlatformSpawn(game);

  // ritar ut spelaren, flyttat ner den hit för att den skall ritas framför platformar
  drawPlayer(ctx, game.player);

  timecount(ctx, game);

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
// bygg en bana, med mål
// spawna fiender ur en spawner av något slag
// lägga in art, få det att funka med "broken state"
// poäng system
// powerups
// eventuellt death pits och liknande hinder
// eventuellt lite design som en gamla arkadmaskin
// eventuellt highscore och sånt, kanske spara i localstorage

// testat lite saker på egen hand, dock ingen branch denna gång. line 29-52 i platform.js och callar den på 335 i main. Lagt till en funktion väldigt likt vår fiendespawn funktion som spawnar in platformar med ett min/max värde på x/y.
// inte super-vacker atm men det funkar, undrar om det inte är bättre att limitera den väldigt mycket eller hårdkoda in platformar
// line 275-281 i main, kommenterade ut i collision.js rad 6 också. pillade lite med att registrera när spelaren hoppar på fiendens huvud för att ta bort denna fiende ur array och eventuellt ge spelaren poäng
// line 314-324 i main gjorde så att banan scrollar höger/vänster istället för upp/ner. Verkar mycket enklare så kanske ska köra med det istället
