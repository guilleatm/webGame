let aboutState = {
    preload: loadAboutAssets,
    create: showInstructions
};

let authors;

function loadAboutAssets() {
    game.load.image('backButton', 'assets/buttons/backButton.png');
    game.load.image('bg2', 'assets/backgrounds/backgroundCastles.png');
}

function showInstructions() {
    game.add.image(-20, -100, 'bg2');

    let textTitle = 'More Screen';
    let styleTitle = {
        font: 'Rammetto One',
        fontSize: '25pt',
        fontWeight: 'bold',
        fill: '#b60404'
    };
    game.add.text(75, 25, textTitle, styleTitle);

    let credits = 'Developed by...\n';
    game.add.text(125, game.world.height / 6, credits, {
        font: 'bold 26pt FerrumExtracondensed',
        fill: '#b60404'
    });

    let msgAuthors = 'Phaser 13: JSON returns';
    let styleAuthors = {
       	font: 'myFont',
        fontSize: '20pt',
        fontWeight: 'bold',
        fill: '#b60404'
    };
    game.add.text(125, game.world.height / 6 + 60, msgAuthors, styleAuthors);

    authors = game.add.group();
    authors.inputEnableChildren = true;
    authors.onChildInputOver.add(overText, this);
    authors.onChildInputOut.add(outText, this);
    let styleSingleAuthor = {
        font: 'bold 18pt Sniglet',
        fill: '#b60404'
    };

    let author = game.add.text(175, game.world.height / 6 + 110, 'Guillermo Arnau Tamarit',
        styleSingleAuthor);
    authors.add(author);
    author = game.add.text(175, game.world.height / 6 + 160, 'Óscar Silvestre Payá',
        styleSingleAuthor);
    authors.add(author);
    author = game.add.text(175, game.world.height / 6 + 210, '??',
        styleSingleAuthor);
    authors.add(author);

    let instructions = 'Short description of the game and credits (names of team and team members) ';
    instructions += '.... ';
    

    let instrucText = game.add.text(0, 0, instructions, {
        font: '14pt Sniglet',
        fill: '#b60404'
    });
    instrucText.setTextBounds(30, game.world.height - 170, game.world.width - 60);
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

function overText(text, pointer) {
    text.fill = '#0e0eb3';
}

function outText(text, pointer) {
    text.fill = '#b60404';
}