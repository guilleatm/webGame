let aboutState = {
    preload: loadAboutAssets,
    create: showInstructions
};

let authors;

function loadAboutAssets() {
    game.load.image('backButton', 'assets/imgs/backButton.png');
}

function showInstructions() {
    game.add.image(0, 0, 'bg');

    let textTitle = 'Hola que tal (titol)';
    let styleTitle = {
        font: 'Rammetto One',
        fontSize: '20pt',
        fontWeight: 'bold',
        fill: '#b60404'
    };
    game.add.text(75, 25, textTitle, styleTitle);

    let credits = 'Brought to you by...\n';
    game.add.text(125, game.world.height / 6, credits, {
        font: 'bold 26pt FerrumExtracondensed',
        fill: '#b60404'
    });

    let msgAuthors = 'THE LECTURERS!!! (in alphabetical order):';
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

    let author = game.add.text(175, game.world.height / 6 + 110, 'Juan Carlos Amengual Argudo',
        styleSingleAuthor);
    authors.add(author);
    author = game.add.text(175, game.world.height / 6 + 160, 'Antonio Castellanos López',
        styleSingleAuthor);
    authors.add(author);
    author = game.add.text(175, game.world.height / 6 + 210, 'Xavi Traver Roig',
        styleSingleAuthor);
    authors.add(author);

    let instructions = 'You will have to collect all of the stars before the timer runs out to ';
    instructions += 'exit each level. Be aware of the enemies, which can hurt and damage you. ';
    instructions += 'If you lose your health completely you will die and you will lose time. ';
    instructions += 'You can kill your oponent by jumping (repeatedly) over its head. ';
    instructions += 'Get first-aid boxes to recover health. Enjoy the journey and good luck!';

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