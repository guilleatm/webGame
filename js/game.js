let gameState = {
	preload: preloadGame,
	create: createGame,
	update: updateGame
};

let pathToLevels = "../assets/levels/";
let player, controls;
let platforms;
let levelConf;


const INITIAL_PLAYER_Y = 50, INITIAL_PLATFORM_Y = 200;
const PLATFORM_GAP = 180;
const PLATFORM_VEL = 150;
const PLATFORM_WIDTH = 600 / 8; // El 600 es perq es el game.width
const DEFAULT_VEL = 210, DESTRUCTION_VEL = 500, ON_DESTRUCTION_LOST_VEL = 300;

function preloadGame() {
	loadSprites();
	loadImages();
	loadSounds();
	loadLevel(levelToPlay);
}


//----UPDATE--------------------------------------------------------------------------------------

function updateGame() {

	manageInput();

	game.physics.arcade.collide(player, platforms, onCollide, onProcess, this);
}

function onCollide(player, cube) { // Se crida cuan els objectes ja han xocat
	//console.log(player.body.velocity.y);
	player.body.velocity.y = -DEFAULT_VEL;
}

function onProcess(player, cube) { // Se crida antes de que xoquen, per si vols comprovar algo per a anular la colisió

	if (player.body.velocity.y > DESTRUCTION_VEL) {
		destroyCube(cube);
		player.body.velocity.y -= ON_DESTRUCTION_LOST_VEL;
		return false;
	}
	return true;
}

function destroyCube(cube) {
	cube.visible = false;
	cube.body.enable = false;
}

function manageInput() {


	if (controls.right.isDown) { // Dreta
		for (let i = 0; i < platforms.children.length; i++)
			platforms.children[i].body.velocity.x = -PLATFORM_VEL;
	} else if (controls.left.isDown) { // Esquerra
		for (let i = 0; i < platforms.children.length; i++)
			platforms.children[i].body.velocity.x = PLATFORM_VEL;
	} else { // Quet
		for (let i = 0; i < platforms.children.length; i++)
			platforms.children[i].body.velocity.x = 0;
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
	player.scale.setTo(0.3, 0.3);
	game.physics.arcade.enable(player);

	player.body.gravity.y = 250;
	player.body.collideWorldBounds = true;
	player.body.bounce.y = 1;

	player.body.checkCollision.up = false;
	player.body.checkCollision.right = false;
	player.body.checkCollision.left = false;
	
	

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
	game.physics.arcade.enable(platforms);
	platforms.enableBody = true; // A ixe grup li habilitem el body per a les colisions

	let cubeScale = PLATFORM_WIDTH / game.cache.getImage('grass').width // widthQueVuic = widthReal * unaEscala // Totes les imatges de ground tenen les mateixes dimensions
	

	for (let nFloor = 0; nFloor < levelConf.data.length; nFloor++) {
		for (let nCube = 0; nCube < levelConf.data[nFloor].length; nCube++) {
			if (levelConf.data[nFloor][nCube] == 1) {
				addCube(PLATFORM_WIDTH * nCube, INITIAL_PLATFORM_Y + PLATFORM_GAP * nFloor, cubeScale);
			}
		}
	}
}

function addCube(x, y, cubeScale) {

	let cube = platforms.create(x , y, 'grass'); // Cube es una platform, eu pose aixina perq si pose platform se pot confundir en platforms #c
	cube.scale.setTo(cubeScale, cubeScale);
	//cube.anchor.setTo(0.5, 0.5);
	cube.body.immovable = true;
	cube.body.checkCollision.down = false;
	cube.body.checkCollision.right = false;
	cube.body.checkCollision.left = false;



}



//----PRELOAD--------------------------------------------------------------------------------------

function loadSprites() {
	game.load.image('player', 'assets/player/bunny1_stand.png'); // #c
	//game.load.spritesheet('collector', 'assets/imgs/dude.png', 32, 48); // #c
	game.load.spritesheet('enemy', 'assets/imgs/enemySprite.png', 55, 53, 15);
}

function loadImages() {
	game.load.image('grass', 'assets/objects/grass.png');
	game.load.image('grass_broken', 'assets/objects/grass.png');

	game.load.image('bgGame', 'assets/imgs/bgPlay.jpg');
	game.load.image('exit', 'assets/imgs/exit.png');
	game.load.image('star', 'assets/imgs/star.png');
	game.load.image('aid', 'assets/imgs/firstaid.png');
	game.load.image('healthHolder', 'assets/imgs/health_holder.png');
	game.load.image('healthBar', 'assets/imgs/health_bar.png');
	game.load.image('heart', 'assets/imgs/heart.png');
}

function loadSounds() {
	game.load.audio('damaged', 'assets/snds/hurt1.wav');
	game.load.audio('collectstar', 'assets/snds/cling.wav');
	game.load.audio('getaid', 'assets/snds/wooo.wav');
	game.load.audio('hitenemy', 'assets/snds/snare.wav');
	game.load.audio('outoftime', 'assets/snds/klaxon4-dry.wav');
	game.load.audio('levelpassed', 'assets/snds/success.wav');
}

function loadLevel(level) {
	game.load.text("currentLevel", pathToLevels + "lvl" + level + ".json", true);
}
