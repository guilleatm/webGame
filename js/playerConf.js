let textStyle = {
	font: 'Rammetto One',
	fontSize: '20pt',
	fontWeight: 'bold',
	fill: '#b60404'
};

let playerName;

let playerConfState = {
	preload: preloadPlayerConf,
	create: createPlayerConf
};


let btnEasy, btnAvg, btnNgtm;

function preloadPlayerConf() {
	game.load.image('easyButton', 'assets/imgs/easyButton.png');
	game.load.image('avgButton', 'assets/imgs/averageButton.png');
	game.load.image('ngtmButton', 'assets/imgs/nightmareButton.png');
}

function createPlayerConf() {
	game.add.image(0, 0, 'bg'); // Imatge de fondo

	let text = game.add.text(game.world.centerX, 80, 'Choose your name:', textStyle); // Text
	text.anchor.setTo(0.5, 0.5);

	playerName = game.add.text(game.world.centerX, 130, "", textStyle); // Text del nom del jugador
	playerName.anchor.setTo(0.5, 0.5);

	name1Button = game.add.button(game.world.width / 4, game.world.height * 0.6, 'easyButton', onButtonPressed); // Dr. Ogadicto
	name1Button.anchor.setTo(0.5, 0.5);
	name2Button = game.add.button(game.world.width / 2, game.world.height * 0.6, 'avgButton', onButtonPressed); // Juanra Bosucio
	name2Button.anchor.setTo(0.5, 0.5);
	name3Button = game.add.button(game.world.width * 3 / 4, game.world.height * 0.6, 'ngtmButton', onButtonPressed); // Kepa Jamecho
	name3Button.anchor.setTo(0.5, 0.5);


	let callbackContext = game.input.keyboard.callbackContext; // callback context, necesari per a definir les callbacks
	game.input.keyboard.addCallbacks(callbackContext, onDown); // Definim les callbacks (onDown [, onUp, onPress])

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

	if (button === btnEasy) {
		damage = DEFAULT_DAMAGE;
		healthAid = DEFAULT_HEALTH;
		secondsToGo = DEFAULT_TIME;
		jumpsToKill = DEFAULT_JUMPS_TO_KILL;
		playerDeathTimePenalty = DEFAULT_PLAYER_DEATH_TIME_PENALTY;
	} else if (button === btnAvg) {
		damage = DEFAULT_DAMAGE * 1.5;
		healthAid = DEFAULT_HEALTH - 2;
		secondsToGo = DEFAULT_TIME - 90;
		jumpsToKill = DEFAULT_JUMPS_TO_KILL + 1;
		playerDeathTimePenalty = DEFAULT_PLAYER_DEATH_TIME_PENALTY + 10;
	} else if (button === btnNgtm) {
		damage = DEFAULT_DAMAGE * 2;
		healthAid = DEFAULT_HEALTH - 5;
		secondsToGo = DEFAULT_TIME - 150;
		jumpsToKill = DEFAULT_JUMPS_TO_KILL + 3;
		playerDeathTimePenalty = DEFAULT_PLAYER_DEATH_TIME_PENALTY + 25;
	}

	console.log("Dificultad cambiada");
	game.state.start('menu', menuState);

}