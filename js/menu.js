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
    game.load.image('bg', 'assets/imgs/bgLayer.jpg');
    game.load.image('aboutButton', 'assets/imgs/aboutButton.png');
    game.load.image('configButton', 'assets/imgs/configButton.png');
    game.load.image('playButton', 'assets/buttons/pr1.png');
    game.load.spritesheet('hero', 'assets/imgs/dude.png', 32, 48);
}

function displayScreen() {
    levelToPlay = 1;
    game.input.enabled = true;
    game.add.image(0, 0, 'bg');

    let hero1 = game.add.sprite(game.world.width / 4, game.world.height - 200, 'hero', 4);
    hero1.anchor.setTo(0.5, 0.5);
    let hero2 = game.add.sprite(game.world.width / 2.5, game.world.height - 200, 'hero', 4);
    hero2.anchor.setTo(0.5, 0.5);
    let hero3 = game.add.sprite(25, game.world.height / 2 - 32, 'hero', 4);
    hero3.anchor.setTo(0.5, 0.5);

    mainTween = game.add.tween(hero3).to({
            y: 32
        }, 2000, Phaser.Easing.Linear.None)
        .to({
            angle: -90
        }, 500, Phaser.Easing.Linear.None)
        .to({
            x: game.world.width - (32 * 2)
        }, 4000, Phaser.Easing.Linear.None);
    mainTween.delay(3000);
    mainTween.loop(true);
    mainTween.start();

    downTween1 = game.add.tween(hero1.scale).to({
            x: 5,
            y: 5
        }, 1500, Phaser.Easing.Cubic.Out)
        .to({
            x: 1,
            y: 1
        }, 1500, Phaser.Easing.Cubic.Out);
    downTween1.onComplete.add(onDownTweenCompleted, this);
    downTween2 = game.add.tween(hero2).to({
            alpha: 0.05
        }, 2500, Phaser.Easing.Linear.None)
        .to({
            alpha: 1.0
        }, 2500, Phaser.Easing.Linear.None);
    downTween2.onComplete.add(onDownTweenCompleted, this)
    downTween1.start();

    let textTitle = 'Lab 6: A Simple Phaser Platform Game';
    let styleTitle = {
        font: 'Rammetto One',
        fontSize: '22pt',
        fontWeight: 'bold',
        fill: '#b60404'
    };
    game.add.text(50, game.world.height / 6, textTitle, styleTitle);

    btnAbout = game.add.button(game.world.width / 1.75, game.world.height / 3,
        'aboutButton', onAboutButtonPressed);
    btnConfig = game.add.button(game.world.width / 1.75, game.world.height / 3 + 120,
        'configButton', onConfigButtonPressed);
    btnPlay = game.add.button(game.world.width / 1.75, game.world.height / 3 + 240,
        'playButton', onPlayButtonPressed);
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