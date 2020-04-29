import { CENTER } from "phaser-ce";

let gameState = {
	preload: preloadGame,
	create: createGame,
	update: updateGame
};

let pathToLevels = "../assets/levels/";
let player, controls;
let platforms, obstacles;
let levelConf;
let remainingFloors;
let remainingFloorsText;
let currentPowerup, powerupIcon;
let lifeSprites;

const INITIAL_PLAYER_Y = 50, INITIAL_PLATFORM_Y = 400;
const PLATFORM_GAP = 300;
const PLATFORM_VEL = 250;
const PLATFORM_WIDTH = 600 / 6; // El 600 es perq es el game.width
const PLAYER_GRAVITY = 1000;
const DEFAULT_VEL = PLAYER_GRAVITY * 0.55, DESTRUCTION_VEL = DEFAULT_VEL * 2.5, ON_DESTRUCTION_LOST_VEL = DEFAULT_VEL * 1.2;
const NUM_LEVELS = 6;
const POWERUP_DURATION = 4;

function preloadGame() {
	loadSprites();
	loadImages();
	loadSounds();
	loadLevel(levelToPlay);
}


//----UPDATE--------------------------------------------------------------------------------------

function updateGame() {

	manageInput();
	managePlatformsPosition()

	game.physics.arcade.collide(player, platforms, onPlatformCollide, onPlatformProcess, this);
	game.physics.arcade.collide(player, obstacles, onObstacleCollide, onObstacleProcess, this);
}

function onPlatformCollide(player, cube) { // Se crida cuan els objectes ja han xocat
	player.body.velocity.y = -DEFAULT_VEL;

	remainingFloors = levelConf.data.length - calculateCurrentFloor(cube.position.y) - 1;	
	updateText();

	if (cube.type == 'grass_carrot') {
		cube.children[0].kill();
		currentPowerup = POWERUP_DURATION;
		powerupIcon.visible = true;

	}

	if (cube.type == 'stone')
		win();
}

function onPlatformProcess(player, cube) { // Se crida antes de que xoquen, per si vols comprovar algo per a anular la colisió

	if (cube.type == 'stone')
		return true;
	else if (currentPowerup > 0) {
		destroyCube(cube);
		player.body.velocity.y = 100;
		currentPowerup--;
		if (currentPowerup <= 0) {
			powerupIcon.visible = false;
		}
		return false;
	}
	else if (cube.type == 'grass_broken') {
		destroyCube(cube);
		return true;
	}

	if (player.body.velocity.y > DESTRUCTION_VEL) {
		destroyCube(cube);
		player.body.velocity.y -= ON_DESTRUCTION_LOST_VEL;
		return false;
	}
	return true;
}

function onObstacleCollide(player, obstacle) {
	if (lifes > 1) {
		player.body.velocity.x = 0;
		destroyObstacle(obstacle);
		lifeSprites.children[--lifes].destroy();
	} else {
		
		player.children[0].visible = true;
		player.children[1].visible = true;
		player.children[0].animations.play('bye'); //#C Si bunny per raere de la explosió
	}
}

function win() {
	if (levelToPlay++ <= NUM_LEVELS) {
		lifes = 3
		game.state.start('game', gameState);
	} else {
		game.state.start('levelSelector', levelSelectorState);
	}

}

function onObstacleProcess(player, obstacle) {
	if (currentPowerup > 0) {
		destroyObstacle(obstacle)
		return false;
	}
}

function destroyObstacle(obstacle) {
	obstacle.visible = false;
	obstacle.body.enable = false;
}

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

	//mouse move

	// if (game.input.mousePointer.x > game.width / 2) //Dreta
	// {
	// 	for (let i = 0; i < platforms.children.length; i++)
	// 		platforms.children[i].body.velocity.x = PLATFORM_VEL;

	// 	for (let i = 0; i < obstacles.children.length; i++)
	// 		obstacles.children[i].body.velocity.x = PLATFORM_VEL;
	// }

	// else if (game.input.mousePointer.x < game.width / 2) { // Esquerra
	// 	for (let i = 0; i < platforms.children.length; i++)
	// 		platforms.children[i].body.velocity.x = PLATFORM_VEL;

	// 	for (let i = 0; i < obstacles.children.length; i++)
	// 		obstacles.children[i].body.velocity.x = PLATFORM_VEL;

	// } else { // Quet
	// 	for (let i = 0; i < platforms.children.length; i++)
	// 		platforms.children[i].body.velocity.x = 0;

	// 	for (let i = 0; i < obstacles.children.length; i++)
	// 		obstacles.children[i].body.velocity.x = 0;
	// }
}

function managePlatformsPosition() {
	if (platforms.children[0].body.velocity.x > 0) { // Les plataformes van cap a la dreta
		for (let i = 0; i < platforms.children.length; i++) {
			if (platforms.children[i].position.x > 600) {
				platforms.children[i].position.x -= 8 * PLATFORM_WIDTH;
			}
		}

		for(let i = 0; i < obstacles.children.length; i++) {
			if (obstacles.children[i].position.x > 600) {
				obstacles.children[i].position.x -= 8 * PLATFORM_WIDTH;
			}
		}

	} else if (platforms.children[0].body.velocity.x < 0) { // Les plataformes van cap a la esquerra
		for (let i = 0; i < platforms.children.length; i++) {
			if (platforms.children[i].position.x < -PLATFORM_WIDTH) {
				platforms.children[i].position.x += 8 * PLATFORM_WIDTH;
			}
		}

		for(let i = 0; i < obstacles.children.length; i++) {
			if (obstacles.children[i].position.x < 0) {
				obstacles.children[i].position.x += 8 * PLATFORM_WIDTH;
			}
		}
	}

}

function calculateCurrentFloor(platformY) {
	return (platformY - INITIAL_PLATFORM_Y) / PLATFORM_GAP // INITIAL_PLATFORM_Y + PLATFORM_GAP * nFloor = platformY
}

function updateText() {
	remainingFloorsText.setText(remainingFloors);
}


function explosionAnimationFinished() {
	game.state.start('endScreen', endScreenState);
}

function gameScreenOnDown() {

	let keyPressed = game.input.keyboard.event.key.toLowerCase();

	for (let i = 0; i < platforms.children.length; i++) {
		let platformType = platforms.children[i].type;
		if (platformType.substring(0, 12) == 'grass_letter' && platformType.substring(13, 14).toLowerCase() == keyPressed) {
			destroyCube(platforms.children[i]);
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

	createText();
	createHUD();

	game.input.keyboard.addCallbacks(this, gameScreenOnDown);

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
	player.body.bounce.x = 0;

	player.body.checkCollision.up = false;
	
	

	game.camera.follow(player);

	let explosionAnimation = game.make.sprite(0, 0, 'explosionAnimation');
    	explosionAnimation.animations.add('bye', [0,1,2,3,4], 6, false);
		explosionAnimation.anchor.setTo(0.5, 0.5);
		explosionAnimation.scale.setTo(1.5, 1.5);
		explosionAnimation.visible = false;
		explosionAnimation.events.onAnimationComplete.add(explosionAnimationFinished, this);

	let bunnyDead = game.make.sprite(0, 0, 'bunnyhurt');
		bunnyDead.anchor.setTo(0.5, 0.5);
		bunnyDead.visible = false;


	player.addChild(explosionAnimation);
	player.addChild(bunnyDead);
	

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

	lifeSprites = game.add.group();

	let cubeScale = PLATFORM_WIDTH / game.cache.getImage('grass').width // widthQueVuic = widthReal * unaEscala // Totes les imatges de ground tenen les mateixes dimensions
	

	for (let nFloor = 0; nFloor < levelConf.data.length; nFloor++) {
		for (let nCube = 0; nCube < levelConf.data[nFloor].length; nCube++) {

			let cubeType = levelConf.data[nFloor][nCube];
			let cubeX = PLATFORM_WIDTH * nCube;
			let cubeY = INITIAL_PLATFORM_Y + PLATFORM_GAP * nFloor;

			if (cubeType == 1) { // Plataforma normal
				addCube(cubeX, cubeY, cubeScale, 'grass');
			} else if (cubeType == 2) { // Plataforma en cactus
				addCube(cubeX, cubeY, cubeScale, 'grass', 'cactus');
			} else if (cubeType == 3) { // Plataforma final
				addCube(cubeX, cubeY, cubeScale, 'stone');
			} else if (cubeType == 4) {
				addCube(cubeX, cubeY, cubeScale, 'grass_broken');
			} else if (cubeType == 5) {
				addCube(cubeX, cubeY, cubeScale, 'grass', 'carrot');
			} else if (cubeType == 6) {
				addCube(cubeX, cubeY, cubeScale, 'grass', 'letter'); //#C Se pot easily canviar la skin de este cube
			}
		}
	}
}

function addCube(x, y, cubeScale, platformType, extra) {

	let cube = platforms.create(x , y, platformType); // Cube es una platform, eu pose aixina perq si pose platform se pot confundir en platforms #c
	cube.scale.setTo(cubeScale, cubeScale);
	//cube.anchor.setTo(0.5, 0.5);
	cube.body.immovable = true;
	cube.body.checkCollision.down = false;
	cube.body.checkCollision.right = false;
	cube.body.checkCollision.left = false;
	cube.type = platformType;

	if (extra == 'cactus') {
		let cactus = obstacles.create(x + PLATFORM_WIDTH / 2 , y, 'cactus');
		cactus.scale.setTo(cubeScale, cubeScale);
		cactus.anchor.setTo(0.5, 1);
		cactus.body.immovable = true;
		cactus.body.checkCollision.down = false;
		cube.type += '_cactus';
	} else if (extra == 'carrot') {
		let carrot = game.make.sprite(PLATFORM_WIDTH * 0.8, -10, 'carrot');
		carrot.anchor.setTo(0.5, 1);

		cube.addChild(carrot);
		cube.type += '_carrot';

	} else if (extra == 'letter') {

		// char = numero aleatori entre [65,90] el convertix a char (Tabla ASCII)
		let char = String.fromCharCode(Math.random() * (91 - 65) + 65);

		let cubeLetter = game.add.text(PLATFORM_WIDTH, -10, char, {font: 'Brightly', fontSize: '90pt', fontWeight: 'bold', fill: '#b60404'});
		cubeLetter.anchor.setTo(0.5, 1);
		cube.addChild(cubeLetter);
		cube.type += '_letter_' + char;
	}

}

function createText() {

    let onGameTextStyle = {
        font: 'Brightly',
        fontSize: '23pt',
        fontWeight: 'bold',
        fill: '#b60404',
    };
	// Player name
    let nameText = game.add.text(0, 0, playerName.text, onGameTextStyle);
	nameText.fixedToCamera = true;
	nameText.cameraOffset.setTo(25, 25);

	// Remaining floors
	remainingFloorsText = game.add.text(0, 0, levelConf.data.length - 1, onGameTextStyle);
	remainingFloorsText.fixedToCamera = true;
	remainingFloorsText.cameraOffset.setTo(25, game.height - 75);

	// Level
	let levelText = game.add.text(0, 0, 'lvl: ' + levelToPlay, onGameTextStyle);
	levelText.fixedToCamera = true;
	levelText.cameraOffset.setTo(game.width - 140, game.height - 75);
}

function createHUD() {
	
	for (let i = 0; i < lifes; i++) {
		let lifeSprite = lifeSprites.create(game.width - 80 - i * 10, 25, 'life');
		lifeSprite.fixedToCamera = true;
	}

	powerupIcon = game.add.sprite(game.width - 200 , 30, 'carrot');
	powerupIcon.visible = false;
	powerupIcon.scale.setTo(0.8, 0.8)
	powerupIcon.fixedToCamera = true;

}


//----PRELOAD--------------------------------------------------------------------------------------

function loadSprites() {
	game.load.image('player', 'assets/player/bunny1_stand.png'); // #c
	game.load.image('bunnyhurt', 'assets/backgrounds/gameOver/bunny2_hurt.png');

	game.load.spritesheet('explosionAnimation', 'assets/player/spritesheetExplosion.png', 192 , 192, 7);

	// game.load.spritesheet('collector', 'assets/imgs/dude.png', 32, 48); // #c
	// game.load.spritesheet('enemy', 'assets/imgs/enemySprite.png', 55, 53, 15);
}

function loadImages() {
	game.load.image('grass', 'assets/objects/grass.png');
	game.load.image('grass_broken', 'assets/objects/grass_broken.png');
	game.load.image('stone', 'assets/objects/stone.png');
	game.load.image('cactus', 'assets/objects/cactus.png');
	game.load.image('life', 'assets/objects/life.png');
	game.load.image('carrot', 'assets/objects/carrot.png')




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





//----OTHERS----------------------------------------------------------------------------

