let levelSelectorState = {
	preload: preloadLevelSelector,
	create: createLevelSelector
};


function preloadLevelSelector() {
	game.load.image('lvl1', 'assets/buttons/lvl1.png');
	game.load.image('lvl2', 'assets/buttons/lvl2.png');
	game.load.image('lvl3', 'assets/buttons/lvl3.png');
	game.load.image('lvl4', 'assets/buttons/lvl4.png');
	game.load.image('lvl5', 'assets/buttons/lvl5.png');
	game.load.image('lvl6', 'assets/buttons/lvl6.png');
	game.load.image('bg2', 'assets/backgrounds/backgroundCastles.png');
}

function createLevelSelector() {
	game.add.image(-20, -100, 'bg2'); // Imatge de fondo

	let text = game.add.text(game.world.centerX, 80, 'Choose a level:', textStyle); // Text
	text.anchor.setTo(0.5, 0.5);

	Lvl1 = game.add.button(game.world.width / 2, game.world.height / 3 + 55,
        'lvl1', onLvlButtonPressed);
        Lvl1.anchor.setTo(0.5,0.5);
        Lvl1.scale.setTo(1.5, 1.5);
}

function onLvlButtonPressed(button) {
	if(button.key == 'lvl1'){levelToPlay = 1;}
	else if(button.key == 'lvl2'){levelToPlay = 2;}
	else if(button.key == 'lvl3'){levelToPlay = 3;}
	else if(button.key == 'lvl4'){levelToPlay = 4;}
	else if(button.key == 'lvl5'){levelToPlay = 5;}
	else if(button.key == 'lvl6'){levelToPlay = 6;}	
	game.state.start('game', gameState);
}



// function onBackButtonPressed(button) {
// 	//game.state.start('menu', menuState);
// }