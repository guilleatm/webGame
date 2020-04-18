let counter = 0;

let endScreenState = {
    preload: preloadEndScreen,
    create: createEndScreen
};

function preloadEndScreen() {
    game.load.image('restartButton', 'assets/buttons/restartButton.png');
    game.load.image('endScreen', 'assets/backgrounds/endScreen.png');
    game.load.image('moon', 'assets/backgrounds/gameOver/moon.png');
    game.load.image('gameOver', 'assets/backgrounds/gameOver/gameOver.png');
    game.load.image('bunnyhurt', 'assets/backgrounds/gameOver/bunny2_hurt.png');
    game.load.spritesheet('explosion', 'assets/player/spritesheetExplosion.png', 192 , 192, 8); // Soles ni han 7 imatges, carregue 8 perque com a ultima agafa una imatge sense res i va be pa quan acava la animació
}

function createEndScreen() {
    let endScreen = game.add.image(game.width / 2, game.height / 2, 'endScreen');
    endScreen.anchor.setTo(0.5, 0.5);
    endScreen.scale.setTo(0.6, 0.9);

	let btnPlay = game.add.button(game.width / 2, game.height - 73, 'restartButton',
        onBackButtonPressed);
    btnPlay.anchor.setTo(0.5, 0.5);
    btnPlay.scale.setTo(1.2, 1.2);

    let moon = game.add.image(game.width / 2, game.height / 2 - 163, 'moon');
    moon.anchor.setTo(0.5, 0.5);
    moon.scale.setTo(1.75, 1.75);

    let gameOver = game.add.image(game.width / 2 + 7, game.height / 2 - 145, 'gameOver');
    gameOver.anchor.setTo(0.5, 0.5);
    gameOver.scale.setTo(0.4, 0.4);

    let bunnyhurt = game.add.image(game.width / 2, game.height - 220, 'bunnyhurt');
    bunnyhurt.anchor.setTo(0.5, 0.5);
    bunnyhurt.scale.setTo(0.5, 0.5);

    gameOverTween = game.add.tween(gameOver).to({alpha: 0}, 700, Phaser.Easing.Linear.None)
                .to({alpha: 1.0}, 700, Phaser.Easing.Linear.None);
    gameOverTween.delay(1000);
    gameOverTween.loop(true);
    gameOverTween.start();

    explosionTween = game.add.tween(bunnyhurt).to({alpha: 0}, 100, Phaser.Easing.Linear.None);
            explosionTween.delay(3300);
            explosionTween.start();
    
    let instructions = 'Play again by pressing the “S” key';
    
    let instrucText = game.add.text(0, 0, instructions, {
        font: '18pt Deadmobil',
        fill: '#790625'
    });
    instrucText.setTextBounds(30, 570, game.width - 60);
    instrucText.boundsAlignH = 'center';
    instrucText.boundsAlignV = 'middle';
    instrucText.wordWrap = true;
    instrucText.wordWrapWidth = game.width - 60;

	let infoText = game.add.text(game.width / 2, 485, 'You fell ' + (levelConf.data.length - remainingFloors) + ' floors, you need ' + remainingFloors + ' more.', {
        font: '18pt Deadmobil',
        fill: '#790625'
    });
	infoText.anchor.setTo(0.5, 0.5);

	game.time.events.loop(Phaser.Timer.SECOND, updateCounter, this);
	game.input.keyboard.addCallbacks(this, endScreenOnDown);

    
}

function updateCounter() {
    counter++;
    if(counter == 3){
        let explosion = game.add.sprite(game.width / 2, game.height - 220, 'explosion');
        explosion.animations.add('bye', [0,1,2,3,4,5,6,7], 6, false); // El frame 7 no te res, es per a que no se quede el fum.
        explosion.animations.play('bye');
        explosion.anchor.setTo(0.5, 0.5);
        explosion.scale.setTo(0.8, 0.8);
    }
	if (counter >= 15) {
		game.state.start('menu', menuState);
	}
}

function endScreenOnDown() { // Se crida cuan una key està down

	if (game.input.keyboard.event.key == "s" || game.input.keyboard.event.key == "S") {
		lifes = 3;
		game.state.start('game', gameState);
	}
}