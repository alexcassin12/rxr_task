"use strict";

// Configuration for the whole game. Are never changed in game
export const gameConfig = {
  circleStartHex: 0x000000,
  gameTime: 20,
  spinDuration: 2,
  cycleDuration: 2 / 7,
  responses: [
    { colourString: "red", colourHex: 0xff0000 },
    { colourString: "blue", colourHex: 0x0000ff },
    { colourString: "green", colourHex: 0x00ff00 },
    { colourString: "yellow", colourHex: 0xffff00 },
    { colourString: "orange", colourHex: 0xffa500 },
  ],
};

// Holds data about the game that is updated during play
export const state = {
  selectedColour: undefined,
  playerScore: 0,
  spins: 0,
  timeRemaining: gameConfig.gameTime,
  spinDurationRemaining: gameConfig.spinDuration,
};
