"use strict";

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
    this._scoreText = view.createScoreText(this._app, this._scoreTextField);

    // Create main colour circle
    this._colourCirlce = view.createColourCircle(this._app);

    // Create color selection buttons
    this._redButton = view.createRedCircle(this._app);
    this._blueButton = view.createBlueCircle(this._app);
    this._greenButton = view.createGreenCircle(this._app);
    this._yellowButton = view.createYellowCircle(this._app);
    this._orangeButton = view.createOrangeCircle(this._app);
  }
}

const g = new Game();
