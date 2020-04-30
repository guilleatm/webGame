let textStyle = {
	font: 'Brightly',
	fontSize: '40pt',
	fontWeight: 'bold',
	fill: '#b60404'
};

let textStyle2 = {
	font: 'Cipitillo',
	fontSize: '30pt',
	fontWeight: 'bold',
	fill: '#088A08'
};


let suggestedNames;

let playerConfState = {
	preload: preloadPlayerConf,
	create: createPlayerConf
};


function preloadPlayerConf() {
	game.load.image('rndButton', 'assets/buttons/rndButton.png');
	game.load.image('backButton', 'assets/buttons/backButton.png');
	game.load.image('bg2', 'assets/backgrounds/backgroundCastles.png');

	game.load.audio('mainSnd', 'assets/snds/main.ogg');
	game.load.audio('buttonSnd', 'assets/snds/buttonPress.ogg');
}

function createPlayerConf() {
	game.add.image(-20, -100, 'bg2'); // Imatge de fondo

	let text = game.add.text(game.world.centerX, 80, 'Choose your name:', textStyle); // Text
	text.anchor.setTo(0.5, 0.5);

	let text2 = game.add.text(game.world.centerX, 440, 'Press button for random names or write it', {
		font: 'Cipitillo',
		fontSize: '20pt',
		fill: '#b60404'
	}); // Text
	text2.anchor.setTo(0.5, 0.5);

	playerName = game.add.text(game.world.centerX, 170, "", textStyle2); // Text del nom del jugador
	playerName.anchor.setTo(0.5, 0.5);

	rndButton = game.add.button(game.world.centerX, 300, 'rndButton', onButtonPressed);
	rndButton.anchor.setTo(0.5, 0.5);
	rndButton.scale.setTo(0.6, 0.6);

	let btnBack = game.add.button(game.width / 2, game.height - 60, 'backButton', backMain);
	btnBack.anchor.setTo(0.5, 0.5);
	btnBack.scale.setTo(1.2, 1.2);

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

	let mainMusic = game.add.audio('mainSnd');
    mainMusic.play();
}


function onDown() { // Se crida cuan una key està down

	let playerNameStr = playerName.text;

	if (game.input.keyboard.event.key == "Backspace") { // Li donen al la key de borrar
		playerNameStr = playerNameStr.substring(0, playerNameStr.length - 1);
	} 
	else if (game.input.keyboard.event.key.length == 1) { // Cualsevol lletra "normal" (caracters especials tamé)
		playerNameStr += game.input.keyboard.event.key;
	}

	playerName.setText(playerNameStr); // Actualitza el text de pantalla
}


function backMain() {
	if (playerName.text.length > 0){
		game.sound.stopAll();
		game.add.audio('buttonSnd').play();
		game.state.start('menu');
	}				
}


function onButtonPressed(button) {

	playerName.setText(suggestedNames[Math.floor(Math.random() * 10)]); // Actualitza el text de pantalla
	
}