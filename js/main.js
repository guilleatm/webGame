let game;

let wfConfig = {
    active: function () {
        startGame();
    },

    google: {
        families: ['Rammetto One', 'Sniglet']
    },

    custom: {
        families: ['myFont','Cipitillo'],
        urls: ["../assets/fonts/molot.otf", "../assets/fonts/Cipitillo.otf"]
    }
};

WebFont.load(wfConfig);

function startGame() {
    game = new Phaser.Game(600, 600, Phaser.CANVAS, 'platformGameStage');

    // Menu Screen
    game.state.add('menu', menuState);
    // About Screen
    game.state.add('about', aboutState);
    // Player configuration Screen
    game.state.add('playerConf', playerConfState);
    // Game Screen
    game.state.add('game', gameState);

	game.state.start('menu', menuState)

}