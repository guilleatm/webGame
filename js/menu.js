const DEFAULT_DAMAGE = 10;
const DEFAULT_HEALTH = 10;
const DEFAULT_TIME = 480;
const DEFAULT_JUMPS_TO_KILL = 2;
const DEFAULT_PLAYER_DEATH_TIME_PENALTY = 15;

let damage = DEFAULT_DAMAGE;
let healthAid = DEFAULT_HEALTH;
let secondsToGo = DEFAULT_TIME;
let jumpsToKill = DEFAULT_JUMPS_TO_KILL;
let playerDeathTimePenalty = DEFAULT_PLAYER_DEATH_TIME_PENALTY;

let menuState = {
    preload: loadAssets,
    create: displayScreen
};

let mainTween, downTween1, downTween2;
let btnAbout, btnConfig, btnPlay;
let levelToPlay;

function loadAssets() {
    game.load.image('bg', 'assets/backgrounds/backgroundColorForest.png');
    game.load.image('aboutButton', 'assets/buttons/moreButton.png');
    game.load.image('configButton', 'assets/buttons/settingButton.png');
    game.load.image('playButton', 'assets/buttons/pr1.png');
    game.load.image('bgButtons', 'assets/backgrounds/Elements/PNG/Default/towerAlt.png');
    game.load.image('rabbit', 'assets/player/bunny1_ready.png', 32, 48);
    game.load.image('sun', 'assets/objects/sun1.png', 150, 1000);
}

function displayScreen() {
    levelToPlay = 1;
    game.input.enabled = true;
    game.add.image(0,-250, 'bg');

    let sun = game.add.sprite(game.world.width - 80, 80, 'sun', 4);
    sun.anchor.setTo(0.5, 0.5);
    let rabbit = game.add.sprite(25, game.world.height , 'rabbit', 4);
    rabbit.anchor.setTo(0.5, 0.5);
    rabbit.scale.setTo(0.5, 0.5);
    let rabbit2 = game.add.sprite(game.world.width / 1.5, game.world.height - 110, 'rabbit', 4);
    rabbit2.anchor.setTo(0.5, 0.5);
    rabbit2.scale.setTo(0.5, 0.5);

    mainTween = game.add.tween(rabbit).to({y: 500}, 700, Phaser.Easing.Linear.None)
                .to({angle: 360}, 500, Phaser.Easing.Linear.None)
                .to({y: game.world.height}, 700, Phaser.Easing.Linear.None);

    mainTween.delay(500);
    mainTween.loop(true);
    mainTween.start();

    downTween1 = game.add.tween(sun.scale).to({x: 1.8,y: 1.8}, 2000, Phaser.Easing.Cubic.Out)
                .to({x: 1,y: 1}, 2000, Phaser.Easing.Cubic.Out);
    downTween1.onComplete.add(onDownTweenCompleted, this);

    downTween2 = game.add.tween(rabbit2).to({alpha: 0}, 500, Phaser.Easing.Linear.None)
                .to({alpha: 1.0}, 1500, Phaser.Easing.Linear.None);

    downTween2.onComplete.add(onDownTweenCompleted, this)
    downTween1.start();

    let textTitle = 'Falling Rabbit';
    let styleTitle = {
        font: 'Rammetto One',
        fontSize: '22pt',
        fontWeight: 'bold',
        fill: '#b60404'
    };
    let title = game.add.text(game.world.width / 2, game.world.height / 6.5, textTitle, styleTitle);
    title.anchor.setTo(0.5,0.5);
    //console.log(hero3);

    let bgButtons = game.add.image(game.world.width / 2, game.world.height / 1.8, 'bgButtons');
    bgButtons.anchor.setTo(0.5,0.5);
    bgButtons.scale.setTo(2.9, 1.7);

    btnAbout = game.add.button(game.world.width / 2, game.world.height / 3 + 120,
        'aboutButton', onAboutButtonPressed);
        btnAbout.anchor.setTo(0.5,0.5);
        btnAbout.scale.setTo(1.2, 1.2);

    btnConfig = game.add.button(game.world.width / 2, game.world.height / 3 + 180,
        'configButton', onConfigButtonPressed);
        btnConfig.anchor.setTo(0.5,0.5);
        btnConfig.scale.setTo(1.2, 1.2);

    btnPlay = game.add.button(game.world.width / 2, game.world.height / 3 + 240,
        'playButton', onPlayButtonPressed);
        btnPlay.anchor.setTo(0.5,0.5);
        btnPlay.scale.setTo(1.2, 1.2);    
}

function onDownTweenCompleted(object, tween) {
    if (tween === downTween1)
        downTween2.start();
    else
        downTween1.start();
}

function onAboutButtonPressed() {
	game.state.start('about', aboutState)
}

function onConfigButtonPressed() {
    game.state.start('playerConf', playerConfState)
}

function onPlayButtonPressed() {
    game.state.start('game', gameState)
}