# Documentació
* [Phaser Documentation](https://phaser.io/docs/2.6.2/index)
* [Project Documentation](https://docs.google.com/document/d/1ykEkM3PIsLzuafaQFkp95UH97ueGlGxNYFP1rbml_zs/edit#)


# Bugs

* Si pulses tecles en cualsevol pantalla se escriu, el keyboard es global.
* Les fonts no van
* El main button es més gran que els atres (ni ha que retallar la imatge i que se quede mes o menos en 139x46)
* El boto de more no va perq el main està per damunt!! Mirar la imatge de main en assets/buttons/

# Pa picar

* kenney

* [smoke](https://www.kenney.nl/assets/smoke-particles)
* [jumper-pack](https://www.kenney.nl/assets/jumper-pack)
* [plataformer-deluxe](https://www.kenney.nl/assets/platformer-art-deluxe)
* [industrial](https://www.kenney.nl/assets/platformer-pack-industrial)

# Falta


* Icon of the powerup in effect, if any. #G
* animation. #OG
* the movement of the mouse to control the movement #OG
* Animation when die #G

* Use of sounds to inform the user of every relevant event of the game (fall, collision with an obstacle, achievement of a powerup, landing on a trap, exiting a level...). #O

# Specific gameplay for Level 2
* There will be an additional type of obstacles: moving obstacles (they will start moving when the character lands on the platform where they stand). #G
* There will be some platforms with no holes at all. In these platforms there will be some blocks labelled with a (random) capital letter. When the user presses the corresponding key in the keyboard, the block will vanish (design a tween for the effect) thus creating a hole. #G
* There will be a new type of powerup: in some platforms there will be blocks labelled with a “supersoldier icon” (references to Captain Rogers are welcome 🙂). The effect of this powerup will be increasing the acceleration by an adequate factor (higher than that of the other type of powerup), and will allow breaking even a trap (but a single one). The effect of this powerup will end when the character breaks a trap or, as before, when her velocity is lower than the given threshold. #G
* Transition to the end-game screen not only if the character dies but also if this level is successfully completed. #O


# Optional (grade increase of up to 30%)
* It can include some new elements (e.g. more types of obstacles, powerups, etc.) and some substantial and playable variation of the gameplay, while keeping the same general game theme and genre.
* The development effort should be neither too low nor too high. As a rough reference, consider the effort required for levels 1 and 2. Assume a linear relationship between effort and grade.
* A proposal for this part should be submitted and accepted prior to its implementation (see below)
Important

* Transitions from/between game levels and screens should be smooth.
* However, the position and number of traps and powerups will be randomly chosen.
* Sounds should be used for relevant events in the game:
* Character dies.
* Character being damaged.
* Gain a powerup.
* Landing on a trap.
* Landing on a platform.
* etc.


# Proposing the optional part of the project
* Describe your proposal clearly and concisely (about one page or two pages at most)
* Can different teams have the same or similar proposal for an advanced game?
* Ideally not. If two proposals are in conflict due to their high similarity, the submission time might be considered to eventually solve the situation.
* Deadline for proposal submission: Sunday, May 17, 2020, 23:59.
* What if…
* … you eventually are not able to implement your proposal?
* This will not affect your final mark negatively.
* You will hopefully have learned about project management.
* … you did not propose an advanced project by the submission deadline and some time later you think you can try?
* Discuss this with the staff 
Some important information


# Report
* You will be asked to submit a report, written in English, along with your game, in which you document things such as:
* the software design decisions and implementation details, and the rationale behind them;
* how you organised and coordinated the team activities; 
* how you managed time and how your project evolved.
* It is therefore advisable that you keep writing down important and relevant information. Some pieces can even become part of the final report. This all will help you remember and prepare the final document.
Submission deadlines
* Thursday, June 4, 2020, 23:59.
* Sunday, July 5, 2020, 23:59.

# Coses dudoses

* The stage will be 400 pixels wide and 800 pixels high. However, the world inside the game will be at least 400x3200. There will be at least 20 platforms in each level, but only up to 3 of which will be visible at a given time.