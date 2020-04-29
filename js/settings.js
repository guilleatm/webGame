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
        font: 'Brightly',
        fontSize: '40pt',
        fontWeight: 'bold',
        fill: '#b60404'
    };
    let title = game.add.text(game.width / 2, 70, textTitle, styleTitle);
    title.anchor.setTo(0.5,0.5);

    let instructions = 'It will have some text with the instructions to play the game';
    instructions += '.... '; 
    

    let instrucText = game.add.text(0, 0, instructions, {
        font: '14pt Sniglet',
        fill: '#000000'
    });

    instrucText.setTextBounds(30, 200, game.width - 60);
    instrucText.boundsAlignH = 'center';
    instrucText.boundsAlignV = 'middle';
    instrucText.wordWrap = true;
    instrucText.wordWrapWidth = game.width - 60;

    let btnPlay = game.add.button(game.width / 2, game.height - 60, 'backButton',
        onBackButtonPressed);
    btnPlay.anchor.setTo(0.5, 0.5);
    btnPlay.scale.setTo(1.2, 1.2);

	let mainMusic = game.add.audio('mainSnd');
    mainMusic.play();
}
