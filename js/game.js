let canvas;
let world;
let keyboard = new Keyboard();
const originalPlay = HTMLMediaElement.prototype.play;
let intervalIds = [];
let gameEnded;

/**
 * The function determines the value of the canvas-variable, creates a new World and executes the function for mobile buttons on phone
 */
async function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  bindBtsPressEvents();
}

/**
 * This function clears the Canvas after the Game is over
 */
function clearCanvas() {
  let ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

/**
 * This function links the mobile buttons with their respective keyboard counterparts, ensuring that the same actions occur as when the game is controlled with the keyboard.
 */
function bindBtsPressEvents() {
  const buttonMap = {
    mobileBtnLeft: "LEFT",
    mobileButtonRight: "RIGHT",
    mobileButtonJump: "SPACE",
    mobileButtonThrow: "D",
    mobileButtonAttack: "V",
  };

  for (const buttonId in buttonMap) {
    const element = document.getElementById(buttonId);
    const key = buttonMap[buttonId];

    element.addEventListener("touchstart", (e) => {
      e.preventDefault();
      keyboard[key] = true;
    });

    element.addEventListener("touchend", (e) => {
      e.preventDefault();
      keyboard[key] = false;
    });
  }
}

/**
 * This function checks which control keys have been pressed and passes these values to the Keyboard class.
 */
document.addEventListener("keydown", (event) => {
  if (event.keyCode == 39) {
    keyboard.RIGHT = true;
  } else if (event.keyCode == 37) {
    keyboard.LEFT = true;
  } else if (event.keyCode == 38) {
    keyboard.UP = true;
  } else if (event.keyCode == 40) {
    keyboard.DOWN = true;
  } else if (event.keyCode == 32) {
    keyboard.SPACE = true;
  } else if (event.keyCode == 68) {
    keyboard.D = true;
  } else if (event.keyCode == 86 && !world.character.isHurt() && !keyboard.V) {
    keyboard.V = true;
    initiateAttack();
  }
});

/**
 * this function checks which control keys are no longer pressed and passes these values to the keyboard.class
 */
document.addEventListener("keyup", (event) => {
  if (event.keyCode == 39) {
    keyboard.RIGHT = false;
  } else if (event.keyCode == 37) {
    keyboard.LEFT = false;
  } else if (event.keyCode == 38) {
    keyboard.UP = false;
  } else if (event.keyCode == 40) {
    keyboard.DOWN = false;
  } else if (event.keyCode == 32) {
    keyboard.SPACE = false;
  } else if (event.keyCode == 68) {
    keyboard.D = false;
  }
});

/**
 * This function sends the information that the character is attacking to the character.class and plays the attack-sound. after 640ms the character.class gets the information that the attack is over
 */
function initiateAttack() {
  world.character.isPlayingAttack = true;
  world.character.sharky_attack_sound.play();
  setTimeout(() => {
    keyboard.V = false;
    world.character.isPlayingAttack = false;
  }, 640);
}

/**
 * This function gets the Element which should be displayed in fullscreen and executes the enterFullscreen-function. It also passes the HTML-Element to this function.
 */
function goToFullscreen() {
  let fullscreenElement = document.getElementById("wholeScreen");
  enterFullscreen(fullscreenElement);
}

/**
 * Requests fullscreen mode for the specified element, handling browser compatibility.
 * Supports standard, Microsoft (ms), and WebKit (webkit) fullscreen APIs.
 *
 * @param {HTMLElement} element - The HTML element to display in fullscreen mode.
 */
function enterFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  }
}

/**
 * This function ends the Fullscreen-Mode
 */
function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}

/**
 * This function executes the function toggleHomeScreen and toggleStartScreen, which is used to switch between menus in the main menu. It ensures that the both menus can't be displayed at the same time.
 */
function switchStartScreen() {
  toggleHomeScreen();
  toggleStartScreen();
}

/**
 * This function either shows or hides the container, depending on its current state.
 *
 * @param {HTMLElement} container - The HTML element to display with animation
 */
function toggleLoreContainer(container) {
  let containerToToggle = document.getElementById(container);
  containerToToggle.classList.toggle("offScreen");
  containerToToggle.classList.toggle("onScreen");
}

/**
 * This function either shows or hides the homeScreen, depending on its current state.
 */
function toggleHomeScreen() {
  let homeScreen = document.getElementById("homeScreen");
  homeScreen.classList.toggle("none");
}

/**
 * This function either shows or hides the controlElement-Buttons, depending on its current state.
 */
function toggleStartScreen() {
  let startScreen = document.getElementById("controlElements");
  startScreen.classList.toggle("none");
}

/**
 * This function displays the End-Font, either You Win or Your Lose, based on the Value, which will be given by the GameState
 *
 * @param {Text} gameState - a text which determines either that the player wins or loses the game. The value of it comes from the Game
 */
function showEndscreen(gameState) {
  let gameResult = document.getElementById(gameState);
  gameResult.classList.remove("none");
  document.getElementById("winningScreen").classList.remove("none");
}

/**
 * This function hides all Elements of the EndScreen
 */
function hideEndScreen() {
  document.getElementById("winningScreen").classList.add("none");
  document.getElementById("winningFont").classList.add("none");
  document.getElementById("losingFont").classList.add("none");
}

/**
 * This function shows the Endscreen and executes the StopGame-function. It also displays the EndScreenButtons, which give the user the possibility to either restart the game or go back to main menu.
 *
 * @param {Text} gameState - a text which determines either that the player wins or loses the game. The Value of it comes from the GameState.
 */
function endGame(gameState) {
  gameEnded = true;
  showEndscreen(gameState);
  world.background_music.pause();
  stopGame();
  setTimeout(() => {
    document.getElementById("endScreenButtons").classList.remove("none");
  }, 800);
}

/**
 * This function stops the webbrowser from playing sounds and executes the changeSoundbuttonstext-function
 */
function stopSounds() {
  HTMLMediaElement.prototype.play = function () {
    return Promise.resolve();
  };
  changeSoundButtonsText("on", "activateSounds()");
  changeMobileSoundButtonsIcon();
  if (world) {
    world.background_music.pause();
  }
}

/**
 * this function changes the icon of the mobileSoundButton to unMute and its functionality to the activateSound-method.
 */
function changeMobileSoundButtonsIcon() {
  document.getElementById("mobileSoundButton").src = "./img/volumeMute.svg";
  document
    .getElementById("mobileSoundButton")
    .setAttribute("onclick", "activateSounds()");
}

/**
 * this function changes the Mute-Buttons text and functionality to the opposite of the current Sound-State.
 *
 * @param {Text} element - a text which is always the opposite of the current Sound State, so the user can see what the button will do when pressed.
 * @param {Function} func - the function that will be attached to the button based on the stopSounds-Function.
 */
function changeSoundButtonsText(element, func) {
  let soundbutton = document.getElementById("soundButton");
  soundbutton.innerText = `Turn Sound ${element}`;
  soundbutton.setAttribute("onclick", `${func}`);
}

/**
 * this function allows the webbrowser to play sounds and sets text of the SoundOn-Button to SoundOff. It also changes its functionality back to the stopSounds-function
 */
function activateSounds() {
  HTMLMediaElement.prototype.play = originalPlay;
  changeSoundButtonsText("off", "stopSounds()");
  changeMobileSoundButtonsIconBack();
  if (world) {
    world.background_music.play();
  }
}

/**
 * This function changes the icon and functionality of the mobile mute button back to its defaults
 */
function changeMobileSoundButtonsIconBack() {
  document.getElementById("mobileSoundButton").src = "img/volumeOn.svg";
  document
    .getElementById("mobileSoundButton")
    .setAttribute("onclick", "stopSounds()");
}

/**
 * This function creates an interval an adds an ID of the interval to an array so the Interval can be stopped
 *
 * @param {Function} fn - The function that will be executed in the interval
 * @param {Number} time - The time in ms in which the function should be executed
 */
function setStoppableInterval(fn, time) {
  let intervalID = setInterval(fn, time);
  intervalIds.push(intervalID);
}

/**
 * This function stops all intervals of the game
 */
function stopGame() {
  setTimeout(() => {
    intervalIds.forEach(clearInterval);
  }, 800);
}

/**
 * This function adds an interval to the interval-array
 *
 * @param {Function} interval - an interval with its function
 */
function addIntervalToArray(interval) {
  intervalIds.push(interval);
}

/**
 * this function displays the mobilebuttons on phone
 */
function checkIfOnMobile() {
  document.getElementById("mobileButtons").classList.remove("none");
}

/**
 * this function checks if the window-width is smaller than the window heigth. If this is true, the "turn your device-notification" is displayed
 */
function checkIfScreenNeedsToRotate() {
  const rotateDeviceElement = document.querySelector(".rotate-device");
  if (window.innerHeight > window.innerWidth) {
    rotateDeviceElement.style.display = "flex";
  } else {
    rotateDeviceElement.style.display = "none";
  }
}

/**
 * this function hides all unnecessary elements and restarts the game
 */
async function restartTheGame() {
  gameEnded = false;
  hideEndScreen();
  await getBrowser();
  document.getElementById("endScreenButtons").classList.add("none");
  await initLevel();
  await init();
  checkIfOnMobile();
}

async function getBrowser() {
  const userAgent = navigator.userAgent;

  if (userAgent.indexOf("Safari") > -1) {
    location.reload();
  }
}

/**
 * This function shows the homeScreen and hides all other and unnecessary elements
 */
async function goBackToHome() {
  await getBrowser();
  document.getElementById("controlElements").classList.add("none");
  document.getElementById("noteDiv").classList.remove("none");
  document.getElementById("endScreenButtons").classList.add("none");
  document.getElementById("mobileButtons").classList.add("none");
  document.getElementById("winningScreen").classList.add("none");
  document.getElementById("homeScreen").classList.remove("none");
  clearCanvas();
}

/**
 * This function hides all elements of the Menu and starts the game for the first time.
 */
async function startGame() {
  document.getElementById("loading-screen").classList.remove("none");
  gameEnded = false;
  document.getElementById("noteDiv").classList.add("none");
  await initLevel(), await init(), toggleStartScreen(), checkIfOnMobile();
  setTimeout(() => {
    document.getElementById("loading-screen").classList.add("none");
  }, 4000);
}

/**
 * this eventlistener disables the option to scroll on the website
 */
window.addEventListener("scroll", function () {
  window.scrollTo(0, 0);
});

/**
 * this eventlistener executes the function which gives notification if the screen needs to be rotated, when the document is loaded
 */
document.addEventListener("DOMContentLoaded", checkIfScreenNeedsToRotate);

/**
 * this eventlistener executes the function which gives notification if the screen needs to be rotated, every time the window is resized.
 */
window.addEventListener("resize", checkIfScreenNeedsToRotate);
