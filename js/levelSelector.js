let levelSelectorState = {
	preload: preloadLevelSelector,
	create: createLevelSelector
};


function preloadLevelSelector() {
	game.load.image('rndButton', 'assets/buttons/rndButton.png');
	game.load.image('bg2', 'assets/backgrounds/backgroundCastles.png');
}

function createLevelSelector() {
	game.add.image(-20, -100, 'bg2'); // Imatge de fondo

	let text = game.add.text(game.world.centerX, 80, 'Choose a level:', textStyle); // Text
	text.anchor.setTo(0.5, 0.5);





}


function onButtonPressed(button) {
	//game.state.start('menu', menuState);
}