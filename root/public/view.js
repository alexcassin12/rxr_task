"use strict";

class View {
  // Text style for use on all texts displayed
  _textStyle = new PIXI.TextStyle({
    fontFamily: "Arial",
    fontSize: 20,
    fontStyle: "italic",
    fontWeight: "bold",
    fill: ["#FFFFFF"],
    stroke: "#4a1850",
    strokeThickness: 5,
    dropShadow: true,
    dropShadowColor: "#555555",
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 4,
    wordWrap: true,
    wordWrapWidth: 440,
  });

  // Creates the game
  createGame() {
    const app = new PIXI.Application({
      backgroundColor: 0xf1a8a8,
      resizeTo: document.querySelector(".main-div"),
    });

    document.querySelector(".main-div").appendChild(app.view);

    return app;
  }

  // Create all visual aspects of game

  createTimeRemainingTextField(app_) {
    const timeRemainingTextField = new PIXI.Graphics();
    timeRemainingTextField
      .beginFill(0xd3d3d3, 1)
      .drawRect(app_.view.width / 4, 50, app_.view.width / 2, 80);
    app_.stage.addChild(timeRemainingTextField);

    return timeRemainingTextField;
  }

  createTimeRemainingTextHeading(app_, textField_) {
    const timeRemainingTextHeading = new PIXI.Text(
      "Time remaining:",
      this._textStyle
    );
    textField_.addChild(timeRemainingTextHeading);
    // timeRemainingTextHeading.anchor = 1;
    timeRemainingTextHeading.x = app_.view.width / 3;
    timeRemainingTextHeading.y = 60;

    return timeRemainingTextHeading;
  }

  createTimeRemainingText(app_, textField_, startTime_) {
    const timeRemainingText = new PIXI.Text(startTime_, this._textStyle);
    textField_.addChild(timeRemainingText);
    timeRemainingText.x = app_.view.width / 2 - 10;
    timeRemainingText.y = 90;

    return timeRemainingText;
  }

  createScoreTextField(app_) {
    const scoreTextField = new PIXI.Graphics();
    scoreTextField
      .beginFill(0xd3d3d3, 1)
      .drawRect(app_.view.width / 4, 150, app_.view.width / 2, 80);
    app_.stage.addChild(scoreTextField);

    return scoreTextField;
  }

  createScoreTextHeading(app_, textField_) {
    const scoreTextHeading = new PIXI.Text("Score:", this._textStyle);
    textField_.addChild(scoreTextHeading);
    scoreTextHeading.x = app_.view.width / 2.3;
    scoreTextHeading.y = 160;

    return scoreTextHeading;
  }

  createScoreText(app_, textField_, playerScore_) {
    const scoreText = new PIXI.Text(playerScore_.toString(), this._textStyle);
    textField_.addChild(scoreText);
    scoreText.x = app_.view.width / 2 - 10;
    scoreText.y = 190;

    return scoreText;
  }

  createColourCircle(app_, hex_) {
    const colourCircle = new PIXI.Graphics();
    colourCircle
      .beginFill(hex_, 1)
      .lineStyle(0, 0xffffff, 1)
      .drawCircle(app_.view.width / 2, 350, 100);
    app_.stage.addChild(colourCircle);

    return colourCircle;
  }

  createRedCircle(app_) {
    const redCircle = new PIXI.Graphics();
    redCircle
      .beginFill(0xff0000, 1)
      .lineStyle(1, 0x000000, 1)
      .drawCircle(app_.view.width / 6, 550, 40);
    app_.stage.addChild(redCircle);
    redCircle.buttonMode = true;

    redCircle.colourName = "red";
    return redCircle;
  }

  createBlueCircle(app_) {
    const blueCircle = new PIXI.Graphics();
    blueCircle
      .beginFill(0x0000ff, 1)
      .lineStyle(1, 0x000000, 1)
      .drawCircle((app_.view.width / 6) * 2, 550, 40);
    app_.stage.addChild(blueCircle);
    blueCircle.buttonMode = true;

    blueCircle.colourName = "blue";
    return blueCircle;
  }

  createGreenCircle(app_) {
    const greenCircle = new PIXI.Graphics();
    greenCircle
      .beginFill(0x00ff00, 1)
      .lineStyle(1, 0x000000, 1)
      .drawCircle((app_.view.width / 6) * 3, 550, 40);
    app_.stage.addChild(greenCircle);
    greenCircle.buttonMode = true;

    greenCircle.colourName = "green";
    return greenCircle;
  }

  createYellowCircle(app_) {
    const yellowCircle = new PIXI.Graphics();
    yellowCircle
      .beginFill(0xffff00, 1)
      .lineStyle(1, 0x000000, 1)
      .drawCircle((app_.view.width / 6) * 4, 550, 40);
    app_.stage.addChild(yellowCircle);
    yellowCircle.buttonMode = true;

    yellowCircle.colourName = "yellow";
    return yellowCircle;
  }

  createOrangeCircle(app_) {
    const orangeCircle = new PIXI.Graphics();
    orangeCircle
      .beginFill(0xffa500, 1)
      .lineStyle(1, 0x000000, 1)
      .drawCircle((app_.view.width / 6) * 5, 550, 40);
    app_.stage.addChild(orangeCircle);
    orangeCircle.buttonMode = true;

    orangeCircle.colourName = "orange";
    return orangeCircle;
  }

  createGameOverlay(app_) {
    const overlay = new PIXI.Graphics();
    overlay
      .beginFill(0x000000, 0.7)
      .drawRect(0, 0, app_.view.width, app_.view.height);
    app_.stage.addChild(overlay);

    return overlay;
  }

  createFinalScoreText(app_, overlay_, score_, totalSpins_) {
    let text;
    if (score_ === 0)
      text = `Unlucky, you scored no points
       from ${totalSpins_} attempts`;
    if (score_ === 1)
      text = `Not bad, you scored ${score_} point
       from ${totalSpins_} attempts`;
    if (score_ > 1 && score_ < 4)
      text = `Not bad, you scored ${score_} points
       from ${totalSpins_} attempts`;
    if (score_ >= 4)
      text = `Outstanding! You scored ${score_}
       points from ${totalSpins_} attempts`;

    const displayText = new PIXI.Text(text, this._textStyle);
    displayText.x = app_.view.width / 4;
    displayText.y = 80;
    overlay_.addChild(displayText);
  }

  createReplayButton(app_, overlay_) {
    const button = new PIXI.Graphics();
    button
      .beginFill(0xffffff, 1)
      .lineStyle(2, 0xffffff, 1)
      .drawCircle(app_.view.width / 2, 350, 100);
    overlay_.addChild(button);

    button.buttonMode = true;

    return button;
  }

  createReplayButtonText(app_, button_) {
    const text = new PIXI.Text(
      `Click to 
    Play Again`,
      this._textStyle
    );
    text.x = app_.view.width / 2 - 80;
    text.y = 310;
    button_.addChild(text);
  }

  // Add event handlers to buttons
  addReplayButtonHandler(button_, handler_) {
    button_.interactive = true;
    button_.on("pointerdown", () => handler_());
  }

  addButtonHandlers(buttonsArr_, handler_) {
    buttonsArr_.forEach((b) => {
      b.interactive = true;
      b.on("pointerdown", () => handler_(b));
    });
  }

  // Methods to uodate/affect visuals currently renderede on screen

  setCircleColour(app_, colourCircle_, colour_, borderPx_) {
    colourCircle_
      .clear()
      .beginFill(colour_, 1)
      .lineStyle(borderPx_, 0xffffff, 1)
      .drawCircle(app_.view.width / 2, 350, 100);
  }

  cycleToNextColour(app_, colourCircle_, c_, i_) {
    colourCircle_
      .clear()
      .beginFill(c_[i_], 1)
      .lineStyle(1, 0x000000, 1)
      .drawCircle(app_.view.width / 2, 350, 100);
  }

  updateScore(scoreText_, newScore_) {
    scoreText_.text = newScore_;
  }

  updateTime(text_, num_) {
    text_.text = num_;
  }
}

export default new View();
