"use strict";

import * as model from "./model";
import view from "./view";

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
      this._timeRemainingTextField
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
    this._colourCirlce = view.createColourCircle(this._app);

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
      this.controlMakeSelection.bind(this)
    );
  }

  /**
   * Controls logic when user selects a colour option
   * @param {*} btnClicked_
   * @returns
   */
  async controlMakeSelection(btnClicked_) {
    // Guard clause in case selections should not be active
    if (this._btnsBlock) return;

    isFirstSpin && this.countdownStart();
    this.isFirstSpin = false;

    //Highligh selected button
    view.highlightSelection(btnClicked_);

    // Get user's selection, and store it in state
    const selection = btnClicked_;
    const colour = selection.colourName;
    model.state.selectedColour = colour;

    // Block selections while spin is in play
    this._btnsBlock = true;

    // Call spinSequence and wait for end to continue
    await this.spinSequence();

    // Unblock selections and get ready for new spin
    this._btnsBlock = false;
  }

  async spinSequence() {
    const res =
      model.state.responses[Math.floor(Math.random() * (4 - 0 + 1) + 0)];
    await view.cycleColours(
      this._app,
      this._colourCirlce,
      model.state.responses
    );
    view.setResColour(res.colourHex);

    // If win
    if (model.state.selectedColour === res.colourString) {
      model.state.playerScore++;
      view.updateScore(this._scoreText, model.state.playerScore);
    }
  }

  countdownStart() {
    // trigger view to count down every second for 20 seconds
    // After countdown, block selections and handle end game screen

    this.handleEndGameScreen();
  }

  handleEndGameScreen() {
    // get view to display end game screen
  }

  resetGame() {
    model.playerScore = 0;
    model.selectedColour = undefined;
    this._btnsBlock = false;
    this._isFirstSpin = true;

    view.updateScore();
    view.resetTime();

    // Hide end game screen
  }
}

const g = new Game();
