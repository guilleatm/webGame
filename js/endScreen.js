let endScreenState = {
    preload: loadEndAssets,
    create: showEndInstructions
};

function loadEndAssets() {
    game.load.image('restartButton', 'assets/buttons/restartButton.png');
    game.load.image('gameOver', 'assets/backgrounds/gameOver.jpg');
    game.load.spritesheet('explosion', 'assets/player/spritesheetExplosion.png', 192 , 192, 7);
}

function showEndInstructions() {
    let gameOverImage = game.add.image(game.width / 2, game.height / 2, 'gameOver');
    gameOverImage.anchor.setTo(0.5, 0.5);
    gameOverImage.scale.setTo(0.6, 0.7);


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

    this.explosion = game.add.sprite(100, 150, 'explosion');
    this.explosion.animations.add('bye', [0,1,2,3,4], 12, true);
    this.explosion.animations.play('bye');
}

function onBackButtonPressed() {
    game.state.start('menu');
}
