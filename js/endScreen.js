let counter = 0;

let endScreenState = {
    preload: loadEndAssets,
    create: showEndInstructions
};

function loadEndAssets() {
    game.load.image('restartButton', 'assets/buttons/restartButton.png');
    game.load.image('gameOver', 'assets/backgrounds/gameOver.jpg');
}

function showEndInstructions() {
    let gameOverImage = game.add.image(game.width / 2, game.height / 2, 'gameOver');
    gameOverImage.anchor.setTo(0.5, 0.5);
    gameOverImage.scale.setTo(0.6, 0.7);

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
    instrucText.setTextBounds(30, 200, game.world.width - 60);
    instrucText.boundsAlignH = 'center';
    instrucText.boundsAlignV = 'middle';
    instrucText.wordWrap = true;
    instrucText.wordWrapWidth = game.world.width - 60;

    let btnPlay = game.add.button(game.world.width / 2, game.world.height - 60, 'restartButton',
        onBackButtonPressed);
    btnPlay.anchor.setTo(0.5, 0.5);
    btnPlay.scale.setTo(1.2, 1.2);

	game.time.events.loop(Phaser.Timer.SECOND, updateCounter, this);

	game.input.keyboard.addCallbacks(this, endScreenOnDown);
}

function updateCounter() {
	counter++;
	if (counter >= 15) {
		game.state.start('menu');
	}
}

function onBackButtonPressed() {
    game.state.start('menu');
}


function endScreenOnDown() { // Se crida cuan una key està down

	if (game.input.keyboard.event.key == "s" || game.input.keyboard.event.key == "S") {
		game.state.start('game');
	}
}