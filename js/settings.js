let instructionsState = {
    preload: loadAboutAssets,
    create: showInstructions
};

function loadAboutAssets() {
    game.load.image('backButton', 'assets/buttons/backButton.png');
    game.load.image('bg2', 'assets/backgrounds/backgroundCastles.png');

	game.load.audio('mainSnd', 'assets/snds/main.ogg');
}

function showInstructions() {
    game.add.image(-20, -100, 'bg2');

    let textTitle = 'Instructions';
    let styleTitle = {
        font: 'Brightly',
        fontSize: '40pt',
        fontWeight: 'bold',
        fill: '#b60404'
    };
    let title = game.add.text(game.width / 2, 70, textTitle, styleTitle);
    title.anchor.setTo(0.5,0.5);

    let instructions = 'You will have to move the platforms with the arrow keys or the mouse, your goal is to reach the floor avoiding the dangerous obstacles. Take advantage of the powerups!!\n\nYou have to choose a name by pressing the main button before playing. There you can choose a random one or write yours.\n\nYou can press in "Level Selection" for select the level you want to play. Remember to choose a name before.\n\nIf you want to play with the keys, you will have to take the mouse out off the game canvas.'; 
    

    let instrucText = game.add.text(0, 100, instructions, {
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
