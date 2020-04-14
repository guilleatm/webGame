let textStyle = {
	font: 'Rammetto One',
	fontSize: '20pt',
	fontWeight: 'bold',
	fill: '#b60404'
};

let suggestedNames;

let playerConfState = {
	preload: preloadPlayerConf,
	create: createPlayerConf
};


function preloadPlayerConf() {
	game.load.image('rndButton', 'assets/buttons/rndButton.png');
	game.load.image('bg2', 'assets/backgrounds/backgroundCastles.png');
}

function createPlayerConf() {
	game.add.image(-20, -100, 'bg2'); // Imatge de fondo

	let text = game.add.text(game.world.centerX, 80, 'Choose your name:', textStyle); // Text
	text.anchor.setTo(0.5, 0.5);

	let text2 = game.add.text(game.world.centerX, 500, 'Press Enter for accept', textStyle); // Text
	text2.anchor.setTo(0.5, 0.5);

	playerName = game.add.text(game.world.centerX, 130, "", textStyle); // Text del nom del jugador
	playerName.anchor.setTo(0.5, 0.5);

	rndButton = game.add.button(game.world.width / 2, game.world.height / 2, 'rndButton', onButtonPressed);
	rndButton.anchor.setTo(0.5, 0.5);
	rndButton.scale.setTo(0.6, 0.6);


	let callbackContext = game.input.keyboard.callbackContext; // callback context, necesari per a definir les callbacks
	game.input.keyboard.addCallbacks(callbackContext, onDown); // Definim les callbacks (onDown [, onUp, onPress])


	suggestedNames = [
		"Dr. Ogadicto", "Juanra Bosucio", "Kepa Jamecho",
		"Oskarini", "William Williamson", "Pakito el Chokolatero",
		"Undefined Undefindini", "JSON Returns", "I Love this Game",
		"Queremos un 10 :)"
	]; // Si poses més noms ni ha que modificar el Math.random() (+- linea 68)

	if (playerName != undefined) {
		playerName.setText(playerName.text); // Actualitza el text de pantalla
	}
}


function onDown() { // Se crida cuan una key està down

	let playerNameStr = playerName.text;

	if (game.input.keyboard.event.key == "Backspace") { // Li donen al la key de borrar
		playerNameStr = playerNameStr.substring(0, playerNameStr.length - 1);
	} else if (game.input.keyboard.event.key == "Enter") { // Li donen al enter
		game.state.start('menu');
	} else if (game.input.keyboard.event.key.length == 1) { // Cualsevol lletra "normal" (caracters especials tamé)
		playerNameStr += game.input.keyboard.event.key;
	}

	playerName.setText(playerNameStr); // Actualitza el text de pantalla
}


function onButtonPressed(button) {

	playerName.setText(suggestedNames[Math.floor(Math.random() * 10)]); // Actualitza el text de pantalla
	
	//game.state.start('menu', menuState);

}