"use strict";

import * as model from "./model";
import view from "./view";
import * as utils from "./utilities";

class Game {
  _app;
  _timeRemainingTextField;
  _timeRemainingTextHeading;
  _timeRemainingText;
  _scoreTextField;
  _scoreTextHeading;
  _scoreText;
  _colourCirlce;
  _redButton;
  _blueButton;
  _greenButton;
  _yellowButton;
  _orangeButton;
  _btnsBlock = false;
  _isFirstSpin = true;
  _gameEnded = false;
  _overlay;

  constructor() {
    // Create game
    this._app = view.createGame();

    // Create time remaining display
    this._timeRemainingTextField = view.createTimeRemainingTextField(this._app);
    this._timeRemainingTextHeading = view.createTimeRemainingTextHeading(
      this._app,
      this._timeRemainingTextField
    );
    this._timeRemainingText = view.createTimeRemainingText(
      this._app,
      this._timeRemainingTextField,
      model.gameConfig.gameTime
    );

    // Create score display
    this._scoreTextField = view.createScoreTextField(this._app);
    this._scoreTextHeading = view.createScoreTextHeading(
      this._app,
      this._scoreTextField
    );
    this._scoreText = view.createScoreText(
      this._app,
      this._scoreTextField,
      model.state.playerScore
    );

    // Create main colour circle
    this._colourCirlce = view.createColourCircle(
      this._app,
      model.gameConfig.circleStartHex
    );

    // Create color selection buttons
    this._redButton = view.createRedCircle(this._app);
    this._blueButton = view.createBlueCircle(this._app);
    this._greenButton = view.createGreenCircle(this._app);
    this._yellowButton = view.createYellowCircle(this._app);
    this._orangeButton = view.createOrangeCircle(this._app);

    // Create event handlers for buttons
    view.addButtonHandlers(
      [
        this._redButton,
        this._blueButton,
        this._greenButton,
        this._yellowButton,
        this._orangeButton,
      ],
      this.controlStartSpin.bind(this)
    );
  }

  /**
   * Controls logic when user selects a colour option
   * @param {*} btnClicked_
   * @returns
   */
  async controlStartSpin(btnClicked_) {
    // Guard clause in case selections should not be active
    if (this._btnsBlock) return;

    // Block selections while spin is in play
    this._btnsBlock = true;

    // If it the first spin of the round, start the counter
    this._isFirstSpin && this.countdownStart();
    this._isFirstSpin = false;

    // Get user's selection, and store it in state
    const selection = btnClicked_;
    const colour = selection.colourName;
    model.state.selectedColour = colour;

    // Call spinSequence and wait for end to continue
    await this.spinSequence();

    // After the spin ends, decide whether to setup for a new spin or not depending on whether the game is over
    if (this._gameEnded) {
      // If game is over, block buttons
      this._btnsBlock = true;
    } else {
      // Reset for next spin
      model.state.spinDurationRemaining = model.gameConfig.spinDuration;
      // Unblock buttons
      this._btnsBlock = false;
    }
  }

  /**
   * Handles the actual spin
   */
  async spinSequence() {
    // Get the response
    const res = model.gameConfig.responses[utils.getRandomNumber(0, 4)];

    // Cycle the colours / visual spin
    await this.startCycleColours();

    // Set the response colour for the user to see
    view.setCircleColour(this._app, this._colourCirlce, res.colourHex, 0);

    // If win and game hasnt ended, award points
    if (model.state.selectedColour === res.colourString && !this._gameEnded) {
      model.state.playerScore++;
      view.updateScore(this._scoreText, model.state.playerScore);
    }

    // Increase spins counter
    model.state.spins++;
  }

  /**
   * Handles the cycling colours part of the spin
   */
  async startCycleColours() {
    // While still time to spin, spin
    while (model.state.spinDurationRemaining > 0) {
      // Get a random colour from options, and render that colour
      const colourIndex = utils.getRandomNumber(0, 4);
      const colours = model.gameConfig.responses.map((r) => r.colourHex);
      const pick = colours[colourIndex];
      view.setCircleColour(this._app, this._colourCirlce, pick, 10);

      // Await the cycle duration before continuing
      await utils.gsapDelayedPromise(model.gameConfig.cycleDuration);

      // Reduce spin duration remaining by time waited above
      model.state.spinDurationRemaining -= model.gameConfig.cycleDuration;
    }
  }

  /**
   * Handles the timer countdown, and ends the game when timer runs out
   */
  async countdownStart() {
    // trigger timer to count down every second
    while (model.state.timeRemaining > 0) {
      await utils.gsapDelayedPromise(1);
      model.state.timeRemaining--;
      view.updateTime(this._timeRemainingText, model.state.timeRemaining);
    }

    // After countdown, set game has ended and create end screen
    this.gameEnded = true;
    this.handleEndGameScreen();
  }

  /**
   * Creates the ending screen
   */
  handleEndGameScreen() {
    // Create overlay to go over game
    this._overlay = view.createGameOverlay(this._app);

    // Create the ending screen display
    view.createFinalScoreText(
      this._app,
      this._overlay,
      model.state.playerScore,
      model.state.spins
    );

    const replayButton = view.createReplayButton(this._app, this._overlay);
    view.createReplayButtonText(this._app, replayButton);

    // Assign handler function to replay button to reset game
    view.addReplayButtonHandler(
      replayButton,
      this.controlRestartGame.bind(this)
    );
  }

  /**
   * Resets the game
   */
  controlRestartGame() {
    // Resets state
    model.state.playerScore = 0;
    model.state.spins = 0;
    model.state.selectedColour = undefined;
    model.state.timeRemaining = model.gameConfig.gameTime;
    model.state.spinDurationRemaining = model.gameConfig.spinDuration;

    // Unblocks buttons and assigns first spin
    this._btnsBlock = false;
    this._isFirstSpin = true;

    // Resets counters and circle colour
    view.updateScore(this._scoreText, model.state.playerScore);
    view.updateTime(this._timeRemainingText, model.gameConfig.gameTime);
    view.setCircleColour(
      this._app,
      this._colourCirlce,
      model.gameConfig.circleStartHex,
      0
    );

    // Destroys the overlay
    this._overlay.destroy();
    this._overlay = undefined;

    // Resets game ended
    this._gameEnded = false;
  }
}

const g = new Game();
