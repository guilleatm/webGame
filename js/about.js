let aboutState = {
    preload: loadAboutAssets,
    create: showInstructions
};

let authors;

function loadAboutAssets() {
    game.load.image('backButton', 'assets/buttons/backButton.png');
    game.load.image('bg2', 'assets/backgrounds/backgroundCastles.png');
    game.load.image('developerOscar', 'assets/player/oscar.jpg');
    game.load.image('developerGuille', 'assets/player/guille.jpg');

	game.load.audio('mainSnd', 'assets/snds/main.ogg');
}

function showInstructions() {
    game.add.image(-20, -100, 'bg2');

    let textTitle = 'More Screen';
    let styleTitle = {
        font: 'Brightly',
        fontSize: '40pt',
        fontWeight: 'bold',
        fill: '#b60404'
    };
    let title = game.add.text(game.width / 2, 70, textTitle, styleTitle);
    title.anchor.setTo(0.5,0.5);
    
    let credits = 'Developed by: ';
    game.add.text( 30, 150, credits, {
        font: 'bold 18pt Cipitillo',
        fill: '#088A08'
        
    });

    let msgAuthors = 'Phaser 13: JSON returns';
    let styleAuthors = {
       	font: 'Cipitillo',
        fontSize: '26pt',
        fontWeight: 'bold',
        fill: '#088A08'
    };
    game.add.text(200, 145, msgAuthors, styleAuthors);

    authors = game.add.group();
    authors.inputEnableChildren = true;
    authors.onChildInputOver.add(overText, this);
    authors.onChildInputOut.add(outText, this);
	authors.onChildInputDown.add(onClickText, this);
    let styleSingleAuthor = {
        font: 'bold 20pt Cipitillo',
        fill: '#b60404'
    };

    let author = game.add.text(145, game.height / 6 + 110, 'Guillermo Arnau Tamarit',
        styleSingleAuthor);
    authors.add(author);
    author = game.add.text(175, game.height / 6 + 160, 'Óscar Silvestre Payá',
        styleSingleAuthor);
    authors.add(author);
    author = game.add.text(game.width / 2 - 20, game.height / 6 + 210, '??',
        styleSingleAuthor);
    authors.add(author);

    let instructions = 'Short description of the game and credits (names of team and team members) ';
    instructions += '.... ';
    

    let instrucText = game.add.text(0, 0, instructions, {
        font: '14pt Sniglet',
        fill: '#000000'
    });
    instrucText.setTextBounds(30, game.height - 220, game.width - 60);
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


function overText(text, pointer) {
    text.fill = '#0e0eb3';
}

function outText(text, pointer) {
    text.fill = '#b60404';
}

function onClickText(text, pointer) {
    if (text.text == 'Óscar Silvestre Payá')
    {
        let photo = game.add.image(game.width / 2, game.height / 2, 'developerOscar');
        photo.anchor.setTo(0.5, 0.5);
        photo.scale.setTo(0.2, 0.2);
    }
    else if (text.text == 'Guillermo Arnau Tamarit')
    {
        let photo = game.add.image(game.width / 2, game.height / 2, 'developerGuille');
        photo.anchor.setTo(0.5, 0.5);
        photo.scale.setTo(0.2, 0.2);
    }
    
}