let menuState = {
    preload: preloadMenu,
    create: createMenu
};

let playerName;
let mainTween, downTween1, downTween2;
let rabbit;
let btnAbout, btnConfig, btnPlay, btnMain;
let levelToPlay;
let lifes = 3;

function preloadMenu() {
    game.load.image('bg', 'assets/backgrounds/backgroundColorForest.png');
    game.load.image('aboutButton', 'assets/buttons/moreButton.png');
    game.load.image('configButton', 'assets/buttons/settingButton.png');
    game.load.image('playButton', 'assets/buttons/playButton.png');
    game.load.image('bgButtons', 'assets/backgrounds/Elements/PNG/Default/towerAlt.png');
    game.load.image('mainButton', 'assets/buttons/mainButton.png');
    game.load.image('lvlButton', 'assets/buttons/lvlSelector.png');
    game.load.image('rabbit', 'assets/player/bunny1_ready.png');
    game.load.image('sun', 'assets/objects/sun1.png');
    game.load.image('bubble', 'assets/objects/bubble.png');

    game.load.audio('mainSnd', 'assets/snds/main.ogg');
    game.load.audio('buttonSnd', 'assets/snds/buttonPress.ogg');

}

function createMenu() {
    levelToPlay = 1;
    //game.input.enabled = true; // #c
    game.add.image(0,-250, 'bg');
	
	rabbit = game.add.sprite(0, game.height, 'rabbit'); //image o sprite?
    rabbit.anchor.setTo(0.5, 0.5);
    rabbit.scale.setTo(0.5, 0.5);
    let sun = game.add.sprite(game.width - 80, 80, 'sun');
    sun.anchor.setTo(0.5, 0.5);
    let rabbit2 = game.add.sprite(game.width / 1.5, game.height - 110, 'rabbit');
    rabbit2.anchor.setTo(0.5, 0.5);
    rabbit2.scale.setTo(0.5, 0.5);
    let bubble = game.add.sprite(0, 200, 'bubble');
    bubble.anchor.setTo(0.5, 0.5);
    bubble.scale.setTo(0.2, 0.2);
    
	createRandomTween(mainTween, rabbit);
    
    downTween1 = game.add.tween(sun.scale).to({x: 1.8,y: 1.8}, 2000, Phaser.Easing.Cubic.Out)
                .to({x: 1,y: 1}, 2000, Phaser.Easing.Cubic.Out);
    downTween1.onComplete.add(onDownTweenCompleted, this);

    downTween2 = game.add.tween(rabbit2).to({alpha: 0}, 500, Phaser.Easing.Linear.None)
                .to({alpha: 1.0}, 1500, Phaser.Easing.Linear.None);
    downTween2.onComplete.add(onDownTweenCompleted, this)

    downTween3 = game.add.tween(bubble).to({x: 500}, 2500, Phaser.Easing.Linear.None)
                .to({alpha: 0}, 500, Phaser.Easing.Linear.None)
                .to({x: 0}, 5000, Phaser.Easing.Linear.None)
                              
    downTween1.start();

    let textTitle = 'Falling Rabbit';
    let styleTitle = {
        font: 'Brightly',
        fontSize: '35pt',
        fontWeight: 'bold',
        fill: '#b60404'
    };
    let title = game.add.text(game.width / 2, game.height / 6.5, textTitle, styleTitle);
    title.anchor.setTo(0.5,0.5);

    let bgButtons = game.add.image(game.width / 2, game.height / 1.8, 'bgButtons');
    bgButtons.anchor.setTo(0.5,0.5);
    bgButtons.scale.setTo(2.9, 1.7);

    btnLvl = game.add.button(game.width / 2, game.height / 3 + 53,
        'lvlButton', onLvlSelectorButtonPressed);
        btnLvl.anchor.setTo(0.5,0.5);
        btnLvl.scale.setTo(0.65, 0.65);

    btnAbout = game.add.button(game.width / 2, game.height / 3 + 120,
        'aboutButton', onAboutButtonPressed);
		btnAbout.anchor.setTo(0.5,0.5);
        btnAbout.scale.setTo(1.2, 1.2);

    btnConfig = game.add.button(game.width / 2, game.height / 3 + 180,
        'configButton', onConfigButtonPressed);
        btnConfig.anchor.setTo(0.5,0.5);
        btnConfig.scale.setTo(1.2, 1.2);

    btnMain = game.add.button(game.width / 2, game.height / 3 + 240, 
        'mainButton', onMainButtonPressed);
        btnMain.anchor.setTo(0.5,0.5);
        btnMain.scale.setTo(1.2, 1.2); 
    
    btnPlay = game.add.button(game.width / 2, game.height / 3 + 310,
        'playButton', onPlayButtonPressed);
        btnPlay.anchor.setTo(0.5,0.5);
        btnPlay.scale.setTo(1.2, 1.2);

	let mainMusic = game.add.audio('mainSnd');
    mainMusic.play();
}

function createRandomTween(myTween, sprite) {

	let xPos = Math.random() * game.width;

	sprite.position.x = xPos;

	if (myTween != undefined) {
		myTween.remove();
	}
	sprite.alpha = 1;
	myTween = game.add.tween(sprite).to({x: xPos, y: 500}, 700, Phaser.Easing.Linear.None)
        .to({angle: 360}, 500, Phaser.Easing.Linear.None)
        .to({y: game.height + 100}, 700, Phaser.Easing.Linear.None)
        .to({alpha: 0}, 200, Phaser.Easing.Linear.None);
	myTween.onComplete.add(onMainTweenCompleteed, this);

    myTween.delay(1500);
    myTween.start();
}

function onDownTweenCompleted(object, tween) {
    if (tween === downTween1) {
        downTween2.start();
	} else {
        downTween1.start();
        downTween3.start();
	}
}

function onMainTweenCompleteed(object, tween) {
	createRandomTween(mainTween, rabbit);
}

function onLvlSelectorButtonPressed() {
	if (playerName != undefined && playerName.text.length > 0) {
        game.sound.stopAll();
        game.add.audio('buttonSnd').play();
		game.state.start('levelSelector', levelSelectorState);
	}
}

function onAboutButtonPressed() {   
    game.sound.stopAll();
    game.add.audio('buttonSnd').play();	
	game.state.start('about', aboutState);
}

function onConfigButtonPressed() {
    game.sound.stopAll();
    game.add.audio('buttonSnd').play();
    game.state.start('instructions', instructionsState);
}

function onMainButtonPressed() {
    game.sound.stopAll();
    game.add.audio('buttonSnd').play();
    game.state.start('playerConf', playerConfState);
}

function onPlayButtonPressed() {
    
	if (playerName != undefined && playerName.text.length > 0) {
        game.sound.stopAll();
        game.add.audio('buttonSnd').play();
		lifes = 3;
		game.state.start('game', gameState);
	}
}

function onBackButtonPressed() {
    game.sound.stopAll();
    game.add.audio('buttonSnd').play();
    game.state.start('menu');
}