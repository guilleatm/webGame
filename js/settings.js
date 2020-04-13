let instructionsState = {
    preload: loadAboutAssets,
    create: showInstructions
};

function loadAboutAssets() {
    game.load.image('backButton', 'assets/buttons/backButton.png');
    game.load.image('bg2', 'assets/backgrounds/backgroundCastles.png');
}

function showInstructions() {
    game.add.image(-20, -100, 'bg2');

    let textTitle = 'Instructions Screen';
    let styleTitle = {
        font: 'Rammetto One',
        fontSize: '25pt',
        fontWeight: 'bold',
        fill: '#b60404'
    };
    game.add.text(75, 25, textTitle, styleTitle);

    let instructions = 'It will have some text with the instructions to play the game';
    instructions += '.... '; // WOW
    

    let instrucText = game.add.text(0, 0, instructions, {
        font: '14pt Sniglet',
        fill: '#b60404'
    });
    instrucText.setTextBounds(30, 200, game.world.width - 60);
    instrucText.boundsAlignH = 'center';
    instrucText.boundsAlignV = 'middle';
    instrucText.wordWrap = true;
    instrucText.wordWrapWidth = game.world.width - 60;

    let btnPlay = game.add.button(game.world.width / 2, game.world.height - 60, 'backButton',
        onBackButtonPressed);
    btnPlay.anchor.setTo(0.5, 0.5);
    btnPlay.scale.setTo(1.2, 1.2);
}

function onBackButtonPressed() {
    game.state.start('menu');
}
