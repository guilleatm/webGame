let gameState = {
	preload: preloadGame,
	create: createGame,
	update: updateGame
};

let pathToLevels = "../assets/levels/";
let player, controls;
let platforms, obstacles;
let levelConf;
let destroyedPlatformTween


const INITIAL_PLAYER_Y = 50, INITIAL_PLATFORM_Y = 200;
const PLATFORM_GAP = 300;
const PLATFORM_VEL = 250;
const PLATFORM_WIDTH = 600 / 6; // El 600 es perq es el game.width
const PLAYER_GRAVITY = 1000;
const DEFAULT_VEL = PLAYER_GRAVITY * 0.55, DESTRUCTION_VEL = PLAYER_GRAVITY * 2, ON_DESTRUCTION_LOST_VEL = PLAYER_GRAVITY * 1.2;

function preloadGame() {
	loadSprites();
	loadImages();
	loadSounds();
	loadLevel(levelToPlay);
}


//----UPDATE--------------------------------------------------------------------------------------

function updateGame() {

	manageInput();
	mangePlatformsPosition()

	game.physics.arcade.collide(player, platforms, onPlatformCollide, onPlatformProcess, this);
	game.physics.arcade.collide(player, obstacles, onObstacleCollide, onObstacleProcess, this);
}

function onPlatformCollide(player, cube) { // Se crida cuan els objectes ja han xocat
	player.body.velocity.y = -DEFAULT_VEL;
}

function onPlatformProcess(player, cube) { // Se crida antes de que xoquen, per si vols comprovar algo per a anular la colisió

	if (player.body.velocity.y > DESTRUCTION_VEL) {
		destroyCube(cube);
		player.body.velocity.y -= ON_DESTRUCTION_LOST_VEL;
		return false;
	}
	return true;
}

function onObstacleCollide() {
	console.log("Muertinii");
}

function onObstacleProcess() {}

function destroyCube(cube) {
	cube.visible = false;
	cube.body.enable = false;
}

function manageInput() {


	if (controls.right.isDown) { // Dreta
		for (let i = 0; i < platforms.children.length; i++)
			platforms.children[i].body.velocity.x = -PLATFORM_VEL;

		for (let i = 0; i < obstacles.children.length; i++)
			obstacles.children[i].body.velocity.x = -PLATFORM_VEL;
	} else if (controls.left.isDown) { // Esquerra
		for (let i = 0; i < platforms.children.length; i++)
			platforms.children[i].body.velocity.x = PLATFORM_VEL;

		for (let i = 0; i < obstacles.children.length; i++)
			obstacles.children[i].body.velocity.x = PLATFORM_VEL;
	} else { // Quet
		for (let i = 0; i < platforms.children.length; i++)
			platforms.children[i].body.velocity.x = 0;

		for (let i = 0; i < obstacles.children.length; i++)
			obstacles.children[i].body.velocity.x = 0;
	}


}

function mangePlatformsPosition() {
	if (platforms.children[0].body.velocity.x > 0) { // Les plataformes van cap a la dreta
		for (let i = 0; i < platforms.children.length; i++) {
			if (platforms.children[i].position.x > 600) {
				platforms.children[i].position.x -= 7 * PLATFORM_WIDTH;
			}
		}

		for(let i = 0; i < obstacles.children.length; i++) {
			if (obstacles.children[i].position.x > 600) {
				obstacles.children[i].position.x -= 7 * PLATFORM_WIDTH;
			}
		}

	} else if (platforms.children[0].body.velocity.x < 0) { // Les plataformes van cap a la esquerra
		for (let i = 0; i < platforms.children.length; i++) {
			if (platforms.children[i].position.x < -PLATFORM_WIDTH) {
				platforms.children[i].position.x += 7 * PLATFORM_WIDTH;
			}
		}

		for(let i = 0; i < obstacles.children.length; i++) {
			if (obstacles.children[i].position.x < 0) {
				obstacles.children[i].position.x += 7 * PLATFORM_WIDTH;
			}
		}
	}

}


//----CREATE--------------------------------------------------------------------------------------

function createGame() {
	// Carreguem la info del nivell
	levelConf = JSON.parse(game.cache.getText('currentLevel')); // Carrega el arxiu que hem precarregat en el preload (loadLevel) en la key currentLevel


	// Bordes
	game.world.setBounds(0, 0, levelConf.dimensions.width, INITIAL_PLATFORM_Y + levelConf.data.length * PLATFORM_GAP);

	// Fondo
	let bg = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'bgGame');
	bg.scrollFactorX = 0.7;
	bg.scrollFactorY = 0.7;

	createPlayer();

	generateLevel();
	

}

function createPlayer() {

	// Jugador
	player = game.add.sprite(levelConf.dimensions.width / 2, INITIAL_PLAYER_Y, 'player');
	player.anchor.setTo(0.5, 0.5);
	player.scale.setTo(0.5, 0.5);
	game.physics.arcade.enable(player);

	player.body.gravity.y = PLAYER_GRAVITY;
	player.body.collideWorldBounds = true;
	player.body.bounce.y = 1;

	player.body.checkCollision.up = false;
	
	

	game.camera.follow(player);

	// Afegim animacions
	//player.animations.add('left', [0, 1, 2, 3], 10, true);
	//player.animations.add('right', [5, 6, 7, 8], 10, true);

	// Controls
	controls = game.input.keyboard.createCursorKeys();
}


function generateLevel() {
	//levelConf.data

	platforms = game.add.group(); // Afegim un grup plataformes
	obstacles = game.add.group();
	game.physics.arcade.enable(platforms);
	game.physics.arcade.enable(obstacles);
	platforms.enableBody = true; // A ixe grup li habilitem el body per a les colisions
	obstacles.enableBody = true;

	let cubeScale = PLATFORM_WIDTH / game.cache.getImage('grass').width // widthQueVuic = widthReal * unaEscala // Totes les imatges de ground tenen les mateixes dimensions
	

	for (let nFloor = 0; nFloor < levelConf.data.length; nFloor++) {
		for (let nCube = 0; nCube < levelConf.data[nFloor].length; nCube++) {
			if (levelConf.data[nFloor][nCube] == 1) { // Plataforma normal
				addCube(PLATFORM_WIDTH * nCube, INITIAL_PLATFORM_Y + PLATFORM_GAP * nFloor, cubeScale, false);
			} else if (levelConf.data[nFloor][nCube] == 2) { // Plataforma en cactus
				addCube(PLATFORM_WIDTH * nCube, INITIAL_PLATFORM_Y + PLATFORM_GAP * nFloor, cubeScale, true);
			}
		}
	}
}

function addCube(x, y, cubeScale, obstacle) {

	let cube = platforms.create(x , y, 'grass'); // Cube es una platform, eu pose aixina perq si pose platform se pot confundir en platforms #c
	cube.scale.setTo(cubeScale, cubeScale);
	//cube.anchor.setTo(0.5, 0.5);
	cube.body.immovable = true;
	cube.body.checkCollision.down = false;
	cube.body.checkCollision.right = false;
	cube.body.checkCollision.left = false;

	if (obstacle) {
		let cactus = obstacles.create(x + PLATFORM_WIDTH / 2 , y, 'cactus');
		cactus.scale.setTo(cubeScale, cubeScale);
		cactus.anchor.setTo(0.5, 1);
		cactus.body.immovable = true;
		cactus.body.checkCollision.down = false;
	}

}



//----PRELOAD--------------------------------------------------------------------------------------

function loadSprites() {
	game.load.image('player', 'assets/player/bunny1_stand.png'); // #c

	// game.load.spritesheet('collector', 'assets/imgs/dude.png', 32, 48); // #c
	// game.load.spritesheet('enemy', 'assets/imgs/enemySprite.png', 55, 53, 15);
}

function loadImages() {
	game.load.image('grass', 'assets/objects/grass.png');
	game.load.image('grass_broken', 'assets/objects/grass.png');
	game.load.image('stone', 'assets/objects/stone.png');
	game.load.image('cactus', 'assets/objects/cactus.png');



	game.load.image('bgGame', 'assets/backgrounds/infiniteBg.jpg');
	// game.load.image('exit', 'assets/imgs/exit.png');
	// game.load.image('star', 'assets/imgs/star.png');
	// game.load.image('aid', 'assets/imgs/firstaid.png');
	// game.load.image('healthHolder', 'assets/imgs/health_holder.png');
	// game.load.image('healthBar', 'assets/imgs/health_bar.png');
	// game.load.image('heart', 'assets/imgs/heart.png');
}

function loadSounds() {
	// game.load.audio('damaged', 'assets/snds/hurt1.wav');
	// game.load.audio('collectstar', 'assets/snds/cling.wav');
	// game.load.audio('getaid', 'assets/snds/wooo.wav');
	// game.load.audio('hitenemy', 'assets/snds/snare.wav');
	// game.load.audio('outoftime', 'assets/snds/klaxon4-dry.wav');
	// game.load.audio('levelpassed', 'assets/snds/success.wav');
}

function loadLevel(level) {
	game.load.text("currentLevel", pathToLevels + "lvl" + level + ".json", true);
}
