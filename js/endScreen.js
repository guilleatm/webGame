let counter = 0;

let endScreenState = {
    preload: preloadEndScreen,
    create: createEndScreen
};

function preloadEndScreen() {
    game.load.image('restartButton', 'assets/buttons/restartButton.png');
    game.load.image('gameOver', 'assets/backgrounds/gameOver.jpg');
    game.load.spritesheet('explosion', 'assets/player/spritesheetExplosion.png', 192 , 192, 7);
}

function createEndScreen() {
    let gameOverImage = game.add.image(game.width / 2, game.height / 2, 'gameOver');
    gameOverImage.anchor.setTo(0.5, 0.5);
    gameOverImage.scale.setTo(0.6, 0.7);

	let btnPlay = game.add.button(game.width / 2, game.height - 60, 'restartButton',
        onBackButtonPressed);
    btnPlay.anchor.setTo(0.5, 0.5);
    btnPlay.scale.setTo(1.2, 1.2);

    let textTitle = 'Instructions Screen';
    let styleTitle = {
        font: 'Rammetto One',
        fontSize: '25pt',
        fontWeight: 'bold',
        fill: '#b60404'
    };
    game.add.text(75, 25, textTitle, styleTitle);

    let instructions = 'Play again by pressing the “S” key';
    instructions += '.... '; 
    

    let instrucText = game.add.text(0, 0, instructions, {
        font: '14pt Sniglet',
        fill: '#b60404'
    });
    instrucText.setTextBounds(30, 200, game.width - 60);
    instrucText.boundsAlignH = 'center';
    instrucText.boundsAlignV = 'middle';
    instrucText.wordWrap = true;
    instrucText.wordWrapWidth = game.width - 60;

	let infoText = game.add.text(game.width / 2, 250, 'You fell ' + (levelConf.data.length - remainingFloors) + ' floors, you need ' + remainingFloors + ' more.', {
        font: '14pt Sniglet',
        fill: '#b60404'
    });
	infoText.anchor.setTo(0.5, 0.5);

	game.time.events.loop(Phaser.Timer.SECOND, updateCounter, this);

	game.input.keyboard.addCallbacks(this, endScreenOnDown);

	let explosion = game.add.sprite(100, 150, 'explosion');
    explosion.animations.add('bye', [0,1,2,3,4], 12, true);
    explosion.animations.play('bye');
}

function updateCounter() {
	counter++;
	if (counter >= 15) {
		game.state.start('menu', menuState);
	}
}



function endScreenOnDown() { // Se crida cuan una key està down

	if (game.input.keyboard.event.key == "s" || game.input.keyboard.event.key == "S") {
		game.state.start('game', gameState);
	}
}